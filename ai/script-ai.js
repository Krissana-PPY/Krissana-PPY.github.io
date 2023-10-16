let result = [];
let bestPredictionIndex = 0;
let bestClassPrediction;
const URL = "https://teachablemachine.withgoogle.com/models/pgfQ16p5g/";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";
let model, webcam, labelContainer, maxPredictions;

window.onload = async function () {
  const flip = true;
  webcam = new tmImage.Webcam(300, 300, flip);
  await webcam.setup();
  await webcam.play();
  window.requestAnimationFrame(loop);
  document.getElementById("camera-container").appendChild(webcam.canvas);
  await setupModel();
};
document.getElementById("uploadButton").addEventListener("click", function () {
document.getElementById("imageUpload").click();
});
document.getElementById("imageUpload").addEventListener("change", function () {
  const fileInput = document.getElementById("imageUpload");
  if (fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        predictImages(image);
      };
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
});

//document
//  .getElementById("capture-button")
//  .addEventListener("click", function () {
//    document.getElementById("result").scrollIntoView({ behavior: "smooth" });
//  });
//document.getElementById("uploadButton").addEventListener("click", function () {
//document.getElementById("result").scrollIntoView({ behavior: "smooth" });
//});

async function setupModel() {
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function loop() {
  webcam.update();
  window.requestAnimationFrame(loop);
}

function clearResults() {
  result = [];
  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.childNodes[i].innerHTML = "";
  }
}

async function captureImage() {
  await predictImages(webcam.canvas);
}

async function predictImages(image) {
  if (labelContainer) {
    clearResults();
  }
  if (!model) {
    await setupModel();
  }
  let prediction = await model.predict(image, false);
  prediction.sort((a, b) => b.probability - a.probability);
  let maxProbability = 0;
  for (let i = 0; i < maxPredictions; i++) {
    if (prediction[i].probability > maxProbability) {
      maxProbability = prediction[i].probability;
      bestPredictionIndex = i;
    }
  }
   const bestPrediction = prediction[0];
   bestClassPrediction = bestPrediction.className
   labelContainer.childNodes[0].innerHTML = bestClassPrediction;
  result = prediction;
  const imgDisplay = document.getElementById("img-display");
  if (bestClassPrediction.includes("กระดาษแข็ง")) {
    imgDisplay.src = "/ai/img/sss.png";
  } else if (bestClassPrediction.includes("กระดาษย่อย")) {
    imgDisplay.src = "/ai/img/yyy.png";
  } else if (bestClassPrediction.includes("กระดาษบรู๊ฟ")) {
    imgDisplay.src = "/ai/img/wwww.png";
  } else if (bestClassPrediction.includes("กระดาษขาว")) {
    imgDisplay.src = "/ai/img/www.png";
  } else if (bestClassPrediction.includes("ไม่สามารถรีไซเคิลได้")) {
    imgDisplay.src = "/ai/img/no.png";
  } else {
    imgDisplay.style.display = "none";
  }
  imgDisplay.style.display = "block"; 
}  
function readURL(input) {
  if (input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      $("#imagePreview").attr("src", e.target.result);
      $("#imagePreview").hide();
      $("#imagePreview").fadeIn(650);
    };
    reader.readAsDataURL(input.files[0]);
    let image = document.getElementById("imagePreview");
    predictImages(image);
  }
}
$("#imageUpload").change(function () {
  readURL(this);
});