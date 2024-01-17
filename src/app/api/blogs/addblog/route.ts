import Blog from "@/models/blogModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
    const blogData = await request.json();
    const {title, content, userId } = blogData;
    const blog = await new Blog({ userId, title, content });
    const savedBlog = await blog.save();

    return NextResponse.json(
      { message: "Blog successfully created", success: true, Blog: savedBlog },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { "Can't Create Blog": error.message },
      { status: 400 }
    );
  }
}
