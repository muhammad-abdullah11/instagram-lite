import Image from 'next/image'
import React from 'react'


type Suggestion = {
  username: string
  name: string
  img: string
  isFollowing: boolean
}

const suggestions: Suggestion[] = [
  {
    username: "ali_dev",
    name: "Ali Khan",
    img: "https://images.unsplash.com/photo-1707396172167-95af235efc98?w=600",
    isFollowing: false,
  },
  {
    username: "sophia.styles",
    name: "Sophia Williams",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
    isFollowing: false,
  },
  {
    username: "muhammad_codes",
    name: "Muhammad Ali",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
    isFollowing: true,
  },
  {
    username: "alexander_the_great",
    name: "Alexander",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    isFollowing: false,
  },
  {
    username: "zara",
    name: "Zara Noor",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
    isFollowing: true,
  },
  {
    username: "noah_world",
    name: "Noah Johnson",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600",
    isFollowing: false,
  },
  {
    username: "isabella_rose_official",
    name: "Isabella Rose",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600",
    isFollowing: false,
  },
]

const AsideBar = () => {
  return (
    <aside className="w-full max-w-sm p-4">
        <h2 className='font-semibold py-4 font-serif'>Suggested for you </h2>
      <section className='flex flex-col gap-4'>
        {suggestions?.map((sug,i)=>(

            <section className="flex items-center justify-between" key={i}>

        <div className="flex items-center gap-3">
          
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={sug.img}
              alt="profile"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col leading-tight">
            <h2 className="font-semibold text-sm">{sug.name}</h2>
            <p className="text-gray-500 text-sm">{sug.username}</p>
          </div>

        </div>

        <button className="text-blue-500 text-sm font-semibold hover:text-blue-700 transition">
          Follow
        </button>

      </section>
            ))}
            </section>  

    </aside>
  )
}

export default AsideBar