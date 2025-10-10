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
        image?: string; // Optional image URL
    };
}

export function AvatarStatusCard({ avatar }: AvatarStatusCardProps) {
    const isActive = avatar.status === 'active';

    return (
        <Card
            className={cn('relative min-h-[200px] overflow-hidden border-border p-5 transition-colors hover:border-primary/50', 'bg-cover bg-center')}
            style={{
                backgroundImage: `url(${avatar.image || ''})`,
            }}
        >
            {/* Overlay to improve text contrast */}
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px]" />

            {/* Content */}
            <div className="it relative z-10 flex min-h-[200px] items-end justify-between">
                <div className="mb-4 flex items-end justify-between">
                    <div className="flex items-end justify-evenly gap-3">
                        <div className={cn('flex h-10 w-10 items-center justify-between rounded-lg', isActive ? 'bg-primary/10' : 'bg-muted')}>
                            <Bot className={cn('h-5 w-5', isActive ? 'text-foreground' : 'text-muted-foreground')} />
                        </div>
                        <div>
                            <h3 className="text-sm leading-tight font-semibold text-foreground drop-shadow-md">{avatar.name}</h3>
                            <Badge
                                variant={isActive ? 'default' : 'secondary'}
                                className={cn(
                                    'mt-1 text-xs',
                                    isActive ? 'bg-success/10 border-foreground text-foreground' : 'bg-warning/10 text-warning border-foreground',
                                )}
                            >
                                <Activity className="mr-1 h-3 w-3" />
                                {avatar.status}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
