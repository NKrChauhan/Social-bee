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

function addRemoveClass(element,x,action){
  console.log(x)
  x.map(function(y){
    if (action === 1){
      element.classList.add(y)
    } 
    else {
      element.classList.remove(y)
    } 
  })
}

function alertOnForm(message,type){
  title = ''
  index = 0
  classNameGlyph = ["fa-check-circle","fa-exclamation-triangle"]
  classNameDiv = ["alert-success","alert-danger"]
  const alertDiv = document.getElementById("alert-div")
  const alertGlyph = document.getElementById("alert-glyph")
  if(type === 'success'){
    addRemoveClass(alertDiv,classNameDiv[1].split(" "),0)
    addRemoveClass(alertGlyph,classNameGlyph[1].split(" "),0)
    index=0
  }else {
    addRemoveClass(alertDiv,classNameDiv[0].split(" "),0)
    addRemoveClass(alertGlyph,classNameGlyph[0].split(" "),0)
    index=1
  }
  addRemoveClass(alertDiv,classNameDiv[index].split(" "),1)
  addRemoveClass(alertGlyph,classNameGlyph[index].split(" "),1)
  document.getElementById("alert-content").innerHTML = message
}

document.getElementById("form-post").addEventListener("submit", function (event) {
  event.preventDefault();
  const myForm = event.target
  const myFormData = new FormData(myForm)
  const url = myForm.getAttribute("action")
  const method = myForm.getAttribute("method")
  const xhr = new XMLHttpRequest()
  xhr.responseType = "json";
  xhr.open(method, url)
  xhr.setRequestHeader("HTTP_X_REQUESTED_WITH","XMLHttpRequest")
  xhr.setRequestHeader("X-Requested-With","XMLHttpRequest")
  xhr.onload = function() {
      const serverResponse = xhr.response
      if (xhr.status===201){
        postlist.innerHTML = parseContent(serverResponse)+ postlist.innerHTML
        clearTextArea()
        alertOnForm("post is created !",'success')
      }
      else if (xhr.status===400){
        alertOnForm(serverResponse.message,'failed')
      }else if (xhr.status ===500){
        alertOnForm(serverResponse.message,'failed')
      }else{
        alertOnForm("some problem happens !! try refreshing the page .",'failed')
      }
      xhr.onerror = function(){
        alert("you just hit the jackpot of errors... try refreshing or cache remove and try")
      }
    }
  xhr.send(myFormData)
});
