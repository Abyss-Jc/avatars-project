import HeygenEmbed2 from '@/components/avatar-andrea'; 
import { useEffect, useState } from 'react';
import AvatarInfo from '@/components/avatars-info';
import { dashboard, login, register } from '@/routes';
import { getAvatarFrame } from '@/services/avatarsService';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import DIDAgent from '@/components/avatar-did';
import DIDAvatarEmbed from './avatarsDid2';

export default function Welcome() {
    const { auth, avatarId } = usePage<SharedData>().props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await getAvatarFrame(avatarId);
                const { data } = response;
                setAvatar(data.avatar);
            } catch (e) {
                console.error('Error fetching Avatar', e);
            }   
        };

        fetchAvatar();
    }, [avatarId]);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-background text-foreground">
                {/* --- Header --- */}
                <header className="flex items-center justify-between bg-background px-6 py-4 shadow-sm">
                    <h1 className="text-lg font-semibold">
                        Chat with {avatar?.name} – <span className="text-primary-foreground">
                            {avatar?.category.map(cat => cat.name).join(', ')}
                        </span>
                    </h1>

                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={dashboard()} className="rounded-md border border-border px-4 py-1.5 text-sm transition hover:bg-secondary">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={login()} className="rounded-md px-4 py-1.5 text-sm hover:underline">
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="rounded-md border border-[#E5E5E5] px-4 py-1.5 text-sm transition hover:bg-[#F4F4F4]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* --- Subtitle Section --- */}
                <div className="mt-8 mb-4 text-center">
                    <p className="text-base text-muted-foreground">Ask your questions with chat or voice!</p>
                </div>

                {/* --- Main Video / Avatar Section --- */}
                <main className="flex grow items-center justify-center px-4 pb-12">
                    <div className="relative flex w-full max-w-[80vw] flex-col items-center overflow-hidden rounded-xl bg-muted shadow-md">
                        {/* Avatar embed container */}
                        <div className="flex  w-full items-center justify-center bg-muted">
                            {avatar?.provider == "HeyGen" ? (
                                <AvatarInfo avatar={avatar} />
                            ) : (
                                <DIDAvatarEmbed avatar={avatar?.source}/>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
