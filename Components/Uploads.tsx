"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useCallback, useRef, useState, useEffect, DragEvent } from "react";
import { IoArrowBack, IoCloseCircle } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";

type UploadMode = "post" | "story";

interface UploadsProps {
    type: UploadMode;
}

const MAX_CAPTION = 2_200;
const MAX_FILE_SIZE_MB = 100;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function extractHashtags(text: string): string[] {
    return text.match(/#(\w+)/g)?.map((h) => h.substring(1).toLowerCase()) ?? [];
}

interface ToggleProps {
    label: string;
    description: string;
    checked: boolean;
    onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, description, checked, onToggle }) => (
    <div className="flex items-center justify-between">
        <div>
            <p className="text-white text-sm font-medium">{label}</p>
            <p className="text-[#8a8f9e] text-xs mt-0.5">{description}</p>
        </div>
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={onToggle}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer flex-shrink-0
        ${checked ? "bg-white" : "bg-[#3a3d44]"}`}
        >
            <span
                className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full transition-transform duration-200
          ${checked ? "translate-x-5 bg-black" : "bg-[#8a8f9e]"}`}
            />
        </button>
    </div>
);

interface StepIndicatorProps {
    step: number;
    total: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ step, total }) => (
    <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
            <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${i < step ? "bg-[#1877f2] w-5" : "bg-[#3a3d44] w-3"
                    }`}
            />
        ))}
    </div>
);

interface DropZoneProps {
    type: UploadMode;
    onFile: (file: File) => void;
    onError: (msg: string) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ type, onFile, onError }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    const validate = useCallback(
        (file: File): boolean => {
            if (file.size > MAX_FILE_SIZE_BYTES) {
                onError(`File too large. Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.`);
                return false;
            }
            if (type === "story" && !file.type.startsWith("image/") && !file.type.startsWith("video/")) {
                onError("Only images and videos are supported.");
                return false;
            }
            return true;
        },
        [type, onError]
    );

    const handleFiles = useCallback(
        (files: FileList | null) => {
            const picked = files?.[0];
            if (picked && validate(picked)) onFile(picked);
        },
        [validate, onFile]
    );

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label="Upload media"
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-6 px-10 py-16 rounded-b-2xl cursor-pointer
        transition-colors duration-200 outline-none
        ${dragging ? "bg-[#1877f2]/10 border-2 border-dashed border-[#1877f2]" : "border-2 border-transparent"}`}
        >
            <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-2xl bg-[#1877f2]/10 animate-pulse" />
                <MdOutlinePhotoSizeSelectActual size={36} className="text-white relative z-10" />
                <HiOutlineVideoCamera
                    size={22}
                    className="text-[#1877f2] absolute bottom-0 right-0 z-20 bg-[#1c1f23] rounded-full p-0.5"
                />
            </div>

            <div className="text-center space-y-1">
                <p className="text-[18px] font-light text-white">
                    {dragging ? "Drop to upload" : `Select a photo or video`}
                </p>
                <p className="text-[#8a8f9e] text-xs">
                    {type === "story"
                        ? "Stories disappear after 24 hours"
                        : "Supports JPG, PNG, MP4, MOV · Max 100 MB"}
                </p>
            </div>

            <button
                type="button"
                className="bg-[#1877f2] hover:bg-[#1468d8] active:bg-[#1060cc] text-white text-sm font-bold
          px-6 py-2.5 rounded-lg transition-all duration-150 hover:-translate-y-px active:translate-y-0 shadow-lg shadow-[#1877f2]/20"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
            >
                Select From Computer
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
            />
        </div>
    );
};

