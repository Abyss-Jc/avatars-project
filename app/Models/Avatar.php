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
        'source'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];



    public function getFullSourceUrlAttribute(): ?string
    {
        return $this->source ?: null;
    }










}

