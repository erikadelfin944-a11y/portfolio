// Era Shell & Trash Gralats Multi-Calculator Logic
// Shell: Sand * 5, Scallop * 5, Starfish * 7, Aero * 3
// Trash: Bottles * 5, Papers * 4, Newspapers * 4, Tires * 6

// Rates definition
const SHELL_RATES = {
  sand: 5,
  scall: 5,
  star: 7,
  aero: 3
};

const TRASH_RATES = {
  bottles: 5,
  papers: 4,
  news: 4,
  tires: 6
};

// DOM Elements - Shells
const shellInputs = {
  sand: document.getElementById('inputSand'),
  scall: document.getElementById('inputScall'),
  star: document.getElementById('inputStar'),
  aero: document.getElementById('inputAero')
};

const shellSubtotals = {
  sand: document.getElementById('subSand'),
  scall: document.getElementById('subScall'),
  star: document.getElementById('subStar'),
  aero: document.getElementById('subAero')
};

const inputRatio = document.getElementById('inputRatio');
const totalGralatsCountEl = document.getElementById('totalGralatsCount');
const totalTrochusEl = document.getElementById('totalTrochus');
const resetBtn = document.getElementById('resetBtn');
const copyBtn = document.getElementById('copyBtn');
const copyBtnText = document.getElementById('copyBtnText');

// DOM Elements - Trash
const trashInputs = {
  bottles: document.getElementById('inputBottles'),
  papers: document.getElementById('inputPapers'),
  news: document.getElementById('inputNews'),
  tires: document.getElementById('inputTires')
};

const trashSubtotals = {
  bottles: document.getElementById('subBottles'),
  papers: document.getElementById('subPapers'),
  news: document.getElementById('subNews'),
  tires: document.getElementById('subTires')
};

const inputTrashRatio = document.getElementById('inputTrashRatio');
const totalTrashGralatsEl = document.getElementById('totalTrashGralats');
const totalTrashTrochusEl = document.getElementById('totalTrashTrochus');
const resetTrashBtn = document.getElementById('resetTrashBtn');
const copyTrashBtn = document.getElementById('copyTrashBtn');
const copyTrashBtnText = document.getElementById('copyTrashBtnText');

// Grand Total Elements
const grandSummaryBanner = document.getElementById('grandSummaryBanner');
const combinedGralatsEl = document.getElementById('combinedGralats');
const combinedTrochusEl = document.getElementById('combinedTrochus');

// Tabs & Navigation
const tabShells = document.getElementById('tabShells');
const tabTrash = document.getElementById('tabTrash');
const tabBoth = document.getElementById('tabBoth');
const sectionShells = document.getElementById('sectionShells');
const sectionTrash = document.getElementById('sectionTrash');
const calcWrapper = document.querySelector('.calculator-wrapper');
const scrollTopBtn = document.getElementById('scrollTopBtn');

let lastShellGralats = 0;
let lastShellTrochus = 0;
let lastTrashGralats = 0;
let lastTrashTrochus = 0;

// ============================================
// Shell Calculation
// ============================================
function calculateShells() {
  const sand = Math.max(0, parseFloat(shellInputs.sand.value) || 0);
  const scall = Math.max(0, parseFloat(shellInputs.scall.value) || 0);
  const star = Math.max(0, parseFloat(shellInputs.star.value) || 0);
  const aero = Math.max(0, parseFloat(shellInputs.aero.value) || 0);

  const gra = sand * SHELL_RATES.sand;
  const gral = scall * SHELL_RATES.scall;
  const grala = star * SHELL_RATES.star;
  const gralat = aero * SHELL_RATES.aero;

  if (shellSubtotals.sand) shellSubtotals.sand.textContent = `${gra.toLocaleString()} Gralats`;
  if (shellSubtotals.scall) shellSubtotals.scall.textContent = `${gral.toLocaleString()} Gralats`;
  if (shellSubtotals.star) shellSubtotals.star.textContent = `${grala.toLocaleString()} Gralats`;
  if (shellSubtotals.aero) shellSubtotals.aero.textContent = `${gralat.toLocaleString()} Gralats`;

  lastShellGralats = gra + gral + grala + gralat;
  if (totalGralatsCountEl) {
    totalGralatsCountEl.textContent = lastShellGralats.toLocaleString();
  }

  const ratioVal = parseFloat(inputRatio ? inputRatio.value : 0);
  const ratio = (!isNaN(ratioVal) && ratioVal > 0) ? ratioVal : 0;
  lastShellTrochus = ratio > 0 ? Math.floor(lastShellGralats / ratio) : 0;

  if (totalTrochusEl) {
    totalTrochusEl.textContent = lastShellTrochus.toLocaleString();
  }

  updateCombinedTotal();
}

