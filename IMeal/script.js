const header = document.getElementsByTagName("header")[0];
const bot = document.getElementsByClassName("bot")[0];
const parent = document.getElementsByClassName("parent")[0];
const homediv = document.getElementsByClassName("home")[0];

const home = document.getElementById("home");
const about = document.getElementById("about");

// header
let ele, left, width;
const makeHeader = () => {
  if (window.scrollY > 25) {
    header.classList.add("head_bg");
  } else {
    header.classList.remove("head_bg");
  }
};

const movebottom = (e) => {
  ele = e.target;
  move();
};

const firstmovebottom = () => {
  ele = home;
  move();
};

const move = () => {
  left = ele.offsetLeft;
  wid = ele.clientWidth;

  bot.style.width = wid + "px";
  bot.style.left = left + "px";
};

about.addEventListener("click", movebottom);
home.addEventListener("click", movebottom);
window.addEventListener("scroll", makeHeader);
window.addEventListener("resize", move);
firstmovebottom();

// res menu
const menu = document.getElementsByClassName("humberger")[0];
const res_hum = document.getElementsByClassName("res-hum")[0];
const des = document.querySelectorAll(".ds");

const showMenuBar = () => {
  res_hum.classList.toggle("show-hum");
  if (header.classList.contains("head_bg")) {
    header.classList.remove("head_bg");
  }
  if (!res_hum.classList.contains("show-hum")) {
    header.classList.add("head_bg");
  }
  menuAni();
};

const menuAni = () => {
  for (let i = 0; i < des.length; i++) {
    des[i].classList.toggle("show");
  }
  des[1].classList.toggle("mid");
};

menu.addEventListener("click", showMenuBar);

// for menu

const btn = document.getElementsByClassName("btn")[0];
btn.addEventListener("click", () => {
  bot.style.width = 0 + "px";
});

const find = document.getElementById("find");
const home_1 = document.getElementById("home_1");
const about_1 = document.getElementById("about_1");

home_1.addEventListener("click", showMenuBar);
about_1.addEventListener("click", showMenuBar);
find.addEventListener("click", showMenuBar);

/**
 * Preloader
 */
let preloader = document.getElementById("preloader");
if (preloader) {
  window.addEventListener("load", () => {
    preloader.remove();
  });
}

// for mealn

let search;
let searchbtn;
let result;
let searchinfo;
let body;
let overlay;
let random;
let clickable;

async function searchMeal(searchterm) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchterm}`
  );
  const data = await res.json();
  if (data.meals == null) {
    searchinfo.textContent = `Sorry, no result for '${searchterm}'`;
  } else {
    showMeal(data, searchterm);
  }
}

async function getMealInfo(mealID) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );

  const data = await res.json();
  const meal = data.meals[0];
  showMealInfo(meal);
}

const showMeal = (data, searchterm) => {
  searchinfo.textContent = `Search results for '${searchterm}'`;
  result.innerHTML = data.meals
    .map(
      (meal) =>
        `<div id="meal"><img src="${meal.strMealThumb}"/><p class="meal-info" data-id=${meal.idMeal}>${meal.strMeal}</p></div>`
    )
    .join("");
};

const showMealInfo = (meal) => {
  body.style.overflow = "hidden";
  overlay.style.display = "block";
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }

    overlay.innerHTML = `
    <div class="single-meal-info" id="meal-info close">
    <i class="fa-solid fa-square-xmark" id="cl" onclick="closeFun()"></i>
    <img src="${meal.strMealThumb}" />
    <strong>${meal.strCategory ? `<i>${meal.strCategory}</i>` : ""}
    ${meal.strArea ? `<i>${meal.strArea}</i>` : ""}</strong>
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>
  <ul class = "mea">
    ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
  </ul>
  <div class="footer">Design and developed by <span>Swam Yee Htut</span></div>
</div>

    `;
  }
};
function showSearchNoti() {
  searchinfo.style.display = "block";
}

function randomMeal() {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data;

      showMeal(meal, "Random");
    });
}

const closeFun = () => {
  overlay.style.display = "none";
  body.style.overflow = "auto";
  // close.style.display = "none";
};
const closeOverlay = (e) => {
  if (e.srcElement.classList.contains("close")) {
    closeFun();
  }
};
