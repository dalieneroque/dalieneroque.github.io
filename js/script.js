document.addEventListener("DOMContentLoaded", () => {
    // =============================================
    // 1. CONTROLE DO MENU MOBILE ACESSÍVEL
    // =============================================
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    function setMenuState(isOpen) {
        navMenu.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"
        );
    }

    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const isCurrentlyOpen = navMenu.classList.contains("active");
        setMenuState(!isCurrentlyOpen);
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
    });

    // Fecha ao clicar fora do menu
    document.addEventListener("click", (event) => {
        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            setMenuState(false);
        }
    });

    // Fecha ao pressionar a tecla Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navMenu.classList.contains("active")) {
            setMenuState(false);
            menuToggle.focus();
        }
    });

    // =============================================
    // 2. EFEITO DE DIGITAÇÃO (TYPING LOOP)
    // =============================================
    const typedTextElement = document.getElementById("typedText");
    const texts = [
        "Olá, eu sou Daliene Roque",
        "Engenheira de Software",
        "Desenvolvedora .NET"
    ];

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
        typedTextElement.textContent = texts[0];
        return;
    }

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentText = texts[textIndex];

        if (!isDeleting) {
            charIndex++;
            typedTextElement.textContent = currentText.slice(0, charIndex);

            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeLoop, 1500);
                return;
            }
            setTimeout(typeLoop, 70);
        } else {
            charIndex--;
            typedTextElement.textContent = currentText.slice(0, charIndex);

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeLoop, 400);
                return;
            }
            setTimeout(typeLoop, 40);
        }
    }

    typeLoop();
});