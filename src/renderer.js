import './index.css';
import watermark from 'watermarkjs'
const imageUpload = document.getElementById('imageUpload');
const addButton = document.getElementById('addWatermark');
const download = document.getElementById('download');
const github = document.getElementById('github');
const donate = document.getElementById('donate');

// Upload and preview original image
imageUpload.addEventListener('change', function () {
  const file = imageUpload.files[imageUpload.files.length - 1];
  const reader = new FileReader();

  reader.onload = function (e) {
    const imageDataUrl = e.target.result;
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = imageDataUrl;
  };
  reader.readAsDataURL(file);

  // Apply watermark to uploaded image and update image preview
  addButton.addEventListener('click', function () {
    let selectedLocation = document.getElementById('location').value;
    let selectedColor = document.getElementById('textColor').value;
    let watermarkText = document.getElementById("watermarkText").value
    let opacityValue = (document.getElementById("opacityRange").value / 100)
    let fontValue = (document.getElementById("fontRange").value + 'px');
    let y
    if (selectedLocation == 'upperRight' || selectedLocation == 'upperLeft') {
      y = 48
    } else {
      y = null
    }

    watermark([imageUpload.files[imageUpload.files.length - 1]])
      .image(watermark.text[selectedLocation](watermarkText, `${fontValue} Josefin Slab`, selectedColor, opacityValue, y))
      .then(function (img) {
        imagePreview.src = img.src
        download.href = img.src
      });
  })
});