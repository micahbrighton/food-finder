var userJWT = ''
var setupUserName = '';
//export default { userJWT };

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
$(function () {
  const $setupForm = $('#setup-form');
  const $loginForm = $('#login-form');
  const $message = $('#message');
  const $message2 = $('#message2');

  if (getCookie("jwt1") != null) {
    eraseCookie("jwt1")
  }

  function wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while (d2 - d < ms);
  }

  $setupForm.submit(async function (e) {

    event.preventDefault();
    //console.log(document.getElementById("setupUsername").value.toString());
    setupUserName = document.getElementById("setupUsername").value.toString();
    sessionStorage.setItem('name', document.getElementById("setupUsername").value.toString());
    // console.log(getSetupUsername());
    await axios.post('http://localhost:3000/account/create',
      {
        "name": document.getElementById("setupUsername").value.toString(),
        "pass": document.getElementById("setupPassword").value.toString(),
        "data": {
          "allergies": [],
          "diets": [],
          "intolerances": [],
        }
      }).then(() => {
        $message2.html('<span class="has-text-success">Success! You just made an account.</span>')

        //new user

      }).catch(() => {
        $message2.html('<span class="has-text-danger">Something went wrong and you could not make an account. Please try again.</span>');
      });

    await axios.post('http://localhost:3000/account/login',
      {
        "name": document.getElementById("setupUsername").value.toString(),
        "pass": document.getElementById("setupPassword").value.toString(),
      }).then(response => {
        //console.log(response);
        userJWT = response.data.jwt;
        // console.log(response.data.jwt)
        sessionStorage.setItem('jwt', response.data.jwt);
        console.log(sessionStorage.getItem('name'));
        console.log(sessionStorage.getItem('jwt'));
        //document.cookie = "name=" + userJWT + ";path=/";
        // if (getCookie("setupUserName") != null) {
        //   eraseCookie("setupUserName")
        // }
        // createCookie("setupUserName", document.getElementById("setupUsername").value.toString(), 1);

        // if (getCookie("jwt1") != null) {
        //   eraseCookie("jwt1")
        // }
        // createCookie("jwt1", userJWT, 1);


        // wait(10000)
        location.href = "../SignupCustomizations/index.html"

      }).catch((error) => {
        alert(error);
      });
    console.log("Bearer " + sessionStorage.getItem('jwt'));



    // headers: {
    //     Authorization: "Bearer " + userJWT

    //   },
    //   "data": {
    //     setupUserName: {},
    //   }
    // });
    //redirect
    // s.then(location.href = "../SignupCustomizations/index.html")
    // let newUser = axios.post('http://localhost:3000/user/' + setupUserName,
    //   {
    //     "data": {

    //       "allergies": [],
    //       "diets": [],
    //       "intolerances": [],

    //     },
    //   },
    //   { headers: { Authorization: "Bearer " + sessionStorage.getItem('jwt') } });
    // newUser.then(response => {
    //   console.log(response);

    // }).catch(error => {
    //   console.log(error);
    // }
    // );
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
// export default function getjwt() {
//   return userJWT;
// };
export default function getSetupUsername() {
  return setupUserName;
};