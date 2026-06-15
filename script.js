const DEFAULT_FONT_SIZE = 16;
const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 20;
let currentFontSize = DEFAULT_FONT_SIZE;

const applyFontSize = () => {
  document.documentElement.style.fontSize = `${currentFontSize}px`;
};

const increaseFont = () => {
  currentFontSize = Math.min(MAX_FONT_SIZE, currentFontSize + 2);
  applyFontSize();
};

const decreaseFont = () => {
  currentFontSize = Math.max(MIN_FONT_SIZE, currentFontSize - 2);
  applyFontSize();
};

const toggleContrast = () => {
  document.body.classList.toggle('high-contrast');
};

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const accessibilityBtn = document.getElementById('accessibility-btn');
const accessibilityMenu = document.getElementById('accessibility-menu');
const revealElements = document.querySelectorAll('.reveal');
const dots = document.querySelectorAll('.dot');
const navMore = document.querySelector('.nav-more');
const navMoreBtn = document.getElementById('nav-more-btn');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

if (navMore && navMoreBtn) {
  navMoreBtn.addEventListener('click', () => {
    const isOpen = navMore.classList.toggle('open');
    navMoreBtn.setAttribute('aria-expanded', String(isOpen));
  });

  navMore.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMore.classList.remove('open');
      navMoreBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!navMore.contains(event.target)) {
      navMore.classList.remove('open');
      navMoreBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

if (accessibilityBtn && accessibilityMenu) {
  accessibilityBtn.addEventListener('click', () => {
    const isHidden = accessibilityMenu.classList.toggle('hidden');
    accessibilityBtn.setAttribute('aria-expanded', String(!isHidden));
  });
}

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 60) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

const carouselItems = [
 {
    src: './img/campo1.png',
    alt: 'Produção de alimentos no campo',
    title: 'Produção',
    description: 'Tudo começa no campo, com uso de água, solo, energia e trabalho humano.'
  },
  {
    src: './img/mercado1.png',
    alt: 'Alimentos no mercado',
    title: 'Distribuição',
    description: 'Os alimentos percorrem mercados e cidades até chegar ao consumidor.'
  },
  {
    src: './img/desperdicio1.png',
    alt: 'Desperdício de alimentos',
    title: 'Desperdício',
    description: 'Quando descartado, todo esse processo é perdido, gerando impacto ambiental.'
  }
];

let currentIndex = 0;
let autoSlide;

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function updateCarousel() {
  const item = carouselItems[currentIndex];
  const img = document.getElementById('carousel-image');
  const title = document.getElementById('carousel-title');
  const description = document.getElementById('carousel-description');

  if (!img || !title || !description) return;

  img.src = item.src;
  img.alt = item.alt;
  title.textContent = item.title;
  description.textContent = item.description;
  updateDots();
}

function changeSlide(direction) {
  currentIndex = (currentIndex + direction + carouselItems.length) % carouselItems.length;
  updateCarousel();
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

function startAutoSlide() {
  autoSlide = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    goToSlide(Number(dot.dataset.index));
    stopAutoSlide();
    startAutoSlide();
  });
});

const facts =  [
  "Cerca de 1/3 de todos os alimentos produzidos no mundo é desperdiçado.",
  "Para produzir apenas 1 kg de alimento, podem ser necessários centenas de litros de água.",
  "O desperdício de alimentos também significa desperdício de energia, transporte e trabalho humano.",
  "Grande parte do desperdício acontece dentro das próprias casas, no dia a dia.",
  "Reduzir o desperdício é uma das formas mais simples de ajudar o meio ambiente."
];

const factText = document.getElementById('fact-text');
const factBtn = document.getElementById('fact-btn');
let currentFactIndex = 0;

if (factBtn && factText) {
  factBtn.addEventListener('click', () => {
    let nextIndex;

    do {
      nextIndex = Math.floor(Math.random() * facts.length);
    } while (nextIndex === currentFactIndex && facts.length > 1);

    currentFactIndex = nextIndex;
    factText.textContent = facts[currentFactIndex];
  });
}

const quizForm = document.getElementById('quiz-form');
const quizResult = document.getElementById('quiz-result');

