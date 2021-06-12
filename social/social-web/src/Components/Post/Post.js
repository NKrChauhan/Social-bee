import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LikeBtn from "../Generics/LikeBtn";
import Share from "../Generics/ShareBtn";
import ChildPost from "./ChildPost";
import { axiosCallWithoutAuth } from "../Generics/Utils";
import "./post.css";
import swal from "sweetalert";

function Post(props) {
  var { postId } = useParams();
  const [post, setPost] = useState(props.item !== undefined ? props.item : {});
  useEffect(() => {
    if (postId) {
      let uri = "post-detail/" + postId + "/";
      axiosCallWithoutAuth
        .get(uri)
        .then((res) => {
          if (res.status === 200) {
            setPost(res.data);
          }
        })
        .catch((e) => {
          swal("Error", "Post not found !");
          window.location.href = "/";
        });
    }
  }, [postId]);
  const showDetails = () => {
    window.location.href = `/post/${post.id}`;
  };
  return (
    <div
      className="container glow"
      style={{
        color: "black",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "2%",
        boxShadow: "mediumvioletred",
      }}
      key={props.index !== undefined ? props.index : 0}
    >
      {!postId && (
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={showDetails}
          style={{ float: "inline-end" }}
        >
          show details
        </button>
      )}
      <div className="row">
        <div className="col-md-2">{post.user}</div>
      </div>
      <br />
      <p className="lead">{post.content}</p>
      {post.content ? <br /> : ""}
      {post.og_post && (props.level < 1 || props.level === undefined) ? (
        <ChildPost
          item={post.og_post}
          index={props.index !== undefined ? props.index + "-child" : 1}
          level={props.level !== undefined ? props.level + 1 : 1}
        />
      ) : (
        ""
      )}
      {(props.level <= 0 || props.level === undefined) && (
        <>
          <LikeBtn item={post} />
          <span className="mx-2"> </span>
          <Share item={post} sharecallback={props.sharecallback} />
        </>
      )}
    </div>
  );
}
export default Post;
