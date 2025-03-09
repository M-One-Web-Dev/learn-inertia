<?php

namespace Database\Seeders;

use App\Models\Framework;
use Illuminate\Database\Seeder;

class FrameworkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['name' => 'Laravel', 'language' => 'PHP'],
            ['name' => 'Vue', 'language' => 'JavaScript'],
            ['name' => 'React', 'language' => 'JavaScript'],        
        ];

        foreach ($data as $item) {
            Framework::create($item);
        }
    }
}