// ============================================
// Trash Calculation (Java logic ported)
// bott = bottles * 5; ppr = paper * 4; nppr = news * 4; tre = tire * 6;
// Gralats = bott + ppr + nppr + tre; total = Gralats / ratio (3.7)
// ============================================
function calculateTrash() {
  const bottles = Math.max(0, parseFloat(trashInputs.bottles.value) || 0);
  const papers = Math.max(0, parseFloat(trashInputs.papers.value) || 0);
  const news = Math.max(0, parseFloat(trashInputs.news.value) || 0);
  const tires = Math.max(0, parseFloat(trashInputs.tires.value) || 0);

  const bott = bottles * TRASH_RATES.bottles;
  const ppr = papers * TRASH_RATES.papers;
  const nppr = news * TRASH_RATES.news;
  const tre = tires * TRASH_RATES.tires;

  if (trashSubtotals.bottles) trashSubtotals.bottles.textContent = `${bott.toLocaleString()} Gralats`;
  if (trashSubtotals.papers) trashSubtotals.papers.textContent = `${ppr.toLocaleString()} Gralats`;
  if (trashSubtotals.news) trashSubtotals.news.textContent = `${nppr.toLocaleString()} Gralats`;
  if (trashSubtotals.tires) trashSubtotals.tires.textContent = `${tre.toLocaleString()} Gralats`;

  lastTrashGralats = bott + ppr + nppr + tre;
  if (totalTrashGralatsEl) {
    totalTrashGralatsEl.textContent = lastTrashGralats.toLocaleString();
  }

  const ratioVal = parseFloat(inputTrashRatio ? inputTrashRatio.value : 0);
  const ratio = (!isNaN(ratioVal) && ratioVal > 0) ? ratioVal : 0;
  lastTrashTrochus = ratio > 0 ? Math.floor(lastTrashGralats / ratio) : 0;

  if (totalTrashTrochusEl) {
    totalTrashTrochusEl.textContent = lastTrashTrochus.toLocaleString();
  }

  updateCombinedTotal();
}

// Update Combined Total when viewing both
function updateCombinedTotal() {
  if (combinedGralatsEl) {
    combinedGralatsEl.textContent = (lastShellGralats + lastTrashGralats).toLocaleString();
  }
  if (combinedTrochusEl) {
    combinedTrochusEl.textContent = (lastShellTrochus + lastTrashTrochus).toLocaleString();
  }
}

// ============================================
// Input Event Listeners
// ============================================
Object.values(shellInputs).forEach(input => {
  if (input) input.addEventListener('input', calculateShells);
});

if (inputRatio) {
  inputRatio.addEventListener('input', calculateShells);
  inputRatio.addEventListener('focus', () => inputRatio.select());
}

Object.values(trashInputs).forEach(input => {
  if (input) input.addEventListener('input', calculateTrash);
});

if (inputTrashRatio) {
  inputTrashRatio.addEventListener('input', calculateTrash);
  inputTrashRatio.addEventListener('focus', () => inputTrashRatio.select());
}

