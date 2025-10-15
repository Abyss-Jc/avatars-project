<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Facades\Storage\Storage;
use App\Http\Controllers\KnowledgeController;
use App\Http\Controllers\AvatarsController;

Route::get('/user', function () {
    return response()->json(['user' => 'Chavez']);
});

Route::get('/all/knowledge', [KnowledgeController::class, 'globalIndex']);

// Endpoints específicos por avatar
Route::prefix('{avatar_name}/knowledge')->group(function () {
    Route::get('/all', [KnowledgeController::class, 'index']);
    Route::get('/{slug}', [KnowledgeController::class, 'show']);
});

// Avatars
Route::prefix('/avatars')->group(function() {
    Route::get('/', [AvatarsController::class, 'getAvatars']);
    Route::get('/avatar/{avatarId}', [AvatarsController::class, 'getAvatarFrame']);
    Route::get('/did-agent', [AvatarsController::class, 'getDidAvatar']);
});