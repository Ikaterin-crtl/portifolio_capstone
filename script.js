document.addEventListener("DOMContentLoaded", () => {
    const body     = document.body;
    const lightOff = document.getElementById('lightOff');
    const lightOn  = document.getElementById('lightOn');
    const switcher = document.getElementById('interruptorIcon');
    const lamp     = document.getElementById('lamp');
  
    // 1) Começa apagada
    body.classList.add("light-off");
    lightOff.style.display = "block";
    lightOn .style.display = "none";
  
    // 2) Acende após 2.5s com swing
    setTimeout(() => {
      body.classList.replace('light-off','light-on');
      lightOff.style.display = "none";
      lightOn .style.display = "block";
      lightOn.classList.add("animate-swing");
    }, 2500);
  
    // 3) Toggle lâmpada
    switcher.addEventListener('click', () => {
      const isOn = body.classList.toggle('light-on');
      body.classList.toggle('light-off', !isOn);
      lightOn .style.display = isOn ? "block" : "none";
      lightOff.style.display = isOn ? "none"  : "block";
    });
  
    // 4) Idioma automático
    function setLanguage(lang) {
      document.querySelectorAll('[data-pt],[data-en]').forEach(el => {
        el.innerHTML = el.getAttribute(`data-${lang}`);
      });
    }
    const userLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
    setLanguage(userLang);
  
    // 5) Toggle menu de idioma
    const globeIcon = document.getElementById('globeIcon');
    const langMenu  = document.getElementById('langMenu');
    globeIcon.addEventListener('click', () => {
      langMenu.style.display = langMenu.style.display === 'block' ? 'none' : 'block';
    });
    langMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const lang = link.getAttribute('data-lang');
        setLanguage(lang);
        langMenu.style.display = 'none';
      });
    });
  
    // 6) Hide/show lâmpada ao rolar
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) lamp.classList.add('hide');
      else                     lamp.classList.remove('hide');
    });
  });
  