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
        categoryCard.classList = `lg:w-[772px] lg:h-[270px] mb-5 lg:mb-6 card w-96 bg-[#F3F3F5] shadow-xl`;
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
      <button onclick="handleRead(${category.id})"><img src="images/email 1.png" alt=""></button>
      </div>
    </div>
        `;

        categoryContainer.appendChild(categoryCard);
    })

    // hide spinner

    toggleLoadingSpinnner(false);

}



const handleRead = async (id) =>{
    console.log(id);

    // load single data
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/post/${id}`);
    const detail = await res.json();
    console.log(detail);

    showDetails(detail);
}

const showDetails = (category) =>{
    const readDetails = document.getElementById("read-Details");

    const appendDetails = document.createElement("div");

    appendDetails.classList = `flex justify-between`;
    appendDetails.innerHTML = `
    <p>${category.title}</p>
    <div class="flex gap-2">
        <img src="images/tabler-icon-eye.png" alt="">
        <p>${category.view_count}</p>
    </div>
    `;
    readDetails.appendChild(appendDetails);

    const led = category.view_count;
    console.log(led);
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

loadCategory();


const loadPosts = async () =>{
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await res.json();
    // console.log(data);
    displayPosts(data);
}

const displayPosts = data =>{
    // console.log(data);

    const postContainer = document.getElementById("latest-container");

    data.forEach(post =>{
        console.log(post);

        const postCard =document.createElement("div");
        postCard.classList = `rounded-3xl border border-solid border-[#0C0D2D42] bg-[#FFF] lg:p-6 lg:w-[374px] lg:h-[482px]`;
        postCard.innerHTML = `

        <img class="lg:w-[326px] lg:h-[190px] lg:mb-6" src="${post.cover_image}" alt="">
        <div class="flex gap-2 lg:mb-3">
            <img class="lg:w-[24px] lg:h-[24px]" src="images/tac.png" alt="">
            <p>${post?.author?.posted_date??"No publish date"
            }</p>
        </div>
        <p class="lg:mb-3">${post.title}</p>
        <p class="lg:mb-3">${post.description
        } </p>
        <div class="flex gap-2">
            <img class="lg:w-[44px] lg:h-[44px] w-[44px] h-[44px]" src="${post.
                profile_image
                }" alt="">
            <div>
                <p>${post.author.name}</p>
                <p>${post?.author?.designation??"Unknown"}</p>
            </div>
        </div>
        `;
        postContainer.appendChild(postCard);
    })
}

loadPosts();