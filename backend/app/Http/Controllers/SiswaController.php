<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Siswa;

class SiswaController extends Controller
{
    public function index()
    {
        $siswa = Siswa::all();
        return response()->json([
            'status' => 'success',
            'message' => 'Data siswa berhasil diambil',
            'data' => $siswa,
        ]);
    }

    public function show($id)
    {
        $siswa = Siswa::find($id);
        
        if (!$siswa) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data siswa tidak ditemukan',
            ], 404);
        }
        
        return response()->json([
            'status' => 'success',
            'message' => 'Detail siswa berhasil diambil',
            'data' => $siswa,
        ]);
    }

    public function store(Request $request)
    {
        $siswa = Siswa::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Siswa berhasil ditambahkan',
            'data' => $siswa,
        ]);
    }

    public function update(Request $request, $id)
    {
        $siswa = Siswa::find($id);
        if (!$siswa) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data siswa tidak ditemukan',
            ], 404);
        }

        $siswa->update($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Siswa berhasil diubah',
            'data' => $siswa,
        ]);
    }

    public function destroy($id)
    {
        $siswa = Siswa::find($id);
        if (!$siswa) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data siswa tidak ditemukan',
            ], 404);
        }

        try {
            $siswa->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Siswa berhasil dihapus',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat menghapus siswa',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
