// ===============================
// LA CLÉ CONCIERGERIE
// Script Premium
// ===============================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add("show"); });
},{threshold:0.15});
document.querySelectorAll(".service-card,.price-card,.review-card,.advantage").forEach(el=>observer.observe(el));

const header=document.querySelector("header");
if(header){window.addEventListener("scroll",()=>{
    if(window.scrollY>60){header.style.background="#08101d";header.style.boxShadow="0 10px 30px rgba(0,0,0,.3)";}
    else{header.style.background="rgba(5,17,35,.90)";header.style.boxShadow="none";}
});}

document.querySelectorAll('a[href^="#"]').forEach(anchor=>anchor.addEventListener("click",function(e){
    const target=document.querySelector(this.getAttribute("href"));
    if(!target)return;
    e.preventDefault();target.scrollIntoView({behavior:"smooth"});
}));

document.querySelectorAll(".btn-gold,.btn-white,.btn-header").forEach(btn=>{
    btn.addEventListener("mouseenter",()=>btn.style.transform="translateY(-5px) scale(1.03)");
    btn.addEventListener("mouseleave",()=>btn.style.transform="translateY(0)");
});

// Tarifs : aucune offre à 10 %. Seules Premium 15 % et Prestige 20 % sont proposées.
document.addEventListener("DOMContentLoaded",()=>{
    // Corrige explicitement le libellé du menu trois barres.
    document.querySelectorAll("a,button,li,span,div").forEach(el=>{
        if(el.children.length===0){
            const text=el.textContent.trim();
            if(text.includes("Nos tarifs") && /10\s*[%]?(?:\s*pourcent)?/i.test(text)){
                el.textContent=text.replace(/10\s*[%]?(?:\s*pourcent)?\s*[\-–—\/]?\s*/i,"").replace(/\s{2,}/g," ").trim();
            }
        }
    });

    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];let n;
    while(n=walker.nextNode())nodes.push(n);
    nodes.forEach(t=>{
        if(!t.parentElement||["SCRIPT","STYLE"].includes(t.parentElement.tagName))return;
        if(t.parentElement.closest(".pricing-detail-modal"))return;
        t.nodeValue=t.nodeValue.replace(/10\s*%/g,"").replace(/10\s*pourcent/gi,"");
    });
    document.querySelectorAll("option").forEach(o=>{if(/10\s*%|10\s*pourcent/i.test(o.textContent))o.remove();});

    const plans=[
      {percent:"15 %",key:"premium",title:"Formule Premium",intro:"Une gestion complète de votre location courte durée pour vous libérer de la gestion quotidienne tout en conservant une expérience de qualité pour vos voyageurs.",items:["Gestion des réservations et du calendrier","Communication avec les voyageurs avant, pendant et après le séjour","Organisation des arrivées et des départs","Ménage et préparation du logement après chaque séjour","Gestion et suivi du linge","Réassort des consommables essentiels","Assistance et suivi des petits incidents","Optimisation de la présentation et de l’expérience voyageur","Suivi des avis et de la qualité de service"]},
      {percent:"20 %",key:"prestige",title:"Formule Prestige",intro:"Une prise en charge haut de gamme et renforcée pour les propriétaires qui souhaitent déléguer la gestion opérationnelle de leur logement avec un suivi personnalisé.",items:["Tout le contenu de la formule Premium","Gestion opérationnelle renforcée du logement","Suivi des petits incidents et coordination des interventions nécessaires","Optimisation régulière des tarifs et du positionnement","Suivi personnalisé de la performance et de l’activité","Reporting et échanges personnalisés avec le propriétaire","Contrôle renforcé de la qualité après les séjours","Accompagnement prioritaire et suivi attentif des voyageurs","Suivi global de l’expérience pour préserver les performances du logement"]}
    ];

    function ensureModal(){
      let m=document.getElementById("pricingDetailModal");if(m)return m;
      const st=document.createElement("style");st.textContent=`
      .pricing-detail-btn{margin:18px auto 0;border:1px solid rgba(184,148,77,.45);background:#fff;color:#8f6e32;border-radius:10px;padding:11px 15px;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:.25s}
      .pricing-detail-btn:hover{background:#fff8e9;transform:translateY(-2px)}
      .pricing-detail-modal{position:fixed;inset:0;z-index:10000;background:rgba(4,10,20,.72);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;padding:22px}.pricing-detail-modal.active{display:flex}
      .pricing-detail-box{position:relative;width:min(760px,100%);max-height:88vh;overflow:auto;background:#fff;border-radius:26px;padding:42px;box-shadow:0 30px 90px rgba(0,0,0,.30)}
      .pricing-detail-close{position:absolute;right:18px;top:12px;border:0;background:none;font-size:30px;cursor:pointer;color:#07101f}.pricing-detail-kicker{font-size:12px;font-weight:800;letter-spacing:2px;color:#a77e31;text-transform:uppercase}.pricing-detail-box h2{margin:8px 0;font-size:32px;color:#07101f}.pricing-detail-price{font-size:34px;font-weight:800;color:#b8944d;margin-bottom:20px}.pricing-detail-box p{line-height:1.75;color:#667085;margin:0 0 22px}.pricing-detail-list{list-style:none;padding:0;margin:0 0 25px;display:grid;gap:12px}.pricing-detail-list li{display:flex;gap:11px;align-items:flex-start;line-height:1.55;color:#202938}.pricing-detail-list li i{color:#b8944d;margin-top:4px}.pricing-detail-cta{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;background:linear-gradient(135deg,#d8b238,#b8944d);color:#07101f;font-weight:800;border-radius:11px;padding:13px 20px}@media(max-width:600px){.pricing-detail-box{padding:32px 22px}.pricing-detail-box h2{font-size:27px}.pricing-detail-price{font-size:29px}}
      `;document.head.appendChild(st);
      m=document.createElement("div");m.id="pricingDetailModal";m.className="pricing-detail-modal";m.setAttribute("aria-hidden","true");
      m.innerHTML='<div class="pricing-detail-box" role="dialog" aria-modal="true"><button class="pricing-detail-close" type="button" aria-label="Fermer">&times;</button><div class="pricing-detail-kicker">La Clé Conciergerie</div><h2 id="pricingDetailTitle"></h2><div class="pricing-detail-price" id="pricingDetailPrice"></div><p id="pricingDetailIntro"></p><ul class="pricing-detail-list" id="pricingDetailList"></ul><a class="pricing-detail-cta" href="#contact">Demander un devis</a></div>';
      document.body.appendChild(m);m.querySelector(".pricing-detail-close").onclick=closeModal;m.onclick=e=>{if(e.target===m)closeModal()};return m;
    }
    function openModal(p){const m=ensureModal();m.querySelector("#pricingDetailTitle").textContent=p.title;m.querySelector("#pricingDetailPrice").textContent=p.percent;m.querySelector("#pricingDetailIntro").textContent=p.intro;m.querySelector("#pricingDetailList").innerHTML=p.items.map(x=>`<li><i class="fa-solid fa-check"></i><span>${x}</span></li>`).join("");m.classList.add("active");m.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
    function closeModal(){const m=document.getElementById("pricingDetailModal");if(!m)return;m.classList.remove("active");m.setAttribute("aria-hidden","true");document.body.style.overflow="";}
    document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

    const candidates=Array.from(document.querySelectorAll(".price-card,.pricing-card,.tarif-card,.offer-card,[class*='price-card'],[class*='pricing-card']"));
    plans.forEach(p=>candidates.filter(c=>new RegExp(p.percent.replace(" %","\\s*%"),"i").test(c.textContent)).forEach(card=>{
      if(card.querySelector(`[data-plan-detail="${p.key}"]`))return;
      const b=document.createElement("button");b.type="button";b.className="pricing-detail-btn";b.dataset.planDetail=p.key;b.innerHTML='Voir le détail <i class="fa-solid fa-arrow-right"></i>';b.onclick=()=>openModal(p);card.appendChild(b);
    }));
});

console.log("La Clé Conciergerie chargée !");