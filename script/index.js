
// Load categories
const loadCategories=()=>{
   const categoriesEndpoint= fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
//    1-convert promise to json
   categoriesEndpoint.then((res)=> res.json())
//    send data to displaCategories
   .then((data)=>disPlayCategories(data.categories));
}




// Display Categories
const disPlayCategories=(categories)=>{

// get the container
const categoriesContainer=document.getElementById('category-container');
// loop operation on Array object
for(let cat of categories){
   console.log(cat);
    // create element

   const categoryDiv=document.createElement('div');
   
   categoryDiv.innerHTML=`
       <button onclick="loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:text-white hover:bg-[#FF1F3D]">${cat.category}</button>
   `
    // Append the element

   categoriesContainer.appendChild(categoryDiv);

}

}



/*Load videos */
const loadVideos=()=>{
   const videoEndPoint=fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
   videoEndPoint.then(response=>response.json()).then((data)=>displayVideos(data.videos));
}

//Add categoriwise  video 
const loadCategoriesVideos=(id)=>{
   const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

   fetch(url).then(res=>res.json()).then(data=>displayVideos(data.category));

}


// Display videos
const displayVideos=(videos)=>{
console.log(videos);
// grab the video container
   const videosContainer=document.getElementById('videos-container');
   videosContainer.innerHTML=" ";
   if(videos.length===0){
      videosContainer.innerHTML=`<div class="col-span-full py-20 gap-4 flex flex-col justify-center items-center">
            <img src="./assets/Icon.png" alt="">
            <h2 class="text-3xl text-center font-bold ">Oops!! Sorry, There is no <br> content here</h2>
        </div>`
      return ;
   }
//Loop over the arrays
videos.forEach(video => {
   const cardDiv=document.createElement('div');
   cardDiv.innerHTML=`<div class="card bg-base-100 ">
            <figure class="relative">
              <img class="w-full h-[180px] object-cover"
                src="${video.thumbnail}"
                alt="sunrise" />
                <span class="absolute bottom-2 right-3 text-sm font-medium text-white bg-gray-900 px-2 py-1 rounded-sm">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
                  <div class="avatar">
                    <div class="W-8 h-8 ring-primary ring-offset-base-100  rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
                  <div id="intro" class="space-y-1">
                    <h2 class="text-lg  font-semibold">${video.title}
                    </h2>
                    <p class="text-sm  text-gray-600 flex gap-1">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
                    <p class="text-sm  text-gray-600">${video.others.views}</p>

                  </div>
            </div>
          </div>
                  `
 videosContainer.appendChild(cardDiv);  
});
}
loadCategories();
