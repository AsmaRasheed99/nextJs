import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { blogId, editedTitle, editedContent } = reqBody;

    const editBlog = await Blog.findByIdAndUpdate(blogId, {
      title: editedTitle,
      content: editedContent,
    });
    return NextResponse.json({message : "successfully updated"} ,{status:200} )

  } catch (error: any) {
    throw new Error(error.message);
  }
}
 
