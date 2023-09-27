let loader = document.querySelector(".box")
    document.onreadystatechange = function (){
    if(document.readyState ==="complete"){
         loader.style.display="none";
    }
}