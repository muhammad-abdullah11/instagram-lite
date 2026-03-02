"use client"
import React, { useState, useEffect } from "react"
import Post from "./Post"
import axios from "axios"
import DummyPosts from "@/public/dummyPostsData.json"

interface PostType {
  _id: string
  [key: string]: any
}

const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  const fetchPosts = async () => {
    try {
      const res = await axios.get<{ posts: PostType[] }>("/api/posts")
      setPosts(res.data.posts)
    } catch (err) {
      setPosts(DummyPosts as PostType[])
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <main className="border-t py-4 my-4 flex flex-col items-center justify-center">
      {error && <p>{error}</p>}

      {loading ? (
        <>
          <SkeletonLoading />
          <SkeletonLoading />
        </>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </main>
  )
}

export default Posts

const SkeletonLoading = () => {
  return (
    <div className="bg-black shadow-2xl pt-6 border-b border-b-zinc-400 h-full w-full md:w-2/3 px-2 md:px-8 relative pb-4 animate-pulse">
      <div className="flex gap-3 relative items-center">
        <div className="size-12 rounded-full bg-zinc-700" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-32 bg-zinc-700 rounded" />
          <div className="h-2 w-16 bg-zinc-600 rounded" />
        </div>
        <div className="absolute right-3 h-4 w-4 bg-zinc-700 rounded" />
      </div>

      <div className="h-80 my-4 w-full bg-zinc-700 rounded-lg" />

      <div className="flex gap-4 p-2 items-center">
        <div className="h-6 w-6 bg-zinc-700 rounded-full" />
        <div className="h-6 w-6 bg-zinc-700 rounded-full" />
        <div className="h-6 w-6 bg-zinc-700 rounded-full" />
        <div className="h-6 w-6 bg-zinc-700 rounded-full absolute right-8" />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <div className="h-3 w-40 bg-zinc-700 rounded" />
        <div className="h-3 w-full bg-zinc-700 rounded" />
        <div className="h-3 w-3/4 bg-zinc-700 rounded" />
      </div>
    </div>
  )
}