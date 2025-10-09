'use client';

import { AvatarStatusCard } from '@/components/avatar-status-card';
import { Button } from '@/components/ui/button';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { BarChart3, Bot, Settings } from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {
    const [timeRange, setTimeRange] = useState('24h');

    const avatars = [
        {
            id: 1,
            name: 'Dr. Matthew Anderson',
            status: 'active',
            conversations: 1247,
            avgResponseTime: '1.2s',
            satisfaction: 94,
            color: 'chart-1',
        },
        {
            id: 2,
            name: 'Student Services',
            status: 'active',
            conversations: 892,
            avgResponseTime: '1.5s',
            satisfaction: 91,
            color: 'chart-2',
        },
        {
            id: 3,
            name: 'Academic Affairs',
            status: 'active',
            conversations: 654,
            avgResponseTime: '1.8s',
            satisfaction: 89,
            color: 'chart-3',
        },
        {
            id: 4,
            name: 'Technology Support',
            status: 'maintenance',
            conversations: 423,
            avgResponseTime: '2.1s',
            satisfaction: 87,
            color: 'chart-4',
        },
    ];

    const totalConversations = avatars.reduce((sum, avatar) => sum + avatar.conversations, 0);
    const avgSatisfaction = Math.round(avatars.reduce((sum, avatar) => sum + avatar.satisfaction, 0) / avatars.length);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-border bg-card/50 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Bot className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-foreground">Institutional AI Avatars</h1>
                                <p className="text-sm text-muted-foreground">Dashboard & Monitoring</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 rounded-lg bg-secondary p-1">
                                <Button
                                    variant={timeRange === '24h' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setTimeRange('24h')}
                                    className="text-xs"
                                >
                                    24h
                                </Button>
                                <Button
                                    variant={timeRange === '7d' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setTimeRange('7d')}
                                    className="text-xs"
                                >
                                    7d
                                </Button>
                                <Button
                                    variant={timeRange === '30d' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setTimeRange('30d')}
                                    className="text-xs"
                                >
                                    30d
                                </Button>
                            </div>
                            <Button variant="outline" size="sm">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {/* Avatar Status Cards */}
                <div className="mb-8">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-foreground">Avatar Status</h2>
                        <Button variant="outline" size="sm">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            View Details
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {avatars.map((avatar) => (
                            <Link key={avatar.id} href={home.url()}>
                                <a className="block">
                                    <AvatarStatusCard avatar={avatar} />
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
