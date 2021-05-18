import { actionOnPost } from "./Utils";

function LikeBtn(props) {
  return (
    <button
      className="btn btn-outline-primary"
      onClick={() => actionOnPost(props.item.id, "like")}
    >
      <span>{props.item.likes} </span>Likes
    </button>
  );
}
export default LikeBtn;
