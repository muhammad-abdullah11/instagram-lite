import { NextResponse } from "next/server";
import User from "@/Models/user.Model";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        const { name, userName, email, password } = await req.json();

        if (!name || !userName || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        await connectDB();

        // Check if user already exists
        const userExists = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: userName.toLowerCase() }
            ]
        });

        if (userExists) {
            const field = userExists.email === email.toLowerCase() ? "Email" : "Username";
            return NextResponse.json(
                { message: `${field} already exists` },
                { status: 400 }
            );
        }

        // Create new user
        const newUser = await User.create({
            fullName: name,
            username: userName.toLowerCase(),
            email: email.toLowerCase(),
            password: password, // Password hashing is handled by the pre-save hook in user.Model.ts
        });

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email
                }
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Signup Error:", error);
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
