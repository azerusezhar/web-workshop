"use client";

import { useState, useEffect } from "react";
import { fetchData } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { ModalForm } from "@/components/ui/modal-form";
import { AlertDeleteDialog } from "@/components/ui/alert-delete-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";

interface Siswa {
  id: number;
  nama: string;
  nis: string;
  kelas_id: number;
  kelas_nama: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  alamat: string;
}

interface Kelas {
  id: number;
  nama: string;
}

export default function SiswaPage() {
  const [siswa, setSiswa] = useState<Siswa[]>([]);
  const [kelas, setKelas] = useState<Kelas[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    nama: "",
    nis: "",
    kelas_id: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    alamat: "",
  });
  const [editingSiswa, setEditingSiswa] = useState<Siswa | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchDataSiswa = async () => {
      try {
        setLoading(true);
        // Di implementasi nyata kita akan fetch data dari API
        // const dataSiswa = await fetchData("siswa");
        // const dataKelas = await fetchData("kelas");
        
        // Data dummy untuk demonstrasi
        const dummyKelas = [
          { id: 1, nama: "Kelas 10A" },
          { id: 2, nama: "Kelas 10B" },
          { id: 3, nama: "Kelas 11A" },
          { id: 4, nama: "Kelas 11B" },
          { id: 5, nama: "Kelas 12A" },
          { id: 6, nama: "Kelas 12B" },
        ];
        
        const dummySiswa = [
          { 
            id: 1, 
            nama: "Ahmad Rifai", 
            nis: "2021001", 
            kelas_id: 1, 
            kelas_nama: "Kelas 10A",
            jenis_kelamin: "Laki-laki", 
            tanggal_lahir: "2005-05-15", 
            alamat: "Jl. Merdeka No. 123" 
          },
          { 
            id: 2, 
            nama: "Siti Nuraini", 
            nis: "2021002", 
            kelas_id: 1,
            kelas_nama: "Kelas 10A",
            jenis_kelamin: "Perempuan", 
            tanggal_lahir: "2005-08-20", 
            alamat: "Jl. Sudirman No. 45" 
          },
          { 
            id: 3, 
            nama: "Budi Santoso", 
            nis: "2021003", 
            kelas_id: 2,
            kelas_nama: "Kelas 10B",
            jenis_kelamin: "Laki-laki", 
            tanggal_lahir: "2005-03-10", 
            alamat: "Jl. Pahlawan No. 78" 
          },
          { 
            id: 4, 
            nama: "Dian Puspita", 
            nis: "2021004", 
            kelas_id: 3,
            kelas_nama: "Kelas 11A",
            jenis_kelamin: "Perempuan", 
            tanggal_lahir: "2004-11-25", 
            alamat: "Jl. Gatot Subroto No. 12" 
          },
          { 
            id: 5, 
            nama: "Eko Prasetyo", 
            nis: "2021005", 
            kelas_id: 4,
            kelas_nama: "Kelas 11B",
            jenis_kelamin: "Laki-laki", 
            tanggal_lahir: "2004-07-30", 
            alamat: "Jl. Diponegoro No. 56" 
          },
        ];
        
        setSiswa(dummySiswa);
        setKelas(dummyKelas);
      } catch (error) {
        toast.error("Gagal memuat data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataSiswa();
  }, []);

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // CRUD handlers
  const handleAddSiswa = async () => {
    try {
      // Di implementasi nyata kita akan kirim data ke API
      // await fetchData("siswa", {
      //   method: "POST",
      //   body: JSON.stringify(formData),
      // });
      
      // Untuk demo kita hanya update state
      const kelasSelected = kelas.find(k => k.id === parseInt(formData.kelas_id));
      
      const newSiswa: Siswa = {
        id: siswa.length + 1,
        nama: formData.nama,
        nis: formData.nis,
        kelas_id: parseInt(formData.kelas_id),
        kelas_nama: kelasSelected?.nama || "",
        jenis_kelamin: formData.jenis_kelamin,
        tanggal_lahir: formData.tanggal_lahir,
        alamat: formData.alamat,
      };
      
      setSiswa([...siswa, newSiswa]);
      
      // Reset form
      setFormData({
        nama: "",
        nis: "",
        kelas_id: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        alamat: "",
      });
      
    } catch (error) {
      throw new Error("Gagal menambahkan siswa");
    }
  };

  const handleUpdateSiswa = async () => {
    if (!editingSiswa) return;
    
    try {
      // Di implementasi nyata kita akan kirim data ke API
      // await fetchData(`siswa/${editingSiswa.id}`, {
      //   method: "PUT",
      //   body: JSON.stringify(formData),
      // });
      
      // Untuk demo kita hanya update state
      const kelasSelected = kelas.find(k => k.id === parseInt(formData.kelas_id));
      
      const updatedSiswa = siswa.map((s) =>
        s.id === editingSiswa.id
          ? {
              ...s,
              nama: formData.nama,
              nis: formData.nis,
              kelas_id: parseInt(formData.kelas_id),
              kelas_nama: kelasSelected?.nama || "",
              jenis_kelamin: formData.jenis_kelamin,
              tanggal_lahir: formData.tanggal_lahir,
              alamat: formData.alamat,
            }
          : s
      );
      
      setSiswa(updatedSiswa);
      setEditingSiswa(null);
      
      // Reset form
      setFormData({
        nama: "",
        nis: "",
        kelas_id: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        alamat: "",
      });
      
    } catch (error) {
      throw new Error("Gagal mengupdate siswa");
    }
  };

  const handleDeleteSiswa = (id: number) => async () => {
    try {
      // Di implementasi nyata kita akan kirim request ke API
      // await fetchData(`siswa/${id}`, {
      //   method: "DELETE",
      // });
      
      // Untuk demo kita hanya update state
      setSiswa(siswa.filter((s) => s.id !== id));
    } catch (error) {
      throw new Error("Gagal menghapus siswa");
    }
  };

  // Table columns definition
  const columns: ColumnDef<Siswa>[] = [
    {
      accessorKey: "nis",
      header: "NIS",
    },
    {
      accessorKey: "nama",
      header: "Nama",
    },
    {
      accessorKey: "kelas_nama",
      header: "Kelas",
    },
    {
      accessorKey: "jenis_kelamin",
      header: "Jenis Kelamin",
    },
    {
      accessorKey: "tanggal_lahir",
      header: "Tanggal Lahir",
    },
    {
      accessorKey: "alamat",
      header: "Alamat",
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">{row.original.alamat}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const siswaData = row.original;
        
        return (
          <div className="flex items-center gap-2">
            <ModalForm
              title="Edit Siswa"
              description="Edit data siswa yang sudah ada."
              trigger={
                <Button size="icon" variant="ghost">
                  <Pencil className="h-4 w-4" />
                </Button>
              }
              onSubmit={handleUpdateSiswa}
              isEdit
            >
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nama">Nama Siswa</Label>
                  <Input
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama siswa"
                    className="w-full"
                    onClick={() => {
                      if (!editingSiswa || editingSiswa.id !== siswaData.id) {
                        setEditingSiswa(siswaData);
                        setFormData({
                          nama: siswaData.nama,
                          nis: siswaData.nis,
                          kelas_id: siswaData.kelas_id.toString(),
                          jenis_kelamin: siswaData.jenis_kelamin,
                          tanggal_lahir: siswaData.tanggal_lahir,
                          alamat: siswaData.alamat,
                        });
                      }
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nis">NIS</Label>
                  <Input
                    id="nis"
                    name="nis"
                    value={formData.nis}
                    onChange={handleInputChange}
                    placeholder="Masukkan NIS"
                    className="w-full"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="kelas_id">Kelas</Label>
                  <Select
                    value={formData.kelas_id}
                    onValueChange={(value) => handleSelectChange("kelas_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      {kelas.map((k) => (
                        <SelectItem key={k.id} value={k.id.toString()}>
                          {k.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Jenis Kelamin</Label>
                  <RadioGroup
                    value={formData.jenis_kelamin}
                    onValueChange={(value) => handleSelectChange("jenis_kelamin", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Laki-laki" id="laki" />
                      <Label htmlFor="laki">Laki-laki</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Perempuan" id="perempuan" />
                      <Label htmlFor="perempuan">Perempuan</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                  <Input
                    id="tanggal_lahir"
                    name="tanggal_lahir"
                    type="date"
                    value={formData.tanggal_lahir}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="alamat">Alamat</Label>
                  <Input
                    id="alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                    placeholder="Masukkan alamat"
                    className="w-full"
                  />
                </div>
              </div>
            </ModalForm>

            <AlertDeleteDialog
              title="Hapus Siswa"
              description="Apakah Anda yakin ingin menghapus data siswa ini? Tindakan ini tidak dapat dibatalkan."
              onConfirm={handleDeleteSiswa(siswaData.id)}
              trigger={
                <Button size="icon" variant="ghost">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              }
            />
          </div>
        );
      },
    },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Siswa</h1>
          <p className="text-muted-foreground">
            Manajemen data siswa untuk sekolah.
          </p>
        </div>

        <ModalForm
          title="Tambah Siswa Baru"
          description="Tambahkan data siswa baru ke dalam sistem."
          trigger={
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Siswa
            </Button>
          }
          onSubmit={handleAddSiswa}
        >
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="grid gap-2">
              <Label htmlFor="nama">Nama Siswa</Label>
              <Input
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                placeholder="Masukkan nama siswa"
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nis">NIS</Label>
              <Input
                id="nis"
                name="nis"
                value={formData.nis}
                onChange={handleInputChange}
                placeholder="Masukkan NIS"
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="kelas_id">Kelas</Label>
              <Select
                value={formData.kelas_id}
                onValueChange={(value) => handleSelectChange("kelas_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kelas" />
                </SelectTrigger>
                <SelectContent>
                  {kelas.map((k) => (
                    <SelectItem key={k.id} value={k.id.toString()}>
                      {k.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Jenis Kelamin</Label>
              <RadioGroup
                value={formData.jenis_kelamin}
                onValueChange={(value) => handleSelectChange("jenis_kelamin", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Laki-laki" id="laki-new" />
                  <Label htmlFor="laki-new">Laki-laki</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Perempuan" id="perempuan-new" />
                  <Label htmlFor="perempuan-new">Perempuan</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
              <Input
                id="tanggal_lahir"
                name="tanggal_lahir"
                type="date"
                value={formData.tanggal_lahir}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="alamat">Alamat</Label>
              <Input
                id="alamat"
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                placeholder="Masukkan alamat"
                className="w-full"
              />
            </div>
          </div>
        </ModalForm>
      </div>

      <DataTable columns={columns} data={siswa} searchKey="nama" />
    </div>
  );
} 