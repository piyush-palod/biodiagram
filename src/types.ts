export interface CanvasObject {
  id: string;
  type: 'component' | 'text' | 'shape';
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  color: string;
  svg?: string;
  category?: string;
  label?: string;
  showLabel?: boolean;
}

export interface ComponentCategory {
  id: string;
  name: string;
  items: ComponentItem[];
  expanded: boolean;
}

export interface ComponentItem {
  id: string;
  name: string;
  svg: string;
  category: string;
  defaultWidth: number;
  defaultHeight: number;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
