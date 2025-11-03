import { Router } from "express";
import { addComment , getVideoComments , updateComment , deleteComment} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();
router.use(verifyJWT);

router.route("/allcomments/:videoId").get(getVideoComments);
router.route("/create/:videoId").post(addComment);
router.route("/updatecomment/:commentId").patch(updateComment);
router.route("/delete/:commentId").delete(deleteComment);

export default router;  