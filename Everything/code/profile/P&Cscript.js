

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
        }).catch((error) => {
            console.log(error)
        });

});

const dietsList = ["gluten", "vegetarian", "vegan", "lacto-vegetarian", "ovo-vegetarian", "ketogenic", "pescetarian", "paleo", "primal", "whole30"];
    const intolerancesList = ["dairy", "egg", "gluten2", "grain", "peanut", "seafood", "sesame", "shellfish", "soy", "sulfite", "tree-nut", "wheat"];

    var userIngreds = [];

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

            }).then(location.href = "/code/profile/P&C.html"
            );
    });