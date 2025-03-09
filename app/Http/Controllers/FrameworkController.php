<?php

namespace App\Http\Controllers;

use App\Models\Framework;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrameworkController extends Controller
{
    /**
     * Menampilkan halaman index Programming Framework
     * Method ini akan dipanggil ketika mengakses halaman utama programming framework
     *
     * @return \Inertia\Response
     */

    public function index()
    {
        return Inertia::render('dashboard/programming-framework/page', [
            'frameworks' => Framework::all()
        ]);
    }

    /**
     * Menyimpan data Programming Language baru ke database
     * Method ini akan dipanggil ketika form create di submit
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        Framework::create($request->all());

        return back()->with('success', 'Programming framework created successfully.');
    }

    /**
     * Mengupdate data Programming Language yang sudah ada
     * Method ini akan dipanggil ketika form edit di submit
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Framework  $framework
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Framework $framework)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $framework->update($request->all());

        return back()->with('success', 'Programming framework updated successfully.');
    }

    /**
     * Menghapus data Programming Language
     * Method ini akan dipanggil ketika tombol delete diklik
     *
     * @param  \App\Models\Framework  $framework
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Framework $framework)
    {
        $framework->delete();

        return back()->with('success', 'Programming framework deleted successfully.');

    }
}