import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

import Authorrouter from "./routes/authors.js";
import PostRouter from "./routes/post.js";

const server = express();

server.use(cors({
    origin: "http://localhost:3000"
}));

server.use(express.json());

// Rotte
server.use("/authors", Authorrouter);
server.use("/blogPosts", PostRouter);

try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connessione riuscita");
} catch (error) {
    console.error("Errore connessione:", error);
}

server.listen(9097, () => {
    console.log("Server avviato sulla porta 9097");
});

