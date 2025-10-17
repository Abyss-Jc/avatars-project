<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('dashboard');
})->name('home');

Route::get('/avatars', function () {
    return Inertia::render('avatars');
})->name('avatars');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/interactive-avatar/{avatarName}', function() {
    return Inertia::render('avatars', [
        'avatarId' => request()->input('avatarId'), 
    ]);
})->name('avatars');


Route::get('/did-agent', function() {
    return Inertia::render('avatarsDid');
})->name('didAvatars');

Route::get('/did-agent-2', function() {
    return Inertia::render('avatarsDidEmbed');
})->name('didAvatarsEmbed');

Route::get('/did-agent-embed', function() {
    return Inertia::render('avatarsDid2');
})->name('didAvatarsEmbed2');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
