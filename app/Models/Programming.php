<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programming extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function frameworks()
    {
        return $this->hasMany(Framework::class);
    }
}
