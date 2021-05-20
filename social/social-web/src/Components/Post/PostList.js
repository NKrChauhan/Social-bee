import { useEffect, useState } from "react";
import { loadPosts } from "../Generics/Utils";
import Post from "./Post";

function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const mycallback = (res, status) => {
      if (status === 200) {
        setPosts(res.reverse());
      }
    };
    loadPosts(mycallback);
  }, []);
  return (
    <div className="container" style={{ paddingTop: "70px" }}>
      {posts.map((item, index) => {
        return (
          <>
            <Post item={item} index={index} level={0} />
            <br />
          </>
        );
      })}
    </div>
  );
}

export default PostList;
