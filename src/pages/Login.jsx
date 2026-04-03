import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../components/cards/AuthCard";
import InputField from "../components/ui/InputField";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Semua field harus diisi!");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = existingUsers.find(
      (user) => user.username === username && user.password === password,
    );
    if (!foundUser) {
      toast.error("Username atau password salah!");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: foundUser.id,
        username: foundUser.username,
      }),
    );
    setUsername("");
    setPassword("");
    navigate("/");
    toast.success(`Selamat datang, ${foundUser.username}!`);
  };

  return (
    <div className="bg-(image:--bg-login) bg-center bg-cover h-screen flex items-center justify-center">
      <AuthCard
        title="Masuk"
        subtitle="Selamat datang kembali!"
        submitLabel="Masuk"
        onSubmit={handleLogin}
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
