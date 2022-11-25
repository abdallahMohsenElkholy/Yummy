search('')

let inp0 = document.getElementById('inp0')
let inp1 = document.getElementById('inp1')
let inp2 = document.getElementById('inp2')
let inp3 = document.getElementById('inp3')
let inp4 = document.getElementById('inp4')
let inp5 = document.getElementById('inp5')
let inp6 = document.getElementById('inp6')
let inp7 = document.getElementById('inp7')
let width = $('.menue').outerWidth()
let boo = true

//NAV//////////////////////////////
$('#nav').css({ 'left': -width + 'px' })
$('.nav-bar .icon i').click(changeNav)
function changeNav() {
    width = $('.menue').outerWidth()
    if (boo) {
        $('.fa-bars').addClass("fa-times")
        $('#nav').animate({ 'left': '0' }, 500), $("#nav .link1").animate({
            'opacity': "1",
            'paddingTop': "20px"
        }, 1000)
        $("#nav .link2").animate({
            'opacity': "1",
            'paddingTop': "20px"
        }, 1100)
        $("#nav .link3").animate({
            'opacity': "1",
            'paddingTop': "20px"
        }, 1200)
        $("#nav .link4").animate({
            'opacity': "1",
            'paddingTop': "20px"
        }, 1300)
        $("#nav .link5").animate({
            'opacity': "1",
            'paddingTop': "20px"
        })
        boo = !boo

    } else {
        $('.fa-bars').removeClass("fa-times")
        $('#nav').animate({ 'left': -width + 'px' }, 500)
        $(".menue li").animate({
            'opacity': "0",
            'paddingTop': "500px"
        }, 1000)
        boo = !boo
    }
}
////////////

inp0.addEventListener('input', function () {
    userNameValid(this)
    isValid()
})
inp1.addEventListener('input', function () {
    userEmailValid(this)
    isValid()
})
inp2.addEventListener('input', function () {
    userPhoneValid(this)
    isValid()
})
inp3.addEventListener('input', function () {
    userAgeValid(this)
    isValid()
})
inp4.addEventListener('input', function () {
    userPasswordValid(this)
    isValid()
})
inp5.addEventListener('input', function () {
    userRePasswordValid(this)
    isValid()
})
inp6.addEventListener('input', function () {
    $('#searchRow').css('display', 'flex')
    search(this.value)
})
inp7.addEventListener('input', function () {
    searchLetter(this.value)
})

function isValid() {
    if (userNameValid(inp0) && userEmailValid(inp1) && userPhoneValid(inp2) && userAgeValid(inp3) && userPasswordValid(inp4) && userRePasswordValid(inp5)) {
        document.getElementById("submitBtn").removeAttribute("disabled")
    } else {
        document.getElementById("submitBtn").setAttribute("disabled", "true")
    }
}




