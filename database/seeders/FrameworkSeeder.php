<?php

namespace Database\Seeders;

use App\Models\Framework;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FrameworkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['name' => 'Laravel'],
            ['name' => 'Tailwind CSS'],
            ['name' => 'React.js'],
            ['name' => 'Django'],
        ];

        foreach ($data as $item) {
            Framework::create($item);
        }
    }
}