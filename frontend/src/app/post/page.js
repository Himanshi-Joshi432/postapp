"use client"

import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
    

const page = () => {
  const router = useRouter()
    const [posts,setposts] = useState([
    {
        _id:"1",
        image:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        caption:"This is my first post"
    },
    {
        _id:"2",
        image:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        caption:"This is my second post"
    }
])
 const handleSubmit = (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    axios.post("http://localhost:5000/create-post",formData)
    .then((res)=>{
        setposts([...posts,res.data.post])
        router.push("/")
    })
 }

useEffect(()=>{
   axios.get("http://localhost:5000/posts")
    .then((res)=>{
        setposts(res.data.posts)
    })
},[])
  return ( 
 <div className="min-h-screen bg-gray-50 py-10 px-4">

  {/* 🔹 Create Post Section */}
  <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-md p-6 mb-10">
    <h1 className="text-2xl font-semibold text-gray-800 mb-4">
      Create Post
    </h1>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      
      {/* Image Upload */}
      <input
        type="file"
        name="image"
        accept="image/*"
        className="border text-black border-gray-200 rounded-xl p-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />

      {/* Caption */}
      <textarea
        name="caption"
        placeholder="Write a caption..."
        rows={4}
        className="border text-black border-gray-200 rounded-xl p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
      ></textarea>

      {/* Button */}
      <button
        type="submit"
        className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-xl font-medium hover:opacity-90 transition"
      >
        Share
      </button>
    </form>
  </div>

  {/* 🔹 Posts Feed */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
    {posts.map((post) => (
      <div
        key={post._id}
        className="w-full max-w-sm shadow-md bg-white rounded-3xl shadow hover:shadow-xl transition duration-300"
      >
        
        {/* Image */}
        <div className="overflow-hidden rounded-t-3xl">
          <img
            src={post.image}
            alt={post.caption}
            className="w-full h-96 object-cover hover:scale-105 transition duration-300 border-3 border-gray-500"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          
          {/* Actions (Instagram style) */}
          <div className="flex justify-between items-center mb-2 text-xl">
            <div className="flex gap-3">
              ❤️ 💬 📤
            </div>
            <div>
                <button className="text-md text-red-500 hover:underline" onClick={()=>{
                    axios.delete(`http://localhost:5000/delete-posts/${post._id}`)
                    .then((res)=>{
                        setposts(posts.filter(p=>p._id!==post._id))
                    })
                }}>Delete</button>
            </div>
          </div>

          {/* Caption */}
          <p className="text-gray-800 text-md leading-relaxed">
            {post.caption}
          </p>

        </div>
      </div>
    ))}
  </div>

</div>
  )
}

export default page