<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Category;

class SyncKnowledgeCategories extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-knowledge-categories';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $path = storage_path('app/knowledge');
        $folders = scandir($path);
    
        foreach ($folders as $folder) {
            if ($folder === '.' || $folder === '..') continue;
    
            Category::firstOrCreate(
                ['slug' => $folder],
                ['name' => ucfirst(str_replace('-', ' ', $folder))]
            );
        }
    
        $this->info('Categories synced from knowledge folders.');
    }
    
}
