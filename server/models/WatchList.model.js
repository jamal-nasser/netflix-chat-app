const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchListSchema = new Schema(
  {
    movies: [{
      title: { type: String },
      original_name: { type: String },
      name: { type: String },
      overview: {type: String},
      backdrop_path: { type: String },
    }],
    owner: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true,
  }
);

const WatchList = mongoose.model("WatchList", watchListSchema);

module.exports = WatchList;