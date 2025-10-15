# Diagram AI - Professional Biology Diagram Editor

A modern, full-featured web application for creating professional biology diagrams. Built specifically for PhD researchers, educators, and biology professionals.

## Features

### Authentication & User Management
- Secure email/password authentication via Supabase
- User profiles with personalized settings
- Session management with automatic token refresh

### Diagram Management
- Create unlimited diagrams
- Auto-save functionality (saves every 2 seconds)
- Manual save option
- List view with search functionality
- Organized by last modified date

### Canvas Features
- **Drag & Drop**: Drag biology components from the library onto the canvas
- **Zoom Controls**: 25% to 400% zoom with smooth transitions
- **Grid System**: Optional grid display with snap-to-grid functionality
- **Pan & Navigate**: Click and drag to move around the canvas
- **Object Manipulation**:
  - Select, move, resize, and rotate objects
  - Adjust opacity and colors
  - Add custom labels
  - Layer management

### Biology Component Library
- 50+ professional SVG biology components
- Organized into categories:
  - Cell Structures (nucleus, mitochondria, ribosomes, ER, golgi, lysosomes, chloroplasts, vacuoles, membranes)
  - Molecules (DNA, proteins, enzymes, ATP, glucose, lipids)
  - Pathways & Processes (arrows, inhibitors, catalysts)
  - Lab Equipment (beakers, microscopes, petri dishes, test tubes)
- Searchable component library
- Expandable/collapsible categories

### Properties Panel
- Real-time property editing for selected objects
- Adjust position (X, Y coordinates)
- Resize (width, height)
- Rotate (0-360 degrees)
- Opacity control (0-100%)
- Color picker with preset biology-appropriate palette
- Label management (add/edit/show/hide)

### AI Assistant (UI Ready)
- Chat interface for natural language diagram creation
- Placeholder for AI integration
- Example prompts provided
- Conversation history

### Export Functionality
- **PNG**: High-resolution raster export
- **SVG**: Vector format for scalability
- **PDF**: Print-ready format
- **JSON**: Save/load project files with complete state

### Collaboration Features (Database Ready)
- Share diagrams with team members
- View and edit permissions
- Public/private diagram settings
- Collaborator management system

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Canvas**: HTML5 Canvas + SVG

## Database Schema

### Tables
1. **profiles** - User profiles linked to auth.users
2. **diagrams** - Diagram data with canvas objects stored as JSONB
3. **diagram_collaborators** - Collaboration and sharing management

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own diagrams
- Collaborators have view/edit permissions
- Public diagrams accessible to all authenticated users

## Getting Started

1. Sign up for an account
2. Create your first diagram
3. Drag components from the left sidebar onto the canvas
4. Select objects to edit properties in the right panel
5. Use zoom and grid controls for precision
6. Auto-save keeps your work protected
7. Export in your preferred format

## Keyboard Shortcuts

- **Delete/Backspace**: Delete selected object
- **Mouse Wheel**: Zoom in/out
- **Click + Drag**: Pan canvas (when not dragging objects)

## Professional Features for Researchers

- High-quality SVG components suitable for publications
- Precise positioning and alignment tools
- Grid and snap-to-grid for accurate layouts
- Export to multiple formats for different uses
- Collaboration features for research teams
- Auto-save prevents data loss during long editing sessions

## Future Enhancements

- AI-powered diagram generation
- Template library with pre-made diagrams
- Advanced collaboration features (real-time editing)
- Integration with educational platforms
- Mobile-responsive touch interactions
- Custom component uploads
- Annotation and measurement tools
- Version history and rollback

## Support

Built for the scientific community with attention to detail and professional requirements.
