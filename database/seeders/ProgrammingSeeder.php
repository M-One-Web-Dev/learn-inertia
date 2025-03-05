<?php

namespace Database\Seeders;

use App\Models\Programming;
use Illuminate\Database\Seeder;

class ProgrammingSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['name' => 'PHP'],
            ['name' => 'JavaScript'],
            ['name' => 'Python'],
            ['name' => 'Java'],
        ];

        foreach ($data as $item) {
            Programming::create($item);
        }
    }
}