// Generic Stepper Buttons (+ / -)
document.querySelectorAll('.step-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const step = parseInt(btn.dataset.step, 10);
    const input = document.getElementById(targetId);
    if (!input) return;

    let currentVal = parseInt(input.value, 10) || 0;
    currentVal = Math.max(0, currentVal + step);
    input.value = currentVal === 0 ? '' : currentVal;

    // Trigger proper calculator based on input ID
    if (['inputSand', 'inputScall', 'inputStar', 'inputAero'].includes(targetId)) {
      calculateShells();
    } else {
      calculateTrash();
    }
  });
});

// ============================================
// Tabs & Mode Switcher
// ============================================
function setActiveTab(tab) {
  [tabShells, tabTrash, tabBoth].forEach(t => {
    if (t) {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    }
  });

  if (tab === 'shells') {
    tabShells.classList.add('active');
    tabShells.setAttribute('aria-selected', 'true');
    calcWrapper.classList.remove('show-both');
    sectionShells.classList.add('active');
    sectionTrash.classList.remove('active');
    if (grandSummaryBanner) grandSummaryBanner.style.display = 'none';
  } else if (tab === 'trash') {
    tabTrash.classList.add('active');
    tabTrash.setAttribute('aria-selected', 'true');
    calcWrapper.classList.remove('show-both');
    sectionShells.classList.remove('active');
    sectionTrash.classList.add('active');
    if (grandSummaryBanner) grandSummaryBanner.style.display = 'none';
  } else if (tab === 'both') {
    tabBoth.classList.add('active');
    tabBoth.setAttribute('aria-selected', 'true');
    calcWrapper.classList.add('show-both');
    sectionShells.classList.add('active');
    sectionTrash.classList.add('active');
    if (grandSummaryBanner) grandSummaryBanner.style.display = 'block';
  }
}

if (tabShells) {
  tabShells.addEventListener('click', () => setActiveTab('shells'));
}

if (tabTrash) {
  tabTrash.addEventListener('click', () => setActiveTab('trash'));
}

if (tabBoth) {
  tabBoth.addEventListener('click', () => setActiveTab('both'));
}

// ============================================
// Reset Buttons
// ============================================
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    Object.values(shellInputs).forEach(input => {
      if (input) input.value = '';
    });
    if (inputRatio) inputRatio.value = '0.00';
    calculateShells();
  });
}

if (resetTrashBtn) {
  resetTrashBtn.addEventListener('click', () => {
    Object.values(trashInputs).forEach(input => {
      if (input) input.value = '';
    });
    if (inputTrashRatio) inputTrashRatio.value = '3.7';
    calculateTrash();
  });
}

// ============================================
// Copy Buttons
// ============================================
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const trochus = totalTrochusEl ? totalTrochusEl.textContent : '0';
    const gralats = totalGralatsCountEl ? totalGralatsCountEl.textContent : '0';
    const text = `Shells: ${gralats} Gralats (${trochus} Trochus)`;
    try {
      await navigator.clipboard.writeText(text);
      if (copyBtnText) copyBtnText.textContent = 'Copied!';
      setTimeout(() => {
        if (copyBtnText) copyBtnText.textContent = 'Copy Shell Total';
      }, 1800);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  });
}

if (copyTrashBtn) {
  copyTrashBtn.addEventListener('click', async () => {
    const trochus = totalTrashTrochusEl ? totalTrashTrochusEl.textContent : '0';
    const gralats = totalTrashGralatsEl ? totalTrashGralatsEl.textContent : '0';
    const text = `Trash: ${gralats} Gralats (${trochus} Trochus)`;
    try {
      await navigator.clipboard.writeText(text);
      if (copyTrashBtnText) copyTrashBtnText.textContent = 'Copied!';
      setTimeout(() => {
        if (copyTrashBtnText) copyTrashBtnText.textContent = 'Copy Trash Total';
      }, 1800);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  });
}

// ============================================
// Scroll to Top Button
// ============================================
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 260) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initial calculation runs
calculateShells();
calculateTrash();
