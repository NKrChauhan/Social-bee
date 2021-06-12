function ChildPost(props) {
  const post = props.item !== undefined ? props.item : {};
  const showDetails = () => {
    window.location.href = `/post/${post.id}`;
  };
  return (
    <div className="container my-3 border border-black">
      <span
        className="lead"
        style={{
          float: "left",
          fontWeight: "120",
          color: "grey",
          fontSize: "13px",
          padding: "1%",
        }}
      >
        Reposted
      </span>
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={showDetails}
        style={{ float: "inline-end", margin: "1%" }}
      >
        show details
      </button>
      <div
        className="container"
        style={{
          color: "black",
          padding: "20px",
          borderRadius: "2%",
          boxShadow: "blue",
        }}
        key={props.index !== undefined ? props.index : 0}
      >
        <div className="row">
          <div className="col-md-2">{post.user}</div>
        </div>
        <br />
        <p className="lead">{post.content}</p>
        {post.content ? <br /> : ""}
      </div>
    </div>
  );
}
export default ChildPost;
