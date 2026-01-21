import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckSquare, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Demo users for testing
const DEMO_USERS = {
  owner: {
    email: 'owner@demo.com',
    password: 'demo1234',
    user: {
      id: '1',
      first_name: 'John',
      last_name: 'Owner',
      email: 'owner@demo.com',
      verified: true,
      role: 'owner' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  member: {
    email: 'member@demo.com',
    password: 'demo1234',
    user: {
      id: '2',
      first_name: 'Jane',
      last_name: 'Member',
      email: 'member@demo.com',
      verified: true,
      role: 'member' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call with demo users
    await new Promise((resolve) => setTimeout(resolve, 800));

    const demoUser = Object.values(DEMO_USERS).find(
      (u) => u.email === email && u.password === password
    );

    if (demoUser) {
      login(
        {
          access_token: 'demo_token_' + Date.now(),
          refresh_token: 'demo_refresh_' + Date.now(),
          token_type: 'bearer',
          expires_in: 1800,
        },
        demoUser.user
      );
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${demoUser.user.first_name}`,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password. Try demo accounts below.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  const handleDemoLogin = (type: 'owner' | 'member') => {
    setEmail(DEMO_USERS[type].email);
    setPassword(DEMO_USERS[type].password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent mb-4">
              <CheckSquare className="w-6 h-6 text-accent-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="space-y-3">
            <p className="text-xs text-center text-muted-foreground">
              Demo accounts for testing:
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => handleDemoLogin('owner')}
              >
                Owner Demo
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => handleDemoLogin('member')}
              >
                Member Demo
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 bg-secondary items-center justify-center p-12">
        <div className="max-w-md text-center space-y-6">
          <div className="w-full h-64 bg-card rounded-2xl shadow-lg flex items-center justify-center border border-border">
            <div className="space-y-3 p-6 w-full">
              <div className="h-3 bg-muted rounded w-3/4 mx-auto" />
              <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
              <div className="flex gap-2 justify-center mt-4">
                <div className="h-8 w-20 bg-status-todo rounded" />
                <div className="h-8 w-20 bg-status-progress rounded" />
                <div className="h-8 w-20 bg-status-done rounded" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Manage tasks effortlessly
            </h2>
            <p className="text-muted-foreground text-sm">
              Organize, track, and collaborate on your projects with a clean and intuitive interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
