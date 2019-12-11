window.onload=function(){
    document.querySelector("a#logout").addEventListener('click', function(event) {
        event.preventDefault();
        sessionStorage.setItem('jwt', null);
        sessionStorage.setItem('name', null);
        location.href = '/index.html';
    });
}