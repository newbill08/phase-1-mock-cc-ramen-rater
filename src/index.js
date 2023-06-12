 document.addEventListener('DOMContentLoaded', () => {


  // Step 1: See all ramen images in the div with the id of ramen-menu. When the page 
  //loads, request the data from the server to get all the ramen objects. Then, display 
  //the image for each of the ramen using an img tag inside the #ramen-menu div. *

  // Fetch ramens from the API
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {

      console.log(ramens)

      // Display ramen images in the ramen menu
      const ramenMenu = document.getElementById('ramen-menu');

      ramens.forEach(ramen => {
        const ramenImg = document.createElement('img')
        ramenImg.src = ramen.image;
        ramenImg.alt = ramen.name;
      
        ramenImg.addEventListener('click', () => {
          displayRamenDetails(ramen);
        })
        ramenMenu.appendChild(ramenImg);
       
      });
      // Display details of the first ramen by default
      displayRamenDetails(ramens[0]);
    })
})


function displayRamenDetails(ramen) {

  const ramenDetail = document.getElementById('ramen-detail');
  const detailImage = ramenDetail.querySelector('.detail-image');
  const name = ramenDetail.querySelector('.name');
  const restaurant = ramenDetail.querySelector('.restaurant');
  const ratingDisplay = document.getElementById('rating-display')
  const commentDisplay = document.getElementById('comment-display')

  // Update the ramen details

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;


  // Update the edit form with the ramen details
  const editForm = document.getElementById('edit-ramen');
  const editRatingInput = editForm.querySelector("#new-rating");
  const editCommentInput = editForm.querySelector("#new-comment");
  editRatingInput.value = ramen.rating;
  editCommentInput.value = ramen.comment;
  
 
  // Submit the edit form
  editForm.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event)
    const newRating = editRatingInput.value;
    const newComment = editCommentInput.value
    updateRamen(ramen.id, newRating, newComment);
  });
}

function updateRamen(ramenId, newRating, newComment){
 // Make a PATCH request to update the ramen's rating and comment
   fetch(`http://localhost:3000/ramens/${ramenId}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rating: newRating, comment:newComment }),
   })
.then(response => response.json())
.then(updatedRamen => {
  // Update the displayed rating and comment
const ratingDisplay = document.getElementById('rating-display');
const commentDisplay = document.getElementById('comment-display');
ratingDisplay.textContent = updatedRamen.rating;
commentDisplay.textContent = updatedRamen.comment;
});
}


// Handle submission of the new ramen form
const newRamenForm = document.getElementById('new-ramen')
newRamenForm.addEventListener('submit', event => {
event.preventDefault();
const newName = document.getElementById('new-name').value;
const newRestaurant = document.getElementById('new-restaurant').value;
const newImage = document.getElementById('new-image').value;
const newRating = document.getElementById('new-rating').value;
const newComment = document.getElementById('new-comment').value;


// Create a new ramen object

const newRamen = {
  name: newName,
  restaurant: newRestaurant,
  image: newImage,
  rating: newRating,
  comment: newComment,
};

// Make a POST request to create a new ramen

fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRamen),
    })
      .then(response => response.json())
      .then(createdRamen => {
        // Add the new ramen to the ramen menu
        const ramenMenu = document.getElementById('ramen-menu');
        const ramenImg = document.createElement('img');
        ramenImg.src = createdRamen.image;
        ramenImg.alt = createdRamen.name;
        ramenImg.addEventListener('click', () => {
          displayRamenDetails(createdRamen);
        });
        ramenMenu.appendChild(ramenImg);
      });
  
    // Reset the form inputs
    newRamenForm.reset();

})

