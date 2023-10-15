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
  document.getElementById("webcam-container").appendChild(webcam.canvas);

  const backToWebcamButton = document.getElementById("Clear-Results");
  backToWebcamButton.addEventListener("click", clearResults);
  // เรียก setupModel เมื่อหน้าเว็บโหลดเสร็จ
  await setupModel();
};

// เมื่อคลิกที่ปุ่ม "Clear Results"
document.getElementById("Clear-Results").addEventListener("click", function () {
  // เลื่อนไปที่ส่วนบนสุดของหน้าเว็บ
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// เมื่อคลิกที่ปุ่มอัปโหลด
document.getElementById("uploadButton").addEventListener("click", function () {
  // เมื่อคลิกที่อินพุตไฟล์
document.getElementById("imageUpload").click();
});

// เมื่อมีการเลือกไฟล์
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
//  const uploadButton = document.getElementById("uploadButton");
});

// เมื่อคลิกที่ปุ่ม "Webcam"
document
  .getElementById("capture-button")
  .addEventListener("click", function () {
    // เลื่อนไปยังส่วน "Result"
    document.getElementById("result").scrollIntoView({ behavior: "smooth" });
  });

// เมื่อคลิกที่ปุ่ม "Image"
document.getElementById("uploadButton").addEventListener("click", function () {
  // เลื่อนไปยังส่วน "Result"
  document.getElementById("result").scrollIntoView({ behavior: "smooth" });
});

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

// สร้างฟังก์ชันเพื่อลบผลลัพธ์เก่าออก
function clearResults() {
  result = [];
  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.childNodes[i].innerHTML = ""; // ลบข้อความที่แสดงผลออก
  }
  // เพิ่มเพื่อล้างผลลัพธ์ที่แสดงบนอินพุตรูปภาพ
}

async function captureImage() {
  await predictImages(webcam.canvas);
}

async function predictImages(image) {
  // ลบผลลัพธ์เดิมที่แสดงใน labelContainer
  if (labelContainer) {
    clearResults();
  }
  
  //document.getElementById("gif-display").src = "/AI/images/load.gif";
  if (!model) {
    await setupModel();
  }
  //await setupModel();
  let prediction = await model.predict(image, false);
  prediction.sort((a, b) => b.probability - a.probability);
  // หาค่าความน่าจะเป็นสูงสุดและเก็บดัชนีของมัน
  let maxProbability = 0;
  for (let i = 0; i < maxPredictions; i++) {
    if (prediction[i].probability > maxProbability) {
      maxProbability = prediction[i].probability;
      bestPredictionIndex = i;
    }
  }

  
   // แสดงผลลัพธ์ที่มีความน่าจะเป็นสูงสุดเท่านั้น
   const bestPrediction = prediction[0];
   bestClassPrediction =
     bestPrediction.className + ": " + bestPrediction.probability.toFixed(2);
   labelContainer.childNodes[0].innerHTML = bestClassPrediction;
  // เก็บผลลัพธ์ทั้งหมดไว้ในตัวแปร global result
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
    imgDisplay.style.display = "none"; // Hide the image if it doesn't match any condition
  }

  imgDisplay.style.display = "block"; // Display the image
}  
function readURL(input) {
  if (input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      $("#imagePreview").attr("src", e.target.result);
      // $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
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