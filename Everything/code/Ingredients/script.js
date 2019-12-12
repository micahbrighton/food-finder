window.onload=function(){
    document.querySelector("a#logout").addEventListener('click', function(event) {
        event.preventDefault();
        sessionStorage.clear()
        location.href = '/index.html';
    });
}