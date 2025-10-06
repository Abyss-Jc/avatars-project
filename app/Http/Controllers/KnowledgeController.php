<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Avatar;
use App\Models\Category;
use Exception;

class KnowledgeController extends Controller
{
    /**
     * GET /{avatar_name}/knowledge/all
     * Lista todos los knowledge de todas las categorías para un avatar
     */
    public function index($avatar_name)
    {
        try {
            $avatar = Avatar::where('name', $avatar_name)->firstOrFail();
            $categories = Category::all();
            $allData = [];

            foreach ($categories as $category) {
                $folderPath = storage_path("app/knowledge/{$category->slug}");
                $pattern = $folderPath . "/*.json";

                Log::info("Accessing folder via glob: $pattern");
                $files = glob($pattern);

                $filesData = [];
                foreach ($files as $file) {
                    if (!is_readable($file) || filesize($file) === 0) continue;

                    $content = file_get_contents($file);
                    if ($content === false || trim($content) === '') continue;

                    $filesData[] = [
                        'file_name' => basename($file),
                        'content' => json_decode($content),
                    ];
                }

                $allData[] = [
                    'category' => $category->name,
                    'slug' => $category->slug,
                    'files_count' => count($filesData),
                    'fileData' => $filesData,
                ];
            }

            return response()->json([
                'avatar' => $avatar->name,
                'data' => $allData,
            ], 200);
        }
        catch (Exception $e) {
            Log::error("Error in KnowledgeController@index: " . $e->getMessage());
            return response()->view('errors.500', [], 500);
        }
    }

    /**
     * GET /{avatar_name}/knowledge/{slug}
     * Muestra los knowledge files de una categoría específica
     */
    public function show($avatar_name, $slug)
    {
        try {
            $avatar = Avatar::where('name', $avatar_name)->firstOrFail();
            $category = Category::where('slug', $slug)->firstOrFail();

            $folderPath = storage_path("app/knowledge/{$category->slug}");
            $pattern = $folderPath . "/*.json";

            Log::info("Accessing folder via glob: $pattern");
            $files = glob($pattern);

            $mergedData = [];

            foreach ($files as $file) {
                if (!is_readable($file) || filesize($file) === 0) continue;

                $content = file_get_contents($file);
                if ($content === false || trim($content) === '') continue;

                $mergedData[] = [
                    'file_name' => basename($file),
                    'content' => json_decode($content),
                ];
            }

            return response()->json([
                'avatar' => $avatar->name,
                'category' => $category->name,
                'slug' => $category->slug,
                'data' => $mergedData,
            ], 200);
        }
        catch (Exception $e) {
            Log::error("Error in KnowledgeController@show: " . $e->getMessage());
            return response()->view('errors.500', [], 500);
        }
    }

    /**
     * GET /all/knowledge
     * Devuelve todos los knowledge de todas las categorías y todos los avatares
     */
    public function globalIndex()
    {
        try {
            $avatars = Avatar::all();
            $categories = Category::all();
            $result = [];

            foreach ($avatars as $avatar) {
                $avatarData = [
                    'avatar' => $avatar->name,
                    'categories' => [],
                ];

                foreach ($categories as $category) {
                    $folderPath = storage_path("app/knowledge/{$category->slug}");
                    $pattern = $folderPath . "/*.json";

                    $files = glob($pattern);
                    $filesData = [];

                    foreach ($files as $file) {
                        if (!is_readable($file) || filesize($file) === 0) continue;

                        $content = file_get_contents($file);
                        if ($content === false || trim($content) === '') continue;

                        $filesData[] = [
                            'file_name' => basename($file),
                            'content' => json_decode($content),
                        ];
                    }

                    $avatarData['categories'][] = [
                        'category' => $category->name,
                        'slug' => $category->slug,
                        'files_count' => count($filesData),
                        'fileData' => $filesData,
                    ];
                }

                $result[] = $avatarData;
            }

            return response()->json(['data' => $result], 200);
        }
        catch (Exception $e) {
            Log::error("Error in KnowledgeController@globalIndex: " . $e->getMessage());
            return response()->view('errors.500', [], 500);
        }
    }
}
