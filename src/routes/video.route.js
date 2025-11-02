import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
  getAllVideos,
} from "../controllers/video.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/uploadVideo").post(upload.single("video"), publishAVideo);
router.route("/getVideo/:videoId").get(getVideoById);
router
  .route("/updatevideo/:videoId")
  .patch(upload.single("video"), updateVideo);
router.route("/deletevideo/:videoId").delete(deleteVideo);
router.route("/togglePublish/:videoId").patch(togglePublishStatus);
router.route("/allVideos").get(getAllVideos);

export default router;
