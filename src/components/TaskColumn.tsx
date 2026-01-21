import { Task, TaskStatus } from '@/types/api';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';
import { Circle, Clock, CheckCircle2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onAddTask?: (status: TaskStatus) => void;
}

const statusConfig = {
  TODO: {
    label: 'To Do',
    icon: Circle,
    headerClass: 'text-status-todo-foreground',
    countClass: 'bg-status-todo text-status-todo-foreground',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    icon: Clock,
    headerClass: 'text-status-progress',
    countClass: 'bg-status-progress/10 text-status-progress',
  },
  DONE: {
    label: 'Done',
    icon: CheckCircle2,
    headerClass: 'text-status-done',
    countClass: 'bg-status-done/10 text-status-done',
  },
};

export function TaskColumn({ status, tasks, onTaskClick, onAddTask }: TaskColumnProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex flex-col w-full min-w-[280px] max-w-[350px]">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <Icon className={cn('w-4 h-4', config.headerClass)} />
          <h2 className="font-semibold text-sm text-foreground">{config.label}</h2>
          <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', config.countClass)}>
            {tasks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={() => onAddTask?.(status)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-2 flex-1 overflow-y-auto pb-4">
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onClick={() => onTaskClick?.(task)}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="flex items-center justify-center py-8 text-muted-foreground text-sm border border-dashed border-border rounded-lg">
            No tasks yet
          </div>
        )}
      </div>
    </div>
  );
}
