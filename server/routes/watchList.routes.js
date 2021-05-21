const express = require("express");
const watchList = express.Router();
const mongoose = require("mongoose");

const WatchList = require("../models/WatchList.model");

watchList.post("/watchlist", (req, res, next) => {
  const { movies } = req.body;

  WatchList.find({ owner: req.user._id })
    .then((response) => {
      if (response.length > 0) {
        return WatchList.findByIdAndUpdate(response[0]._id, { $push: { movies: movies } })
      } else {
        return WatchList.create({
          movies,
          owner: req.user._id,
        })
      }
    }).then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err)
    })
});

watchList.get("/watchlist/:id", (req, res, next) => {
  const { id } = req.params;

  WatchList.find({owner : id})
    .then((watchList) => {
    
      res.status(200).json(watchList);
    })
    .catch((err) => {
      res.status(500).json(err);
      next(err);
    });
});

watchList.delete("/watchlist/:id", (req, res, next) => {

  const { id } = req.params;

  WatchList.find({ owner: req.user._id })
    
    .then((response) => {
      
      const updatedMoviesList = response[0].movies.filter((item) => {
        return item._id != id
      })
     return  WatchList.findByIdAndUpdate(response[0]._id, { movies: updatedMoviesList})
       
    })
    .then((result) => {
      
      return WatchList.findById(result._id)
      
    }).then((found) => {
      
      res.status(200).json(found);
    })
    .catch((err) => {
      next(err)
    })
});


module.exports = watchList;