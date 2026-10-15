import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
// import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";
import { useEffect } from "react";

const BlogList = props => {
  const [posts,setPosts]= useState([])
  const fetchPost = async () => {
    try{ const result= await fetch ("http://localhost:9097/blogPosts")
      const data= await result.json()
      setPosts(data)

    } catch (error){
      console.error(error)
    }
  }
  useEffect(() => {
    fetchPost()
  
  },[])
  return (
    <Row>
      {posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
