import { useEffect, useState } from "react";
import { axiosCallWithoutAuth } from "../Generics/Utils";
import Post from "./Post";
import Form from "./Form";
import { useParams } from "react-router";

function PostList() {
  const [posts, setPosts] = useState([]);
  var { username } = useParams();
  useEffect(() => {
    let uri = "feeds/";
    if (username) {
      uri = "feeds/" + username + "/";
    }
    axiosCallWithoutAuth
      .get(uri)
      .then((res) => {
        setPosts(res.data.reverse());
      })
      .catch((e) => {
        console.log(e);
      });
  }, [username]);
  useEffect(() => {}, [posts]);
  const handleShare = (data) => {
    setPosts([data, ...posts]);
  };
  const handlePost = (data) => {
    setPosts([data, ...posts]);
  };
  return (
    <div className="container">
      {username && <div style={{ paddingTop: "100px" }}></div>}
      {!username && <Form action={handlePost} />}
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
