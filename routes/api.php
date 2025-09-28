<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Facades\Storage\Storage;
use App\Http\Controllers\KnowledgeController;

Route::get('/user', function () {
    return response()->json(['user' => 'Chavez']);
});

Route::prefix('/knowledge')->group(function () {
    Route::get('/', [KnowledgeController::class, 'index']);
    Route::get('/{slug}', [KnowledgeController::class, 'show']);
});
