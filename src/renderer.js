import './index.css';
import watermark from 'watermarkjs'
const imageUpload = document.getElementById('imageUpload');
const addButton = document.getElementById('addWatermark')

// Add an event listener to detect file upload
imageUpload.addEventListener('change', function() {
  // Get the selected file
   const file = imageUpload.files[0];

  // Create a FileReader object
  const reader = new FileReader();

  // Set up the reader's onload event handler
  reader.onload = function(e) {
    // Get the image data URL
    const imageDataUrl = e.target.result;

    // Display the uploaded image
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = imageDataUrl;
  };

  // Read the selected file as Data URL
  reader.readAsDataURL(file);


  addButton.addEventListener('click', function() {
    watermark([file])
    .image(watermark.text.center('watermark.js', '58px Josefin Slab', '#fff', 0.5))
    .then(function (img) {
      document.getElementById('markedImg').appendChild(img);
      console.log(img)
    });
})
});

