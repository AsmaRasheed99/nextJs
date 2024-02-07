import {connect} from '@/dbConfig/dbConfig'
import Blog from '@/models/blogModel';
import { NextRequest , NextResponse} from 'next/server'

connect()

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json();
       const id = reqBody.userId
        const userBlogs = await Blog.find({userId: id}) 
        return NextResponse.json(userBlogs)
    } catch (error: any) {
        throw new Error(error.message)
    }
}