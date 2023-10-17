import React from "react";
import { Container, Button } from "../index";
import { useSelector } from "react-redux";
import uploadFile from "../../appwrite/uploadFile";
import parse from "html-react-parser";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../../appwrite/config";
import { useState, useEffect } from "react";

function Post() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userid === userData.$id : false;
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);     
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);
  const deletePost = () => {
    service.deletePost(post.$id).then((response) => {
      if (response) {
        uploadFile.deleteFile(post.image);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={uploadFile.getFilePreview(post.image)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css text-fuchsia-300">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>

  ) : null;
}

export default Post;
