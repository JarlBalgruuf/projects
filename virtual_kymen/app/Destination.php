<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    protected $table = 'destinations';

    public function categories()
    {
        //return $this->hasMany('App\Destination_category');
        return $this->belongsToMany('App\Category');
    }
}