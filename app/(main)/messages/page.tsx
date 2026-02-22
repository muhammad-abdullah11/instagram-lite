"use client"
import React, { useState } from "react";
import { FaRegEdit, FaSearch } from "react-icons/fa";
import { BiDownArrowAlt } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { TbMessageShare } from "react-icons/tb";
import { CiVideoOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { FaAudible, FaCircleInfo, FaImage } from "react-icons/fa6";



import Image from "next/image";
import { AiOutlineAudio } from "react-icons/ai";
import { LuImage } from "react-icons/lu";

const Messages = () => {

    const [currUser, setCurrUser] = useState<string | null>("")

  return(

      <main className="flex w-full min-h-screen gap-8">
    <section className="w-1/3">
      <AllUsers data={setCurrUser} />
    </section>
    <section className="w-2/3">
      <CurrUser data={currUser} />
    </section>
  </main>
)
};

export default Messages;



const AllUsers = ({data}:any) => {

type user ={
    img:string,
    name:string,
    lastMsg:string
}
const users: user[] = [
  {
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
    name: "Ali Khan",
    lastMsg: "Hey bro, are we meeting today?"
  },
  {
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
    name: "Sophia Williams",
    lastMsg: "That design looks amazing 🔥"
  },
  {
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    name: "Muhammad Abdullah",
    lastMsg: "Send me the project files when you're free."
  },
  {
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
    name: "Zara Noor",
    lastMsg: "Okay, I’ll call you later."
  },
  {
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600",
    name: "Noah",
    lastMsg: "👍"
  },
  {
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600",
    name: "Alexander The Great",
    lastMsg: "History repeats itself."
  },
  {
    img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600",
    name: "Emma Watson",
    lastMsg: "Can you review my latest post?"
  },
  {
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=600",
    name: "Liam Carter",
    lastMsg: "Let’s push the update tonight."
  },
  {
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600",
    name: "Jonathan Michael Peterson",
    lastMsg: "I just shared the document with you via email."
  }
];

  return (

    <main className="flex flex-col justify-center">

    <aside className="w-full flex flex-col">
      
      <section className="flex items-center justify-between mb-6">
        <h1 className="font-semibold text-lg flex items-center gap-1">
          00_Abdullah_here
          <BiDownArrowAlt className="text-xl" />
        </h1>
        <FaRegEdit className="text-xl cursor-pointer hover:text-gray-300 transition" />
      </section>

      <div className="flex items-center bg-[#1a1f24] rounded-xl px-4 py-2 mb-6">
        <CiSearch className="text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent flex-1 px-3 text-sm placeholder:text-gray-400 outline-none"
        />
      </div>

      <div className="bg-[#1a1f24] rounded-2xl p-4 flex flex-col items-center gap-4">
        <button className="self-start bg-[#262c33] hover:bg-[#2f363d] transition px-4 py-1.5 rounded-lg text-sm font-medium">
          Add Note
        </button>

        <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-white/20">
          <Image
            src="https://plus.unsplash.com/premium_photo-1739580360043-f2c498c1d861?w=600"
            alt="profile"
            fill
            className="object-cover"
          />
        </div>

        <div className="text-center">
          <h2 className="font-semibold">Abdullah</h2>
          <p className="text-sm text-gray-400">@00_Abdullah_here</p>
        </div>
      </div>

    </aside>

        <h2 className="py-2 font-bold text-xl">Messages</h2>
    <section className="flex flex-col gap-4">
        {users?.map((user,i)=>(
            <div key={i} className="bg-zinc-800 rounded-2xl flex items-center justify-baseline px-4 py-2 gap-4" 
             onClick={() =>data(user.name)}
            >
                    <div className="h-12 w-12 relative rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600">
                                <Image src={user.img} alt={user.name} fill className="object-cover rounded-full h-full w-full p-1"/>
                    </div>

                    <div>
                        <h2 className="font-bold">{user.name}</h2>
                        <p className="line-clamp-1 text-sm text-zinc-500">{user.lastMsg}</p>
                    </div>
            </div>
        ))}
    </section>
 </main>
  );
};


const CurrUser = ({data}:any) => {
    if(data=="") return <MsgDemo/>
  return(
    <main>
        <section className="border-b border-b-zinc-600 px-4 py-2 flex items-center justify-between">
            <div className="flex gap-3">
                <div className="h-12 w-12 relative rounded-full">
                    <Image src="https://images.unsplash.com/photo-1565194637906-8f45f3351a5d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhciUyMGNhcnRvb258ZW58MHx8MHx8fDA%3D" alt="abc" fill className="rounded-full object-cover w-full h-full"/>
                </div>
                <div>
                    <h2 className="font-bold text-lg">{data}</h2>
                    <h2 className="text-sm text-zinc-300">00_abdullah_here</h2>
                </div>
            </div>
            <div className="flex gap-3">
                <CiVideoOn size={22}/>
                <IoCallOutline size={22}/>
                <FaCircleInfo size={22}/>
            </div>
        </section>
        <section></section>
        <section className="bg-[#0c1014] mt-4 rounded-2xl py-3 flex  items-center justify-between absolute bottom-4 w-2/4 px-4">
            <div className="flex items-center gap-4">
            <FaSearch size={18}/>
            <input type="text" placeholder="Message..." className="outline-none"/>
            </div>
            <div className="flex gap-4">
            <AiOutlineAudio size={18}/>
            <FaImage size={18}/>
            <LuImage size={18}/>
            </div>
                
        </section>
    </main>
  )
};


const MsgDemo = ()=>{
    return(
        <main className="flex flex-col items-center justify-center w-full min-h-screen gap-2 ">
                <TbMessageShare size={40}/>
                <h2>Your messages</h2>
                <p>Send private photos and messages to a friend or group.</p>
                <button className="font-bold bg-[#4a5df9] px-2 py-1 rounded-lg">Send message</button>
        </main>
    )
}