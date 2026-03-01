import Image from "next/image";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { CiBookmark } from "react-icons/ci";
import { GoVerified } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";

const Post = ({ post }: any) => {
  return (
    <main className="bg-black shadow-2xl pt-6 border-b border-b-zinc-400 h-full w-full md:w-2/3  px-2 md:px-8 relative pb-4">
      <div className="flex gap-3 relative items-center">

        <div className="size-12 flex items-center justify-center bg-white p-0.5 rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600">
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <Image
              src={post.user.profilePicture || "https://images.unsplash.com/photo-1702478553542-3aa3c0148543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"}
              alt="abc"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm p-0 m-0">
          <h2 className="flex items-center gap-1 py-2 font-bold">
            {post.user.fullName}{" "}
            <span className="text-xs text-blue-700 font-bold">
              <GoVerified />
            </span>
          </h2>
          <p className="text-xs text-zinc-200">9h</p>
        </div>

        <span className="absolute right-3"><BsThreeDots /></span>

      </div>
      <div className="relative h-86 my-4 w-full">
        <Image
          src={post.media[0].url || "https://images.unsplash.com/photo-1772223610205-0a8f53d83b42?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"}
          alt="abc"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex gap-4 p-2">
        <span className="text-xl">
          <FaRegHeart />
        </span>
        <span className="text-xl">
          <FaRegComment />
        </span>
        <span className="text-xl">
          <PiShareFatLight />
        </span>
        <span className="text-xl absolute right-8">
          <CiBookmark />
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm p-0 m-0">
        <h2 className="flex items-center gap-1 py-2">
          {post.user.fullName}{" "}
          <span className="text-xs text-blue-700 font-bold">
            <GoVerified />
          </span>
        </h2>
        <p className="text-xs text-zinc-200">{post.caption}</p>
      </div>
    </main>
  );
};

export default Post;