const Uploads: React.FC<UploadsProps> = ({ type }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [allowComments, setAllowComments] = useState(true);
    const [hideLikes, setHideLikes] = useState(false);

    const isVideo = file?.type.startsWith("video/") ?? false;
    const username = (session?.user as any)?.username ?? session?.user?.name ?? "you";
    const profilePicture = session?.user?.image ?? null;
    const isPost = type === "post";
    const apiEndpoint = isPost ? "/api/posts" : "/api/stories";
    const title = isPost ? "Create new post" : "Create new story";

    useEffect(() => {
        if (!file) { setPreview(null); return; }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    useEffect(() => {
        if (!isSubmitting) { setUploadProgress(0); return; }
        const interval = setInterval(() => {
            setUploadProgress((prev) => (prev >= 85 ? prev : prev + Math.random() * 8));
        }, 300);
        return () => clearInterval(interval);
    }, [isSubmitting]);

    const handleFile = useCallback((picked: File) => {
        setFile(picked);
        setError(null);
    }, []);

    const handleRemove = () => {
        setFile(null);
        setPreview(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async () => {
        if (!file || isSubmitting) return;
        setIsSubmitting(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            if (isPost) {
                const hashtags = extractHashtags(caption);
                formData.append("caption", caption);
                formData.append("location", location);
                formData.append("hashtags", hashtags.join(","));
                formData.append("allowComments", String(allowComments));
                formData.append("hideLikes", String(hideLikes));
            }

            const res = await fetch(apiEndpoint, { method: "POST", body: formData });
            const data = await res.json();

            if (!res.ok) {
                setError(data?.error ?? data?.message ?? "Upload failed. Please try again.");
                return;
            }

            setUploadProgress(100);
            await new Promise((r) => setTimeout(r, 400));
            router.push("/");
            router.refresh();
        } catch {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerWidth = isPost && file ? "w-[880px]" : "w-[520px]";

    return (
        <main className="w-full min-h-screen flex items-center justify-center bg-black p-4">
            <div
                className={`bg-[#1c1f23] rounded-2xl overflow-hidden border border-[#2a2d33]
          shadow-[0_24px_80px_rgba(0,0,0,0.8)] transition-all duration-500 ${containerWidth}`}
            >
                <div className="flex items-center justify-between px-4 py-[14px] border-b border-[#2a2d33]">
                    {file ? (
                        <button
                            type="button"
                            onClick={handleRemove}
                            aria-label="Go back"
                            className="text-white hover:text-[#a0a6b1] transition-colors cursor-pointer"
                        >
                            <IoArrowBack size={22} />
                        </button>
                    ) : (
                        <div className="w-6" />
                    )}

                    <div className="flex flex-col items-center gap-1">
                        <h1 className="text-[15px] font-bold text-white tracking-[0.2px]">{title}</h1>
                        {file && !isPost && <StepIndicator step={2} total={2} />}
                    </div>

                    {file ? (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="text-[#1877f2] hover:text-[#1468d8] text-sm font-bold transition-colors
                cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Sharing…" : "Share"}
                        </button>
                    ) : (
                        <div className="w-6" />
                    )}
                </div>

                {isSubmitting && (
                    <div className="w-full h-0.5 bg-[#2a2d33]">
                        <div
                            className="h-full bg-[#1877f2] transition-all duration-300 ease-out"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                )}
                {error && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border-b border-red-500/20">
                        <IoCloseCircle size={16} className="text-red-400 flex-shrink-0" />
                        <p className="text-red-400 text-xs flex-1">{error}</p>
                        <button
                            type="button"
                            onClick={() => setError(null)}
                            className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        >
                            <IoCloseCircle size={14} />
                        </button>
                    </div>
                )}

                {!file ? (
                    <DropZone type={type} onFile={handleFile} onError={setError} />
                ) : (
                    <div className={`flex ${isPost ? "h-[560px]" : "h-auto"}`}>
                        <div
                            className={`relative flex-shrink-0 bg-black flex items-center justify-center overflow-hidden
                ${isPost ? "w-[500px]" : "w-full"}`}
                        >
                            {isVideo ? (
                                <video
                                    src={preview!}
                                    controls
                                    playsInline
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <img
                                    src={preview!}
                                    alt={file.name}
                                    className="w-full h-full object-contain"
                                />
                            )}

                            {!isPost && (
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#2a2d33] flex-shrink-0 relative ring-2 ring-[#1877f2]">
                                                {profilePicture ? (
                                                    <Image
                                                        src={profilePicture}
                                                        alt={username}
                                                        width={32}
                                                        height={32}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br from-purple-500 to-pink-500">
                                                        {username[0]?.toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-white text-sm font-semibold drop-shadow">{username}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="text-[#1877f2] text-xs font-semibold transition-colors cursor-pointer hover:text-[#1468d8]"
                                        >
                                            Change
                                        </button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*,video/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const picked = e.target.files?.[0];
                                                if (picked) handleFile(picked);
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {isPost && (
                            <div className="flex-1 flex flex-col border-l border-[#2a2d33] overflow-y-auto min-w-0">
                                <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2a2d33]">
                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#2a2d33] flex-shrink-0 relative">
                                        {profilePicture ? (
                                            <Image
                                                src={profilePicture}
                                                alt={username}
                                                width={32}
                                                height={32}
                                                className="object-cover w-full h-full"
                                            />
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
                                        placeholder="Write a caption…"
                                        rows={7}
                                        aria-label="Caption"
                                        className="w-full bg-transparent text-white text-sm placeholder-[#8a8f9e]
                      resize-none outline-none leading-relaxed"
                                    />
                                    <div className="flex items-center justify-between mt-1">
                                        <button
                                            type="button"
                                            aria-label="Add emoji"
                                            className="text-[#8a8f9e] hover:text-white transition-colors cursor-pointer"
                                        >
                                            <BsEmojiSmile size={18} />
                                        </button>
                                        <span className="text-[#8a8f9e] text-xs">
                                            {caption.length}/{MAX_CAPTION}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2d33]">
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Add Location"
                                        aria-label="Location"
                                        className="w-full bg-transparent text-white text-sm placeholder-[#8a8f9e] outline-none"
                                    />
                                    <IoLocationOutline size={18} className="text-[#8a8f9e] flex-shrink-0 ml-2" />
                                </div>

                                <div className="px-4 py-3 border-b border-[#2a2d33]">
                                    <p className="text-white text-sm font-semibold mb-3">Advanced settings</p>
                                    <div className="flex flex-col gap-4">
                                        <Toggle
                                            label="Turn off commenting"
                                            description="Turn off comments for this post"
                                            checked={!allowComments}
                                            onToggle={() => setAllowComments((v) => !v)}
                                        />
                                        <Toggle
                                            label="Hide like count"
                                            description="Only you will see the total number of likes"
                                            checked={hideLikes}
                                            onToggle={() => setHideLikes((v) => !v)}
                                        />
                                    </div>
                                </div>

                                <div className="px-4 py-3 flex items-center gap-3 mt-auto border-t border-[#2a2d33]">
                                    <div className="w-8 h-8 rounded-lg bg-[#252830] flex-shrink-0 overflow-hidden border border-[#2a2d33]">
                                        {!isVideo && (
                                            <img src={preview!} alt="thumb" className="w-full h-full object-cover rounded-lg" />
                                        )}
                                        {isVideo && (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <HiOutlineVideoCamera size={16} className="text-[#8a8f9e]" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                        <p className="text-white text-xs font-medium truncate">{file.name}</p>
                                        <p className="text-[#8a8f9e] text-[11px]">
                                            {isVideo ? "Video" : "Image"} · {formatFileSize(file.size)} ·{" "}
                                            {file.name.split(".").pop()?.toUpperCase()}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="text-[#1877f2] hover:text-[#1468d8] text-xs font-semibold flex-shrink-0 transition-colors cursor-pointer"
                                    >
                                        Change
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*,video/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const picked = e.target.files?.[0];
                                            if (picked) handleFile(picked);
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Uploads;
