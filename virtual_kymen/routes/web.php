<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});




Route::group(['middleware' => ['auth']], function() {
    // your routes
    Route::resource('create', 'DestinationController');
    Route::resource('category', 'CategoryController');
    //Post method not supported on this route fix
    Route::post('/create', 'DestinationController@store')->name("destination.store");
    Route::post('/category', 'CategoryController@store')->name("category.store");

    Route::get('destinations','DestinationController@destinationView');
    Route::get('categories','CategoryController@categoryView');

    Route::get('show/{id}','DestinationController@show');

    Route::get('edit/{id}','DestinationController@edit');
    Route::get('destroy_destination/{id}','DestinationController@destroy');

    Route::get('destroy_category/{id}','CategoryController@destroy');

    //Route::get('create', 'DestinationController@getAllCategories')->name("categories.get");
});

//artisan Auth
Auth::routes();

Route::get('/admin', 'HomeController@index')->name('admin');
