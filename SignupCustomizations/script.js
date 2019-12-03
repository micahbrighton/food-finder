import getjwt, { getCookie } from "../login/script.js";
$(function () {
    const dietsList = ["gluten", "vegetarian", "vegan", "lacto-vegetarian", "ovo-vegetarian", "ketogenic", "pescetarian", "paleo", "primal", "whole30"];
    const intolerancesList = ["dairy", "egg", "gluten2", "grain", "peanut", "seafood", "sesame", "shellfish", "soy", "sulfite", "tree-nut", "wheat"];

    var userIngreds = [];
    //import getjwt() from "../login/script.js";

    function checked(id) {
        return document.getElementById(id).checked;
    }
    $(document).on("click", "#autoSubmit", function () {
        userIngreds.push(document.getElementById("myInput").value)
    });
    $(document).on("click", "#submitForm", function () {

        let userDiets = [];
        let userIntolerances = [];
        dietsList.forEach(function (element) {
            if (checked(element)) { userDiets.push(element) }
        });
        intolerancesList.forEach(function (element) {
            if (checked(element)) { userIntolerances.push(element) }
        });
        console.log(userDiets)
        console.log(userIntolerances)
        //  console.log(getCookie("jwt1"))


        // let status = axios.get('http://localhost:3000/account/status',
        //     {
        //         headers: {
        //             Authorization: "Bearer " + getCookie("jwt1")

        //         }
        //     });
        // status.then(response => {
        // console.log(getCookie("setupUserName"));
        console.log(sessionStorage.getItem('name'));
        console.log(sessionStorage.getItem('jwt'));
        axios.post('http://localhost:3000/user/data/',
            {

                "name": sessionStorage.getItem('name'),
                "data": {
                    "allergies": Array.from(userIngreds),
                    "diets": Array.from(userDiets),
                    "intolerances": Array.from(userIntolerances),
                },
            },
            {
                headers: { Authorization: "Bearer " + sessionStorage.getItem('jwt') }
                // "type": "merge"
            });


    });


    // userDiets = [];
    // userIntolerances = [];
    // userIngreds = [];

});

