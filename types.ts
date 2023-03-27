export interface TaskType {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  sizing: number;
  priority: 'normal' | 'high' | 'urgent';
  tags: string[];
  completed: boolean;
  list: 'today' | 'tomorrow' | 'next week' | 'next month' | 'someday';    
  isNewTask?: boolean;
}
