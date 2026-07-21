// ==========================================================================
// 1. CONTROLE DE ANIMAÇÕES AO ROLAR (SCROLL REVEAL)
// ==========================================================================

const observerOptions = {
    threshold: 0.2 // Dispara quando 20% da seção estiver visível
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active-reveal');
        }
    });
}, observerOptions);

// Aplica o observador em todas as seções que devem animar
document.querySelectorAll('.scroll-reveal').forEach(section => {
    observer.observe(section);
});

// ==========================================================================
// 2. FUNÇÕES DE PREVIEW / MODAL
// ==========================================================================

function openPreview(id) {
    const target = document.getElementById(`preview-${id}`);
    if (target) {
        target.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePreview(id) {
    const target = document.getElementById(`preview-${id}`);
    if (target) {
        target.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ==========================================================================
// 3. FILTRO DA SEÇÃO OUTROS TRABALHOS
// ==========================================================================

function filterProjects(category, event) {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.other-card');

    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (event && event.target) {
        event.target.classList.add('active');
    }

    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==========================================================================
// 4. INTERAÇÃO E REAÇÃO DOS BOTÕES DE PLANOS E CONTRATAÇÃO
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const actionButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .card-link');

    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        });

        button.addEventListener('click', (e) => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });

    // Controla o clique do Botão Flutuante (+)
    const fabContainer = document.getElementById('fabContainer');
    const fabMain = document.getElementById('fabMain');

    if (fabMain && fabContainer) {
        fabMain.addEventListener('click', (e) => {
            e.stopPropagation();
            fabContainer.classList.toggle('active');
        });

        // Fecha o menu se clicar em qualquer lugar fora dele
        document.addEventListener('click', (e) => {
            if (!fabContainer.contains(e.target)) {
                fabContainer.classList.remove('active');
            }
        });
    }
});

// Animação dos Contadores (Counters)
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

window.addEventListener('scroll', () => {
    const section = document.querySelector('.counters-section');
    if (!section) return;
    
    const sectionPos = section.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !counterStarted) {
        counterStarted = true;
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = target / 50;

                if (count < target) {
                    counter.innerText = Math.ceil(count + speed);
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }
});