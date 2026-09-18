export interface HighlightedText {
  text: string;
  highlight?: boolean;
  accent?: 'amber' | 'emerald' | 'blue' | 'rose';
  bold?: boolean;
}

export interface BulletPoint {
  headline: string;
  detail: string;
  badge?: string;
  badgeTone?: 'warning' | 'success' | 'info' | 'neutral';
  subhead?: string;
  component?: string;
  metric?: string;
  trigger?: string;
}

export interface HardwareItem {
  name: string;
  role: string;
  spec: string;
  humorNote: string;
  iconType: 'chip' | 'camera' | 'speaker' | 'zap' | 'shield' | 'refresh';
}

export interface StateMachineStep {
  stage: string;
  title: string;
  condition: string;
  action: string;
  humorLevel: string;
  status: 'calm' | 'alert' | 'panic' | 'reset';
}

export interface CodeSnippet {
  language: string;
  filename: string;
  description: string;
  code: string;
}

export interface SlideData {
  id: string;
  category: string;
  slideNumber: number;
  title: string;
  subtitle: string;
  heroKicker?: string;
  takeaway?: string;
  type: 
    | 'title' 
    | 'problem' 
    | 'concept' 
    | 'hardware' 
    | 'board-diagram'
    | 'algorithm' 
    | 'flow' 
    | 'code' 
    | 'simulator' 
    | 'challenges' 
    | 'roadmap';
  bullets?: BulletPoint[];
  hardwareList?: HardwareItem[];
  stateSteps?: StateMachineStep[];
  codeSnippets?: CodeSnippet[];
  formula?: {
    expression: string;
    description: string;
    thresholds: { label: string; value: string; meaning: string }[];
  };
}
