import TourModal from "../models/tour.js";
import mongoose from "mongoose";

export const createTour = async (req, res) => {
  const tour = req.body;
  const newTour = new TourModal({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong!" });
  }
};

export const getTours = async (req, res) => {
  const { page } = req.query;
  try {
    // const tours = await TourModal.find();
    // res.status(200).json(tours);
    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await TourModal.countDocuments({});
    const tours = await TourModal.find().limit(limit).skip(startIndex);
    res.json({
      data: tours,
      currentPage: Number(page),
      totalTours: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong!" });
  }
};

export const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await TourModal.findById(id);
    res.status(200).json(tour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong!" });
  }
};

export const getTourByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  const userTour = await TourModal.find({ creator: id });
  res.status(200).json(userTour);
};

export const deleteTourById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Tour doesn't exist" });
    }
    await TourModal.findByIdAndRemove(id);
    res.status(200).json({ message: "Tour deleted successfully!" });
  } catch (error) {
    res.status(404).json({ messgae: "Something went wrong!" });
  }
};

export const editTourById = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, creator, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Tour doesn't exist" });
    }
    const updatedTour = {
      title,
      description,
      image,
      creator,
      tags,
      _id: id,
    };
    await TourModal.findByIdAndUpdate(id, updatedTour, { new: true });
    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(404).json({ messgae: "Something went wrong!" });
  }
};

export const getToursBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const tours = await TourModal.find({ title });
    res.json(tours);
  } catch (error) {
    res.status(404).json({ messgae: "Something went wrong!" });
  }
};

export const getToursByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const tours = await TourModal.find({ tags: { $in: tag } });
    res.json(tours);
  } catch (error) {
    res.status(404).json({ messgae: "Something went wrong!" });
  }
};

export const getRelatedTours = async (req, res) => {
  const tags = req.body;
  try {
    const tours = await TourModal.find({ tags: { $in: tags } });
    res.json(tours);
  } catch (error) {
    res.status(404).json({ messgae: "Something went wrong!" });
  }
};

export const likeTour = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.json({ message: "User is not authenticated!" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Tour doesn't exist" });
    }
    
    const tour = await TourModal.findById(id);
    
    const index = tour.likes.findIndex((id) => id === String(req.userId));
    
    if (index === -1) {
      tour.likes.push(String(req.userId));
    } else {
      tour.likes = tour.likes.filter((likeId) => likeId !== String(req.userId));
    }
    
    const updatedTour = await TourModal.findByIdAndUpdate(id, tour, {
      new: true,
    });

    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(404).json({message:'Something went wrong!'})
  }
};
