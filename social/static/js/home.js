function parseAllContent(jsonobjects) {
  var finalFeeds = "";
  for (var i = 0; i < jsonobjects.length; i++) {
    var el = jsonobjects[i];
    finalFeeds = parseContent(el) + finalFeeds;
  }
  return finalFeeds;
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

const postlist = document.getElementById("post-list");
loadPosts()

function actionOnPost(id,action){
  const csrftoken = getCookie('csrftoken');

}

function LikeBtn(post){
  return "<button class='btn btn-outline-primary' onclick=actionOnPost("+post.id+",'like')>"+post.likes +" Likes</button>"
}

function UnlikeBtn(post){
  return "<button class='btn btn-outline-danger' onclick=actionOnPost("+post.id+",'unlike')>UnLike</button>"
}

function SharePostBtn(post){
  return "<button class='btn btn-outline-success' onclick=actionOnPost("+post.id+",'repost')>Share</button>"
}

function parseReposts(el){
  if (el.is_repost){
    return "<div class='container border border-white border-top-0 my-3'>"+parseContent(el.og_post)+"</div>"
  }else{
    return " " 
  }
}

function parseContent(el){
  var element =  "<div class='container'style='color: black;background-color: wheat;padding: 20px;border-radius: 2%;box-shadow: mediumvioletred;'><div class='row'><div class='col-md-2'>" +
  el.user +
  "</div></div><br/><div> "+
  el.content +
  parseReposts(el)+
  "</div>"+
  LikeBtn(el)+
  " "+
  UnlikeBtn(el)+
  " "+
  SharePostBtn(el)+
  "</div><br>"
  return element
}

function loadPosts(){
  var xhr = new XMLHttpRequest();
  const method = "GET";
  const url = "/api/feeds";
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

function actionOnPost(id,action){
  var xhr = new XMLHttpRequest();
  data = JSON.stringify({
    id:id,
    action:action
  });
  const method = "POST";
  const url = "/api/post-action/";
  const responseType = "json";
  xhr.responseType = responseType;
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("X-CSRFToken",getCookie('csrftoken'))
  xhr.onload = function () {
    var serverRes = xhr.response;
    console.log(serverRes);
  };
  xhr.send(data);
}