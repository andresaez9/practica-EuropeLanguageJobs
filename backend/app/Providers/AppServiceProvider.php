<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Validator::extend('alpha_only', function ($attribute, $value, $parameters, $validator) {
            return preg_match('/^[a-zA-Z\s]+$/', $value);
        });
    
        Validator::replacer('alpha_only', function ($message, $attribute, $rule, $parameters) {
            return str_replace(':attribute', $attribute, 'El campo :attribute solo debe contener letras.');
        });
    }
}
