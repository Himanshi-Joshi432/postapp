"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Page = () => {
  const [posts, setposts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/posts")
      .then((res) => {
        setposts(res.data.posts)
        
      })
      .catch((err) => {
        console.error("Error fetching posts:", err)
      })
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Posts</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
     
      {posts.map((post) => (
        <div
          key={post._id}
          className="w-full max-w-sm bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300"
        >

          {/* Image */}
          <div className="overflow-hidden rounded-t-3xl">
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-96 object-cover hover:scale-105 transition duration-300"
            />
          </div>

          {/* Content */}
          <div className="p-4">

            {/* Actions */}
            <div className="flex justify-between items-center mb-2 text-xl">
              <div className="flex gap-3">
                ❤️ 💬 📤
              </div>

              <button
                className="text-sm text-red-500 hover:underline"
                onClick={() => {
                  axios.delete(`http://localhost:5000/delete-posts/${post._id}`)
                    .then(() => {
                      // ✅ SAFE STATE UPDATE
                      setposts(prev => prev.filter(p => p._id !== post._id))
                    })
                }}
              >
                Delete
              </button>
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

export default Page