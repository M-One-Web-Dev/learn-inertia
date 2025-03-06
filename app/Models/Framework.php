<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Framework extends Model
{
    protected $fillable = ['name', 'programming_id'];

    public function programming()
    {
        return $this->belongsTo(Programming::class);
    }
}
