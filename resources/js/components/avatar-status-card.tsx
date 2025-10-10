import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Activity, Bot, MoreVertical } from 'lucide-react';

interface Category {
    id: number;
    name: string,
    slug: string;
    description: string;
}

interface AvatarStatusCardProps {
    avatar: {
        id: number;
        name: string;
        status: string;
        color: string;
        img_url: string; 
        category: Category[]
    };
}

export function AvatarStatusCard({ avatar }: AvatarStatusCardProps) {
  const isActive = avatar.status === 'active';


    return (
        <Card
            className={cn(
                'relative min-h-[200px] overflow-hidden border-2 border-border p-5 transition-all duration-500',
                'bg-cover bg-center group hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue/20',
                'hover:shadow-blue-500/20 hover:shadow-blue-500/20'
              )}
        >

                  {/* Background image layer */}
            <div
                className="absolute inset-0 bg-center bg-cover transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                backgroundImage: `url(${avatar.img_url || ''})`,
                }}
            />

            {/* Subtle gradient overlay to improve text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

            {/* Content */}
            <div className="it relative z-10 flex min-h-[200px] items-end justify-between">
                <div className="mb-4 flex items-end justify-between">
                    <div className="flex items-end justify-evenly gap-3">
                        <div>
                        <Bot className={cn('h-5 w-5', isActive ? 'text-white' : 'text-muted-foreground')} style={{marginBottom: '10px'}}/>
                            <h3 className="text-sm leading-tight font-semibold text-white drop-shadow-md">{avatar.name}</h3>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {avatar.category?.map((c) => (
                                    <Badge key={c.id} variant="secondary">
                                        {c.name}
                                    </Badge>
                                ))}
                            </div>
                            <Badge
                                variant={isActive ? 'default' : 'secondary'}
                                className={cn(
                                    'mt-1 text-xs border border-white/20 backdrop-blur-sm',
                                    isActive
                                      ? 'bg-green-500/20 text-green-100'
                                      : 'bg-yellow-500/20 text-yellow-100'
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
