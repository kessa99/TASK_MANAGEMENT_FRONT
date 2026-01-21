import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Task, TaskStatus, CreateTaskPayload } from '@/types/api';
import { KanbanBoard } from '@/components/KanbanBoard';
import { CreateTaskDialog } from '@/components/CreateTaskDialog';
import { StatsCard } from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { Plus, CheckCircle2, Clock, ListTodo, TrendingUp } from 'lucide-react';

// Demo tasks for display
const DEMO_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create a modern and responsive landing page design',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    start_date: '2026-01-20T09:00:00',
    due_date: '2026-01-25T18:00:00',
    assigned_to: ['2'],
    created_at: '2026-01-20T09:00:00',
    updated_at: '2026-01-21T10:00:00',
  },
  {
    id: '2',
    title: 'Set up authentication flow',
    description: 'Implement login, register, and password reset functionality',
    status: 'DONE',
    priority: 'HIGH',
    start_date: '2026-01-18T09:00:00',
    due_date: '2026-01-20T18:00:00',
    assigned_to: [],
    created_at: '2026-01-18T09:00:00',
    updated_at: '2026-01-20T16:00:00',
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all API endpoints with examples',
    status: 'TODO',
    priority: 'MEDIUM',
    start_date: null,
    due_date: '2026-01-28T18:00:00',
    assigned_to: ['2'],
    created_at: '2026-01-21T09:00:00',
    updated_at: '2026-01-21T09:00:00',
  },
  {
    id: '4',
    title: 'Review pull requests',
    description: 'Review and merge pending pull requests from the team',
    status: 'TODO',
    priority: 'LOW',
    start_date: null,
    due_date: null,
    assigned_to: [],
    created_at: '2026-01-21T11:00:00',
    updated_at: '2026-01-21T11:00:00',
  },
  {
    id: '5',
    title: 'Database optimization',
    description: 'Optimize slow queries and add proper indexes',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    start_date: '2026-01-21T09:00:00',
    due_date: '2026-01-24T18:00:00',
    assigned_to: [],
    created_at: '2026-01-21T08:00:00',
    updated_at: '2026-01-21T14:00:00',
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(DEMO_TASKS);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('TODO');

  const stats = useMemo(() => {
    const todo = tasks.filter((t) => t.status === 'TODO').length;
    const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
    const done = tasks.filter((t) => t.status === 'DONE').length;
    const total = tasks.length;

    return { todo, inProgress, done, total };
  }, [tasks]);

  const handleCreateTask = (payload: CreateTaskPayload) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: payload.title,
      description: payload.description,
      status: payload.status || 'TODO',
      priority: payload.priority || 'MEDIUM',
      start_date: payload.start_date || null,
      due_date: payload.due_date || null,
      assigned_to: payload.assigned_to || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleAddTask = (status: TaskStatus) => {
    setDefaultStatus(status);
    setCreateDialogOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    // For now, just cycle through statuses
    const statusOrder: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % 3];
    
    setTasks(tasks.map((t) => 
      t.id === task.id ? { ...t, status: nextStatus, updated_at: new Date().toISOString() } : t
    ));
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user?.first_name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your tasks today.
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          icon={TrendingUp}
        />
        <StatsCard
          title="To Do"
          value={stats.todo}
          icon={ListTodo}
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          icon={Clock}
        />
        <StatsCard
          title="Completed"
          value={stats.done}
          icon={CheckCircle2}
          trend={{ value: 12, positive: true }}
        />
      </div>

      {/* Kanban Board */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Task Board</h2>
        <KanbanBoard
          tasks={tasks}
          onTaskClick={handleTaskClick}
          onAddTask={handleAddTask}
        />
      </div>

      {/* Create Task Dialog */}
      <CreateTaskDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateTask}
        defaultStatus={defaultStatus}
      />
    </div>
  );
}
