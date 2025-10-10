<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Avatar extends Model
{
use HasFactory;

    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = [
        'name',
        'source',
        'img_url'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];



    public function getFullSourceUrlAttribute(): ?string
    {
        return $this->source ?: null;
    }


    public function category() {
        return $this->belongsToMany(Category::class, 'avatar_categories', 'avatar_id', 'category_id')
                    ->withTimestamps();
    }

}

