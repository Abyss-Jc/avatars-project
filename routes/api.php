<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Facades\Storage\Storage;
use App\Http\Controllers\KnowledgeController;

Route::get('/user', function () {
    return response()->json(['user' => 'Chavez']);
});

Route::get('/all/knowledge', [KnowledgeController::class, 'globalIndex']);

// Endpoints específicos por avatar
Route::prefix('{avatar_name}/knowledge')->group(function () {
    Route::get('/all', [KnowledgeController::class, 'index']);
    Route::get('/{slug}', [KnowledgeController::class, 'show']);
});