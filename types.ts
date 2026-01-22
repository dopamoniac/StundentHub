
export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'Course' | 'Support' | 'Exam' | 'Slot' | 'Practical';
  subjectId: string;
  author: string;
  url: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface AICopilotProps {
  activeSubject?: Subject | null;
}
