<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = [
        'name',
        'slug',
        'description'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    //Las rutas se van a construir a partir del slug
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    // Relación 1:N: una categoría tiene muchos knowledge files
    public function knowledgeFiles()
    {
        return $this->hasMany(KnowledgeFile::class);
    }

    // Scope por termino parcial en name/description
    public function scopeSearch($query, ?string $term)
    {
        if ($term) {
            $like = "%{$term}%";
            $query->where(function ($q) use ($like) {
                $q->where('name', 'like', $like)
                  ->orWhere('description', 'like', $like);
            });
        }
        return $query;
    }

    // Scope por slug
    public function scopeWithSlug($query, string $slug)
    {
        return $query->where('slug', $slug);
    }

    // Crear slug si no se proporciona
    protected function setNameAttribute($value): void
    {
        $this->attributes['name'] = $value;
        if (! $this->exists || empty($this->attributes['slug'])) {
            $base = Str::slug($value);
            $slug = $base;
            $counter = 2;
            // Asegurar que el slug sea único
            while (static::where('slug', $slug)->exists()) {
                $slug = $base.'-'.$counter++;
            }
            $this->attributes['slug'] = $slug;
        }
    }

}
