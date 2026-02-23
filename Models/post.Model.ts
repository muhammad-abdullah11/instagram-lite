import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPost extends Document {
    user: mongoose.Types.ObjectId;
    caption: string;
    media: {
        url: string;
        type: "image" | "video";
    }[];
    location?: {
        name: string;
    };
    taggedUsers: {
        user: mongoose.Types.ObjectId;
    }[];
    likes: mongoose.Types.ObjectId[];
    hashtags: string[];
    allowComments: boolean;
    hideLikes: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema<IPost>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Post must belong to a user"],
            index: true,
        },
        caption: {
            type: String,
            trim: true,
            maxlength: [2200, "Caption cannot exceed 2200 characters"],
            default: "",
        },
        media: [
            {
                url: {
                    type: String,
                    required: [true, "Media URL is required"],
                },
                type: {
                    type: String,
                    enum: ["image", "video"],
                    default: "image",
                }
            },
        ],
        location: {
            type: String,
            trim: true
        },
        taggedUsers: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                }
            },
        ],
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        hashtags: [
            {
                type: String,
                trim: true,
                lowercase: true,
            },
        ],
        allowComments: {
            type: Boolean,
            default: true,
        },
        hideLikes: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

postSchema.index({ createdAt: -1 });
postSchema.index({ hashtags: 1 });
postSchema.index({ mentions: 1 });

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);

export default Post;
