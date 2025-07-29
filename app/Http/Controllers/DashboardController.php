<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $recentTransactions = $user->transactions()
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($t) {
                return [
                    'id' => $t->id,
                    'description' => $t->description,
                    'category' => $t->category,
                    'date' => Carbon::parse($t->date)->toDateString(),
                    'amount' => (float) $t->amount,
                    'type' => $t->type,
                ];
            });

        return Inertia::render('dashboard', [
            'recentTransactions' => $recentTransactions,
        ]);
    }
}
