import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckSquare, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { authApi } from '@/lib/api';

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

    console.log('=== LOGIN ATTEMPT ===');
    console.log('Email:', email);

    try {
      const response = await authApi.connexion({ email, password });
      console.log('Login response:', response);

      if (response.success && response.data) {
        console.log('Login successful, fetching user info...');
        // Récupérer les infos utilisateur après connexion avec le token
        const userResponse = await authApi.moi(response.data.access_token);
        console.log('User response:', userResponse);

        if (userResponse.success && userResponse.data) {
          console.log('User info retrieved:', userResponse.data);
          login(response.data, userResponse.data);
          toast({
            title: 'Bienvenue !',
            description: `Connecté en tant que ${userResponse.data.first_name}`,
          });
          navigate('/dashboard');
        } else {
          console.error('Failed to get user info:', userResponse);
          toast({
            title: 'Erreur',
            description: userResponse.message || 'Impossible de récupérer les informations utilisateur',
            variant: 'destructive',
          });
        }
      } else {
        console.error('Login failed:', response);
        toast({
          title: 'Échec de connexion',
          description: response.message || 'Email ou mot de passe invalide',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la connexion',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
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
