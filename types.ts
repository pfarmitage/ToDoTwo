export interface TaskType {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  sizing: number;
  priority: 'normal' | 'high' | 'urgent';
  tags: string[];
  completed: boolean;
  list: 'today' | 'this week' | 'this month' | 'someday' | 'completed';    
  dateId: string | null; // Add this line
  isNewTask?: boolean;
  userId: string;
  dateId: string;
  dateCreated: string | null;
}
