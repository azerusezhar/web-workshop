"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchData } from "@/lib/utils";
import { Users, School, Layers } from "lucide-react";
import { KelasChart } from "@/components/kelas-chart";
import { GenderChart } from "@/components/gender-chart";
import { SiswaChart } from "@/components/siswa-chart";

interface StatsData {
  totalSiswa: number;
  totalKelas: number;
  siswaByKelas: {
    kelas: string;
    jumlah: number;
  }[];
  siswaByGender: {
    gender: string;
    jumlah: number;
  }[];
  siswaByKelasGender: {
    kelas: string;
    laki: number;
    perempuan: number;
  }[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsData>({
    totalSiswa: 0,
    totalKelas: 0,
    siswaByKelas: [],
    siswaByGender: [],
    siswaByKelasGender: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Untuk demo kita akan menggunakan data statis
        // Di implementasi nyata, kita akan mengambil data dari API
        // const data = await fetchData("stats");
        
        // Data statis untuk demo
        const siswaByKelasData = [
          { kelas: "Kelas 10A", jumlah: 25 },
          { kelas: "Kelas 10B", jumlah: 30 },
          { kelas: "Kelas 11A", jumlah: 28 },
          { kelas: "Kelas 11B", jumlah: 27 },
          { kelas: "Kelas 12A", jumlah: 24 },
          { kelas: "Kelas 12B", jumlah: 22 },
        ];

        const siswaByGenderData = [
          { gender: "Laki-laki", jumlah: 78 },
          { gender: "Perempuan", jumlah: 78 },
        ];
        
        const siswaByKelasGenderData = [
          { kelas: "Kelas 10A", laki: 12, perempuan: 13 },
          { kelas: "Kelas 10B", laki: 15, perempuan: 15 },
          { kelas: "Kelas 11A", laki: 14, perempuan: 14 },
          { kelas: "Kelas 11B", laki: 12, perempuan: 15 },
          { kelas: "Kelas 12A", laki: 13, perempuan: 11 },
          { kelas: "Kelas 12B", laki: 12, perempuan: 10 },
        ];
        
        setStats({
          totalSiswa: 156,
          totalKelas: 6,
          siswaByKelas: siswaByKelasData,
          siswaByGender: siswaByGenderData,
          siswaByKelasGender: siswaByKelasGenderData
        });
        
      } catch (err) {
        setError("Gagal memuat data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Ringkasan informasi data siswa dan kelas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSiswa}</div>
            <p className="text-xs text-muted-foreground">
              Jumlah seluruh siswa
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kelas</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalKelas}</div>
            <p className="text-xs text-muted-foreground">
              Jumlah seluruh kelas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rata-rata Siswa per Kelas
            </CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(stats.totalSiswa / stats.totalKelas)}
            </div>
            <p className="text-xs text-muted-foreground">
              Rata-rata jumlah siswa per kelas
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Distribusi Siswa per Kelas</CardTitle>
            <CardDescription>
              Jumlah siswa untuk setiap kelas
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <KelasChart data={stats.siswaByKelas} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Jenis Kelamin</CardTitle>
            <CardDescription>
              Perbandingan siswa laki-laki dan perempuan
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <GenderChart data={stats.siswaByGender} />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Tren Jumlah Siswa</CardTitle>
            <CardDescription>
              Jumlah siswa per kelas berdasarkan jenis kelamin
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <SiswaChart data={stats.siswaByKelasGender} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
