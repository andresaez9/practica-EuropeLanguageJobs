<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

            $dog = Dog::where('breed', $request->get('breed'))
                ->where('size', $request->get('size'))
                ->where('color', $request->get('color'))
                ->first();
                
            if ($dog) {
                return response()->json(['message' => 'Dog already exists!'], 400);
            }

            $imgPath = $request->file('image')->store('public/images');

            $dog = new Dog([
                'image' => str_replace('public/', '', $imgPath), // remove 'public/' from the path
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

    public function delete($id)
    {
        try {
            $dog = Dog::find($id);

            if (!$dog) {
                return response()->json(['message' => 'Dog not found!'], 404);
            }

            Storage::delete('public/' . $dog->image);
            $dog->delete();

            return response()->json(['message' => 'Dog deleted!']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /*public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'breed' => 'required',
                'size' => 'required',
                'color' => 'required',
            ]);

            $dog = Dog::findOrFail($id);

            if (!$dog) {
                return response()->json(['message' => 'Dog not found!'], 404);
            }

            $dog->breed = $request->input('breed');
            $dog->size = $request->input('size');
            $dog->color = $request->input('color');

            if ($request->hasFile('image')) {
                Storage::delete('public/' . $dog->image);
                $imgPath = $request->file('image')->store('public/images');
                $dog->image = str_replace('public/', '', $imgPath); // remove 'public/' from the path
            }

            $dog->save();

            return response()->json([
                'message' => 'Dog updated!',
                'dog' => $dog
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $dog = Dog::find($id);

            if (!$dog) {
                return response()->json(['message' => 'Dog not found!'], 404);
            }

            return response()->json($dog);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }*/
}
