import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
userId:{
    type:String,
    required: true,
},
title : {
    type:String,
    required:[true, "Please provide a title"],
}, 
content : {
    type:String,
    required:[true, "Please provide content"],
},
// author:{
//     type:String,
//     required:[true, "Please provide an author"]
// },
createdAt:{
    type:Date
}})

const Blog = mongoose.models.blogs || mongoose.model("blogs" , blogSchema);
export default Blog;