import {Video} from "../models/video.model.js"
import { ApiError } from "../utils/apiError.js";
import {ApiResponce} from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const getAllVideos = asyncHandler(async (req, res) => {
    // const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    const getAllVideos = await Video.find({ owner: req.user._id })

    console.log("Fetched all videos for user:", req.user._id);

    res.status(200).json(new ApiResponce(200, getAllVideos, "Videos fetched successfully"))
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body;
    const video = req.file?.path;

    if(!title || !description){
        throw new ApiError(400,"Title and Description are required to publish a video");
    }

    if(!video){
        throw new ApiError(400,"File Not Found");
    }

    const uploadedVideo = await uploadOnCloudinary(video);

    if(!uploadedVideo.url){
        throw new ApiError(500,"Video Upload Failed, Please try again later");
    }

    const newVideo = await Video.create({
        title,
        description,
        videoFile: uploadedVideo.url,
        owner: req.user
    });

    console.log("✅ Video published successfully:", newVideo);

    res.status(201).json(new ApiResponce(201, newVideo,"Video Published Successfully" ));
    
})


const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if(!videoId){
        throw new ApiError(400,"Video ID is required");
    }

    const video = await Video.findById(videoId);
    if(!video){
        throw new ApiError(404,"Video Not Found");
    }

    // console.log("Fetched Video: ", video);

    res
    .status(200)
    .json(
        new ApiResponce(200, video, "Video fetched successfully")
    );

})

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const videofile = req.file?.path;

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  const uploadedVideo = await uploadOnCloudinary(videofile);

  if (!uploadedVideo?.url) {
    throw new ApiError(500, "Video upload failed, please try again later");
  }

  video.videoFile = uploadedVideo.url;

  const updatedVideo = await video.save();

  console.log("✅ Video updated successfully:", updatedVideo);

  res
    .status(200)
    .json(new ApiResponce(200, updatedVideo, "Video updated successfully"));
});


const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const videoToBeDelete = await Video.findByIdAndDelete(videoId)
    if(!videoToBeDelete){
        throw new ApiError(404,"Video Not Found")
    }
    console.log("✅ Video deleted successfully:", videoToBeDelete);
    res.status(200).json(new ApiResponce(200, videoToBeDelete, "Video Deleted Successfully"))

})

// It toggles the publish status of a video ( published/unpublished )
const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const video = await findById(videoId)
    if(!video){
        throw new ApiError(404,"Video Not Found")
    }

    video.isPublished = !video.isPublished
    const updatedVideo = await video.save()

    console.log("✅ Video publish status toggled successfully:", updatedVideo);

    res.status(200).json(new ApiResponce(200, updatedVideo, "Video Publish Status Toggled Successfully"))
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}