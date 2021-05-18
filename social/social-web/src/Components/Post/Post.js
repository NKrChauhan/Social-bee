import LikeBtn from "../Generics/LikeBtn";
import Share from "../Generics/ShareBtn";

function Post(props) {
  return (
    <div
      className="container"
      style={{
        color: "black",
        backgroundColor: "wheat",
        padding: "20px",
        borderRadius: "2%",
        boxShadow: "mediumvioletred",
      }}
      key={props.index}
    >
      <div className="row">
        <div className="col-md-2">{props.item.user}</div>
      </div>
      <br />
      <p className="lead">{props.item.content}</p>
      {props.item.og_post && props.level < 1 ? (
        <div className="container border border-white border-top-0 my-3">
          <Post
            item={props.item.og_post}
            index={props.index + "-child"}
            level={props.level + 1}
          />
        </div>
      ) : (
        ""
      )}
      <LikeBtn item={props.item} />
      <Share item={props.item} />
    </div>
  );
}
export default Post;
