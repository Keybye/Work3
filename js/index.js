
function $(id){
    return document.getElementById(id);
}

function  formFocus() {
    let conBg = document.querySelector('.container');
    $('form').style.boxShadow= '0 0 12px rgba(237,112,81,.3)';
    conBg.style.backdropFilter = 'grayscale(80%) blur(10px)';
}
function  formBlur() {
    let conBg = document.querySelector('.container');
    conBg.style.backdropFilter = 'grayscale(30%)';
    $('form').style.boxShadow= 'none';
}
