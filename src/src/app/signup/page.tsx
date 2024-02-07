"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignUpPage() {
  const router = useRouter();

  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", userData);
      console.log("signup successful", response.data);
      router.push("/login");
      
    } catch (error: any) {
      Swal.fire(`${error.response.data.error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      userData.email.length > 0 &&
      userData.password.length > 0 &&
      userData.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [userData]);
   
  return (
    <div id="container" className="flex flex-col items-center justify-center min-h-screen ">

      <div className=" flex flex-col items-center justify-center p-10 rounded-lg shadow-lg shadow-stone-500 bg-zinc-100 ">
        <h1 className="text-3xl mb-5 font-bold">
          {loading ? (
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
          ) : (
            "Sign Up"
          )}
        </h1>
        <input
          className="p-2 m-4  bg-white rounded-lg"
          id="username"
          type="text"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          placeholder="username"
        ></input>
        <input
          className="p-2 m-4  bg-white rounded-lg"
          id="username"
          type="text"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="email"
        ></input>
        <input
          className="p-2 m-4  bg-white rounded-lg"
          id="username"
          type="password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          placeholder="password"
        ></input>
        {buttonDisabled ? (
          <button className="p-2 m-2 w-28 bg-gray-400 text-white  rounded-lg focus:outline-none focus:border-gray-600">
            Signup
          </button>
        ) : (
          <button
            onClick={onSignup}
            className="p-2 m-2 w-28  bg-green-500 text-white  rounded-lg focus:outline-none focus:border-gray-600 hover:scale-105"
          >
            Signup
          </button>
        )}
      <span className="text-sm">
          Already have an account?{" "}
          <Link className="text-blue-500" href="/login">
            Sign In
          </Link>
        </span>
    </div>
    </div>
  );
}
