search = document.getElementById("search");
searchbtn = document.getElementById("search-btn");
result = document.getElementsByClassName("result")[0];
searchinfo = document.getElementsByClassName("searchinfo")[0];
body = document.getElementsByTagName("body")[0];
overlay = document.getElementById("overlay");
random = document.getElementById("Random");

clickable = false;

searchbtn.addEventListener("click", () => {
  result.innerHTML = "";
  const searchterm = search.value.trim();
  if (searchterm !== "") {
    searchinfo.textContent = `Searching....`;
    showSearchNoti();
    searchMeal(searchterm);
    search.value = "";
  } else {
    alert("please enter text!");
    searchinfo.textContent = "";
  }
});

result.addEventListener("click", (e) => {
  const info = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (info) {
    const mealID = info.getAttribute("data-id");
    getMealInfo(mealID);
  }
});

overlay.addEventListener("click", closeOverlay);

random.addEventListener("click", () => {
  searchinfo.textContent = `Randoming`;
  showSearchNoti();
  randomMeal();
});
