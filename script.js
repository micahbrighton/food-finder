$(function () {
  const $setupForm = $('#setup-form');
  const $loginForm = $('#login-form');
  const $message = $('#message');



  $setupForm.submit(function (e) {

    event.preventDefault();

    let r = axios.post('http://localhost:3000/account/create',
      {
        "name": document.getElementById("setupUsername").value.toString(),
        "pass": document.getElementById("setupPassword").value.toString(),
        "data": {
          other: "data",
          pets_name: "petty",
        }
      });

    r.then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
    r.then(() => {
      $message.html('<span class="has-text-success">Success! You just made an account.</span>');
    }).catch(() => {
      $message.html('<span class="has-text-danger">Something went wrong and you could not make an account. Please try again.</span>');
    });
  });

  $loginForm.submit(function (e) {

    event.preventDefault();

    let r = axios.post('http://localhost:3000/account/login',
      {
        "name": document.getElementById("username").value.toString(),
        "pass": document.getElementById("password").value.toString(),
      });

    r.then(response => {
      console.log(response.data);
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

