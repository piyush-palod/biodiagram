import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Diagram {
  id: string;
  user_id: string;
  title: string;
  description: string;
  canvas_data: any[];
  thumbnail_url: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface DiagramCollaborator {
  id: string;
  diagram_id: string;
  user_id: string;
  permission: 'view' | 'edit';
  created_at: string;
}
