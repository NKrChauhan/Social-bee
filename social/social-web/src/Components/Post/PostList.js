import { useEffect, useState } from "react";
import { axiosCallWithoutAuth } from "../Generics/Utils";
import Post from "./Post";
import Form from "./Form";

function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axiosCallWithoutAuth
      .get("feeds/")
      .then((res) => {
        setPosts(res.data.reverse());
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  useEffect(() => {}, [posts]);
  const handleShare = (data) => {
    setPosts([data, ...posts]);
  };
  const handlePost = (data) => {
    setPosts([data, ...posts]);
  };
  return (
    <div className="container" style={{ paddingTop: "10px" }}>
      <Form action={handlePost} />
      {posts.map((item, index) => {
        return (
          <div key={index + "-post"}>
            <Post
              item={item}
              index={index}
              level={0}
              sharecallback={handleShare}
            />
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default PostList;
