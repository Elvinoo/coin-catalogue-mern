
import mongoose from "mongoose";
const coinSchema = mongoose.Schema({
  category: {
    type: String,
    required: [true, "Please write any title!"],
    maxlength: 50,
  },
  coinName: {
    type: String,
    required: [true, "Please write the coin Name!"],
    maxlength: 50,
  },
  denomination: {
    type: String,
    required: [true, "Please write the denomination!"],
    maxlength: 50,
  },
  year: {
    type: Number,
    required: [true, "Please write the year!"],
  },
  price: {
    type: Number,
    required: [true, "Please write the price!"],
  },
  country: {
    type: String,
    required: [true, "Please write the country!"],
    maxlength: 50,
  },
  metal: {
    type: String,
    required: [true, "Please write the metal!"],
    maxlength: 50,
  },

  shortDesc: {
    type: String,
    required: [true, "Please write the short Description!"],
    maxlength: 200,
  },
  longDesc: {
    type: String,
    required: [true, "Please write the long Description!"],
    maxlength: 1200,
  },
  quality: {
    type: String,
    required: [true, "Please write the quality!"],
    maxlength: 50,
  },
  weight: {
    type: String,
    required: [true, "Please write the weight!"],
    maxlength: 30,
  },
  observeLink: {
    type: String,
    required: [true, "Please write the observe link!"],
    maxlength: 100,
  },
  reverseLink: {
    type: String,
    required: [true, "Please write the reverse link!"],
    maxlength: 100,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
});
const Coin = mongoose.model("Coin", coinSchema);
export default Coin;
