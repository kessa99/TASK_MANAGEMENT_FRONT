import { useState } from 'react';
import { User } from '@/types/api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Mail, Shield, ShieldCheck, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Demo team members
const DEMO_MEMBERS: User[] = [
  {
    id: '2',
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    verified: true,
    role: 'member',
    created_at: '2026-01-15T10:00:00',
    updated_at: '2026-01-20T10:00:00',
  },
  {
    id: '3',
    first_name: 'Mike',
    last_name: 'Johnson',
    email: 'mike.johnson@example.com',
    verified: true,
    role: 'member',
    created_at: '2026-01-18T10:00:00',
    updated_at: '2026-01-21T10:00:00',
  },
  {
    id: '4',
    first_name: 'Sarah',
    last_name: 'Wilson',
    email: 'sarah.wilson@example.com',
    verified: false,
    role: 'member',
    created_at: '2026-01-20T10:00:00',
    updated_at: '2026-01-20T10:00:00',
  },
];

export default function Team() {
  const { user } = useAuth();
  const [members] = useState<User[]>(DEMO_MEMBERS);
  const isOwner = user?.role === 'owner';

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team and their access levels.
          </p>
        </div>
        {isOwner && (
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        )}
      </div>

      {/* Owner Card */}
      {user && (
        <Card className="border-accent/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-medium">
                  {user.first_name[0]}{user.last_name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">
                      {user.first_name} {user.last_name}
                    </h3>
                    <Badge className="bg-accent text-accent-foreground">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      Owner
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">You</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Members List */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Members ({members.length})
        </h2>
        
        {members.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
                    {member.first_name[0]}{member.last_name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">
                        {member.first_name} {member.last_name}
                      </h3>
                      <Badge variant="secondary">
                        <Shield className="w-3 h-3 mr-1" />
                        Member
                      </Badge>
                      {!member.verified && (
                        <Badge variant="outline" className="text-priority-medium border-priority-medium/30">
                          Pending
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                
                {isOwner && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" />
                        Send message
                      </DropdownMenuItem>
                      {!member.verified && (
                        <DropdownMenuItem>
                          <ShieldCheck className="w-4 h-4 mr-2" />
                          Verify user
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive">
                        Remove from team
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No team members yet</h3>
          <p className="text-muted-foreground mb-4">
            Invite people to collaborate on your tasks
          </p>
          {isOwner && (
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Invite your first member
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
