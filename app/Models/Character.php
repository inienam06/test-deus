<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    use HasFactory;

    protected $table = 'tbl_character';
    protected $primaryKey = 'character_id';
    protected $fillable = [
        'nama_character',
        'strength_power',
        'create',
        'update'
    ];

    const CREATED_AT = 'create';
    const UPDATED_AT = 'update';
}
