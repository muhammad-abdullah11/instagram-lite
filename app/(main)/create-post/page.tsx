"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useRef, useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

const MAX_CAPTION = 2200;

const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const CreatePost = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [allowComments, setAllowComments] = useState(true);
    const [hideLikes, setHideLikes] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!file) { setPreview(null); return; }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const picked = e.target.files?.[0];
        if (picked) setFile(picked);
    };

    const handleRemove = () => {
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async () => {
        if (!file) return;
        setIsSubmitting(true);
        setError(null);
        try {
            const captionHashtags =
                caption.match(/#(\w+)/g)?.map((h) => h.substring(1).toLowerCase()) || [];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("caption", caption);
            formData.append("location", location);
            formData.append("hashtags", captionHashtags.join(","));
            formData.append("allowComments", String(allowComments));
            formData.append("hideLikes", String(hideLikes));
            const res = await fetch("/api/posts", { method: "POST", body: formData });
            const data = await res.json();
            if (!res.ok) { setError(data.error || "Failed to create post"); return; }
            router.push("/");
            router.refresh();
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isVideo = file?.type.startsWith("video/");
    const username = (session?.user as any)?.username || session?.user?.name || "you";
    const profilePicture = session?.user?.image || null;

    return (
        <main className="w-full min-h-screen flex items-center justify-center bg-black p-4">
            <div className={`bg-[#1c1f23] rounded-2xl overflow-hidden border border-[#2a2d33] shadow-[0_24px_60px_rgba(0,0,0,0.7)] transition-all duration-300 ${file ? "w-[860px]" : "w-[520px]"}`}>

                <div className="flex items-center justify-between px-4 py-[14px] border-b border-[#2a2d33]">
                    {file ? (
                        <button onClick={handleRemove} className="text-white hover:text-[#a0a6b1] transition-colors cursor-pointer">
                            <IoArrowBack size={22} />
                        </button>
                    ) : <div className="w-6" />}

                    <h1 className="text-[15px] font-bold text-white tracking-[0.2px]">Create new post</h1>

                    {file ? (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="text-[#1877f2] hover:text-[#1468d8] text-sm font-bold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Sharing..." : "Share"}
                        </button>
                    ) : <div className="w-6" />}
                </div>

                {error && (
                    <div className="px-4 py-2 bg-red-500/10 border-b border-red-500/20 text-red-400 text-xs text-center">
                        {error}
                    </div>
                )}

                {!file ? (
                    <div className="flex flex-col items-center justify-center gap-5 px-10 py-[60px] rounded-b-2xl">
                        <svg viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="68">
                            <rect x="1.5" y="1.5" width="45" height="45" rx="7.5" stroke="white" strokeWidth="3" />
                            <circle cx="15" cy="15" r="5" stroke="white" strokeWidth="2.5" />
                            <path d="M1.5 35L18 20L30 32L38 24L46.5 32" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
                            <rect x="32" y="20" width="46" height="46" rx="7.5" fill="#1c1f23" stroke="white" strokeWidth="3" />
                            <path d="M50 43L62 51L50 59V43Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                        <p className="text-[18px] font-light text-[#e0e0ff] text-center">Select a photo or video</p>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-[#1877f2] hover:bg-[#1468d8] active:bg-[#1060cc] text-white text-sm font-bold px-5 py-[9px] rounded-lg transition-all duration-150 hover:-translate-y-px active:translate-y-0 cursor-pointer"
                        >
                            Select From Computer
                        </button>
                        <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
                    </div>
                ) : (
                    <div className="flex h-[540px]">
                        <div className="relative w-[480px] flex-shrink-0 bg-black flex items-center justify-center overflow-hidden">
                            {isVideo ? (
                                <video src={preview!} controls className="w-full h-full object-contain" />
                            ) : (
                                <img src={preview!} alt={file.name} className="w-full h-full object-contain" />
                            )}
                        </div>

                        <div className="flex-1 flex flex-col border-l border-[#2a2d33] overflow-y-auto min-w-0">
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2a2d33]">
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-[#2a2d33] flex-shrink-0 relative">
                                    {profilePicture ? (
                                        <Image src={profilePicture} alt={username} width={32} height={32} className="object-cover w-full h-full" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br from-purple-500 to-pink-500">
                                            {username[0]?.toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <span className="text-white text-sm font-semibold">{username}</span>
                            </div>

                            <div className="px-4 py-3 border-b border-[#2a2d33]">
                                <textarea
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value.slice(0, MAX_CAPTION))}
                                    placeholder="Write a caption..."
                                    rows={7}
                                    className="w-full bg-transparent text-white text-sm placeholder-[#8a8f9e] resize-none outline-none leading-relaxed"
                                />
                                <div className="flex items-center justify-between mt-1">
                                    <button className="text-[#8a8f9e] hover:text-white transition-colors cursor-pointer">
                                        <BsEmojiSmile size={18} />
                                    </button>
                                    <span className="text-[#8a8f9e] text-xs">{caption.length}/{MAX_CAPTION}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2d33]">
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Add Location"
                                    className="w-full bg-transparent text-white text-sm placeholder-[#8a8f9e] outline-none"
                                />
                                <IoLocationOutline size={18} className="text-[#8a8f9e] flex-shrink-0 ml-2" />
                            </div>

                            <div className="px-4 py-3 border-b border-[#2a2d33]">
                                <p className="text-white text-sm font-semibold mb-3">Advanced settings</p>
                                <div className="flex flex-col gap-4">
                                    {[
                                        { label: "Turn off commenting", desc: "Turn off comments for this post", value: !allowComments, toggle: () => setAllowComments((v) => !v) },
                                        { label: "Hide like count", desc: "Only you will see the total number of likes", value: hideLikes, toggle: () => setHideLikes((v) => !v) },
                                    ].map(({ label, desc, value, toggle }) => (
                                        <div key={label} className="flex items-center justify-between">
                                            <div>
                                                <p className="text-white text-sm font-medium">{label}</p>
                                                <p className="text-[#8a8f9e] text-xs mt-0.5">{desc}</p>
                                            </div>
                                            <button
                                                onClick={toggle}
                                                className={`relative w-10 h-6 rounded-full transition-colors duration-200 cursor-pointer flex-shrink-0 ${value ? "bg-white" : "bg-[#3a3d44]"}`}
                                            >
                                                <span className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full transition-transform duration-200 ${value ? "translate-x-4 bg-black" : "bg-[#8a8f9e]"}`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="px-4 py-3 flex items-center gap-3 mt-auto border-t border-[#2a2d33]">
                                <div className="w-8 h-8 rounded-lg bg-[#252830] flex-shrink-0 overflow-hidden border border-[#2a2d33]">
                                    {!isVideo && <img src={preview!} alt="thumb" className="w-full h-full object-cover rounded-lg" />}
                                </div>
                                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                    <p className="text-white text-xs font-medium truncate">{file.name}</p>
                                    <p className="text-[#8a8f9e] text-[11px]">
                                        {isVideo ? "Video" : "Image"} · {formatFileSize(file.size)} · {file.name.split(".").pop()?.toUpperCase()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-[#1877f2] hover:text-[#1468d8] text-xs font-semibold flex-shrink-0 transition-colors cursor-pointer"
                                >
                                    Change
                                </button>
                                <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default CreatePost;