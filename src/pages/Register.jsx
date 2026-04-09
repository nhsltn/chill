/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/cards/AuthCard";
import InputField from "../components/ui/InputField";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/redux/authSlice";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    dispatch(registerUser({ username, password, navigate }));
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
