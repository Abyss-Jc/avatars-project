import HeygenEmbed2 from '@/components/avatar-andrea'; 
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-background text-foreground">
                {/* --- Header --- */}
                <header className="flex items-center justify-between bg-primary px-6 py-4 shadow-sm">
                    <h1 className="text-lg font-semibold">
                        Chat with Andrea  – <span className="text-primary-foreground">Admissions</span>
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
                    <p className="text-base text-muted-foreground">Get Information about Tiquismiquis!</p>
                </div>

                {/* --- Main Video / Avatar Section --- */}
                <main className="flex grow items-center justify-center px-4 pb-12">
                    <div className="relative flex w-full max-w-3xl flex-col items-center overflow-hidden rounded-xl bg-muted shadow-md">
                        {/* Avatar embed container */}
                        <div className="flex h-[600px] w-full items-center justify-center bg-muted">
                            <HeygenEmbed2 />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
