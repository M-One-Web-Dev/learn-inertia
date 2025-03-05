<?php

namespace App\Http\Controllers;

use App\Models\Programming; // Import model Programming
use Illuminate\Http\Request; // Import Request untuk menangani HTTP request
use Inertia\Inertia; // Import Inertia untuk render view React

class ProgrammingController extends Controller
{
    /**
     * Menampilkan halaman index Programming Language
     * Method ini akan dipanggil ketika mengakses halaman utama programming language
     * 
     * @return \Inertia\Response
     */
    public function index()
    {
        // Render view dengan Inertia
        // Parameter pertama: path ke file React (resources/js/Pages/dashboard/programming-languange/page.tsx)
        // Parameter kedua: data yang akan dikirim ke view (dalam bentuk props)
        return Inertia::render('dashboard/programming-languange/page', [
            'programmings' => Programming::all() // Mengambil semua data programming language
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
        // Validasi input dari form
        $request->validate([
            'name' => 'required|string|max:255' // Nama harus diisi, string, dan maksimal 255 karakter
        ]);

        // Simpan data baru ke database
        Programming::create($request->all());

        // Redirect kembali ke halaman sebelumnya dengan pesan sukses
        return back()->with('success', 'Programming language created successfully.');
    }

    /**
     * Mengupdate data Programming Language yang sudah ada
     * Method ini akan dipanggil ketika form edit di submit
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Programming  $programming
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Programming $programming)
    {
        // Validasi input dari form
        $request->validate([
            'name' => 'required|string|max:255' // Nama harus diisi, string, dan maksimal 255 karakter
        ]);

        // Update data di database
        $programming->update($request->all());

        // Redirect kembali ke halaman sebelumnya dengan pesan sukses
        return back()->with('success', 'Programming language updated successfully.');
    }

    /**
     * Menghapus data Programming Language
     * Method ini akan dipanggil ketika tombol delete diklik
     * 
     * @param  \App\Models\Programming  $programming
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Programming $programming)
    {
        // Hapus data dari database
        $programming->delete();

        // Redirect kembali ke halaman sebelumnya dengan pesan sukses
        return back()->with('success', 'Programming language deleted successfully.');
    }
}