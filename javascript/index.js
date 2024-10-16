// load all meals

const loadMeals = async (searchText) => {
  const fetchedData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${
      searchText ? `${searchText}` : ""
    }`
  );
  const response = await fetchedData.json();

  displayMeals(false, response.meals);
  document.getElementById("view-more").addEventListener("click", () => {
    displayMeals(true, response.meals);
  });
};

const displayMeals = (isAll, meals) => {
  const allMealsContainer = document.getElementById("meals-container");
  allMealsContainer.innerHTML = "";
  document.getElementById("view-more").classList.add("hidden");

  if (!meals) {
    allMealsContainer.classList.remove("lg:grid-cols-2");
    const div = document.createElement("div");
    div.innerHTML = `
  <h1 class="text-red-500 font-bold text-center md:text-3xl">Opps There is no meal available</h1>
  
  
  `;
    allMealsContainer.append(div);
  }

  if (meals.length < 6) {
    document.getElementById("view-more").classList.add("hidden");
  } else {
    allMealsContainer.classList.add("lg:grid-cols-2");
    document.getElementById("view-more").classList.remove("hidden");
  }
  let allmeals;
  if (isAll) {
    allmeals = meals;
    document.getElementById("view-more").classList.add("hidden");
  } else {
    allmeals = meals.slice(0, 6);
  }

  allmeals.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "flex-col",
      "md:flex-row",
      "gap-3",
      
      "items-center",
      "border",
      "rounded-lg",
      "py-3",
      "px-2"
    );
    let { strMeal, strMealThumb, idMeal } = meal;
    div.innerHTML = `
   
   <img class="w-72" src=${strMealThumb}>
   <div>
   <h1 class="text-2xl font-bold text-center md:text-left">${strMeal}</h1>
   <p class="text-lg text-justify my-3 text-[#706f6f]">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, eius. Ratione perspiciatis quos vel nemo sequi unde at tenetur voluptatem architecto reiciendis! Numquam, </p>

<div class="md:text-left text-center"><button onclick="loadModalData('${idMeal}')" class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">View Details</button></div>

   </div>
   
   </div>
   
   `;
    allMealsContainer.appendChild(div);
  });
};

//load modal

const loadModalData = async (id) => {
  const mealID = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const converData = await mealID.json();
  console.log(converData.meals);
  displayModal(converData.meals);
};

const displayModal = (mealData) => {
  let [firstMeal] = mealData;
  console.log(firstMeal);
  let { strMeal, strCategory, strArea, strMealThumb, strYoutube } = firstMeal;
  const modalContent = document.getElementById("modal-content");

  modalContent.classList.add("p-3", "rounded-lg");

  modalContent.innerHTML = `
  <dialog id="customModal" class="modal">
    <div class="modal-box">
      <h3 class="text-lg md:text-2xl lg:text-3xl font-bold my-2">${strMeal}</h3>
      <img class="rounded-lg" src=${strMealThumb}>
  
    ${
      strCategory
        ? `Category:<span class="py-2 font-medium text-lg"> ${strCategory}</span>`
        : "N/A"
    }
    <p class="text-lg text-justify my-3">Discover our top-rated recipes, handpicked by food lovers just like you! Whether you're looking for quick dinners, healthy snacks, or gourmet treats, we have something for every craving.</p>
      ${
        strYoutube
          ? `YouTube:<a href=${strYoutube} class="font-medium text-lg"> Click here</a>`
          : "N/A"
      }
    
      <div class="modal-action block w-full">
        <form method="dialog">
     <button class="btn  w-full">Close</button>
      </form>
      </div>
    </div>
  </dialog>
  
    `;
  customModal.showModal();
};

// load food category data

const loadCategory = async () => {
  const fetchCategory = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const response = await fetchCategory.json();
  displayCategory(response.categories.slice(0, 12));
};

const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((category) => {
    // console.log(category);
    let { strCategory, strCategoryThumb } = category;
    const div = document.createElement("div");
    div.classList.add("rounded-full");

    div.innerHTML = `
   <button onclick="loadCategorybasedMeal('${strCategory}')" class="flex flex-col justify-center">
    <img src=${strCategoryThumb}>
    <h1 class="font-bold text-xl  mx-auto">${strCategory}</h1>
   
   </button>
    `;
    categoryContainer.appendChild(div);
  });
};

const loadCategorybasedMeal = async (categoryData) => {
  // console.log(categoryData);
  const fetchedData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryData}`
  );
  const response = await fetchedData.json();
  displayCategorybasedMeal(response.meals);
};

