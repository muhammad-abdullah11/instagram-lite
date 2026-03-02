import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import Story from "@/Models/story.Model";
import { connectDB } from "@/lib/mongodb";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Story image or video is required" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "instagram-lite/stories",
              resource_type: "auto",
            },
            (error, result) => {
              if (error || !result) return reject(error);
              resolve(result);
            },
          )
          .end(buffer);
      },
    );

    const story = await Story.create({
      user: session.user.id,
      media: {
        url: uploadResult.secure_url,
        type: uploadResult.resource_type === "video" ? "video" : "image",
      },
    });

    return NextResponse.json(
      {
        message: "Story created successfully",
        story,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Story Upload Error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
