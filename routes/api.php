<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Facades\Storage\Storage;

Route::get('/user', function () {
    return response()->json(['user' => 'Chavez']);
});

Route::get('/files', function () {
    $files = Storage::disk('local')->files('knowledge_files');
    return response()->json(['files' => $files]);
});