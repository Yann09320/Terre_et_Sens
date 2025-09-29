(() => {
  'use strict';

  //  Helpers
  const qs = (sel, ctx) => (ctx || document).querySelector(sel);
  const qsa = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const on = (el, ev, fn) => el?.addEventListener(ev, fn);
  const addClass = (el, c) => el?.classList.add(c);
  const removeClass = (el, c) => el?.classList.remove(c);

  //  Menu hamburger
  const navbar = qs('.navbar');
  const toggler = qs('.navbar-toggler');
  const collapse = qs('#navbarNav');
  const focusableInMenu = 'a[href], button:not([disabled])';
  let firstMenuLink = null, lastMenuLink = null;

  const toggleMenu = (open) => {
    const isOpen = collapse.classList.contains('show');
    const wantOpen = typeof open === 'boolean' ? open : !isOpen;

    if (wantOpen) {
      collapse.classList.add('show');
      toggler.setAttribute('aria-expanded', 'true');
      const focusables = qsa(focusableInMenu, collapse);
      if (focusables.length) {
        [firstMenuLink, lastMenuLink] = [focusables[0], focusables.at(-1)];
        firstMenuLink.focus();
      }
      addClass(document.documentElement, 'nav-open');
    } else {
      collapse.classList.remove('show');
      toggler.setAttribute('aria-expanded', 'false');
      removeClass(document.documentElement, 'nav-open');
      toggler.focus();
    }
  };

  const onNavLinkClick = () => {
    if (collapse.classList.contains('show')) toggleMenu(false);
  };

  on(toggler, 'click', e => {
    e.preventDefault();
    toggleMenu();
  });

  qsa('#navbarNav .nav-link').forEach(link => on(link, 'click', onNavLinkClick));

  //  Accessibilité clavier
  on(document, 'keydown', e => {
    if (!collapse?.classList.contains('show')) return;

    if (e.key === 'Escape' || e.keyCode === 27) toggleMenu(false);

    if (e.key === 'Tab' || e.keyCode === 9) {
      const focusables = qsa(focusableInMenu, collapse);
      if (!focusables.length) return;
      const active = document.activeElement;
      if (e.shiftKey && active === focusables[0]) {
        e.preventDefault();
        focusables.at(-1).focus();
      } else if (!e.shiftKey && active === focusables.at(-1)) {
        e.preventDefault();
        focusables[0].focus();
      }
    }
  });

  //  Scroll fluide
  const smoothScrollTo = (targetSelector, offset = 0) => {
    const target = qs(targetSelector);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const cta = qs('.btn-primary');
  if (cta) {
    on(cta, 'click', e => {
      const href = cta.getAttribute('href') || '';
      e.preventDefault();
      smoothScrollTo(href.startsWith('#') ? href : 'main section', 16);
    });
  }

  //  WebP support
  const testWebP = callback => {
    const img = new Image();
    img.onload = img.onerror = () => callback(img.height === 2);
    img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  };

  testWebP(supported => {
    if (supported) addClass(document.documentElement, 'webp-supported');
    const hero = qs('.hero');
    if (!hero) return;
    const cssBg = window.getComputedStyle(hero).backgroundImage;
    if (supported && cssBg.includes('.png')) {
      let webpUrl = cssBg.replace('.png', '.webp').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      const probe = new Image();
      probe.onload = () => { hero.style.backgroundImage = `url("${webpUrl}")`; };
      probe.onerror = () => {};
      probe.src = webpUrl;
    }
  });

  //  Lazy loading
  const lazyLoadImages = () => {
    const lazy = qsa('img[data-lazy]');
    if (!lazy.length) return;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-lazy');
            img.removeAttribute('data-lazy');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '200px 0px' });

      lazy.forEach(img => io.observe(img));
    } else {
      lazy.forEach(img => {
        img.src = img.getAttribute('data-lazy');
        img.removeAttribute('data-lazy');
      });
    }
  };
  lazyLoadImages();

  //  Preload hero image
  (() => {
    const hero = qs('.hero');
    if (!hero) return;
    const cssBg = window.getComputedStyle(hero).backgroundImage;
    if (!cssBg || cssBg === 'none') return;
    const url = cssBg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    if (!qs(`link[rel="preload"][href="${url}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    }
  })();

  //  Fermer le menu si clic en dehors
  on(document, 'click', e => {
    if (!collapse?.classList.contains('show')) return;
    const target = e.target;
    if (!collapse.contains(target) && !toggler.contains(target)) {
      toggleMenu(false);
    }
  });

  //  Suivi des clics CTA
  qsa('.btn-primary, .cta').forEach(btn => {
    on(btn, 'click', () => {
      try {
        console.info('CTA clicked:', (btn.textContent || btn.innerText).trim());
      } catch (err) {}
    });
  });

  //  API minimale pour le debug
  window.AppMain = { toggleMenu };

})();
