const sidemenu= document.getElementById("sidemenu2");
const navicon= document.getElementById("morebtn");
var sidemenu2= document.getElementById("sidemenu");
const sidemenu3= document.getElementById("sidemenu3");
function openmenu(){
    sidemenu2.style.right="0";
}
function closemenu(){
    sidemenu2.style.right="-200%";
}
function notification(){
    if(sidemenu.style.top=='100%'){

    sidemenu.style.bottom="0%";
    sidemenu.style.top="66%";
    navicon.style.color="black";
    }

else{
    sidemenu.style.bottom="-100%";
    sidemenu.style.top="100%";
    navicon.style.color="white";
    
}
 }
 