<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LandingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\LicenseController;
use App\Http\Controllers\Admin\ContactRequestController;
use App\Http\Controllers\Admin\TariffController;
use App\Http\Controllers\Admin\ContactSettingController;

Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/about', [LandingController::class, 'about'])->name('about');
Route::get('/pricing', [LandingController::class, 'pricing'])->name('pricing');
Route::get('/features', [LandingController::class, 'features'])->name('features');
Route::get('/demo', [LandingController::class, 'demo'])->name('demo');
Route::post('/contact', [LandingController::class, 'contact'])->name('contact')->middleware('throttle:5,1');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('pages', PageController::class)->except(['show']);
    Route::resource('licenses', LicenseController::class)->only(['index', 'store', 'destroy']);
    Route::resource('contact-requests', ContactRequestController::class)->only(['index', 'update', 'destroy']);
    Route::resource('tariffs', TariffController::class);
    
    Route::get('/contact-settings', [ContactSettingController::class, 'edit'])->name('contact-settings.edit');
    Route::put('/contact-settings', [ContactSettingController::class, 'update'])->name('contact-settings.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// Fallback route for custom pages
Route::get('/{slug}', [LandingController::class, 'page'])->name('page');
