import React from "react";
import AuthCard from "../components/cards/AuthCard";
import InputField from "../components/ui/InputField";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="bg-(image:--bg-login) bg-center bg-cover h-screen flex items-center justify-center">
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
        <div className="flex justify-between w-full text-[10px] xl:text-base text-text-light-secondary -mt-4 xl:-mt-7">
          <p>
            Belum punya akun?{" "}
            <Link to="/register" className="text-text-light-primary">
              Daftar
            </Link>
          </p>
          <Link to="/forgot-password" className="text-text-light-primary">
            Lupa kata sandi?
          </Link>
        </div>
      </AuthCard>
    </div>
  );
}

export default Login;
