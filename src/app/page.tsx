"use client";
import axios from "axios";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";

interface Blog {
  _id: number;
  title: string;
  content: string;
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const GetAllBlogs = async () => {
    try {
      const blogs = await axios.get("/api/blogs/getblogs");
      setBlogs(blogs.data.getAll);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    GetAllBlogs();
  }, []);

  return (
    <main className="w-screen h-screen bg-[#d1c8d9]">
      <div
        className="flex justify-center h-[60%] relative"
        style={{
          background:
            'url("https://images.pexels.com/photos/1011100/pexels-photo-1011100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "scroll",
        }}
      >
        <div className="absolute justify-center items-center flex   w-96 h-60 bg-white opacity-30 top-40 rounded-xl">
          <p className="text-xl font-bold">Keep your day scheduled with us</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 m-10">
        {blogs.map((blog) => (
          <Card key={blog._id} className="w-96">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {blog.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {blog.content}
            </p>
          </Card>
        ))}
      </div>
    </main>
  );
}
