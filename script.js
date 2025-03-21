document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const lightOff = document.getElementById('lightOff');
    const lightOn = document.getElementById('lightOn');
    const interruptorIcon = document.getElementById('interruptorIcon');

    const interruptorStatic = "./assets/Background/trocar-removebg-preview.png";
    const interruptorAnimated = "./assets/Background/on-off-unscreen.gif";

    // ==========================
    // 🔸 LÂMPADA: Começa apagada
    // ==========================
    lightOff.style.display = "block";
    lightOn.style.display = "none";
    body.classList.add("light-off");
    body.classList.remove("light-on");

    // 🔸 Após 2.5s, acende e balança 2x
    setTimeout(() => {
        body.classList.replace('light-off', 'light-on');
        lightOff.style.display = "none";
        lightOn.style.display = "block";

        // Reinicia e aplica animação de balanço
        lightOn.classList.remove("animate-swing");
        void lightOn.offsetWidth;
        lightOn.classList.add("animate-swing");
    }, 2500);

    // ==========================
    // 🔸 INTERRUPTOR
    // ==========================
    interruptorIcon.addEventListener('click', function () {
        interruptorIcon.src = interruptorAnimated;
        setTimeout(() => {
            interruptorIcon.src = interruptorStatic;
        }, 1000);

        if (body.classList.contains('light-on')) {
            body.classList.replace('light-on', 'light-off');
            lightOn.style.display = "none";
            lightOff.style.display = "block";
        } else {
            body.classList.replace('light-off', 'light-on');
            lightOff.style.display = "none";
            lightOn.style.display = "block";

            // Anima novamente ao acender
            lightOn.classList.remove("animate-swing");
            void lightOn.offsetWidth;
            lightOn.classList.add("animate-swing");
        }
    });

    // ==========================
    // 🔸 IDIOMA AUTOMÁTICO
    // ==========================
    function setLanguage(lang) {
        const elements = document.querySelectorAll('[data-pt], [data-en]');
        elements.forEach(el => {
            el.innerHTML = el.getAttribute(`data-${lang}`);
        });
    }

    const userLang = navigator.language || navigator.userLanguage;
    setLanguage(userLang.startsWith('pt') ? 'pt' : 'en');

    // ==========================
    // 🔸 BOTÃO GLOBO DE IDIOMA
    // ==========================
    const globeIcon = document.getElementById('globeIcon');
    const langMenu = document.getElementById('langMenu');

    globeIcon.addEventListener('click', function () {
        langMenu.style.display = langMenu.style.display === 'block' ? 'none' : 'block';
    });

    langMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            langMenu.style.display = 'none';
        });
    });
});
