import React from 'react'
import Image from 'next/image'

const Stories = () => {

  type Story = {
    name: string
    img: string
    isView: boolean
  }

  const stories: Story[] = [
  { name: "Ali", img: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600", isView: false },
  { name: "Sophia", img: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600", isView: true },
  { name: "Muhammad", img: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600", isView: false },
  { name: "Christopher", img: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600", isView: true },
  { name: "Zara", img: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600", isView: false },
  { name: "AlexanderTheGreat", img: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600", isView: true },
  { name: "Noah", img: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600", isView: false },
  { name: "IsabellaRose", img: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600", isView: true },
  { name: "Liam", img: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600", isView: false },
  { name: "JonathanMichael", img: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600", isView: true },
]

  return (
    <main className="border-b md:w-2/3 w-full h-[20vh]  overflow-hidden">
      <section className="flex gap-5 px-4 items-center">

        {stories.map((story, i) => (
          <div key={i} className="flex flex-col items-center">

            <div
              className={`p-1 rounded-full ${
                story.isView
                  ? "bg-gray-400"
                  : "bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600"
              }`}
            >
              <div className="bg-white p-0.5 rounded-full">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={story.img}
                    alt={story.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-sm mt-1">{story.name}</h2>
          </div>
        ))}

      </section>
    </main>
  )
}

export default Stories