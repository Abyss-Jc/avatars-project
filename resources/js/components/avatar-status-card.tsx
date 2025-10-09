import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Activity, Bot, MoreVertical } from 'lucide-react';

interface AvatarStatusCardProps {
    avatar: {
        id: number;
        name: string;
        status: string;
        conversations: number;
        avgResponseTime: string;
        satisfaction: number;
        color: string;
    };
}

export function AvatarStatusCard({ avatar }: AvatarStatusCardProps) {
    const isActive = avatar.status === 'active';

    return (
        <Card className="border-border bg-card p-5 transition-colors hover:border-primary/50">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', isActive ? 'bg-primary/10' : 'bg-muted')}>
                        <Bot className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-muted-foreground')} />
                    </div>
                    <div>
                        <h3 className="text-sm leading-tight font-semibold text-foreground">{avatar.name}</h3>
                        <Badge
                            variant={isActive ? 'default' : 'secondary'}
                            className={cn(
                                'mt-1 text-xs',
                                isActive ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20',
                            )}
                        >
                            <Activity className="mr-1 h-3 w-3" />
                            {avatar.status}
                        </Badge>
                    </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Conversations</span>
                    <span className="text-sm font-semibold text-foreground">{avatar.conversations.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Avg Response</span>
                    <span className="text-sm font-semibold text-foreground">{avatar.avgResponseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Satisfaction</span>
                    <span className="text-sm font-semibold text-foreground">{avatar.satisfaction}%</span>
                </div>
            </div>

            <div className="mt-4 border-t border-border pt-4">
                <div className="h-1.5 w-full rounded-full bg-secondary">
                    <div className={cn('h-1.5 rounded-full', `bg-${avatar.color}`)} style={{ width: `${avatar.satisfaction}%` }} />
                </div>
            </div>
        </Card>
    );
}
