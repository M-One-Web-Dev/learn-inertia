<?php

namespace App\Http\Controllers;

use App\Models\Framework;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrameworkController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Inertia\Response
     */

    public function index()
    {
        return Inertia::render('dashboard/programming-framework/page', [
            'frameworks' => Framework::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    // public function create()
    // {
        
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'language' => 'required|string|max:255',
        ]);

        Framework::create($request->all());

        return back()->with('success', 'Framework created successfully.');
    }

    /**
     * Update the specified resource in storage.
     * @param  \App\Models\Framework  $framework
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Framework $framework)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'language' => 'required|string|max:255',
        ]);

        $framework->update($request->all());

        return back()->with('success', 'Framework updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     * @param \App\Models\Framework $framework
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Framework $framework)
    {
        $framework->delete();

        return back()->with('success', 'Framework delete successfully.');

    }
}
