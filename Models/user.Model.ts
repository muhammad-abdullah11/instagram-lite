import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    username: string;
    email: string;
    password?: string;
    fullName: string;
    bio: string;
    profilePicture: string;
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    posts: mongoose.Types.ObjectId[];
    savedPosts: mongoose.Types.ObjectId[];
    isPrivate: boolean;
    isVerified: boolean;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
    matchPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            minlength: 3,
            maxlength: 30,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
            index: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
        bio: {
            type: String,
            default: "",
            maxlength: 150,
        },
        profilePicture: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd59Y_8P9InNis97v7-O4N6fAnH60T7qBCA&s",
        },
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        savedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        isPrivate: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
    next();
});

userSchema.methods.matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

userSchema.virtual("followersCount").get(function () {
    return this.followers.length;
});

userSchema.virtual("followingCount").get(function () {
    return this.following.length;
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
