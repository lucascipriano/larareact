<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionController extends Controller
{

    public function index(){
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
                    'date' => $t->date->toDateString(),
                    'amount' => (float) $t->amount,
                    'type' => $t->type,
                ];
            });

        return Inertia::render('Dashboard', [
            'recentTransactions' => $recentTransactions,
        ]);
    }
    public function store(Request $request)
    {


        $validated = $request->validate([
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric',
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
        ]);

        $validated['user_id'] = auth()->id();

        Transaction::create($validated);

        return redirect()->back()->with('success', 'Transação criada com sucesso!');
    }
}
