"use client";

import axios from "axios";
import { Alert } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div
      id="container"
      className="flex flex-col items-center justify-center min-h-screen "
    >
      <div className="lg:p-20 rounded-lg bg-zinc-200 shadow-lg">
        {/* <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2">{token ? `${token}` : "no token"}</h2> */}

        {verified && (
          <div>
            <Alert color="green" className="mb-5">Email Verified.</Alert>
            <Link
              href="/login"
              className="m-10 p-2 rounded-lg bg-purple-950 hover:bg-[#d1c8d9] hover:text-purple-950 text-white"
            >
              Login
            </Link>
          </div>
        )}
        {error && (
          <div>
            <Alert color="red">An error alert for showing message.</Alert>
          </div>
        )}
      </div>
    </div>
  );
}