if (quizForm && quizResult) {
  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const answers = ['q1', 'q2', 'q3', 'q4', 'q5'];
    let score = 0;
    let allAnswered = true;

    answers.forEach((question) => {
      const selected = document.querySelector(`input[name="${question}"]:checked`);

      if (!selected) {
        allAnswered = false;
        return;
      }

      if (selected.value === 'certo') {
        score += 1;
      }
    });

    if (!allAnswered) {
      quizResult.textContent = 'Responda todas as perguntas para ver o resultado.';
      quizResult.classList.add('show');
      return;
    }

    const feedbacks = {
      5: 'Parabéns! Você acertou tudo e compreendeu muito bem a relação entre cevada, malte, campo, cidade e sustentabilidade.',
      4: 'Excelente! Você acertou 4 de 5 perguntas e demonstrou ótima compreensão do tema.',
      3: 'Muito bom! Você acertou 3 de 5 perguntas e já domina boa parte do conteúdo.',
      2: 'Você acertou 2 de 5 perguntas. Vale revisar o conteúdo e tentar novamente.',
      1: 'Você acertou 1 de 5 perguntas. Explore o site novamente e tente mais uma vez.',
      0: 'Você ainda não acertou nenhuma. Explore o site novamente e faça uma nova tentativa.'
    };

    quizResult.textContent = `Resultado: ${score}/5. ${feedbacks[score]}`;
    quizResult.classList.add('show');
  });
}

const cardToggles = document.querySelectorAll('.card-toggle');

cardToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const card = toggle.closest('.expandable-card');
    const isOpen = card.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.querySelector('.card-icon').textContent = isOpen ? '−' : '+';
  });
});

const carouselWrapper = document.querySelector('.carousel-wrapper');
if (carouselWrapper) {
  carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
  carouselWrapper.addEventListener('mouseleave', startAutoSlide);
}

updateCarousel();
startAutoSlide();
function calcularDesperdicio() {
  const freq = Number(document.getElementById('freq').value);
  const quantidade = Number(document.getElementById('quantidade').value);
  const resultado = document.getElementById('resultado');

  if (!freq || !quantidade) {
    resultado.textContent = "Preencha todos os campos.";
    resultado.classList.add('show');
    return;
  }

  const desperdicioSemanal = freq * quantidade;
  const desperdicioMensal = desperdicioSemanal * 4;
  const agua = desperdicioMensal * 200;

  resultado.innerHTML = 
`<strong>Você desperdiça aproximadamente ${desperdicioMensal} pratos de comida por mês.</strong><br><br>

💧 Isso representa cerca de <strong>${agua} litros de água</strong> desperdiçados.<br><br>

🚿 Isso equivale a aproximadamente <strong>${Math.round(agua / 50)} banhos</strong>.<br><br>

🌍 Pequenas atitudes no dia a dia podem gerar grandes impactos no meio ambiente.`;

  resultado.classList.add('show');
}let nivelPrato = 1;

function diminuirPrato() {
  const img = document.getElementById('prato-img');
  const impacto = document.getElementById('impacto-prato');

  nivelPrato++;

  if (nivelPrato > 5) nivelPrato = 5;

  img.src = `./img/prato${nivelPrato}.png`;

  const mensagens = [
    "",
    "Você deixou comida no prato.",
    "Esse alimento exigiu água, solo e trabalho para existir.",
    "Agora esses recursos estão sendo desperdiçados.",
    "O impacto ambiental cresce a cada escolha.",
    "Tudo foi jogado fora. O desperdício aconteceu."
  ];

  impacto.textContent = mensagens[nivelPrato];
}let etapaHistoria = 0;

function proximaHistoria() {
  const texto = document.getElementById('texto-historia');
  const imagem = document.getElementById('img-historia');

  const historia = [
    "Eu nasci no campo, cultivado com cuidado e dedicação.",
    "Para crescer, precisei de água, sol, solo fértil e muito trabalho humano.",
    "Fui colhido, transportado e levado até o mercado.",
    "Alguém me comprou com a intenção de me consumir.",
    "Mas acabei esquecido dentro da geladeira.",
    "Depois de dias, fui jogado fora.",
    "Todo o esforço, recursos e energia foram desperdiçados.",
    "E assim, mais um alimento deixou de cumprir seu propósito."
  ];

  etapaHistoria++;

  if (etapaHistoria >= historia.length) {
    etapaHistoria = historia.length - 1;
  }

  // atualiza texto
  texto.textContent = historia[etapaHistoria];

 imagem.src = `./img/tomate${etapaHistoria + 1}.png`;
  }
