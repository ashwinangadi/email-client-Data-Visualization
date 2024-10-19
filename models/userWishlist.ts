// Importing mongoose library along with Document and Model types from it
import mongoose, { Document, Model } from "mongoose";

// Interface for wishlist item
export interface IWishlistItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
  stock: number;
}

// Defining a mongoose schema for the wishlist item
export const wishlistItemSchema = new mongoose.Schema<IWishlistItem>(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

// Defining a mongoose model for the wishlist item
// const WishlistItem = mongoose.model<IWishlistItem>("WishlistItem", wishlistItemSchema);

// Exporting the WishlistItem model
// export default WishlistItem;
