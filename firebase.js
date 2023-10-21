const firebaseConfig = {
  apiKey: "AIzaSyCl2GXzjbfY1hPJp583kB7dcESpcr0QhfM",
  authDomain: "image-reducer-e3c11.firebaseapp.com",
  projectId: "image-reducer-e3c11",
  storageBucket: "image-reducer-e3c11.appspot.com",
  messagingSenderId: "283904284501",
  appId: "1:283904284501:web:b651af9c0365b30148c1dc",
  measurementId: "G-05RJY21S7Z",
};

firebase.initializeApp(firebaseConfig);

var fileText = document.querySelector(".fileText");
var uploadPercentage = document.querySelector(".uploadPercentage");
var progress = document.querySelector(".progress");
var percentVal;
var fileItem;
var fileName;
var img = document.querySelector(".img");
function getFile(e) {
  fileItem = e.target.files[0];
  fileName = fileItem.name;
  fileText.innerHTML = fileName;
}

function uploadImage() {
  let storageRef = firebase.storage().ref("images/" + fileName);
  let uploadTask = storageRef.put(fileItem);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log(snapshot);
      percentVal = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(percentVal);
      uploadPercentage.innerHTML = percentVal + "%";
      progress.style.width = percentVal + "%";
    },
    (error) => {
      console.log("Error is ", error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        console.log("URL", url);

        if (url != "") {
          img.setAttribute("src", url);
          img.style.display = "block";
        }
      });
    }
  );
}
