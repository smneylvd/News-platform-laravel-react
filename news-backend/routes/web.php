<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\SourceApiController;
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

Route::get('/news', [NewsController::class, 'getAllNews']);
Route::get('/categories', [CategoryController::class, 'getAllCategories']);
Route::get('/sources', [SourceApiController::class, 'getAllSources']);
Route::get('/search', [NewsController::class, 'filterNews']);
