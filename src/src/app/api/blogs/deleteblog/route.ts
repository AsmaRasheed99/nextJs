import {connect} from '@/dbConfig/dbConfig'
import Blog from '@/models/blogModel'
import { NextResponse,NextRequest } from 'next/server'

connect()

export async function POST(request : NextRequest){
    try {
     const reqId = await request.json()
     const BlogId = reqId.blogId;
     
     const deleteBlog = await Blog.findByIdAndDelete({_id:BlogId})
     return NextResponse.json({message : "successfully deleted"} ,{status:200} )
    } catch (error: any) {
        throw new Error("Can't Delete blog",error.message)
    }
}