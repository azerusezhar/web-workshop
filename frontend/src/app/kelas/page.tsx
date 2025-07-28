// pages/kelas.js (atau di mana pun file ini berada)

"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ModalForm } from "@/components/ui/modal-form";
import { AlertDeleteDialog } from "@/components/ui/alert-delete-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Definisikan tipe data untuk objek Kelas
interface Kelas {
  id: number;
  nama: string;

}

// URL API dari environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function KelasPage() {
  const [kelas, setKelas] = useState<Kelas[]>([]);
  const [loading, setLoading] = useState(true);
  const [namaKelas, setNamaKelas] = useState("");
  const [editingKelas, setEditingKelas] = useState<Kelas | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("10"); // State untuk paginasi (jika diimplementasikan)

  // Fungsi untuk mengambil data dari API, dibungkus dengan useCallback
  const getKelas = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/kelas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // Untuk Sanctum cookie auth, credentials harus 'include'
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data dari server");
      }

      const result = await response.json();
      setKelas(result.data); // Asumsi API mengembalikan { success: true, data: [...] }
    } catch (error) {
      toast.error("Gagal memuat data kelas.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []); // useCallback dependencies kosong, fungsi ini tidak akan dibuat ulang

  // useEffect untuk memanggil getKelas saat komponen pertama kali render
  useEffect(() => {
    getKelas();
  }, [getKelas]);

  // Handler untuk menambah kelas baru
  const handleAddKelas = async () => {
    try {
      const response = await fetch(`${API_URL}/kelas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ nama: namaKelas }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menambahkan kelas");
      }
      
      toast.success("Kelas berhasil ditambahkan!");
      await getKelas(); // Ambil data terbaru
      setNamaKelas(""); // Reset input form
    } catch (error: any) {
      toast.error(error.message);
      // Dilempar lagi agar modal tidak tertutup jika ada error
      throw error;
    }
  };

  // Handler untuk mengupdate kelas
  const handleUpdateKelas = async () => {
    if (!editingKelas) return;

    try {
      const response = await fetch(`${API_URL}/kelas/${editingKelas.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ nama: namaKelas }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengupdate kelas");
      }
      
      toast.success("Kelas berhasil diupdate!");
      await getKelas(); // Ambil data terbaru
      setEditingKelas(null);
      setNamaKelas("");
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  // Handler untuk menghapus kelas (menggunakan currying)
  const handleDeleteKelas = (id: number) => async () => {
    try {
      const response = await fetch(`${API_URL}/kelas/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menghapus kelas");
      }
      
      toast.success("Kelas berhasil dihapus!");
      await getKelas(); // Ambil data terbaru
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };
  
  // Filter data berdasarkan pencarian di sisi client
  const filteredData = kelas.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64">Memuat data...</div>;
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-md shadow-sm">
      <h1 className="text-3xl font-bold">Data Kelas</h1>
      
      <div className="flex items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Input
            className="pl-10 max-w-md"
            placeholder="Cari kelas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Page Size Select (UI Only) */}
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Add Kelas Modal */}
          <ModalForm
            title="Tambah Kelas Baru"
            description="Tambahkan data kelas baru ke dalam sistem."
            trigger={
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Kelas
              </Button>
            }
            onSubmit={handleAddKelas}
          >
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="namaKelasBaru">Nama Kelas</Label>
                <Input
                  id="namaKelasBaru"
                  value={namaKelas}
                  onChange={(e) => setNamaKelas(e.target.value)}
                  placeholder="Contoh: XII RPL A"
                  className="w-full"
                  autoFocus
                />
              </div>
            </div>
          </ModalForm>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-medium">NO</TableHead>
              <TableHead className="font-medium">NAMA KELAS</TableHead>
              <TableHead className="text-center font-medium">AKSI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      {/* Edit Kelas Modal */}
                      <ModalForm
                        title="Edit Kelas"
                        description="Edit data kelas yang sudah ada."
                        trigger={
                          <Button 
                            variant="outline"
                            size="sm"
                            className="text-yellow-600 border-yellow-600 hover:bg-yellow-50 hover:text-yellow-700"
                            onClick={() => {
                              setEditingKelas(item);
                              setNamaKelas(item.nama);
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                          </Button>
                        }
                        onSubmit={handleUpdateKelas}
                      >
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="namaKelasEdit">Nama Kelas</Label>
                            <Input
                              id="namaKelasEdit"
                              value={namaKelas}
                              onChange={(e) => setNamaKelas(e.target.value)}
                              placeholder="Masukkan nama kelas"
                              className="w-full"
                            />
                          </div>
                        </div>
                      </ModalForm>
                      
                      {/* Delete Kelas Dialog */}
                      <AlertDeleteDialog
                        onConfirm={handleDeleteKelas(item.id)}
                        trigger={<Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Hapus
                        </Button>} title={""} description={""}                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center h-24">
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}