

$(function () {
    document.getElementById("username").append(sessionStorage.getItem('name'));

});

document.querySelector('a#logout').addEventListener('click', function(event) {
    event.preventDefault();
    sessionStorage.removeItem('jwt');
});