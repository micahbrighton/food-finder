

// $(async function () {
//     document.getElementById("username").append(sessionStorage.getItem('name'));

//     var savedRecipesArr = [];
//     await axios.get('http://localhost:3000/user/data',
//         {

//             headers: { Authorization: "Bearer " + sessionStorage.getItem('jwt') }

//         }).then((response) => {
//             console.log(response);
//             for (let i = 0; i < response.data.result.rohan.data.savedRecipes.length; i++) {

//                 savedRecipesArr.push(savedRecipes[i]);
//                 //    $("#boxFeed").append(savedRecipes[i]);
//             }
//         }).catch((error) => { console.log(error); });
//     for (let j = 0; j < savedRecipesArr.length; j++) {
//         axios.get('http://localhost:3000/public/Recipes/' + savedRecipesArr[j],
//             {

//                 //   headers: { Authorization: "Bearer " + sessionStorage.getItem('jwt') }

//             }).then((response) => {
//                 console.log(response);
//                 // document.getElementById("boxFeed").innerHTML = response.data.result.modal
//                 let p = document.createElement("p");
//                 p.innerHTML = response.data.result.modal
//                 document.getElementById('boxFeed').append(p);


//             }).catch((error) => { console.log(error); });



//     }


// });

// window.onload=function(){
//     document.querySelector("a#logout").addEventListener('click', function(event) {
//         event.preventDefault();
//         sessionStorage.setItem('jwt', null);
//         sessionStorage.setItem('name', null);
//         location.href = '/index.html';
//     });
//}