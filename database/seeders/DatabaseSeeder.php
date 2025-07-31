<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\TransactionFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Lucas Cipriano',
            'email' => 'test@example.com',
        ]);

         User::factory(10)->create();

        User::all()->each(function ($user) {
            Transaction::factory()->count(50)->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
