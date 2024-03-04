const allPosts = async () =>{
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const datas = await res.json();
    console.log(datas);
    displayCategorys(datas.posts);
}

allPosts();






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

        let activeStatus = "";

        if(category.isActive){
            activeStatus = "bg-green-500";
        }
        else{
            activeStatus = "bg-red-500"; 
        }

        const categoryCard = document.createElement("div");
        categoryCard.classList = `lg:w-[772px] lg:h-[270px] mb-5 lg:mb-6 card w-96 bg-[#F3F3F5] shadow-xl`;
        categoryCard.innerHTML = `
        <div class="card-body">
        <div class="indicator">
        <span class="lg:h-5 lg:w-5 indicator-item badge ${activeStatus}"></span> 
        <img class="h-10 w-10 lg:h-10 lg:w-10 rounded-full" src="${category.image}" alt="">
      </div>

        <div class="flex">
            <p class="text-[#0C0D2D80] text-sm font-medium">#${category.category}</p>
            <p class="text-[#0C0D2D80] text-sm font-medium">Author: ${category.author.name}</p>
        </div>
      <h2 class="card-title text-[#12132D] text-xl font-bold">${category.title}</h2>
      <p class="text-[#0C0D2D99] text-base font-normal">${category.description}</p>
      <div class="bg-[#1E325E1A] h-[1px] w-[300px] lg:h-[1px] lg:w-[700px]">

      </div>
      <div class="flex gap-5">
        <div class="flex gap-2">
            <img class="lg:w-[28px] lg:h-[28px]" src="images/tabler-icon-message-2.png" alt="">
            <p class="text-[#0C0D2D99] text-base font-normal">${category.
            comment_count
            }</p>
        </div>
        <div class="flex gap-2">
            <img class="lg:w-[28px] lg:h-[28px]" src="images/tabler-icon-eye.png" alt="">
            <p class="text-[#0C0D2D99] text-base font-normal">${category.view_count}</p>
        </div>
        <div class="flex gap-2"> 
            <img class="lg:w-[28px] lg:h-[28px]" src="images/tabler-icon-clock-hour-9.png" alt="">
            <p class="text-[#0C0D2D99] text-base font-normal">${category.posted_time} min</p>
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

    // load single data
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/post/${id}`);
    const detail = await res.json();
    console.log(detail);

    showDetails(detail);

    const currentScoreElement = document.getElementById("current-score");
    const currentScoreText = currentScoreElement.innerText;
    const currentScore = parseInt(currentScoreText);
    console.log(currentScore);

    const newScore = currentScore + 1;

    currentScoreElement.innerText = newScore;

    console.log(id);
}

const showDetails = (category) =>{
    const readDetails = document.getElementById("read-Details");

    const appendDetails = document.createElement("div");

    appendDetails.classList = `flex justify-between`;
    appendDetails.innerHTML = `
    <p class="text-[#12132D] text-base font-semibold">${category.title}</p>
    <div class="flex gap-2">
        <img class="lg:[w-28px] lg:h-[28px]" src="images/tabler-icon-eye.png" alt="">
        <p class="text-[#0C0D2D99] text-base font-normal">${category.view_count}</p>
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
            <p class="text-[#0C0D2D99] text-base font-normal">${post?.author?.posted_date??"No publish date"
            }</p>
        </div>
        <p class="lg:mb-3 text-[#12132D] text-lg font-extrabold">${post.title}</p>
        <p class="lg:mb-3 text-[#0C0D2D99] text-base font-normal">${post.description
        } </p>
        <div class="flex gap-2">
            <img class="lg:w-[44px] lg:h-[44px] w-[44px] h-[44px] rounded-full" src="${post.
                profile_image
                }" alt="">
            <div>
                <p class="text-[#12132D] text-base font-bold">${post.author.name}</p>
                <p class="text-[#0C0D2D99] text-sm font-normal">${post?.author?.designation??"Unknown"}</p>
            </div>
        </div>
        `;
        postContainer.appendChild(postCard);
    })
}

loadPosts();