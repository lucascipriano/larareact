<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FixedExpense extends Model
{
    /** @use HasFactory<\Database\Factories\FixedExpenseFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'amount',
        'category',
        'description',
        'due_day',
        'starts_at',
        'ends_at',
        'is_active',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
