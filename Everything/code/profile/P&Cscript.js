

$(function () {

    axios.get('http://localhost:3000/user/data',
        {

            headers: { Authorization: "Bearer " + sessionStorage.getItem('jwt') }

        }).then((response) => {
            console.log(response);
            for (let i = 0; i < response.data.result.diets.length; i++) {

                let diet = response.data.result.diets[i];
                document.getElementById(diet).checked = true;

            }
            for (let i = 0; i < response.data.result.intolerances.length; i++) {
                let intolerance = response.data.result.intolerances[i];
                document.getElementById(intolerance).checked = true;

            }
            for (let i = 0; i < response.data.result.allergies.length; i++) {
                enteredAllergies.push(response.data.result.allergies[i]);

                var node = document.createElement("LI");
                var textnode = document.createTextNode(response.data.result.allergies[i]);
                console.log(textnode.nodeValue)       // Create a text node
                node.appendChild(textnode);                              // Append the text to <li>
                var deleteIcon = document.createElement('span')
                deleteIcon.innerHTML = ('<span class="delete" id="icon-minus">X</span>');
                node.setAttribute('class', 'enteredA')
                node.appendChild(deleteIcon);


                console.log(document.getElementById("list2"))
                document.getElementById("list2").appendChild(node);     // Append <li> to <ul> with id="myList"




                $('.delete').on('click', function () {

                    console.log($(this).parent().parent()[0].childNodes[0].data);
                    let removedIngredient = $(this).parent().parent()[0].childNodes[0].data;

                    for (var i = 0; i < enteredAllergies.length; i++) {
                        if (enteredAllergies[i] === removedIngredient) {
                            enteredAllergies.splice(i, 1);
                        }
                    }
                    console.log(enteredAllergies);
                    $(this).parent().parent().remove();

                });

            }
            const dietsList = ["gluten", "vegetarian", "vegan", "lacto-vegetarian", "ovo-vegetarian", "ketogenic", "pescetarian", "paleo", "primal", "whole30"];
    const intolerancesList = ["dairy", "egg", "gluten2", "grain", "peanut", "seafood", "sesame", "shellfish", "soy", "sulfite", "tree-nut", "wheat"];

    function checked(id) {
        return document.getElementById(id).checked;
    }
    // $(document).on("click", "#autoSubmit", function () {
    //     enteredAllergies.push(document.getElementById("myInput2").value)
    // });
    $(document).on("click", "#submitForm", function () {
        // alert(enteredAllergies)
        let userDiets = [];
        let userIntolerances = [];
        dietsList.forEach(function (element) {
            if (checked(element)) { userDiets.push(element) }
        });
        intolerancesList.forEach(function (element) {
            if (checked(element)) { userIntolerances.push(element) }
        });
        var allergiesToAppend=[]
        var ul=document.getElementById("list2")
                                var items = ul.getElementsByTagName("li");
                                for (var i = 0; i < items.length; ++i) {
                                    allergiesToAppend.push(items[i].innerHTML.split('<')[0]);
                                }
        axios.post('http://localhost:3000/user/data/',
            {

                "name": sessionStorage.getItem('name'),
                "data": {
                    "allergies": Array.from(allergiesToAppend),
                    "diets": Array.from(userDiets),
                    "intolerances": Array.from(userIntolerances),
                },
            },
            {
                headers: { Authorization: "Bearer " + sessionStorage.getItem('jwt') }

            }).then(location.href = "/code/profile/P&C.html"
            );
    });
        }).catch((error) => {
            console.log(error)
        });

});
// const dietsList = ["gluten", "vegetarian", "vegan", "lacto-vegetarian", "ovo-vegetarian", "ketogenic", "pescetarian", "paleo", "primal", "whole30"];
//     const intolerancesList = ["dairy", "egg", "gluten2", "grain", "peanut", "seafood", "sesame", "shellfish", "soy", "sulfite", "tree-nut", "wheat"];

//     function checked(id) {
//         return document.getElementById(id).checked;
//     }
//     // $(document).on("click", "#autoSubmit", function () {
//     //     enteredAllergies.push(document.getElementById("myInput2").value)
//     // });
//     $(document).on("click", "#submitForm", function () {
//         // alert(enteredAllergies)
//         let userDiets = [];
//         let userIntolerances = [];
//         dietsList.forEach(function (element) {
//             if (checked(element)) { userDiets.push(element) }
//         });
//         intolerancesList.forEach(function (element) {
//             if (checked(element)) { userIntolerances.push(element) }
//         });

//         axios.post('http://localhost:3000/user/data/',
//             {

//                 "name": sessionStorage.getItem('name'),
//                 "data": {
//                     "allergies": Array.from(enteredAllergies),
//                     "diets": Array.from(userDiets),
//                     "intolerances": Array.from(userIntolerances),
//                 },
//             },
//             {
//                 headers: { Authorization: "Bearer " + sessionStorage.getItem('jwt') }

//             }).then(location.href = "/code/profile/P&C.html"
//             );
//     });