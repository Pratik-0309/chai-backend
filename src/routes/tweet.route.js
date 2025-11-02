import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTweet , getUserTweets , updateTweet , deleteTweet} from "../controllers/tweet.controller.js";


const router = Router();
router.use(verifyJWT);

router.route("/create-tweet").post(createTweet);
router.route("/get-tweets").get(getUserTweets);
router.route("/update-tweet/:tweetId").patch(updateTweet);
router.route("/delete-tweet/:tweetId").delete(deleteTweet);




export default router;