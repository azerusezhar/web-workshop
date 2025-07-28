<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Siswa;

class SiswaFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nis = $this->faker->unique()->numerify('####-####-####');
        $nama = $this->faker->name();
        $jenis_kelamin = $this->faker->randomElement(['L', 'P']);
        $kelas_id = $this->faker->numberBetween(1, 30);
        $tanggal_lahir = $this->faker->dateTimeBetween('-25 years', '-10 years')->format('Y-m-d');
        $alamat = $this->faker->address();

        return [
            'nis' => $nis,
            'nama' => $nama,
            'jenis_kelamin' => $jenis_kelamin,
            'kelas_id' => $kelas_id,
            'tanggal_lahir' => $tanggal_lahir,
            'alamat' => $alamat,
        ];
    }
}