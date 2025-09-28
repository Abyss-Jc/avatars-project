<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Category;
use Exception;

class KnowledgeController extends Controller
{
    public function show($slug)
    {
        try {
            // Find the category
            $category = Category::where('slug', $slug)->firstOrFail();

            // Build path to the folder
            $folderPath = storage_path("app/knowledge/{$category->slug}");
            $pattern = $folderPath . "/*.json";

            Log::info("Accessing folder via glob: $pattern");

            // Get all JSON files
            $files = glob($pattern);

            Log::info('Files found: ' . json_encode($files));

            $mergedData = [];

            foreach ($files as $file) {
                // Skip unreadable or empty files
                if (!is_readable($file) || filesize($file) === 0) {
                    Log::warning("Skipping file (unreadable or empty): $file");
                    continue;
                }

                $content = file_get_contents($file);

                // Skip if content is empty
                if ($content === false || trim($content) === '') {
                    Log::warning("Skipping file (empty content): $file");
                    continue;
                }

                $mergedData[] = [
                    'file_name' => basename($file),
                    'content' => json_decode($content),
                ];
            }

            return response()->json([
                //'category' => $category->name,
                //'slug' => $category->slug,
                //'files_count' => count($mergedData),
                'data' => $mergedData,
            ]);
        }
        catch(Exception $e) {
            Log::error("Error in KnowledgeController@show: " . $e->getMessage());
            return response()->view('errors.500', [], 500);
        }
    }

    public function index() {
        try {
            $categories = Category::all();
            $allData = [];

            foreach($categories as $category) {
                $folderPath = storage_path("app/knowledge/{$category->slug}");
                $pattern = $folderPath . "/*.json";

                Log::info("Accessing folder via glob: $pattern");

                $files = glob($pattern);
                Log::info('Files found: ' . json_encode($files));

                $filesData = [];

                foreach($files as $file) {
                    if (!is_readable($file) || filesize($file) === 0) {
                        Log::warning("Skipping file (unreadable or empty): $file");
                        continue;
                    }

                    $content = file_get_contents($file);

                    if ($content === false || trim($content) === '') {
                        Log::warning("Skipping file (empty content): $file");
                        continue;
                    }

                    $filesData[] = [
                        'file_name' => basename($file),
                        'content' => json_decode($content),
                    ];
                }

                $allData[] = [
                    'category' => $category->name,
                    'files_count' => count($filesData),
                    'fileData' => $filesData,
                ];
            }

            return response()->json([
                'data' => $allData,
            ], 200);

        }
        catch(Exception $e) {
            Log::error("Error in KnowledgeController@showAll: " . $e->getMessage());
            return response()->view('errors.500', [], 500);
        }
    }
}
