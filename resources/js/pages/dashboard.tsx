'use client';

import { AvatarStatusCard } from '@/components/avatar-status-card';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { BarChart3, Loader2, Settings } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import AppLogoIcon from '../components/app-logo-icon';

import { getAvatarsInfo } from '../services/avatarsService';

function DashboardPage() {
    const [avatarsData, setAvatarsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAvatars = async () => {
            setIsLoading(true);
            try {
                const response = await getAvatarsInfo();
                const { data } = response;
                console.log(data.avatars);
                setAvatarsData(data.avatars);
            } catch (e) {
                console.error('Error fetching Avatars', e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAvatars();
    }, []);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-border bg-card/50 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-foreground">Institutional AI Avatars</h1>
                                <p className="text-sm text-muted-foreground">Dashboard & Monitoring</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/settings">
                                <Button variant="outline" size="sm" style={{ cursor: 'pointer' }}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {/* Avatar Status Cards */}

                {isLoading ? (
                    <div className="flex w-full items-center justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="mb-8">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-foreground">Avatar Status</h2>
                            <Button variant="outline" size="sm">
                                <BarChart3 className="mr-2 h-4 w-4" />
                                View Details
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {avatarsData.map((avatar) => (
                                <Link
                                    key={avatar.id}
                                    href={`/interactive-avatar/${avatar.name.replace(/\s+/g, '-').toLowerCase()}`}
                                    as="a"
                                    preserveState
                                    method="get"
                                    data={{ avatarId: avatar.id }}
                                >
                                    <AvatarStatusCard avatar={avatar} />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default memo(DashboardPage);
