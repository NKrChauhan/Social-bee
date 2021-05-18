import { actionOnPost } from "./Utils";

function Share(props) {
  return (
    <button
      className="btn btn-outline-success"
      onClick={() => actionOnPost(props.item.id, "repost")}
    >
      Share
    </button>
  );
}
export default Share;
