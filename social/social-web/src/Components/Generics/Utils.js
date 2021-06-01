import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const axiosCallWithAuth = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "JWT ".concat(localStorage.getItem("access_token")),
    "X-CSRFToken": getCookie("csrftoken"),
  },
});

const axiosCallWithoutAuth = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosCallWithAuth.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken !== "undefined") {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosCallWithAuth
            .post("/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access_token);
              localStorage.setItem(
                "refresh_token",
                response.data.refresh_token
              );

              axiosCallWithAuth.defaults.headers["Authorization"] =
                "JWT " + response.data.access_token;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access_token;
              return axiosCallWithAuth(originalRequest);
            })
            .catch((err) => {
              // console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "login/";
      }
    }
    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

// function clearTextArea() {
//   document.getElementById("text-content").value = "";
// }

// function addRemoveClass(element, x, action) {
//   x.map(function (y) {
//     if (action === 1) {
//       return element.classList.add(y);
//     } else {
//       return element.classList.remove(y);
//     }
//   });
// }

// function alertOnForm(message, type) {
//   var index = 0;
//   var classNameGlyph = ["fa-check-circle", "fa-exclamation-triangle"];
//   var classNameDiv = ["alert-success", "alert-danger"];
//   const alertDiv = document.getElementById("alert-div");
//   const alertGlyph = document.getElementById("alert-glyph");
//   if (type === "success") {
//     addRemoveClass(alertDiv, classNameDiv[1].split(" "), 0);
//     addRemoveClass(alertGlyph, classNameGlyph[1].split(" "), 0);
//     index = 0;
//   } else {
//     addRemoveClass(alertDiv, classNameDiv[0].split(" "), 0);
//     addRemoveClass(alertGlyph, classNameGlyph[0].split(" "), 0);
//     index = 1;
//   }
//   addRemoveClass(alertDiv, classNameDiv[index].split(" "), 1);
//   addRemoveClass(alertGlyph, classNameGlyph[index].split(" "), 1);
//   document.getElementById("alert-content").innerHTML = message;
// }

// document
//   .getElementById("form-post")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     const myForm = event.target;
//     const myFormData = new FormData(myForm);
//     const url = myForm.getAttribute("action");
//     const method = myForm.getAttribute("method");
//     const xhr = new XMLHttpRequest();
//     xhr.responseType = "json";
//     xhr.open(method, url);
//     xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
//     xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
//     xhr.onload = function () {
//       const serverResponse = xhr.response;
//       if (xhr.status === 201) {
//         postlist.innerHTML = parseContent(serverResponse) + postlist.innerHTML;
//         clearTextArea();
//         alertOnForm("post is created !", "success");
//       } else if (xhr.status === 400) {
//         alertOnForm(serverResponse.message, "failed");
//       } else if (xhr.status === 500) {
//         alertOnForm(serverResponse.message, "failed");
//       } else {
//         alertOnForm(
//           "some problem happens !! try refreshing the page .",
//           "failed"
//         );
//       }
//       xhr.onerror = function () {
//         alert(
//           "you just hit the jackpot of errors... try refreshing or cache remove and try"
//         );
//       };
//     };
//     xhr.send(myFormData);
//   });

export { axiosCallWithAuth, axiosCallWithoutAuth };
