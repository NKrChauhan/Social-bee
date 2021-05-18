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

function actionOnPost(id, action) {
  var xhr = new XMLHttpRequest();
  var data = JSON.stringify({
    id: id,
    action: action,
  });
  const method = "POST";
  const url = "http://127.0.0.1:8000/api/post-action/";
  const responseType = "json";
  xhr.responseType = responseType;
  xhr.open(method, url, true);
  xhr.withCredentials = false;
  xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
  xhr.onload = function () {
    var serverRes = xhr.response;
    console.log(serverRes);
  };
  xhr.send(data);
}

function loadPosts(callback) {
  var xhr = new XMLHttpRequest();
  const method = "GET";
  const url = "http://127.0.0.1:8000/api/feeds/";
  const responseType = "json";
  xhr.responseType = responseType;
  xhr.open(method, url, true);
  xhr.withCredentials = false;
  xhr.onload = function () {
    callback(xhr.response, xhr.status);
  };
  xhr.onerror = function () {
    callback({ message: "unsuccessful request" });
  };
  xhr.send();
}

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

export { actionOnPost, loadPosts };
