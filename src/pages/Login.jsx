import React from "react";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="bg-[image:var(--bg-login)] bg-cover h-screen flex items-center justify-center">
      <AuthCard
        title="Masuk"
        subtitle="Selamat datang kembali!"
        submitLabel="Masuk"
        onSubmit={() => navigate("/")}
      >
        <InputField label="Username" placeholder="Masukkan username" />
        <InputField
          label="Kata Sandi"
          type="password"
          placeholder="Masukkan kata sandi"
        />
        <div className="flex justify-between w-full body-medium-regular text-text-light-secondary -mt-7">
          <p>
            Belum punya akun?{" "}
            <a href="/register" className="text-text-light-primary">
              Daftar
            </a>
          </p>
          <a href="#" className="text-text-light-primary">
            Lupa kata sandi?
          </a>
        </div>
      </AuthCard>
    </div>
  );
}

export default Login;
