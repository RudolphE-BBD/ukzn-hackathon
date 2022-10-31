// Hi I am a JS File

function ready() {
  console.log("DOM Content has been loaded");

  const element = document.getElementById("demo-script");

  if(element){
    console.log("Element found");
    document.getElementById("demo-script").innerHTML = "A JavaScript script inserted this text!";
  } else {
      console.log("Element not found, will try again in a second");
      setTimeout(ready, 1000);
  }
}

document.addEventListener("DOMContentLoaded", ready);
