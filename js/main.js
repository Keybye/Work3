let loader = document.querySelector(".box-con")
    document.onreadystatechange = function (){
    if(document.readyState ==="complete"){
        setTimeout(function (time){
            console.log('ok');
            loader.style.display='none';
        },1000)
    }
}