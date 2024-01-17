"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SiNextdotjs } from "react-icons/si";

export default function Nav() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

 

  return (
    <Navbar fluid rounded className="bg-zinc-100 py-5">
      <Navbar.Brand className="cursor-pointer" as={Link} href="#">
        <SiNextdotjs size={20} />

        <span className="mx-2 self-center whitespace-nowrap text-xl font-semibold dark:text-white font-serif">
          NextJs
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link className="cursor-pointer" href="/">
          Home
        </Navbar.Link>
        <Navbar.Link className="cursor-pointer">Profile</Navbar.Link>
          <Navbar.Link className="cursor-pointer" onClick={logout}>
            Logout
          </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
