<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dog;

class DogController extends Controller
{
    public function index()
    {
        try {
            $dogs = Dog::all();
            return response()->json($dogs);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'breed' => 'required',
                'size' => 'required',
                'color' => 'required',
            ]);

            $imgPath = $request->file('image')->store('public/images');

            $dog = new Dog([
                'image' => $imgPath,
                'breed' => $request->get('breed'),
                'size' => $request->get('size'),
                'color' => $request->get('color'),
            ]);

            $dog->save();

            return response()->json([
                'message' => 'Dog created!',
                'dog' => $dog
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
