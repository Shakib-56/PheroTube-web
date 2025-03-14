
// Load categories
const loadCategories=()=>{
   const categoriesEndpoint= fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
//    1-convert promise to json
   categoriesEndpoint.then((res)=> res.json())
//    send data to displaCategories
   .then((data)=>disPlayCategories(data.categories));
}

const disPlayCategories=(categories)=>{

// get the container
const categoriesContainer=document.getElementById('category-container');
// loop operation on Array object
for(let cat of categories){
   console.log(cat);
    // create element

   const categoryDiv=document.createElement('div');
   
   categoryDiv.innerHTML=`
       <button class="btn btn-sm hover:text-white hover:bg-[#FF1F3D]">${cat.category}</button>
   `
    // Append the element

   categoriesContainer.appendChild(categoryDiv);

}

}

loadCategories();

/*{
    "category_id": "1001",
    "video_id": "aaal",
    "thumbnail": "https://i.ibb.co/hdtZYbB/enchnting.jpg",
    "title": "Enchanted Harmonies",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/jh1q2F3/shopia.jpg",
            "profile_name": "Sophia Williams",
            "verified": false
        }
    ],
    "others": {
        "views": "7.6K",
        "posted_date": "16450"
    },
    "description": "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience."
} */
/*Load videos */
const loadVideos=()=>{
   const videoEndPoint=fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
   videoEndPoint.then(response=>response.json()).then((data)=>displayVideos(data.videos));
}

// Display videos
const displayVideos=(videos)=>{
console.log(videos);
// grab the video container
   const videosContainer=document.getElementById('videos-container');
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
loadVideos();
