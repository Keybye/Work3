let loader = document.querySelector(".box-con")
    document.onreadystatechange = function (){
    if(document.readyState ==="complete"){
        setTimeout(function (time){
            loader.style.display='none';
        },1000)
            setTimeout("stats()");
    }
}