/* Animations autonomes La Clé — indépendantes du script principal */
(function () {
  function startAnimations() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var targets = document.querySelectorAll(
      '.section-title, .lc-services-header, .lc-service-card, .service-card, .advantage, .price-card, .review-card, .about-company-content, .about-company-card, .about-value, .area-featured, .area-secondary, .faq-item, .review-form-wrapper, #calculateur, #estimation-logement, .contact form'
    );
    document.documentElement.classList.add('lc-motion-ready');
    targets.forEach(function (el, index) {
      if (el.closest('.hero')) return;
      el.classList.add('lc-motion-item');
      el.style.setProperty('--lc-motion-delay', (index % 5) * 70 + 'ms');
    });
    if (reduce) {
      targets.forEach(function (el) { el.classList.add('lc-motion-shown'); });
    } else if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('lc-motion-shown');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
      targets.forEach(function (el) {
        if (el.classList.contains('lc-motion-item')) observer.observe(el);
      });
    } else {
      targets.forEach(function (el) { el.classList.add('lc-motion-shown'); });
    }
    document.querySelectorAll('.lc-service-card, .service-card, .advantage, .price-card, .review-card, .area-featured, .area-secondary').forEach(function (el) {
      el.addEventListener('mouseenter', function () { if (!reduce) el.style.transform = 'translateY(-5px)'; });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
    document.documentElement.classList.add('lc-motion-hero');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startAnimations);
  else startAnimations();
})();
