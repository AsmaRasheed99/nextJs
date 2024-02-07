"use client";
import AddBlog from "@/app/addblog/page";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {FiCheckCircle, FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

interface Blog {
  _id: number;
  title: string;
  content: string;
}

export default function UserProfile() {
  const params = useParams();
  const userId = params.id;
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")

  const getUserBlogs = async () => {
    try {
      const blogs = await axios.post("/api/blogs/getblog", { userId });
      setUserBlogs(blogs.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const DeleteBlog = async (blogId: number, e: MouseEvent) => {
    e.preventDefault();
    const deleteBlog = await axios.post("/api/blogs/deleteblog", { blogId });
    Swal.fire(`${deleteBlog.data.message}`);
  };
  const EditBlog = async (blogId: number, blog:Blog ,e: MouseEvent)=>{
    e.preventDefault();
    try {
      const editedTitle = newTitle.trim() !== "" ? newTitle : blog.title;
      const editedContent = newContent.trim() !== "" ? newContent : blog.content;
      const edit = await axios.put(`/api/blogs/editblog`, { blogId, editedTitle , editedContent});
      Swal.fire(`${edit.data.message}`);
      setEditingBlogId(null)
    } catch (error: any) {
      console.log(error.message
        )
    }
  }

  useEffect(() => {
    getUserBlogs();
  }, [DeleteBlog , EditBlog]);

  return (
    <div
      id="container"
      className="flex flex-col items-center justify-center min-h-screen "
    >
      <AddBlog />
   
      <div className="gap-5 justify-center m-10">
      {userBlogs.map((blog) => (
          <div key={blog._id} className="flex flex-wrap justify-between items-center border p-5 lg:w-[30rem] md:w-60 sm:w-36">
            {editingBlogId === blog._id ? (
              <div className="flex flex-wrap lg:gap-5 md:gap-5 items-center sm:my-4">
                <input className="w-20 h-10" type="text" onChange={(e)=>{setNewTitle(e.target.value)}} placeholder={`${blog.title}`} />
                <textarea className="w-32 h-10" onChange={(e)=>{setNewContent(e.target.value)}}  placeholder={`${blog.content}`}></textarea>
                <span><FiCheckCircle color="green" className="cursor-pointer hover:scale-110" onClick={(e: MouseEvent)=> {EditBlog(blog._id, blog, e)}}/><p className="text-sm">Save</p></span>
              </div>
            ) : (
              <>
                <h2 className="font-bold">{blog.title}</h2>
                <div>{blog.content}</div>
              </>
            )}

            <div className="flex flex-wrap gap-2 ">
              <FiEdit
                className="cursor-pointer"
                color="green"
                onClick={() => setEditingBlogId(blog._id)}
              />
              <RiDeleteBin6Line
                className="cursor-pointer"
                color="red"
                onClick={(e : MouseEvent) => DeleteBlog(blog._id, e)}
              />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
