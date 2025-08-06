<?php

namespace Tests\Feature;

use App\Models\Branch;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BranchTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_branch_listing(): void
    {
        Branch::factory()->count(3)->create();

        $response = $this->getJson('/api/branches');

        $response->assertStatus(200);
        $response->assertJsonCount(3);
    }

    public function test_branch_creation(): void
    {
        $branch = Branch::factory()->make()->toArray();

        $response = $this->postJson('/api/branches', $branch);
        $response->assertStatus(201);
        $this->assertDatabaseHas('branches', $branch);
    }

    public function test_branch_creation_invalid_input(): void
    {
        $invalidInput = [
            'name' => '123',
            'manager' => '123',
            'phone' => 'test',
            'address' => '',
            'lat' => "Test",
            'lng' => "test"
        ];

        $response = $this->postJson('/api/branches', $invalidInput);
        $response->assertStatus(422);
    }

    public function test_branch_update(): void
    {
        $branch = Branch::factory()->create();
        $updateData = [
            'id' => $branch->id,
            'name' => fake()->city(),
            'manager' => fake()->name(),
            'phone' => fake()->numerify("+63##########"),
            'address' => fake()->address(),
            'lat' => fake()->numerify("##.####"),
            'lng' => fake()->numerify("##.####"),
            'status' => fake()->boolean()
        ];

        $response = $this->putJson("/api/branches/{$branch->id}", $updateData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('branches', $updateData);
    }

    public function test_branch_delete(): void
    {
        $branch = Branch::factory()->create();

        $response = $this->deleteJson("/api/branches/{$branch->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('branches', ['id' => $branch->id]);
    }
}
