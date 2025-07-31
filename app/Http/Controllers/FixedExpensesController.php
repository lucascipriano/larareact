<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FixedExpensesController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $fixedExpenses = $user->fixedExpenses()
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($expense) {
                return [
                    'id' => $expense->id,
                    'user_id' => $expense->user_id,
                    'name' => $expense->name,
                    'amount' => (float)$expense->amount,
                    'category' => $expense->category,
                    'description' => $expense->description,
                    'due_day' => $expense->due_day,
                    'starts_at' => $expense->starts_at ? Carbon::parse($expense->starts_at)->toDateString() : null,
                    'ends_at' => $expense->ends_at ? Carbon::parse($expense->ends_at)->toDateString() : null,
                    'is_active' => (bool)$expense->is_active,
                    'created_at' => $expense->created_at->toDateString(),
                    'updated_at' => $expense->updated_at->toDateString(),
                ];
            });
        return Inertia::render('fixedExpenses', [
            'fixedExpenses' => $fixedExpenses
        ]);
    }
}
