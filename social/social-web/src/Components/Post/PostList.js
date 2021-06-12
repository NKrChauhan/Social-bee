import { useEffect, useState } from "react";
import { axiosCallWithoutAuth } from "../Generics/Utils";
import Post from "./Post";
import Form from "./Form";
import { useParams } from "react-router";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [postSeen, setPostSeen] = useState([]);
  const [numPostSeen, setNumPostSeen] = useState(10);
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
  useEffect(() => {
    setPostSeen(posts.slice(0, numPostSeen));
  }, [posts, numPostSeen]);
  const handleShare = (data) => {
    setPosts([data, ...posts]);
  };
  const handlePost = (data) => {
    setPosts([data, ...posts]);
  };
  const handleLoadMore = () => {
    console.log(numPostSeen, posts.length);
    if (numPostSeen === posts.length) return;
    else if (numPostSeen + 10 > posts.length) {
      setNumPostSeen(posts.length);
    } else {
      setNumPostSeen(numPostSeen + 10);
    }
  };
  return (
    <div className="container">
      {username && <div style={{ paddingTop: "100px" }}></div>}
      {!username && <Form action={handlePost} />}
      {postSeen.map((item, index) => {
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
      {numPostSeen !== posts.length && (
        <button
          className="btn btn-link"
          style={{ color: "grey" }}
          onClick={handleLoadMore}
        >
          --load more--
        </button>
      )}
    </div>
  );
}

export default PostList;
