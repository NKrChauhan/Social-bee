import { axiosCallWithAuth } from "./Utils";
import swal from "sweetalert";
import { useEffect, useState } from "react";

function LikeBtn(props) {
  const [likes, setLikes] = useState(props.item.likes);
  useEffect(() => {
    setLikes(props.item.likes);
  }, [props.item.likes]);
  useEffect(() => {}, [likes]);
  const likeHandle = () => {
    var data = {
      id: props.item.id,
      action: "like",
    };
    axiosCallWithAuth
      .post("post-action/", data)
      .then((res) => {
        if (res.data.message === "liked") {
          setLikes(likes + 1);
        } else if (res.data.message === "unliked") {
          setLikes(likes - 1);
        } else {
        }
      })
      .catch((e) => {
        swal("Error", "Something went wrong.are you logged in ?");
      });
  };
  return (
    <button className="btn btn-outline-primary" onClick={likeHandle}>
      <span>{likes} </span>Likes
    </button>
  );
}
export default LikeBtn;
