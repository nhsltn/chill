import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthCard from "../components/cards/AuthCard";
import InputField from "../components/ui/InputField";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      toast.error("Semua field harus diisi!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Kata sandi tidak cocok!");
      return;
    }

    const newId =
      existingUsers.length > 0
        ? existingUsers[existingUsers.length - 1].id + 1
        : 1;

    const newUser = {
      id: newId,
      username,
      password,
    };

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    navigate("/login");
    toast.success("Pendaftaran berhasil! Silakan masuk.");
  };

  return (
    <div className="bg-(image:--bg-register) bg-cover bg-bottom h-screen flex items-center justify-center">
      <AuthCard
        title="Daftar"
        subtitle="Selamat datang"
        submitLabel="Daftar"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Username"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Kata Sandi"
          type="password"
          placeholder="Masukkan kata sandi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          label="Konfirmasi Kata Sandi"
          type="password"
          placeholder="Masukkan kata sandi"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="flex justify-between w-full text-[10px] xl:text-base text-text-light-secondary -mt-4 xl:-mt-7">
          <p>
            Sudah punya akun?{" "}
            <Link to="/login" className="text-text-light-primary">
              Masuk
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}

export default Register;
