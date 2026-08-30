// ===============================
// LA CLÉ CONCIERGERIE — SCRIPT
// FORMULE UNIQUE : PRESTIGE 18 %
// ===============================

(function(){
  "use strict";

  const ready = () => {

    // ===============================
    // ANIMATIONS
    // ===============================
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      }, {threshold:0.15});

      document
        .querySelectorAll(".service-card,.price-card,.review-card,.advantage")
        .forEach(el => observer.observe(el));
    }

    // ===============================
    // SUPPRESSION ANCIENNE FORMULE
    // ===============================
    document.querySelectorAll(".price-card").forEach(card => {

      const title = card.querySelector("h3");

      if (!title) return;

      const name = title.textContent.trim().toLowerCase();

      // Suppression de toutes les anciennes formules
      if (
        name.includes("essentiel") ||
        name.includes("premium")
      ) {
        card.remove();
      }
    });

    // ===============================
    // TARIF UNIQUE : 18 %
    // ===============================
    const tariffText = (text) => {

      if(!text) return text;

      return text
        .replace(/23\s*%/g, "18 %")
        .replace(/20\s*%/g, "18 %")
        .replace(/15\s*%/g, "18 %")
        .replace(/10\s*%/g, "");
    };

    // ===============================
    // REMPLACEMENT DES TARIFS DANS LE SITE
    // ===============================
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );

    const textNodes = [];

    let current;

    while(current = walker.nextNode()) {
      textNodes.push(current);
    }

    textNodes.forEach(node => {

      if(!node.parentElement) return;

      if(
        ["SCRIPT","STYLE","NOSCRIPT"].includes(
          node.parentElement.tagName
        )
      ) return;

      node.nodeValue = tariffText(node.nodeValue);
    });

    // ===============================
    // CARTE TARIF UNIQUE
    // ===============================
    document.querySelectorAll(".price-card").forEach(card => {

      const title = card.querySelector("h3");
      const price = card.querySelector(".price");

      if(!title || !price) return;

      const name = title.textContent.trim().toLowerCase();

      if(
        name.includes("prestige") ||
        name.includes("premium")
      ) {

        title.textContent = "Prestige";
        price.textContent = "18 %";

      }

    });

    // ===============================
    // MENU TROIS BARRES
    // ===============================
    document.querySelectorAll(".lc-menu-link").forEach(link => {

      const text = link.textContent.toLowerCase();

      if(
        text.includes("tarif") ||
        text.includes("prestige")
      ) {

        link.innerHTML =
          '<i class="fa-solid fa-percent"></i> Notre formule Prestige — 18 %';

      }

    });

    // ===============================
    // CALCULATEUR
    // UNE SEULE FORMULE : PRESTIGE 18 %
    // ===============================
    const planSelect = document.getElementById("lcCalcPlan");

    if(planSelect){

      planSelect.innerHTML = `
        <option value="0.18" selected>
          Prestige — 18 %
        </option>
      `;

      planSelect.value = "0.18";
    }

    // Nettoyage de tous les anciens selects
    document.querySelectorAll("select option").forEach(option => {

      const text = option.textContent.trim().toLowerCase();

      if(
        text.includes("essentiel") ||
        text.includes("premium") ||
        text.includes("23 %") ||
        text.includes("20 %") ||
        text.includes("15 %") ||
        text.includes("10 %")
      ){

        option.remove();

      }

    });

    // ===============================
    // FAQ
    // ===============================
    document
      .querySelectorAll(".faq-answer p, .faq-question")
      .forEach(el => {

        el.textContent = el.textContent
          .replace(/23\s*%/g, "18 %")
          .replace(/20\s*%/g, "18 %")
          .replace(/15\s*%/g, "18 %")
          .replace(/10\s*%/g, "");

        // Ancienne présentation des formules
        el.textContent = el.textContent.replace(
          /Nos formules de gestion.*$/i,
          "Notre formule Prestige est proposée à 18 %."
        );

      });

    // ===============================
    // FORMULE UNIQUE
    // ===============================
    const plan = {

      title: "Formule Prestige",

      percent: "18 %",

      intro:
        "Une gestion complète de votre location courte durée pour vous libérer de la gestion quotidienne et offrir une expérience de qualité à vos voyageurs.",

      items: [

        "Gestion des réservations et du calendrier",

        "Communication avec les voyageurs avant, pendant et après le séjour",

        "Organisation des arrivées et des départs",

        "Ménage et préparation du logement après chaque séjour",

        "Gestion et suivi du linge",

        "Réassort des consommables essentiels",

        "Assistance et suivi des petits incidents",

        "Optimisation régulière des tarifs et du positionnement",

        "Gestion et suivi des avis voyageurs",

        "Accompagnement personnalisé du propriétaire",

        "Suivi global de l'expérience voyageur"

      ]

    };

    // ===============================
    // STYLE FENÊTRE DÉTAIL
    // ===============================
    const style = document.createElement("style");

    style.textContent = `

      .pricing-grid{
        grid-template-columns:1fr!important;
        max-width:650px!important;
        margin-left:auto!important;
        margin-right:auto!important;
      }

      .pricing-detail-btn{
        margin:14px auto 0;
        border:1px solid #d8c18c;
        background:#fff;
        color:#8f6e32;
        border-radius:11px;
        padding:11px 17px;
        font:700 13px Poppins,sans-serif;
        cursor:pointer;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:8px;
        transition:.25s;
      }

      .pricing-detail-btn:hover{
        background:#fff8e8;
        transform:translateY(-2px);
        box-shadow:0 8px 20px rgba(7,16,31,.08);
      }

      .pricing-detail-modal{
        position:fixed;
        inset:0;
        z-index:10000;
        background:rgba(4,10,20,.72);
        backdrop-filter:blur(8px);
        display:none;
        align-items:center;
        justify-content:center;
        padding:22px;
      }

      .pricing-detail-modal.active{
        display:flex;
      }

      .pricing-detail-box{
        position:relative;
        width:min(760px,100%);
        max-height:88vh;
        overflow:auto;
        background:#fff;
        border-radius:26px;
        padding:42px;
        box-shadow:0 30px 90px rgba(0,0,0,.30);
      }

      .pricing-detail-close{
        position:absolute;
        right:18px;
        top:12px;
        border:0;
        background:#eef1f5;
        width:40px;
        height:40px;
        border-radius:50%;
        font-size:25px;
        cursor:pointer;
        color:#07101f;
      }

      .pricing-detail-kicker{
        font-size:12px;
        font-weight:800;
        letter-spacing:2px;
        color:#a77e31;
        text-transform:uppercase;
      }

      .pricing-detail-box h2{
        margin:8px 0;
        font-size:32px;
        color:#07101f;
      }

      .pricing-detail-price{
        font-size:36px;
        font-weight:800;
        color:#b8944d;
        margin-bottom:18px;
      }

      .pricing-detail-box p{
        line-height:1.75;
        color:#667085;
        margin:0 0 22px;
      }

      .pricing-detail-list{
        list-style:none;
        padding:0;
        margin:0 0 25px;
        display:grid;
        gap:12px;
      }

      .pricing-detail-list li{
        display:flex;
        gap:11px;
        align-items:flex-start;
        line-height:1.55;
        color:#202938;
      }

      .pricing-detail-list li i{
        color:#b8944d;
        margin-top:4px;
      }

      .pricing-detail-cta{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        text-decoration:none;
        background:linear-gradient(
          135deg,
          #d8b238,
          #b8944d
        );
        color:#07101f;
        font-weight:800;
        border-radius:11px;
        padding:13px 20px;
      }

      @media(max-width:850px){

        .pricing-grid{
          grid-template-columns:1fr!important;
          max-width:520px!important;
        }

        .pricing-card.featured{
          transform:none!important;
        }

      }

      @media(max-width:600px){

        .pricing-detail-box{
          padding:32px 22px;
        }

        .pricing-detail-box h2{
          font-size:27px;
        }

        .pricing-detail-price{
          font-size:29px;
        }

      }

    `;

    document.head.appendChild(style);

    // ===============================
    // MODALE DÉTAIL PRESTIGE
    // ===============================
    const modal = document.createElement("div");

    modal.id = "pricingDetailModal";

    modal.className = "pricing-detail-modal";

    modal.setAttribute("aria-hidden","true");

    modal.innerHTML = `

      <div
        class="pricing-detail-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pricingDetailTitle"
      >

        <button
          class="pricing-detail-close"
          type="button"
          aria-label="Fermer"
        >
          &times;
        </button>

        <div class="pricing-detail-kicker">
          La Clé Conciergerie
        </div>

        <h2 id="pricingDetailTitle">
          Formule Prestige
        </h2>

        <div
          class="pricing-detail-price"
          id="pricingDetailPrice"
        >
          18 %
        </div>

        <p id="pricingDetailIntro"></p>

        <ul
          class="pricing-detail-list"
          id="pricingDetailList"
        ></ul>

        <a
          class="pricing-detail-cta"
          href="#contact"
        >
          Demander un devis
          <i class="fa-solid fa-arrow-right"></i>
        </a>

      </div>

    `;

    document.body.appendChild(modal);

    // ===============================
    // FERMER LA MODALE
    // ===============================
    function closeModal(){

      modal.classList.remove("active");

      modal.setAttribute("aria-hidden","true");

      document.body.style.overflow = "";

    }

    // ===============================
    // OUVRIR LA MODALE
    // ===============================
    function openModal(){

      document.getElementById(
        "pricingDetailTitle"
      ).textContent = plan.title;

      document.getElementById(
        "pricingDetailPrice"
      ).textContent = plan.percent;

      document.getElementById(
        "pricingDetailIntro"
      ).textContent = plan.intro;

      document.getElementById(
        "pricingDetailList"
      ).innerHTML = plan.items
        .map(item => `
          <li>
            <i class="fa-solid fa-check"></i>
            <span>${item}</span>
          </li>
        `)
        .join("");

      modal.classList.add("active");

      modal.setAttribute("aria-hidden","false");

      document.body.style.overflow = "hidden";

    }

    // ===============================
    // BOUTON FERMER
    // ===============================
    modal
      .querySelector(".pricing-detail-close")
      .addEventListener(
        "click",
        closeModal
      );

    modal.addEventListener(
      "click",
      e => {
        if(e.target === modal){
          closeModal();
        }
      }
    );

    document.addEventListener(
      "keydown",
      e => {
        if(e.key === "Escape"){
          closeModal();
        }
      }
    );

    // ===============================
    // BOUTONS "VOIR LE DÉTAIL"
    // ===============================
    document
      .querySelectorAll(".price-card")
      .forEach(card => {

        const title = card.querySelector("h3");

        if(!title) return;

        const name =
          title.textContent
            .trim()
            .toLowerCase();

        if(
          !name.includes("prestige") &&
          !name.includes("premium")
        ) return;

        // Transforme la carte en Prestige
        title.textContent = "Prestige";

        const price =
          card.querySelector(".price");

        if(price){
          price.textContent = "18 %";
        }

        if(
          card.querySelector(
            ".pricing-detail-btn"
          )
        ) return;

        const button =
          document.createElement("button");

        button.type = "button";

        button.className =
          "pricing-detail-btn";

        button.innerHTML =
          'Voir le détail <i class="fa-solid fa-arrow-right"></i>';

        button.addEventListener(
          "click",
          openModal
        );

        const existingButton =
          card.querySelector("a.btn-gold");

        if(existingButton){

          existingButton.insertAdjacentElement(
            "afterend",
            button
          );

        } else {

          card.appendChild(button);

        }

      });

    // ===============================
    // BOUTONS DEMANDER UN DEVIS
    // ===============================
    document
      .querySelectorAll(
        '.price-card a[href="#contact"]'
      )
      .forEach(link => {

        link.addEventListener(
          "click",
          function(e){

            e.preventDefault();

            const contact =
              document.getElementById("contact");

            if(contact){

              document.body.classList.add(
                "lc-view-open"
              );

              document
                .querySelectorAll(
                  ".lc-secondary-view"
                )
                .forEach(el =>
                  el.classList.remove(
                    "lc-active-view"
                  )
                );

              contact.classList.add(
                "lc-active-view"
              );

              const back =
                document.getElementById(
                  "lcBackHome"
                );

              if(back){
                back.style.display = "block";
              }

              contact.scrollIntoView({
                behavior:"smooth",
                block:"start"
              });

            }

          }
        );

      });

    // ===============================
    // CTA DE LA MODALE
    // ===============================
    const detailCta =
      modal.querySelector(
        ".pricing-detail-cta"
      );

    detailCta.addEventListener(
      "click",
      function(e){

        e.preventDefault();

        closeModal();

        const contact =
          document.getElementById("contact");

        if(contact){

          document.body.classList.add(
            "lc-view-open"
          );

          document
            .querySelectorAll(
              ".lc-secondary-view"
            )
            .forEach(el =>
              el.classList.remove(
                "lc-active-view"
              )
            );

          contact.classList.add(
            "lc-active-view"
          );

          const back =
            document.getElementById(
              "lcBackHome"
            );

          if(back){
            back.style.display = "block";
          }

          contact.scrollIntoView({
            behavior:"smooth",
            block:"start"
          });

        }

      }
    );

    // ===============================
    // SUPPRESSION DU "150+ VOYAGEURS"
    // ===============================
    document.querySelectorAll("*").forEach(el => {

      if(
        el.children.length === 0 &&
        el.textContent &&
        el.textContent.includes("150+")
      ){

        const text =
          el.textContent.toLowerCase();

        if(
          text.includes("voyageur") ||
          text.includes("voyageurs")
        ){

          const parent = el.parentElement;

          if(parent){
            parent.remove();
          } else {
            el.remove();
          }

        }

      }

    });

    // ===============================
    // SÉCURITÉ : AUCUN 23 %
    // ===============================
    document
      .querySelectorAll("body *")
      .forEach(el => {

        if(
          el.children.length === 0 &&
          el.textContent
        ){

          el.textContent =
            el.textContent
              .replace(/23\s*%/g,"18 %")
              .replace(/20\s*%/g,"18 %")
              .replace(/15\s*%/g,"18 %");

        }

      });

    console.log(
      "La Clé Conciergerie — Formule unique Prestige : 18 %"
    );

  };

  if(
    document.readyState === "loading"
  ){

    document.addEventListener(
      "DOMContentLoaded",
      ready
    );

  } else {

    ready();

  }

})();
