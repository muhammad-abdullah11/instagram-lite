"use client"
import React, { useState, useEffect } from 'react'
import Post from './Post'
import axios from 'axios';
import DemoPoats from "@/public/demiPostsData.json"



const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("")
  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      setPosts(res.data.posts)
    } catch (error: any) {
      setPosts(DemoPoats)
      setError(error.message)
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [])
  return (
    <main className='border-t py-4 my-4 flex flex-col items-center justify-center'>
      <div>
        <p>{error}</p>
      </div>

      {posts?.map((post: any) => (
        <Post key={post._id} post={post} />
      ))}

    </main>
  )
}

export default Posts