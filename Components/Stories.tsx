"use client"
import React, { useState } from "react"
import Image from "next/image"

type Story = {
  id: string
  name: string
  img: string
  isView: boolean
}

const Stories = () => {
  const [stories, setStories] = useState<Story[]>([
    { id: "1", name: "Ali", img: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600", isView: false },
    { id: "2", name: "Sophia", img: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600", isView: true },
    { id: "3", name: "Muhammad", img: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600", isView: false },
    { id: "4", name: "Zara", img: "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=600", isView: false },
  ])

  const [showStory, setShowStory] = useState<Story | null>(null)

  const handleOpenStory = (story: Story) => {
    setShowStory(story)
    setStories(prev =>
      prev.map(s =>
        s.id === story.id ? { ...s, isView: true } : s
      )
    )
  }

  const handleClose = () => {
    setShowStory(null)
  }

  return (
    <main className="w-full h-full relative">

      <section className="border-b w-full h-[20vh] overflow-x-auto flex gap-5 px-4 items-center">
        {stories.map(story => (
          <div
            key={story.id}
            onClick={() => handleOpenStory(story)}
            className="flex flex-col items-center cursor-pointer"
          >
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

      {showStory && (
        <ShowStory story={showStory} onClose={handleClose} />
      )}
    </main>
  )
}

export default Stories

type ShowStoryProps = {
  story: Story
  onClose: () => void
}

const ShowStory = ({ story, onClose }: ShowStoryProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">

      <div className="relative w-full md:w-1/2 h-full flex items-center justify-center">

        <Image
          src={story.img}
          alt={story.name}
          fill
          className="object-contain"
        />

        <div className="absolute top-4 left-4 flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white">
            <Image
              src={story.img}
              alt={story.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-white font-semibold">
            {story.name}
          </span>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          ✕
        </button>

      </div>
    </div>
  )
}