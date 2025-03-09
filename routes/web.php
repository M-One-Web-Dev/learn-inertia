<?php

// Import yang diperlukan

use App\Http\Controllers\FrameworkController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgrammingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route untuk halaman welcome
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route untuk dashboard utama
Route::get('/dashboard', function () {
    return Inertia::render('dashboard/dashboard-page/page');
})->middleware(['auth', 'verified'])->name('dashboard');


// === CRUD Programming Language ===
// Grup route yang memerlukan autentikasi
Route::middleware(['auth'])->group(function () {
    // GET: Menampilkan halaman index programming language
    // URL: /dashboard/languange
    // Controller: ProgrammingController@index
    // Name: programming.index
    Route::get('/dashboard/languange', [ProgrammingController::class, 'index'])
        ->name('programming.index');

    // POST: Menyimpan data programming language baru
    // URL: /dashboard/languange
    // Controller: ProgrammingController@store
    // Name: programming.store
    Route::post('/dashboard/languange', [ProgrammingController::class, 'store'])
        ->name('programming.store');

    // PUT: Mengupdate data programming language yang ada
    // URL: /dashboard/languange/{programming}
    // Parameter: ID programming language
    // Controller: ProgrammingController@update
    // Name: programming.update
    Route::put('/dashboard/languange/{programming}', [ProgrammingController::class, 'update'])
        ->name('programming.update');

    // DELETE: Menghapus data programming language
    // URL: /dashboard/languange/{programming}
    // Parameter: ID programming language
    // Controller: ProgrammingController@destroy
    // Name: programming.destroy
    Route::delete('/dashboard/languange/{programming}', [ProgrammingController::class, 'destroy'])
        ->name('programming.destroy');
});

// === TODO: CRUD Framework ===
// Saat ini hanya menampilkan halaman
// Perlu dibuat mirip dengan CRUD Programming Language di atas:
// 1. Buat migration untuk tabel frameworks
// 2. Buat model Framework
// 3. Buat FrameworkController
// 4. Buat route group dengan 4 route (GET, POST, PUT, DELETE)
// 5. Buat view React dengan komponen yang sama
Route::get('/dashboard/framework', function () {
    return Inertia::render('dashboard/programming-framework/page');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard/framework', [FrameworkController::class, 'index'])
        ->name('framework.index');


    Route::post('/dashboard/framework', [FrameworkController::class, 'store'])
        ->name('framework.store');


    Route::put('/dashboard/framework/{framework}', [FrameworkController::class, 'update'])
        ->name('framework.update');


    Route::delete('/dashboard/framework/{framework}', [FrameworkController::class, 'destroy'])
        ->name('framework.destroy');
});


// Route untuk autentikasi
require __DIR__.'/auth.php';