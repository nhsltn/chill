import React from "react";
import AuthCard from "../components/AuthCard";
import InputField from "../components/ui/InputField";
function Register() {
  return (
    <div className="bg-(image:--bg-register) bg-cover bg-bottom h-screen flex items-center justify-center">
      <AuthCard title="Daftar" subtitle="Selamat datang" submitLabel="Daftar">
        <InputField label="Username" placeholder="Masukkan username" />
        <InputField
          label="Kata Sandi"
          type="password"
          placeholder="Masukkan kata sandi"
        />
        <InputField
          label="Konfirmasi Kata Sandi"
          type="password"
          placeholder="Masukkan kata sandi"
        />
        <div className="flex justify-between w-full text-[10px] xl:text-base text-text-light-secondary -mt-4 xl:-mt-7">
          <p>
            Sudah punya akun?{" "}
            <a href="/login" className="text-text-light-primary">
              Masuk
            </a>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}

export default Register;
