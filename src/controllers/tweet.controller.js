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
    .json(new ApiResponce(201,tweet, "Tweet created successfully"));
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
    const {tweetId} = req.params;

    if(!content){
        throw new ApiError(400,"Tweet content is required");
    }

    if(!tweetId){
        throw new ApiError(400,"Tweet ID is required");
    }

    const tweetToBeUpdate = await Tweet.findById(tweetId);
    if(!tweetToBeUpdate){
        throw new ApiError(404,"Tweet Not Found")
    }

    if(tweetToBeUpdate.owner.toString() !== req.user._id.toString()){
        throw new ApiError(403,"You are not authorized to update this tweet");
    }

    tweetToBeUpdate.content = content;
    const updatedTweet = await tweetToBeUpdate.save();   

    console.log("✅ Tweet updated successfully:", updatedTweet);
    res.status(200).json(new ApiResponce(200, updatedTweet, "Tweet Updated Successfully"))   

})

const deleteTweet = asyncHandler(async (req, res) => {
    const {tweetId} = req.params;

    if(!tweetId){
        throw new ApiError(400,"Tweet ID is required");
    }

    const tweetToBeDelete = await Tweet.findById(tweetId)

    if(tweetToBeDelete.owner.toString() !== req.user._id.toString()){
        throw new ApiError(403,"You are not authorized to delete this tweet");
    }               
    if(!tweetToBeDelete){
        throw new ApiError(404,"Tweet Not Found")
    }

   const deletedTweet = await Tweet.findOneAndDelete({_id: tweetId})

    console.log(" Tweet deleted successfully:", deletedTweet);
    res.status(200).json(new ApiResponce(200, deletedTweet, "Tweet Deleted Successfully"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}