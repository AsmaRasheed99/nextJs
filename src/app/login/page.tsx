"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from 'sweetalert2'

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled]= React.useState(false);
  const [loading, setLoading]= React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
     const response = await axios.post("/api/users/login", user);
      // console.log("Login successful", response.data)
      const res = await axios.get('/api/users/user')
      router.push(`/profile/${res.data.data._id}`)
      } catch (error: any) {
      // console.log("login error : ", error.response.data.error);
      Swal.fire(`${error.response.data.error}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  },[user])
  return (
    <div id="container" className="flex flex-col items-center justify-center min-h-screen ">
      <div className=" flex flex-col items-center justify-center p-10 rounded-lg shadow-lg shadow-stone-500 bg-zinc-100 ">
      <h1 className="text-3xl mb-5 font-bold">{loading ? (
            <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-10 h-10 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  className="animate-ping"
                >
                </svg>
              </div>
            </div>
          ) : "Login" }</h1>
      <input
        className="p-2 m-4  bg-white rounded-lg"
        id="username"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      ></input>
      <input
        className="p-2 m-4 bg-white rounded-lg"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      ></input>
      
      {buttonDisabled ? (
          <button className="p-2 m-2 w-28 bg-gray-400 text-white  rounded-lg focus:outline-none focus:border-gray-600">
            Login
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="p-2 m-2 w-28  bg-green-500 text-white  rounded-lg focus:outline-none focus:border-gray-600 hover:scale-105"
          >
            Login
          </button>
        )}

      <span className="text-sm">
          <Link className="text-blue-500" href="/forgotpassword">
            Forgot Password 
          </Link>
        </span>
      <span className="text-sm">
          Do not have an account?{" "}
          <Link className="text-blue-500" href="/signup">
            Sign Up
          </Link>
        </span>
    </div>
    </div>
  );
}