//AJAX//////////////////////
let meals = []
let mealsByid = []
async function search(meal) {
    $(".loading-page").fadeIn(100)
    meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    meals = await meals.json()
    meals = meals.meals
    $(".loading").fadeOut(200)
    displayMeals()

}
async function searchLetter(letter) {
    letter == '' ? letter = 'a' : letter = letter;
    $(".loading-page").fadeIn(100)
    meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    meals = await meals.json()
    meals = meals.meals
    displayMeals()


}
async function getById(id) {
    mealsByid = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    mealsByid = await mealsByid.json()
    mealsByid = await mealsByid.meals
    return mealsByid



}
async function getCategories() {
    meals = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    meals = await meals.json()
    meals = meals.categories
    displayCategory()

}
async function getArea() {
    meals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    meals = await meals.json()
    meals = meals.meals
    displayArea()

}
async function getIngredients() {
    meals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    meals = await meals.json()
    meals = meals.meals
    displayIngredients()

}
async function filterCatAre(x, y) {
    $('body').css({ overflow: 'hidden' })
    $(".loading-page").fadeIn(50)
    meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${x}=${y}`)
    meals = await meals.json()
    meals = meals.meals
    $('#categoryPage').css('display', 'none')
    $('#areaPage').css('display', 'none')
    $('#ingredientsPage').css('display', 'none')
    $('#lastPage').css('display', 'block')
    $('body').css({ overflow: 'visible' })
    displayMeals()

}



function userNameValid(inp0) {
    if (/^[a-zA-Z ]+$/.test(inp0.value)) {
        $('#err0').fadeOut(500)
        $('#inp0').addClass('border-success')
        document.getElementById('inp0').classList.replace('border-danger', 'border-success')
        return true
    } else {
        $('#err0').fadeIn(500)
        $('#inp0').addClass('border-danger')
        document.getElementById('inp0').classList.replace('border-success', 'border-danger')
        return false
    }
}

function userEmailValid(inp1) {
    if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inp1.value)) {
        $('#err1').fadeOut(500)
        $('#inp1').addClass('border-success')
        document.getElementById('inp1').classList.replace('border-danger', 'border-success')
        return true
    } else {
        $('#err1').fadeIn(500)
        $('#inp1').addClass('border-danger')
        document.getElementById('inp1').classList.replace('border-success', 'border-danger')
        return false
    }

}

function userPhoneValid(inp2) {
    if (/^2?(010|011|012|015)[0-9]{8}$/.test(inp2.value)) {
        $('#err2').fadeOut(500)
        $('#inp2').addClass('border-success')
        document.getElementById('inp2').classList.replace('border-danger', 'border-success')
        return true
    } else {
        $('#err2').fadeIn(500)
        $('#inp2').addClass('border-danger')
        document.getElementById('inp2').classList.replace('border-success', 'border-danger')
        return false
    }
}

function userAgeValid(inp3) {
    if (/^[1-9][0-9]?$|^100$/.test(inp3.value)) {
        $('#err3').fadeOut(500)
        $('#inp3').addClass('border-success')
        document.getElementById('inp3').classList.replace('border-danger', 'border-success')
        return true
    } else {
        $('#err3').fadeIn(500)
        $('#inp3').addClass('border-danger')
        document.getElementById('inp3').classList.replace('border-success', 'border-danger')
        return false
    }
}

function userPasswordValid(inp4) {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(inp4.value)) {
        $('#err4').fadeOut(500)
        $('#inp4').addClass('border-success')
        document.getElementById('inp4').classList.replace('border-danger', 'border-success')
        return true
    } else {
        $('#err4').fadeIn(500)
        $('#inp4').addClass('border-danger')
        document.getElementById('inp4').classList.replace('border-success', 'border-danger')
        return false
    }

}

function userRePasswordValid(inp5) {
    if (inp5.value == inp4.value) {
        $('#err5').fadeOut(500)
        $('#inp5').addClass('border-success')
        document.getElementById('inp5').classList.replace('border-danger', 'border-success')
        return true
    } else {
        $('#err5').fadeIn(500)
        $('#inp5').addClass('border-danger')
        document.getElementById('inp5').classList.replace('border-success', 'border-danger')
        return false
    }

}

//links listning//////////////
$("#nav a").click(async (e) => {
    $('body').css({ overflow: 'hidden' })
    $(".loading-page").fadeIn(100)
    let listBy = e.target.getAttribute("href")
    changeNav()
    $('#mainPage').css('display', 'none')

    if (listBy == "#Contact") {
        $('body').css({ overflow: 'visible' })
        $('#lastPage').css('display', 'none')
        $('#search').css('display', 'none')
        $('#categoryPage').css('display', 'none')
        $('#ingredientsPage').css('display', 'none')
        $('#areaPage').css('display', 'none')
        $(".loading-page").fadeOut(0)
        $('#contact').css('display', 'block')


    }
    if (listBy == "#Search") {
        $('#lastPage').css('display', 'none')
        $('#contact').css('display', 'none')
        $('#categoryPage').css('display', 'none')
        $('#ingredientsPage').css('display', 'none')
        $('#areaPage').css('display', 'none')
        $('#search').css('display', 'block')
        $(".loading-page").fadeOut(200)


    }
    if (listBy == "#Category") {
        $('#lastPage').css('display', 'none')
        $('#search').css('display', 'none')
        $('#contact').css('display', 'none')
        $('#ingredientsPage').css('display', 'none')
        $('#areaPage').css('display', 'none')
        $('#categoryPage').css('display', 'block')
        getCategories()


    }
    if (listBy == "#Area") {
        $('#lastPage').css('display', 'none')
        $('#search').css('display', 'none')
        $('#contact').css('display', 'none')
        $('#ingredientsPage').css('display', 'none')
        $('#categoryPage').css('display', 'none')
        $('#areaPage').css('display', 'block')
        getArea()


    }
    if (listBy == "#Ingredients") {
        $('#lastPage').css('display', 'none')
        $('#search').css('display', 'none')
        $('#contact').css('display', 'none')
        $('#areaPage').css('display', 'none')
        $('#categoryPage').css('display', 'none')
        $('#ingredientsPage').css('display', 'block')
        getIngredients()


    }

})





async function displayMeals() {
    let cartona = ``
    let box = ``
    let mealsArr = []
    for (let i = 0; i < meals.length; i++) {
        mealsArr = await getById(meals[i].idMeal);
        let recipes = ``
        let getId = mealsArr[0]
        for (let i = 0; i < 19; i++) {
            if (getId[`strIngredient${i}`]) {
                recipes += `<div class="div rounded">${getId[`strMeasure${i}`]} ${getId[`strIngredient${i}`]}</div>`
            }

        }
        cartona +=
            `
        <div class="col-md-6">
            <div class="modal fade" id="exampleModal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="w-85 modal-dialog">
                    <div class="bg-dark modal-content">
                    <button type="button" class="btn-close bg-danger ms-auto me-3 mt-3" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="row mt-1 p-2" id="rowData">
                            <div class="col-md-4 text-white">
                                            <img class="w-100 rounded-circle" src="${mealsArr[0].strMealThumb}" alt="" srcset=""><br>
                                            <h1 class='text-center'>${mealsArr[0].strMeal}</h1>
                                        </div>
                                        <div class="col-md-8 text-white ms-1 text-left">
                                            <h2>Instructions</h2>
                                            <p>${mealsArr[0].strInstructions}</p>
                                            <p><b class="fw-bolder">Area :</b> Italian</p>
                                            <p><b class="fw-bolder">Category :</b> Pasta</p>
                                            <h3>Recipes :</h3>
                                            <div class="row">
                                            ${recipes}
                                            </div>
                                            
                        
                                            <h3 class="my-2 mx-1 p-1">Tags :</h3>
                                            <ul class="d-flex " id="tags"></ul>
                        
                                            
                                            <a class="btn btn-success text-white" target="_blank" href="${meals[i].strSource}">Source</a>
                                            <a class="btn  text-white" target="_blank" href="${meals[i].strYoutube}">Youtub</a>
                                        </div></div>
                    </div>
                </div>
            </div>
            </div>
        `
        box += `
        <div class='col-md-4 col-sm-6 col-lg-3'>
                        <div data-bs-toggle="modal" data-bs-target="#exampleModal${i}" class="card rounded-3 overflow-hidden">
                            <img src="${meals[i].strMealThumb}" class="w-100" alt="">
                            <div class="layer position-absolute bg-white bg-opacity-75 d-flex align-items-center justify-content-center">
                                <p class="info">${meals[i].strMeal}</p>
                            </div>
                        </div>
                    </div>
        `

    }


    document.getElementById('searchRow').innerHTML = box
    document.getElementById('defRow').innerHTML = box
    document.getElementById('lastRow').innerHTML = box
    document.getElementById("mod").innerHTML = cartona
    $(".loading-page").fadeOut(100)
    $('body').css({ overflow: 'visible' })

}

function displayCategory() {
    let catArr = []
    let box = ``
    for (let i = 0; i < meals.length; i++) {
        catArr.push(`cat${i}`)
        box += `
        <div class="col-lg-3 col-md-4 col-sm-6">
                    <div id='cat${i}' class="shadow card rounded-3 overflow-hidden">
                        <img src="${meals[i].strCategoryThumb}" class="bg-mine w-100" alt="">
                        <div class="layer position-absolute bg-white bg-opacity-75 text-center p-3">
                            <h5 class="info">${meals[i].strCategory}</h5>
                            <p>${meals[i].strCategoryDescription}</p>
                        </div>
                    </div>
                </div>
        `
    }

    document.getElementById('categoryRow').innerHTML = box
    $(".loading-page").fadeOut(200)
    $('body').css({ overflow: 'visible' })
    catArr.forEach(cat => { $(`#${cat}`).click(function (e) { filterCatAre('c', $(`#${cat} h5`).html()) }) })

}

