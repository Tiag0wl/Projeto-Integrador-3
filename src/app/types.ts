export interface Report {
  id: number;
  user: string;
  others: number;
  type: string;
  severity: string;
  severityColor: string;
  location: string;
  date: string;
  likes: number;
  dislikes: number;
  isFavorite: boolean;
  title: string;
  description: string;
  occurrenceId?: number;
  isFirstReport?: boolean;
}