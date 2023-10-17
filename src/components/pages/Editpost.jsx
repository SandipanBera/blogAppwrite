import React from "react";
import { Container, PostForm } from "../index";
import service from "../../appwrite/config";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Editpost() {
  const [posts, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPosts(post); 
          console.log(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  

  return posts ? (
    <div className="py-8">
      <Container>
        <PostForm post={posts} />
      </Container>
    </div>
  ) : null;
}

export default Editpost;
