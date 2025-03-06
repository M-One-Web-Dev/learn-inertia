<?php

namespace Database\Seeders;

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
            ['name' => 'Laravel', 'programming_id' => 1],
            ['name' => 'CodeIgniter', 'programming_id' => 1],
            ['name' => 'Symfony', 'programming_id' => 1],
            ['name' => 'Vue.js', 'programming_id' => 2],
            ['name' => 'React', 'programming_id' => 2],
            ['name' => 'Angular', 'programming_id' => 2],
            ['name' => 'Django', 'programming_id' => 3],
            ['name' => 'Flask', 'programming_id' => 3],
            ['name' => 'Pyramid', 'programming_id' => 3],
            ['name' => 'Spring', 'programming_id' => 4],
            ['name' => 'Struts', 'programming_id' => 4],
            ['name' => 'JSF', 'programming_id' => 4],
        ];

        foreach ($data as $item) {
            \App\Models\Framework::create($item);
        }
    }
}
