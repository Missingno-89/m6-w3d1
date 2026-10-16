import mongoose from "mongoose";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

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


export async function createComment(req, res) {
    try {
        const { id } = req.params;
        const { author, text } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "invalid post id" });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }

        if (!author || !text) {
            return res.status(400).json({
                message: "author and text are required"
            });
        }

        const comment = new Comment({
            author,
            text,
            post: post._id
        });

        const savedComment = await comment.save();

        res.status(201).json(savedComment);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getComments(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "invalid post id" });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }

        const comments = await Comment.find({ post: id });

        res.status(200).json(comments);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function getCommentById(req, res) {
    try {
        const { id, commentId } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(id) ||
            !mongoose.Types.ObjectId.isValid(commentId)
        ) {
            return res.status(400).json({
                message: "invalid id"
            });
        }

        const comment = await Comment.findOne({
            _id: commentId,
            post: id
        });

        if (!comment) {
            return res.status(404).json({
                message: "comment not found"
            });
        }

        res.status(200).json(comment);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


export async function updateComment(req, res) {
    try {
        const { id, commentId } = req.params;
        const { author, text } = req.body;

        if (
            !mongoose.Types.ObjectId.isValid(id) ||
            !mongoose.Types.ObjectId.isValid(commentId)
        ) {
            return res.status(400).json({
                message: "invalid id"
            });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "post not found"
            });
        }

        if (!author && !text) {
            return res.status(400).json({
                message: "author or text is required"
            });
        }

        const updatedComment = await Comment.findOneAndUpdate(
            { _id: commentId, post: id },
            { ...(author && { author }), ...(text && { text }) },
            { new: true, runValidators: true }
        );

        if (!updatedComment) {
            return res.status(404).json({
                message: "comment not found"
            });
        }

        res.status(200).json(updatedComment);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export async function deleteComment(req, res) {
    try {
        const { id, commentId } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(id) ||
            !mongoose.Types.ObjectId.isValid(commentId)
        ) {
            return res.status(400).json({
                message: "invalid id"
            });
        }

        const deletedComment = await Comment.findOneAndDelete({
            _id: commentId,
            post: id
        });

        if (!deletedComment) {
            return res.status(404).json({
                message: "comment not found"
            });
        }

        res.status(200).json({
            message: "comment deleted successfully",
            comment: deletedComment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
