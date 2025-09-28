<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class KnowledgeFile extends Model
{
    use HasFactory;

    public const DISK = 'knowledge';

    protected $fillable = [
        'category_id',
        'file_name',
        'file_path',
        'file_size', //en KB
    ];

    protected $casts = [
        'file_size' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }


    public function directory(): ?string
    {
        return $this->category_id ? (string) $this->category_id : null;
    }


    public function relativePath(): ?string
    {
        $dir = $this->directory();
        if (! $dir || ! $this->file_name) {
            return null;
        }
        return $dir.'/'.$this->file_name;
    }


    public function scopeForCategory($query, Category|int|string $category)
    {
        if ($category instanceof Category) {
            return $query->where('category_id', $category->getKey());
        }
        if (is_numeric($category)) {
            return $query->where('category_id', (int) $category);
        }
        if (is_string($category)) {
            return $query->whereHas('category', fn($q) => $q->where('slug', $category));
        }
        return $query;
    }

    public function scopeSearch($query, ?string $term)
    {
        if ($term) {
            $like = "%{$term}%";
            $query->where('file_name', 'like', $like);
        }
        return $query;
    }


    public function getUrlAttribute(): ?string
    {
        if (! $this->file_path) {
            // Si no hay file_path almacenado, intenta derivarlo
            $relative = $this->relativePath();
            return $relative ? Storage::disk(self::DISK)->url($relative) : null;
        }
        // Si ya es una url la devuelve tal cual
        if (filter_var($this->file_path, FILTER_VALIDATE_URL)) {
            return $this->file_path;
        }
        // De otra forma resuélvelo vía el disco custom knowledge
        return Storage::disk(self::DISK)->url($this->file_path);
    }

    public function getSizeHumanAttribute(): string
    {
        $kb = max(0, (int) $this->file_size);
        $bytes = $kb * 1024;
        $units = ['B','KB','MB','GB','TB'];
        $i = 0;
        while ($bytes >= 1024 && $i < count($units) - 1) {
            $bytes /= 1024;
            $i++;
        }
        $value = $bytes; // ya viene escalado por el loop
        return sprintf('%s %s', $i === 0 ? (int) $value : number_format($value, 2), $units[$i]);
    }


}
