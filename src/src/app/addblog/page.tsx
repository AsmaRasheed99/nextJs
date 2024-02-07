"use client";

import axios from "axios";
import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AddBlog() {
    const [title , setTitle] = useState("")
    const [content, setContent] = useState("")
    const user = useParams()
   
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      try {
        const blog = await axios.post('/api/blogs/addblog', {title, content, userId: user.id})
        console.log(blog.data)
      } catch (error: any) {
        console.error(error.message)
      }
    }
 
    
 
  return (
    <>
    
         <form onSubmit={handleSubmit} >
            <input placeholder="To Do" className="p-2 lg:rounded-l-lg border border-black" onChange={(e)=>{setTitle(e.target.value)}}/>
            <input placeholder="Details " className="p-2 border border-black " onChange={(e)=>{setContent(e.target.value)}}/>
            <button type="submit" className="p-2 bg-green-400 hover:bg-green-500 lg:rounded-r-lg font-bold border border-black">Submit</button>
         </form>

    </>
  );
}
