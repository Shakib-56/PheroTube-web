
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