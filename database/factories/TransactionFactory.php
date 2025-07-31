<?php

namespace Database\Factories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Transaction::class;
    public function definition(): array
    {
        return [
            'description' => fake()->sentence(),
            'category' => fake()->word(),
            'date' => fake()->dateTimeThisYear(),
            'amount' => fake()->randomFloat(2, 1, 1000),
            'type' => fake()->randomElement(['income', 'expense']),
        ];

    }
}
