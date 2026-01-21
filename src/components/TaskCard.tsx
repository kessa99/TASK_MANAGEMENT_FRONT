import { Task } from '@/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const priorityStyles = {
  LOW: 'bg-priority-low/10 text-priority-low border-priority-low/20',
  MEDIUM: 'bg-priority-medium/10 text-priority-medium border-priority-medium/20',
  HIGH: 'bg-priority-high/10 text-priority-high border-priority-high/20',
};

const priorityLabels = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <Card 
      className="task-card cursor-pointer border-border/50 bg-card hover:border-accent/30"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-sm leading-tight text-foreground line-clamp-2">
            {task.title}
          </h3>
          <Badge 
            variant="outline" 
            className={cn('shrink-0 text-xs font-medium border', priorityStyles[task.priority])}
          >
            {priorityLabels[task.priority]}
          </Badge>
        </div>
        
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {task.due_date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(task.due_date), 'MMM d')}</span>
            </div>
          )}
          
          {task.assigned_to.length > 0 && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{task.assigned_to.length}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
