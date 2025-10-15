import HeygenEmbed from '@/components/avatar-matthew';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import DIDAvatar from './avatarsDid2';


export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <div>
                <h1>Avatar 1</h1>
                <DIDAvatar />
            </div>
        </>
    );
}
