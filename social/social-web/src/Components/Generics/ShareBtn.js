import { axiosCallWithAuth } from "./Utils";
import swal from "sweetalert";

function Share(props) {
  const handleShare = () => {
    var data = {
      id: props.item.id,
      action: "share",
    };
    axiosCallWithAuth
      .post("post-action/", data)
      .then((res) => {
        console.log(res);
        if (res.data.message === "Shared") {
          if (props.sharecallback) {
            props.sharecallback(res.data.post_obj);
          } else {
            swal("Prompt", "The post is shared !");
          }
        } else {
          swal("Error", "Something went wrong");
        }
      })
      .catch((e) => {
        console.log(e);
        swal("Error", "Something went wrong.are you logged in ?");
      });
  };
  return (
    <button className="btn btn-outline-success" onClick={handleShare}>
      Share
    </button>
  );
}
export default Share;
