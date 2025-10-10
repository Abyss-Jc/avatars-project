<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/avatars', function () {
    return Inertia::render('avatars');
})->name('avatars');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::get('/interactive-avatar/{avatarName}', function() {
        return Inertia::render('avatarsData', [
            'avatarId' => request()->input('avatarId'), 
        ]);
    })->name('avatarsDara');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
