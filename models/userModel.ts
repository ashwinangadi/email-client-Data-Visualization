// Importing mongoose library along with Document and Model types from it
import mongoose, { Document, Model } from "mongoose";
import { IWishlistItem, wishlistItemSchema } from "./userWishlist";

// Defining the structure of a user using TypeScript interfaces
export interface IUser {
  username: string;
  email: string;
  password: string;
  picture?: string;
  isVerified: boolean;
  forgotPasswordToken: String | undefined;
  forgotPasswordTokenExpiry: Date | undefined;
  verifyToken: String | undefined;
  verifyTokenExpiry: Date | undefined;
  wishlist?: IWishlistItem[]; // Wishlist field
}

// Merging IUser interface with mongoose's Document interface to create
// a new interface that represents a user document in MongoDB
export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Defining a mongoose schema for the user document, specifying the types
// and constraints
const userSchema = new mongoose.Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    picture: {
      type: String,
      default: null,
    },
    wishlist: {
      type: [wishlistItemSchema],
      default: [], // Initialize wishlist as an empty array
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' fields to the document
    timestamps: true,
  }
);

// Creating a mongoose model for the user document
const User: Model<IUserDocument> =
  mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
