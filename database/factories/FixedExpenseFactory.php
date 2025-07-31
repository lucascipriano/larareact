<?php

namespace Database\Factories;

use App\Models\FixedExpense;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FixedExpense>
 */
class FixedExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = FixedExpense::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Aluguel', 'Internet', 'Academia', 'Streaming', 'Cartão de Crédito'
            ]),
            'amount' => $this->faker->randomFloat(2, 20, 1500),
            'category' => $this->faker->randomElement([
                'Moradia', 'Serviços', 'Saúde', 'Educação', 'Entretenimento', 'Outros'
            ]),
            'description' => $this->faker->sentence(),
            'due_day' => $this->faker->numberBetween(1, 28), // evita problemas com fevereiro
            'starts_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'ends_at' => $this->faker->optional()->dateTimeBetween('now', '+1 year'),
            'is_active' => $this->faker->boolean(90),
        ];
    }
}
