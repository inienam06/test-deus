<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index() {
        $data = Character::latest()->get();

        return inertia('Home', [
            'data' => $data
        ]);
    }

    public function store() {
        request()->validate([
            'characters' => 'required|array|min:1',
            'characters.*.name' => 'required|string|max:50|unique:tbl_character,nama_character',
            'characters.*.str' => 'required|integer'
        ]);

        collect(request()->characters)->each(function ($character) {
            Character::create([
                'nama_character' => $character['name'],
                'strength_power' => $character['str'],
            ]);
        });

        return Inertia::location(route('home'));

        // return redirect()->route('home')->with('success', 'Data Successfully inserted');
    }

    public function update() {
        request()->validate([
            'id' => 'required|integer|exists:tbl_character,character_id',
            'name' => 'required|string|max:50|unique:tbl_character,nama_character,' . request()->id.',character_id',
            'str' => 'required|integer'
        ]);

        Character::find(request()->id)->update([
            'nama_character' => request()->name,
            'strength_power' => request()->str,
        ]);

        return Inertia::location(route('home'));

        // return redirect()->route('home')->with('success', 'Data Successfully inserted');
    }

    public function delete($id) {
        Character::find($id)?->delete();

        return Inertia::location(route('home'));

        // return redirect()->route('home')->with('success', 'Data Successfully inserted');
    }
}
