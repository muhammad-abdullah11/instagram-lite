import Image from 'next/image'
import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { CiBookmark } from "react-icons/ci";
import { GoVerified } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import Reel from '@/Components/Reel';


type reel={
    videoUrl:string,
    userProfilePic:string
    username:string,
    likes:number,
    comments:number,
    shares:number,
    isFav:boolean,
    isFollow:boolean,
    music:string,
    musicOwner:string
}

const reels: reel[] = [
  {
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    userProfilePic:"https://plus.unsplash.com/premium_photo-1740097670016-89f271ae32ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXBpYyUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    username: "ali_dev",
    likes: 1240,
    comments: 120,
    shares: 45,
    isFav: true,
    isFollow: true,
    music: "Night Vibes",
    musicOwner: "DJ Alex",
  },
  {
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    userProfilePic:"https://plus.unsplash.com/premium_photo-1740097670016-89f271ae32ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXBpYyUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    username: "sophia.styles",
    likes: 9876,
    comments: 543,
    shares: 210,
    isFav: false,
    isFollow: false,
    music: "Summer Mood",
    musicOwner: "Luna Beats",
  },
  {
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    userProfilePic:"https://plus.unsplash.com/premium_photo-1740097670016-89f271ae32ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXBpYyUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    username: "muhammad_codes",
    likes: 4521,
    comments: 321,
    shares: 98,
    isFav: true,
    isFollow: false,
    music: "Code Flow",
    musicOwner: "DevSound",
  },
  {
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    userProfilePic:"https://plus.unsplash.com/premium_photo-1740097670016-89f271ae32ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXBpYyUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    username: "zara",
    likes: 210,
    comments: 34,
    shares: 12,
    isFav: false,
    isFollow: true,
    music: "Soft Dreams",
    musicOwner: "Ella",
  },
  {
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    userProfilePic:"https://plus.unsplash.com/premium_photo-1740097670016-89f271ae32ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXBpYyUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    username: "alexander_the_great",
    likes: 15000,
    comments: 1200,
    shares: 540,
    isFav: true,
    isFollow: true,
    music: "Epic Rise",
    musicOwner: "Heroic",
  },
  {
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    userProfilePic:"https://plus.unsplash.com/premium_photo-1740097670016-89f271ae32ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXBpYyUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    username: "noah_world",
    likes: 760,
    comments: 88,
    shares: 30,
    isFav: false,
    isFollow: false,
    music: "Ocean Waves",
    musicOwner: "SeaSide",
  },
  {
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    userProfilePic:"https://plus.unsplash.com/premium_photo-1740097670016-89f271ae32ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXBpYyUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    username: "isabella_rose",
    likes: 3422,
    comments: 290,
    shares: 110,
    isFav: true,
    isFollow: false,
    music: "Romantic Sky",
    musicOwner: "LoveTune",
  },
  {
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    userProfilePic:"https://plus.unsplash.com/premium_photo-1740097670016-89f271ae32ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXBpYyUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    username: "liam_shots",
    likes: 555,
    comments: 45,
    shares: 20,
    isFav: false,
    isFollow: true,
    music: "Street Beat",
    musicOwner: "UrbanMix",
  },
  {
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    userProfilePic:"https://plus.unsplash.com/premium_photo-1740097670016-89f271ae32ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXBpYyUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    username: "emma_creates",
    likes: 8900,
    comments: 640,
    shares: 300,
    isFav: true,
    isFollow: true,
    music: "Creative Mind",
    musicOwner: "ArtWave",
  },
  {
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    userProfilePic:"https://plus.unsplash.com/premium_photo-1740097670016-89f271ae32ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXBpYyUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    username: "jonathan_michael",
    likes: 129,
    comments: 10,
    shares: 5,
    isFav: false,
    isFollow: false,
    music: "Chill Mode",
    musicOwner: "RelaxLab",
  },
]

const Reels = () => {
  return (
    <main>
        <section className='flex flex-col gap-4 items-center justify-center'>
            {reels?.map((reel,i)=>(
               <Reel key={i} />
            ))}
        </section>
    </main>
  )
}

export default Reels