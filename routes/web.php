<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [HomeController::class,'index'])->name('home');
Route::post('/', [HomeController::class,'store'])->name('home.store');
Route::put('/', [HomeController::class,'update'])->name('home.update');
Route::delete('{id}', [HomeController::class,'delete'])->name('home.delete');
// Route::resource('/', HomeController::class)->only(['index']);