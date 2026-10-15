import mongoose from "mongoose";
import Post from "../models/Post.js";

export async function getAllPosts(req, res) {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getPostbyID(req, res) {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "invalid id" });
        }


        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export async function createPost(req, res) {
    try {
        const { category, title, cover, readTime, author, content } = req.body;
        const post = new Post({
            category,
            title,
            cover,
            readTime,
            author,
            content,
        });
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updatePost(req, res) {
    try {
        const { id } = req.params;
        const { category, title, cover, readTime, author, content } = req.body;



        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "invalid id" });
        }


        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                category,
                title,
                cover,
                readTime,
                author,
                content,
            },
            { returnDocument: "after" },

        );

        if (!updatedPost) {
            return res.status(404).json({ message: "post not found" });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export async function deletePost(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "invalid id" });
        }


        const deletedPost = await Post.findByIdAndDelete(id);


        if (!deletedPost) {
            return res.status(404).json({ message: "post not found" });
        }

        res.status(200).json({ message: "post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const uploadCover = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "invalid id" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "file not uploaded" });
        }

        const post = await Post.findByIdAndUpdate(
            id,
            { cover: req.file.path },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ message: "blog post not found" });
        }

        res.status(200).json(post);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};