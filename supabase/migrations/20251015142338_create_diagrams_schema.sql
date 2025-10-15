/*
  # Create Diagram AI Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `diagrams`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text)
      - `canvas_data` (jsonb) - stores all canvas objects
      - `thumbnail_url` (text)
      - `is_public` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `diagram_collaborators`
      - `id` (uuid, primary key)
      - `diagram_id` (uuid, references diagrams)
      - `user_id` (uuid, references profiles)
      - `permission` (text) - 'view' or 'edit'
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Users can read their own profile
    - Users can update their own profile
    - Users can create/read/update/delete their own diagrams
    - Users can read diagrams they collaborate on
    - Users can read public diagrams
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create diagrams table
CREATE TABLE IF NOT EXISTS diagrams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT 'Untitled Diagram',
  description text DEFAULT '',
  canvas_data jsonb DEFAULT '[]'::jsonb,
  thumbnail_url text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE diagrams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own diagrams"
  ON diagrams FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view public diagrams"
  ON diagrams FOR SELECT
  TO authenticated
  USING (is_public = true);

CREATE POLICY "Users can insert own diagrams"
  ON diagrams FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own diagrams"
  ON diagrams FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own diagrams"
  ON diagrams FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create diagram_collaborators table
CREATE TABLE IF NOT EXISTS diagram_collaborators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagram_id uuid NOT NULL REFERENCES diagrams(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  permission text NOT NULL DEFAULT 'view' CHECK (permission IN ('view', 'edit')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(diagram_id, user_id)
);

ALTER TABLE diagram_collaborators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Diagram owners can manage collaborators"
  ON diagram_collaborators FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM diagrams
      WHERE diagrams.id = diagram_collaborators.diagram_id
      AND diagrams.user_id = auth.uid()
    )
  );

CREATE POLICY "Collaborators can view shared diagrams"
  ON diagrams FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM diagram_collaborators
      WHERE diagram_collaborators.diagram_id = diagrams.id
      AND diagram_collaborators.user_id = auth.uid()
    )
  );

CREATE POLICY "Collaborators with edit permission can update diagrams"
  ON diagrams FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM diagram_collaborators
      WHERE diagram_collaborators.diagram_id = diagrams.id
      AND diagram_collaborators.user_id = auth.uid()
      AND diagram_collaborators.permission = 'edit'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM diagram_collaborators
      WHERE diagram_collaborators.diagram_id = diagrams.id
      AND diagram_collaborators.user_id = auth.uid()
      AND diagram_collaborators.permission = 'edit'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_diagrams_user_id ON diagrams(user_id);
CREATE INDEX IF NOT EXISTS idx_diagrams_created_at ON diagrams(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diagram_collaborators_diagram_id ON diagram_collaborators(diagram_id);
CREATE INDEX IF NOT EXISTS idx_diagram_collaborators_user_id ON diagram_collaborators(user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_diagrams_updated_at
  BEFORE UPDATE ON diagrams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
