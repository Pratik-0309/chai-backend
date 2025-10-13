import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponce } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, email, password } = req.body;
  console.log(email);

  if (
    [username, fullname, email, password].some((feild) => feild?.trim() === "")
  ) {
    throw new ApiError(400, "All Feilds is required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User Already Existed");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new apiError(400, "Avatar is required");
  }

  let user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  let createdUserId = await User.findById(user._id).select(
    "-password -watchHistory -refreshToken"
  );

  if (!createdUserId) {
    throw new apiError(404, "User Not found ");
  }

  return res
    .status(201)
    .json(new ApiResponce(200, createdUserId, "User registeres Successfully"));
});

export { registerUser };
