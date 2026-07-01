// ===============================
// LA CLÉ CONCIERGERIE
// Script Premium
// ===============================

// Animation d'apparition au scroll
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(".service-card,.price-card,.review-card,.advantage").forEach(el=>{

    observer.observe(el);

});

// Header au scroll
const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>60){

        header.style.background="#08101d";
        header.style.boxShadow="0 10px 30px rgba(0,0,0,.3)";

    }else{

        header.style.background="rgba(5,17,35,.90)";
        header.style.boxShadow="none";

    }

});

// Défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

});

});

});

// Animation des boutons
document.querySelectorAll(".btn-gold,.btn-white,.btn-header").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-5px) scale(1.03)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translateY(0)";

});

});

console.log("La Clé Conciergerie chargée !");