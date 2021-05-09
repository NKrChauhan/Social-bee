function parseAllContent(jsonobjects) {
  var finalFeeds = "";
  for (var i = 0; i < jsonobjects.length; i++) {
    var el = jsonobjects[i];
    finalFeeds = parseContent(el) + finalFeeds;
  }
  return finalFeeds;
}
const postlist = document.getElementById("post-list");
loadPosts()

function parseContent(el){
  var element =  "<div class='container'style='color: white;background-color: rgba(255, 166, 0, 0.686);padding: 20px;border-radius: 2%;box-shadow: mediumvioletred;'><div class='row'><div class='col-md-2'>" +
  el.user +
  "</div></div><hr /><div class='d-flex justify-content-center'>" +
  el.content +
  "</div></div><br>"
  return element
}

function loadPosts(){
  var xhr = new XMLHttpRequest();
  const method = "GET";
  const url = "/feeds";
  const responseType = "json";
  xhr.responseType = responseType;
  xhr.open(method, url);
  xhr.onload = function () {
    var serverRes = xhr.response;
    postlist.innerHTML = parseAllContent(serverRes);
  };
  xhr.send();
}
function clearTextArea(){
  document.getElementById("text-content").value = ""
}

document.getElementById("form-post").addEventListener("submit", function (event) {
  event.preventDefault();
  const myForm = event.target
  const myFormData = new FormData(myForm)
  const url = myForm.getAttribute("action")
  const method = myForm.getAttribute("method")
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.onload = function() {
      const serverResponse = xhr.response
      const obj = JSON.parse(serverResponse);
      postlist.innerHTML = parseContent(obj)+ postlist.innerHTML
      clearTextArea()
    }
  xhr.send(myFormData)
});
