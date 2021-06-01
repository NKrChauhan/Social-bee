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
        if (res.data.message === "Shared") {
          window.location.href = "/";
        } else {
          swal("Error", "Something went wrong");
        }
      })
      .catch((e) => {
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
