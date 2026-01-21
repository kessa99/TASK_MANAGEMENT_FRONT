import { useState } from 'react';
import { Invitation } from '@/types/api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Send, Clock, RefreshCw, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

// Demo invitations
const DEMO_INVITATIONS: Invitation[] = [
  {
    id: '1',
    email: 'alex.new@example.com',
    task_id: '1',
    task_title: 'Design new landing page',
    invited_by: '1',
    inviter_name: 'John Owner',
    accepted: false,
    expires_at: '2026-01-28T10:00:00',
    created_at: '2026-01-21T10:00:00',
  },
  {
    id: '2',
    email: 'chris.dev@example.com',
    task_id: '3',
    task_title: 'Write API documentation',
    invited_by: '1',
    inviter_name: 'John Owner',
    accepted: false,
    expires_at: '2026-01-26T10:00:00',
    created_at: '2026-01-19T10:00:00',
  },
];

export default function Invitations() {
  const { user } = useAuth();
  const [invitations] = useState<Invitation[]>(DEMO_INVITATIONS);
  const isOwner = user?.role === 'owner';

  if (!isOwner) {
    return (
      <div className="p-6 lg:p-8 animate-fade-in">
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
            <Mail className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Access Restricted</h3>
          <p className="text-muted-foreground">
            Only team owners can manage invitations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Invitations</h1>
          <p className="text-muted-foreground mt-1">
            Manage pending invitations to your team.
          </p>
        </div>
        <Button>
          <Send className="w-4 h-4 mr-2" />
          Send Invitation
        </Button>
      </div>

      {/* Pending Invitations */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Pending ({invitations.length})
        </h2>

        {invitations.map((invitation) => (
          <Card key={invitation.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-foreground">
                        {invitation.email}
                      </h3>
                      <Badge variant="outline" className="text-priority-medium border-priority-medium/30">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Invited to: <span className="text-foreground">{invitation.task_title}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Expires {format(new Date(invitation.expires_at), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {invitations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
            <Mail className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No pending invitations</h3>
          <p className="text-muted-foreground mb-4">
            All invitations have been accepted or expired.
          </p>
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Send a new invitation
          </Button>
        </div>
      )}
    </div>
  );
}
