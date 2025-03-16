// show loader 
const showloader=()=>{
   document.getElementById('loader').classList.remove('hidden');
   document.getElementById('videos-container').classList.add('hidden');
}
//  hide loader 
const hideLoader=()=>{
   document.getElementById('loader').classList.add('hidden');
   document.getElementById('videos-container').classList.remove('hidden');
}


// Remove active class
const removeActiveClass=()=>{
   const allActiveBtns=document.getElementsByClassName('active');
   for(let btn of allActiveBtns){
      btn.classList.remove('active');
   }
}
// Load categories
const loadCategories=()=>{
   showloader();
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
       <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:text-white hover:bg-[#FF1F3D]">${cat.category}</button>
   `
    // Append the element

   categoriesContainer.appendChild(categoryDiv);

}
hideLoader();
}

/*Load videos */
const loadVideos=(searchText=" ")=>{
   showloader();
   const videoEndPoint=fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`);
   videoEndPoint.then(response=>response.json()).then((data)=>{
      removeActiveClass();
      document.getElementById('btn-all').classList.add('active');
      displayVideos(data.videos)});
}

//Add categoriwise  video 
const loadCategoriesVideos=(id)=>{
   showloader();
   const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

   fetch(url).then(res=>res.json()).then(data=>{
      removeActiveClass();//no active class here

      const clickedBtn=document.getElementById(`btn-${id}`);
      clickedBtn.classList.add('active');
      displayVideos(data.category);
   });

}

//Load video details
const loadVideoDetails=(videoID)=>{
   const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;
   fetch(url).then(res=>res.json()).then(data=>displayVideoDetails(data.video));
}
//Display video details
const displayVideoDetails=(video)=>{
   console.log(video);
   document.getElementById('video_details').showModal();
   const detailsContainer=document.getElementById('details_container');
   detailsContainer.innerHTML=`
   <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="thumbnail" />
  </figure>
  <div class="card-body">
    <h2 class="p-0 text-2xl font-bold ">${video.title}</h2>
    <div>
   <p><strong>Author Name :</strong> ${video.authors[0].profile_name}</p>
   <p><strong class="m-0">Posted date:</strong> ${video.others.views}</p>
   <p><strong class="m-0">Posted date:</strong> ${video.others.posted_date}</p>
    </div>
    <button class="px-4 py-2 text-lg font-medium bg-red-700 text-white w-2/6 border-none rounded-lg align-middle">Subscribe</button>
   
  </div>
</div>
   `

}


// Display videos
const displayVideos=(videos)=>{
// grab the video container
   const videosContainer=document.getElementById('videos-container');
   videosContainer.innerHTML=" ";
   if(videos.length===0){
      videosContainer.innerHTML=`<div class="col-span-full py-20 gap-4 flex flex-col justify-center items-center">
            <img src="./assets/Icon.png" alt="">
            <h2 class="text-3xl text-center font-bold ">Oops!! Sorry, There is no <br> content here</h2>
        </div>`
      hideLoader();
      return ;
   }
//Loop over the arrays
videos.forEach(video => {
   const cardDiv=document.createElement('div');
   cardDiv.innerHTML=
   `<div class="card bg-base-100 ">
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
                    <p class="text-sm  text-gray-600 flex gap-1">${video.authors[0].profile_name}<span>${video.authors[0].verified ?`<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></img>`:" "}</span></p>
                    <p class="text-sm  text-gray-600">${video.others.views}</p>

                  </div>
            </div>
            <button onclick="loadVideoDetails('${video.video_id}') " class="btn btn-block">Show Details</button>
         </div>
                  `
 videosContainer.appendChild(cardDiv);  
});
hideLoader();
}
// search inpt functionality
document.getElementById('search-input').addEventListener('keyup',(e)=>{
   e.preventDefault();
   const input=e.target.value;
   loadVideos(input);
})
loadCategories();
