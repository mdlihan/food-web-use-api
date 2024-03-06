let form = document.querySelector("form");
let submit_btn = document.querySelector("#search-button");
let search_input = document.querySelector("#search");
let grid = document.querySelector("#grid");

(function name() {
  const getItem = localStorage.getItem("name");
  const sget = sessionStorage.getItem("name");
  search_input.value = sget;
  axios(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${getItem}`).then(
    (res) => {
      let data = res.data;
      let html = "";
      if (data.meals) {
        data.meals.forEach((e) => {
          html += `<div class="card text-center border-2 rounded-xl">
            <img class="rounded-t-xl" src="${e.strMealThumb}" alt="/IMG20240221120127.jpg">
            <h2 class="font-bold my-2">${e.strMeal}</h2>
            <button id="${e.idMeal}" type="submit" class="py-2 px-4 rounded-full bg-amber-600 text-white mb-2 border">Get Recipe</button>
           </div>`;
        });
        grid.classList.remove("notFound");
      } else {
        html = `<h1>Sorry, we didn't find any meal</h1>`;
        grid.classList.add("notFound");
      }
      grid.innerHTML = html;
    }
  );
})();

function alldata(searchvalue) {
  axios(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchvalue}`
  ).then((res) => {
    let data = res.data;
    let html = "";
    if (data.meals) {
      data.meals.forEach((e) => {
        html += `<div class="card text-center border-2 rounded-xl">
            <img class="rounded-t-xl" src="${e.strMealThumb}" alt="/IMG20240221120127.jpg">
            <h2 class="font-bold my-2">${e.strMeal}</h2>
            <button id="${e.idMeal}" type="submit" class="py-2 px-4 rounded-full bg-amber-600 text-white mb-2 border">Get Recipe</button>
           </div>`;
      });
      grid.classList.remove("notFound");
    } else {
      html = `<h1>Sorry, we didn't find any meal</h1>`;
      grid.classList.add("notFound");
    }
    grid.innerHTML = html;
  });
}
form.addEventListener("input", (e) => {
  e.preventDefault();
  const searchvalue = search_input.value.trim();
  alldata(searchvalue);
  sessionStorage.setItem("name", searchvalue);
  localStorage.setItem("name", searchvalue);
});

grid.addEventListener("click", (e) => {
  e.preventDefault();
  let data = e.target.id;
  let center_card = document.querySelector("#center-card");
  let parant = document.querySelector("#parant");
  parant.style.display = "flex";

  axios(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data}`).then(
    (res) => {
      let data = res.data.meals[0];
      center_card.innerHTML = `<div class="flex justify-end">
       <i id="x-icon" 
         class="fa-solid fa-xmark fa-2x px-2 py-1 bg-white rounded-full"
       ></i>
     </div>
     <h2 class="text-2xl font-bold">${data.strMeal}</h2>
     <button 
     
       id="dessert"
       type="submit"
       class="py-1 px-4 bg-white my-2 rounded-xl uppercase text-rose-400 font-bold"
     >
     dessert
     </button>
     <h3 class="text-xl font-bold">instructions:</h3>
     <p class="text-justify h-72 overflow-auto mt-4">${data.strInstructions}</p>

     <div class="flex justify-center items-center mt-4">
       <img
         height="96"
         width="96"
         class="rounded-full"
         src="${data.strMealThumb}"
         alt=""
       />
     </div>

     <div class="mt-8">
       <a href="${data.strYoutube}" target="_blank" class="underline text-xl">watching video</a>
     </div>`;
       let dessert=document.querySelector("#dessert");
       dessert.addEventListener('click',(e)=>{
          window.open(data.strSource)
       });
      let x_icon = document.querySelector("#x-icon");
      console.log(x_icon);
      x_icon.addEventListener("click", () => {
        parant.style.display = "none";
      });
    }
  );
});

// loding program atart
let preloading = document.querySelector("#preloading");
window.addEventListener("load", () => {
  preloading.style.display = "none";
});




(function all() {
  axios("https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2")
  .then((res)=>console.log(res))
})();