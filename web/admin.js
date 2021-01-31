var firebaseConfig = {
    apiKey: "AIzaSyAMQhUh6Rva9xiVwehgHgLXMGcCvYLzh48",
    authDomain: "web-login-515a9.firebaseapp.com",
    databaseURL: "https://web-login-515a9.firebaseio.com",
    projectId: "web-login-515a9",
    storageBucket: "web-login-515a9.appspot.com",
    messagingSenderId: "311366026370",
    appId: "1:311366026370:web:4f1d7ac3eeb83bf38e209b",
    measurementId: "G-P0TL4VE1K2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var ImgName;
  var ImgUrl;
        var files=[];
        var reader;

  document.getElementById("select").onclick=function(e){
      var input=document.createElement('input');
      input.type='file';
     
      input.onchange = e =>{
          files = e.target.files;
          reader = new FileReader();
          reader.onload=function(){
              document.getElementById("myimg").src=reader.result;
          }
          reader.readAsDataURL(files[0]);
      }
      input.click();

  }

  /*upload process */
  document.getElementById("upload").onclick=function(){
      ImgName = document.getElementById("namebox").value;
      var uploadTask = firebase.storage().ref('Images/'+ ImgName+".png").put(files[0]);
     
      uploadTask.on('state_changed',function(snapshot){
          var progress= (snapshot.bytesTransferred / snapshot.totalBytes) *100;
        document.getElementById("UpProgress").innerHTML ="Upload"+progress+"%";
      
},
function(error){
    alert("error in saving the image");

},

function(){
    uploadTask.snapshot.ref.getDownloadURL().then(function(url){
    ImgUrl= url;
    
 firebase.database().ref('Pictures/'+ ImgName).set({
    Name:ImgName,
    Link:ImgUrl
 });
 alert('image added successfully');
}
);
});

  
    }
/* retrieve*/
    document.getElementById("retrieve").onclick=function(){
        ImgName = document.getElementById('namebox').value;
        firebase.database().ref('Pictures/'+ ImgName).on('value',function(snapshot){
            document.getElementById('myimg').src=snapshot.val().Link;
        });
    }