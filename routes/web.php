<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('dashboard/dashboard-page/page');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/bot', function () {
    return Inertia::render('dashboard/users-bot/page');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/user', function () {
    return Inertia::render('dashboard/users-user/page');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/languange', function () {
    return Inertia::render('dashboard/programming-languange/page');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/database', function () {
    return Inertia::render('dashboard/programming-database/page');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/framework', function () {
    return Inertia::render('dashboard/programming-framework/page');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/general-setting', function () {
    return Inertia::render('dashboard/setting-general/page');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/currency', function () {
    return Inertia::render('dashboard/cryptocurrency-currency/page');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
