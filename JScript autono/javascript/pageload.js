var slideIndex =1;
showPag(slideIndex);

function pluspag(n){
    showPag(slideIndex +=n);
}

function currentPag(n){
    showPag(slideIndex=n);
}

function showPag(n){
    var i;
    var page = document.getElementsByClassName('u3');
    if(n>page.length){
        slideIndex=1;
    }
    if(n<1){
        slideIndex =page.length;
    }
    for(i=0;i<page.length;i++){
        page[i].style.display = "none";
    }
    page[slideIndex-1].style.display = "block";
}