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
            ->paginate(10)
            ->through(function ($t) {
                return [
                    'id' => $t->id,
                    'description' => $t->description,
                    'category' => $t->category,
                    'date' => Carbon::parse($t->date)->toDateString(),
                    'amount' => (float) $t->amount,
                    'type' => $t->type,
                ];
            });

        $balance = $user->transactions()->get()->reduce(function ($carry, $t) {
            return $carry + ($t->type === 'income' ? $t->amount : -$t->amount);
        }, 0);

   $moneyout = $user->transactions()
       ->where('type', 'expense')
       ->whereMonth('date', Carbon::now()->month)
       ->whereYear('date', Carbon::now()->year)
       ->sum('amount');


        return Inertia::render('dashboard', [
            'recentTransactions' => $recentTransactions,
            'balance' => (float) $balance,
            'moneyout' => (float) $moneyout,
        ]);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $transaction = $user->transactions()->findOrFail($id);
        $transaction->delete();
        return redirect()->back()->with('success', 'Transaction deleted successfully.');
    }
}
