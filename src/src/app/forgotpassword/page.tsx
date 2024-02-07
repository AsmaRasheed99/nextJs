"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


export default function ForgotPassword() {
    const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [passwordInput, setPasswordInput] = useState(false);

  const requestForgotPassword = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/forgotpassword", { email });
      if (res.data.message === "Reset Link has been Sent") {
        Swal.fire(`${res.data.message}`);
      }
    } catch (error: any) {
      Swal.fire(`${error.response.data.error}`);
    }
  };

  const resetPassword = async (e: any) => {
    e.preventDefault();
    console.log(token)
    console.log(newPassword)
    try {
      const update = await axios.post("/api/users/resetpassword", {
        token,
        newPassword,
      });
      if (update.data.message === "Password Updated Successfully") {
        Swal.fire(`${update.data.message}`);
        router.push('/login')
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (window.location.search !== "") {
      setPasswordInput(true);
    } else {
      setPasswordInput(false);
    }
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div
      id="container"
      className="flex flex-col items-center justify-center min-h-screen"
    >
      {passwordInput ? (
        <form className="lg:p-20 rounded-lg bg-zinc-200 shadow-lg" onSubmit={resetPassword}>
          <input
            type="password"
            placeholder="Enter Your New Password"
            className="p-2 rounded-lg"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="m-5 p-2 rounded-lg bg-purple-950 hover:bg-[#d1c8d9] hover:text-purple-950 text-white"
          >
            Submit
          </button>
        </form>
      ) : (
        <form className="lg:p-20 rounded-lg bg-zinc-200 shadow-lg"  onSubmit={requestForgotPassword}>
          <input
            placeholder="Enter your email"
            className="p-2 rounded-lg"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button
            type="submit"
            className="m-5 p-2 rounded-lg bg-purple-950 hover:bg-[#d1c8d9] hover:text-purple-950 text-white"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
