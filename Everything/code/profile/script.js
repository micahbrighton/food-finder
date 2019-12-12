

$(function () {
    axios.get('http://localhost:3000/private/Recipes/',

                                {
                                    headers: { Authorization: "Bearer " + sessionStorage.getItem('jwt') }


                                }).then((response) => {
                                    for(var i=0;i<response.data.result.length;i++){
                                        axios.get('http://localhost:3000/private/Recipes/' + response.data.result[i] + '/modal',

                                {
                                    headers: { Authorization: "Bearer " + sessionStorage.getItem('jwt') }


                                }).then((response) => {
                                    let p = document.createElement("p");
                                    p.innerHTML = response.data.result
                                    document.getElementById('boxFeed').append(p);
                                    
                                    console.log(response.data.result)


                                }).catch((error) => { console.log(error); bool = false; })
                                    }
                                    


                                }).catch((error) => { console.log(error); bool = false; });

});

window.onload=function(){
    document.querySelector("a#logout").addEventListener('click', function(event) {
        event.preventDefault();
        sessionStorage.clear();
        location.href = '/index.html';
    });
}