const displayCategorybasedMeal = (meals) => {
  displayMeals(false, meals);
  document.getElementById("view-more").addEventListener("click", () => {
    displayMeals(true, meals);
  });
};
const showArea = async () => {
  //   document.getElementById("letter_container").classList.add("hidden")
  //  document.getElementById("filter_by_area").classList.add("bg-red-600")
  //  document.getElementById("filter_by_letter").classList.remove("bg-red-600")
  const fetchedData = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  const response = await fetchedData.json();
  // console.log(response.meals);
  displayArea(response.meals);
};
const displayArea = (meals) => {
  const areaContainer = document.getElementById("area_container");
  areaContainer.classList.remove("hidden");
  areaContainer.classList.add("grid");
  areaContainer.innerHTML = "";
  meals.forEach((area) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button onclick="loadAreaData('${area.strArea}')" class="py-2 px-3 rounded-md font-semibold text-lg">${area.strArea}</button>
    
    `;

    areaContainer.appendChild(div);
  });
};

const loadAreaData = async (strArea) => {
  const fetchArea = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`
  );
  const response = await fetchArea.json();
  console.log(response.meals);
  displayMeals(false, response.meals);
  document.getElementById("view-more").addEventListener("click", () => {
    displayMeals(true, response.meals);
  });
};

const filterFirstLetter = async () => {
  document.getElementById("letter_container").classList.remove("hidden");
  document
    .getElementById("letter_container")
    .classList.add("flex", "gap-5", "items-center");
  //  document.getElementById("filter_by_area").classList.remove("bg-red-600")
  //  document.getElementById("filter_by_letter").classList.add("bg-red-600")
};
const filterContainerHandler = () => {
  const filterContainer = document.getElementById("filter_container");
  const filterArea = document.getElementById("filter_by_area");
  const areaContainer = document.getElementById("area_container");
  const filterbyLetter = document.getElementById("filter_by_letter");
  const letterContainer = document.getElementById("letter_container");

  filterArea.addEventListener("click", () => {
    filterArea.classList.add("bg-red-600");
    filterbyLetter.classList.remove("bg-red-600");
    letterContainer.classList.remove("flex");
    letterContainer.classList.add("hidden");
    areaContainer.classList.add("hidden");
    areaContainer.classList.add("grid");
  });
  filterbyLetter.addEventListener("click", () => {
    filterbyLetter.classList.add("bg-red-600");
    filterArea.classList.remove("bg-red-600");
    letterContainer.classList.remove("hidden");
    letterContainer.classList.add("flex");
    areaContainer.classList.add("hidden");
    areaContainer.classList.remove("grid");
  });
};

filterContainerHandler();

const filterbyletterHandler = () => {
  const buttons = document.querySelectorAll(".filter_by_letter");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      loadDatabasedonLetter(button.innerText);
    });
  });
};
filterbyletterHandler();

const loadDatabasedonLetter = async (btn) => {
  const fetchedData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${btn}`
  );
  const response = await fetchedData.json();
  displayMeals(false, response.meals);
  document.getElementById("view-more").addEventListener("click", () => {
    displayMeals(true, response.meals);
  });
};

const searchMeal = () => {
  const searchInput = document.getElementById("search-box").value;
  const value = searchInput.trim();
  loadMeals(value);
  document.getElementById("search-box").value = "";
};

loadCategory();
loadMeals();
