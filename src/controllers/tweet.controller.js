import {Tweet} from "../models/tweet.model.js"
import { ApiError } from "../utils/apiError.js";
import {ApiResponce} from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
    const {content} = req.body;

    if(!content){
        throw new ApiError(400,"Tweet content is required");    
    }

    const tweet = await Tweet.create({
        content,
        owner: req.user._id
    });

    console.log("Created Tweet:", tweet);

    res
    .status(201)
    .json(new ApiResponce(201, "Tweet created successfully", {tweet}));
})

const getUserTweets = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const tweets = await Tweet.find({owner : userId});

    res
    .status(200)
    .json(new ApiResponce(200, "User tweets fetched successfully", {tweets}));
})

const updateTweet = asyncHandler(async (req, res) => {
    const {content} = req.body;
    const tweetId = req.params.tweetId;

    if(!content){
        throw new ApiError(400,"Tweet content is required");
    }

    if(!tweetId){
        throw new ApiError(400,"Tweet ID is required");
    }

    const updatedTweet = await Tweet.findOneAndUpdate(
        { _id: tweetId, owner: req.user._id },
        {
            $set: {content}
        },
        { new: true }
    )

})

const deleteTweet = asyncHandler(async (req, res) => {
    const tweetId = req.params;
    if(!tweetId){
        throw new ApiError(400,"Tweet ID is required");
    }
    const tweetToBeDelete = await Tweet.findByIdAndDelete(tweetId)
    if(!tweetToBeDelete){
        throw new ApiError(404,"Tweet Not Found")
    }

    console.log("✅ Tweet deleted successfully:", tweetToBeDelete);
    res.status(200).json(new ApiResponce(200, tweetToBeDelete, "Tweet Deleted Successfully"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}