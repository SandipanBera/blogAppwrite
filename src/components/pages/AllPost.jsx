import React from "react";
import service from "../../appwrite/config";
import { PostCard, Container } from "../index";
import { useState, useEffect } from "react";
function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { service.getPosts([]).then((posts) => {
      if (posts) {
          setPosts(posts.documents)
      }
  })}, [])
 

 
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts &&
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard
                  $id={post.$id}
                  image={post.image}
                  title={post.title}
                />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
