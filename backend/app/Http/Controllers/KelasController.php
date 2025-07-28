<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kelas;

class KelasController extends Controller
{
    public function index()
    {
        $kelas = Kelas::all();
        return response()->json([
            'status' => 'success',
            'message' => 'Data kelas berhasil diambil',
            'data' => $kelas,
        ]);
    }

    public function show($id)
    {
        $kelas = Kelas::find($id);
        
        if (!$kelas) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data kelas tidak ditemukan',
            ], 404);
        }
        
        return response()->json([
            'status' => 'success',
            'message' => 'Detail kelas berhasil diambil',
            'data' => $kelas,
        ]);
    }

    public function store(Request $request)
    {
        $kelas = Kelas::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Kelas berhasil ditambahkan',
            'data' => $kelas,
        ]);
    }

    public function update(Request $request, $id)
    {
        $kelas = Kelas::find($id);
        if (!$kelas) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data kelas tidak ditemukan',
            ], 404);
        }

        $kelas->update($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Kelas berhasil diubah',
            'data' => $kelas,
        ]);
    }

    public function destroy($id)
    {
        $kelas = Kelas::find($id);
        if (!$kelas) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data kelas tidak ditemukan',
            ], 404);
        }

        try {
            $kelas->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Kelas berhasil dihapus',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat menghapus kelas',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
