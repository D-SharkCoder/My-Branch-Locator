<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Branch>
 */
class BranchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'manager' => fake()->name(),
            'phone' => fake()->numerify("+63#########"),
            'address' => fake()->city(),
            'lat' => fake()->numerify("##.#######"),
            'lng' => fake()->numerify("##.#######"),
            'status' => fake()->boolean()
        ];
    }
}
