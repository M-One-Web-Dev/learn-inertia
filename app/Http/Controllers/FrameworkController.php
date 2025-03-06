<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Framework;
use App\Models\Programming;
use Illuminate\Http\Request;
use Illuminate\Foundation\Exceptions\Renderer\Frame;

class FrameworkController extends Controller
{
    /**
     * Menampilkan halaman index framework
     * Method ini akan dipanggil ketika mengakses halaman utama framework
     * 
     * @return \Inertia\Response
     */
    public function index()
    {
        // Render view dengan Inertia
        // Parameter pertama: path ke file React (resources/js/Pages/dashboard/programming-framework/page.tsx)
        // Parameter kedua: data yang akan dikirim ke view (dalam bentuk props)
        return Inertia::render('dashboard/programming-framework/page', [
            'frameworks' => Framework::all(), // Mengambil semua data framework
            'languages' => Programming::select('id', 'name')->get() // Mengambil semua data nama dan id dari Programming
        ]);
    }

    /**
     * Menyimpan data framework baru ke database
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
        Framework::create($request->all());

        // Redirect kembali ke halaman sebelumnya dengan pesan sukses
        return back()->with('success', 'Framework created successfully.');
    }

    /**
     * Mengupdate data framework yang sudah ada
     * Method ini akan dipanggil ketika form edit di submit
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Framework  $framework
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Framework $framework)
    {
        // Validasi input dari form
        $request->validate([
            'name' => 'required|string|max:255' // Nama harus diisi, string, dan maksimal 255 karakter
        ]);

        // Update data framework yang sudah ada
        $framework->update($request->all());

        // Redirect kembali ke halaman sebelumnya dengan pesan sukses
        return back()->with('success', 'Framework updated successfully.');
    }

    /**
     * Menghapus data framework yang sudah ada
     * Method ini akan dipanggil ketika tombol delete di klik
     * 
     * @param  \App\Models\Framework  $framework
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Framework $framework)
    {
        // Hapus data framework yang sudah ada
        $framework->delete();

        // Redirect kembali ke halaman sebelumnya dengan pesan sukses
        return back()->with('success', 'Framework deleted successfully.');
    }
}
