import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, false, "Video not found");
  }

  const comments = await Comment.find({ video: videoId });

  console.log("Fetched Comments:", comments);

  res
    .status(200)
    .json(new ApiResponce(200, comments, "Comments fetched successfully"));
});

const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { content } = req.body;

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, false, "Video not found");
  }

  if (!content) {
    throw new ApiError(400, false, "Content is required");
  }

  const comment = await Comment.create({
    content,
    video: videoId,
    owner: req.user._id,
  });

  console.log("Created Comment:", comment);

  res
    .status(201)
    .json(new ApiResponce(201, comment, "Comment added successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const commentToBeUpdate = await Comment.findById(commentId);
  if (!commentToBeUpdate) {
    throw new ApiError(404, "Comment Not Found");
  }

  if (commentToBeUpdate.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this comment");
  }

  commentToBeUpdate.content = content;
  const updatedComment = await commentToBeUpdate.save();

  console.log(" Comment updated successfully:", updatedComment);
  res
    .status(200)
    .json(new ApiResponce(200, updatedComment, "Comment Updated Successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(400, "Comment ID is required");
  }

  const commentToBeDelete = await Comment.findById(commentId);
  if (!commentToBeDelete) {
    throw new ApiError(404, "Comment Not Found");
  }

  if (commentToBeDelete.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this comment");
  }

  const deletedComment = await Comment.findOneAndDelete({_id:commentId});
  console.log(" Comment deleted successfully:", deletedComment);
  res
    .status(200)
    .json(new ApiResponce(200, deletedComment, "Comment Deleted Successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
