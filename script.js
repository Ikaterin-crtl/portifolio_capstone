document.addEventListener("DOMContentLoaded", function () {
    // Força a posição fixa do container da lâmpada
    const lampContainer = document.querySelector('.lamp-container');
    if (lampContainer) {
        lampContainer.style.position = "fixed";
        lampContainer.style.top = "6rem";
        lampContainer.style.right = "20px";
    }

    const body = document.body;
    const lightOff = document.getElementById('lightOff');
    const lightOn = document.getElementById('lightOn');
    const interruptorIcon = document.getElementById('interruptorIcon');

    // Ajuste os caminhos conforme sua estrutura de pastas!
    const interruptorStatic = "./trocar-removebg-preview.png";
    const interruptorAnimated = "./on-off-unscreen.gif";

    const lightOnImage = "./light_bulb_on.png";
    const lightOffImage = "./light_bulb_off.png";

    // ==========================
    // 🔸 LÂMPADA: Começa apagada
    // ==========================
    lightOff.style.display = "block";
    lightOn.style.display = "none";
    body.classList.add("light-off");
    body.classList.remove("light-on");

    setTimeout(() => {
        body.classList.replace('light-off', 'light-on');
        lightOff.style.display = "none";
        lightOn.style.display = "block";
        lightOn.classList.remove("animate-swing");
        void lightOn.offsetWidth; // Força reflow para reiniciar a animação
        lightOn.classList.add("animate-swing"); // Ativa a animação de balanço
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

            // Reaplica a animação de balanço ao acender
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
