import express from "express";
import uploadImg from "../middlewares/cloudinary.js";
import {
    getAllPosts,
    getPostbyID,
    createPost,
    updatePost,
    deletePost,
    uploadCover
} from "../controllers/post.js";

const PostRouter = express.Router();

PostRouter.get("/", getAllPosts);
PostRouter.get("/:id", getPostbyID);
PostRouter.post("/", createPost);
PostRouter.put("/:id", updatePost);
PostRouter.delete("/:id", deletePost);
PostRouter.patch("/:id/cover",uploadImg.single("cover"), uploadCover);

export default PostRouter;