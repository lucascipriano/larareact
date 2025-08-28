<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
    Route::delete('transactions/{id}', [DashboardController::class, 'destroy'])->name('transactions.destroy');
    Route::post('transactions/{id}', [DashboardController::class, 'update'])->name('transactions.update');
    Route::put('transactions/{id}', [DashboardController::class, 'update']);
    Route::get('/fixeds',[\App\Http\Controllers\FixedExpensesController::class, 'index'])->name('fixeds');
    Route::get('/total', function(){
        return Inertia::render('total');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
