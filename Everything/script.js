var setupUserName = '';

window.onload=function(){
  document.querySelector("a#logout").addEventListener('click', function(event) {
      event.preventDefault();
      sessionStorage.clear();
      location.href = '/index.html';
  });
}
if(document.getElementById("signup")!==null){
document.querySelector('a#signup').addEventListener('click', function(event) {
    event.preventDefault();
    var modal = document.querySelector('#signupmodal.modal');
    var html = document.querySelector('html');
    modal.classList.add('is-active');
    html.classList.add('is-clipped');
  
    modal.querySelector('.modal-background').addEventListener('click', function(e) {
      e.preventDefault();
      modal.classList.remove('is-active');
      html.classList.remove('is-clipped');
    });
});
}
if(document.querySelector('a#login')!==null){
document.querySelector('a#login').addEventListener('click', function(event) {
    event.preventDefault();
    var modal = document.querySelector('#loginmodal.modal');
    var html = document.querySelector('html');
    modal.classList.add('is-active');
    html.classList.add('is-clipped');
  
    modal.querySelector('.modal-background').addEventListener('click', function(e) {
      e.preventDefault();
      modal.classList.remove('is-active');
      html.classList.remove('is-clipped');
    });
});
}

$(function () {
  const $setupForm = $('#setup-form');
  const $loginForm = $('#login-form');
  const $message = $('#message');
  const $message2 = $('#message2');


  $setupForm.submit(async function (e) {

    event.preventDefault();
    setupUserName = document.getElementById("setupUsername").value.toString();
    sessionStorage.setItem('name', document.getElementById("setupUsername").value.toString());
    var ok=true
    await axios.post('http://localhost:3000/account/create',
      {
        "name": document.getElementById("setupUsername").value.toString(),
        "pass": document.getElementById("setupPassword").value.toString(),

      }).then(() => {
        $message2.html('<span class="has-text-success">Success! You just made an account.</span>')

      }).catch(() => {
        ok=false;
        $message2.html('<span class="has-text-danger">Something went wrong and you could not make an account. Please try again.</span>');
      });
    if(ok)  {
    await axios.post('http://localhost:3000/account/login',
      {
        "name": document.getElementById("setupUsername").value.toString(),
        "pass": document.getElementById("setupPassword").value.toString(),
      }).then(response => {
        
        sessionStorage.setItem('jwt', response.data.jwt);
        //redirect
        location.href = "index2.html"
      }).catch((error) => {
        alert(error);
      });
    }
    console.log("Bearer " + sessionStorage.getItem('jwt'));
  });

  $loginForm.submit(function (e) {

    event.preventDefault();
    setupUserName = document.getElementById("username").value.toString();
    sessionStorage.setItem('name', document.getElementById("password").value.toString());
    let r = axios.post('http://localhost:3000/account/login',
      {
        "name": document.getElementById("username").value.toString(),
        "pass": document.getElementById("password").value.toString(),
      });

    r.then(response => {
      sessionStorage.setItem('jwt', response.data.jwt);
      sessionStorage.setItem('name', document.getElementById("username").value.toString());
      location.href = "code/profile/index.html"
      console.log(response);
    }).catch(error => {
      console.log(error);
    });

    r.then(() => {
      $message.html('<span class="has-text-success">Success! You are now logged in.</span>');
    }).catch(() => {
      $message.html('<span class="has-text-danger">Something went wrong and you were not logged in. Check your username and password and try again.</span>');
    });
  });
});

export default function getSetupUsername() {
  return setupUserName;
};
export var createCookie = function (name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

export function getCookie(c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      var c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}
export function eraseCookie(name) {
  createCookie(name, "", -1);
}
export function wait(ms) {
  var d = new Date();
  var d2 = null;
  do { d2 = new Date(); }
  while (d2 - d < ms);
}