function displayArea() {
    let areArr = []
    let box = ``
    for (let i = 0; i < meals.length; i++) {
        areArr.push(`are${i}`)
        box += `
        <div id='are${i}' class="col-md-6 col-lg-3 my-3  shadow">
        <div class="movie shadow rounded position-relative">
            <div class="text-center">
                <i class="text-danger fa-solid fa-city fa-3x"></i>
                <h2 class="text-white">${meals[i].strArea}</h2>
            </div>
        </div>
    </div>
        `
    }
    document.getElementById('areaRow').innerHTML = box
    areArr.forEach(are => { $(`#${are}`).click(function (e) { filterCatAre('a', $(`#${are} h2`).html()) }) })
    $(".loading-page").fadeOut(200)
    $('body').css({ overflow: 'visible' })
}

function displayIngredients() {
    let ingArr = []
    let box = ``
    for (let i = 0; i < 20; i++) {
        ingArr.push(`ing${i}`)
        box += `
        <div id='ing${i}' class="col-md-4 col-lg-3 my-3  shadow">
        <div class="movie shadow rounded position-relative">
            <div class="text-center">
            <i class="fa-solid fa-utensils fa-3x"></i>
            <h2 class="text-white">${meals[i].strIngredient}</h2>
            <p class="text-white">${(meals[i].strDescription).split(' ').slice(0, 20).join(' ')}</p>
            </div>
        </div>
    </div>
        `
    }
    document.getElementById('ingredientsRow').innerHTML = box
    ingArr.forEach(ing => { $(`#${ing}`).click(function (e) { filterCatAre('i', $(`#${ing} h2`).html()) }) })
    $(".loading-page").fadeOut(200)
    $('body').css({ overflow: 'visible' })
}


