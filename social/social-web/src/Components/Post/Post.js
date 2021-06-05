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
      {props.item.content ? <br /> : ""}
      {props.item.og_post && props.level < 1 ? (
        <div className="container border border-white my-3">
          <span
            className="lead"
            style={{
              float: "left",
              fontWeight: "120",
              color: "grey",
              fontSize: "13px",
            }}
          >
            Reposted
          </span>
          <Post
            item={props.item.og_post}
            index={props.index + "-child"}
            level={props.level + 1}
          />
        </div>
      ) : (
        ""
      )}
      {props.level <= 0 && (
        <>
          <LikeBtn item={props.item} />
          <span className="mx-2"> </span>
          <Share item={props.item} sharecallback={props.sharecallback} />
        </>
      )}
    </div>
  );
}
export default Post;
