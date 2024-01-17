import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { NextRequest , NextResponse } from "next/server";

connect()

export async function GET(){
try {
   const getAll = await Blog.find()
   return NextResponse.json({getAll})
} catch (error : any) {
    return NextResponse.json({"error": error.message})
}

}