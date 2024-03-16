const sidemenu= document.getElementById("sidemenu");
const navicon= document.getElementById("nav");

function openmenu(){
    if(sidemenu.style.top=='100%'){

    sidemenu.style.bottom="0%";
    sidemenu.style.top="45%";
    navicon.style.color="red";
    }

else{
    sidemenu.style.bottom="-100%";
    sidemenu.style.top="100%";
    navicon.style.color="white";
    
}
 }