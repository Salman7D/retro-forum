const loadCategory = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const post = await res.json();
    const categorys = post.posts;
    // console.log(categorys);
    displayCategorys(categorys);
}

const displayCategorys = categorys =>{
    // console.log(categorys);

    const categoryContainer = document.getElementById("category-container");

    // clear category container before adding new categorys
    
    categoryContainer.textContent = "";

    categorys.forEach(category =>{
        console.log(category)

        const categoryCard = document.createElement("div");
        categoryCard.classList = `lg:w-[772px] lg:h-[270px] lg:mb-6 card w-96 bg-[#F3F3F5] shadow-xl`;
        categoryCard.innerHTML = `
        <div class="card-body">
        <div class="flex">
            <p>#${category.category}</p>
            <p>Author: ${category.author.name}</p>
        </div>
      <h2 class="card-title">${category.title}</h2>
      <p>${category.description}</p>
      <div class="bg-[#1E325E1A] lg:h-[1px] lg:w-[300px]">

      </div>
      <div class="flex gap-5">
        <div class="flex gap-2">
            <img class="lg:w-[28px] lg:h-[28px]" src="images/tabler-icon-message-2.png" alt="">
            <p>${category.
            comment_count
            }</p>
        </div>
        <div class="flex gap-2">
            <img class="lg:w-[28px] lg:h-[28px]" src="images/tabler-icon-eye.png" alt="">
            <p>${category.view_count}</p>
        </div>
        <div class="flex gap-2"> 
            <img class="lg:w-[28px] lg:h-[28px]" src="images/tabler-icon-clock-hour-9.png" alt="">
            <p>${category.posted_time} min</p>
        </div>
        
      </div>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
        `;

        categoryContainer.appendChild(categoryCard);
    })

    // hide spinner

    toggleLoadingSpinnner(false);

}

// handle search button

const handleSearch = () =>{
    toggleLoadingSpinnner(true); 
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText);
    loadCategory(searchText);
    document.getElementById("search-field").value = "";
} 

const toggleLoadingSpinnner = (isLoading) =>{
    const loadingSpinner = document.getElementById("loading-spinner");
    if(isLoading){
        loadingSpinner.classList.remove("hidden");
    }
    else{
        // hide loader after 2 seconds
        setTimeout(function(){
            loadingSpinner.classList.add("hidden");  
        },2000);
        // loadingSpinner.classList.add("hidden");
    }
}

// loadCategory();