// diegetic-op-engine.js — UI logic for Design Fiction Operator

(function () {
    const catStrip = document.getElementById('cat-strip');
    const defBox = document.getElementById('def-box');
    const stepStripEl = document.getElementById('step-strip');
    const stepStatus = document.getElementById('step-status');
    const stepHint = document.getElementById('step-hint');
    const oneButton = document.getElementById('one-button');
    const cardsEl = document.getElementById('cards');
    const toastEl = document.getElementById('toast');

    let activeCat = 0;
    let activeStep = 0;
    const stepKeys = ['site', 'dig', 'infer', 'build'];

    // --- Utilities ---
    function escapeHtml(t) {
        return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function formatPrompt(raw) {
        const lines = raw.trim().split(/\r?\n/).map(l => l.replace(/\s+$/, ''));
        const compact = []; let blank = 0;
        lines.forEach(l => {
            if (!l.trim()) { blank++; if (blank > 1) return; compact.push(''); return; }
            blank = 0; compact.push(l);
        });
        const escaped = escapeHtml(compact.join('\n'));
        return escaped.replace(/(&lt;\/?)([\w_][\w:.-]*)([^&]*?&gt;)/g,
            (_, o, n, c) => `${o}<span class="tag-name">${n}</span>${c}`);
    }

    function showToast(msg) {
        toastEl.textContent = msg;
        toastEl.classList.add('visible');
        clearTimeout(showToast.t);
        showToast.t = setTimeout(() => toastEl.classList.remove('visible'), 1400);
    }

    async function copyText(text, label) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                const ta = document.createElement('textarea');
                ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
                document.body.appendChild(ta); ta.focus(); ta.select();
                document.execCommand('copy'); ta.remove();
            }
            showToast(`${label} copied`);
        } catch (_) { showToast('Copy failed'); }
    }

    // --- Render category strip ---
    function renderCatStrip() {
        catStrip.innerHTML = CATEGORIES.map((c, i) =>
            `<button type="button" class="cat-btn" data-cat="${i}" aria-selected="${i === activeCat}" aria-label="${c.word}">
                <span class="cat-glyph" aria-hidden="true">${c.icon}</span>
                <span class="cat-word">${c.word}</span>
            </button>`
        ).join('');
    }

    function syncCatStrip() {
        catStrip.querySelectorAll('.cat-btn').forEach((b, i) => {
            b.setAttribute('aria-selected', String(i === activeCat));
        });
    }

    // --- Render definition box ---
    function renderDefBox() {
        const c = CATEGORIES[activeCat];
        defBox.innerHTML = `<div class="ts">${c.word} ${c.ts}</div><p>${c.def}</p>`;
    }

    // --- Render step strip ---
    function renderStepStrip() {
        stepStripEl.innerHTML = STEPS.map((s, i) =>
            `<button type="button" class="step-btn" data-step="${i}" aria-selected="${i === activeStep}" aria-label="Step ${i + 1} ${s.word}">
                <span class="step-glyph" aria-hidden="true">${s.icon}</span>
                <span class="step-word">${s.word}</span>
            </button>`
        ).join('');
    }

    function syncStepStrip() {
        stepStripEl.querySelectorAll('.step-btn').forEach((b, i) => {
            b.setAttribute('aria-selected', String(i === activeStep));
        });
    }

    // --- Get current prompt ---
    function currentPrompt() {
        const catId = CATEGORIES[activeCat].id;
        const stepKey = stepKeys[activeStep];
        return PROMPTS[catId][stepKey];
    }

    // --- Render card ---
    function renderCard() {
        const p = currentPrompt();
        const s = STEPS[activeStep];
        const heur = (p.heuristics || []).map(h => `<li>${h}</li>`).join('');
        cardsEl.innerHTML = `
        <article class="card">
            <div class="card-head">
                <h3>${s.icon} ${s.word} — ${p.title}</h3>
            </div>
            <div class="meta">
                <p>${p.goal}</p>
                <ul class="heuristics" aria-label="Heuristics">${heur}</ul>
                <div class="card-actions">
                    <button type="button" data-action="copy-prompt">Copy Only</button>
                </div>
            </div>
            <details>
                <summary>Full Prompt</summary>
                <div class="prompt-reader" tabindex="0" aria-label="${p.title} full prompt">${formatPrompt(p.prompt)}</div>
            </details>
        </article>`;
    }

    // --- Update status bar ---
    function updateStatus() {
        const c = CATEGORIES[activeCat];
        const s = STEPS[activeStep];
        stepStatus.innerHTML = `${c.word} · <strong>${s.icon} ${s.word}</strong> · ${activeStep + 1}/4`;
        stepHint.textContent = s.cue;
        const isLast = (activeStep === 3);
        oneButton.textContent = isLast ? `${s.icon} COPY + NEXT IDIOM` : `${s.icon} COPY + NEXT`;
    }

    // --- Full render ---
    function render() {
        syncCatStrip();
        renderDefBox();
        syncStepStrip();
        renderCard();
        updateStatus();
    }

    // --- Events ---
    catStrip.addEventListener('click', e => {
        const btn = e.target.closest('[data-cat]');
        if (!btn) return;
        activeCat = Number(btn.dataset.cat);
        activeStep = 0;
        render();
    });

    stepStripEl.addEventListener('click', e => {
        const btn = e.target.closest('[data-step]');
        if (!btn) return;
        activeStep = Number(btn.dataset.step);
        render();
    });

    oneButton.addEventListener('click', async () => {
        const p = currentPrompt();
        await copyText(p.prompt.trim() + '\n', p.title);
        if (activeStep === 3) {
            activeCat = (activeCat + 1) % CATEGORIES.length;
            activeStep = 0;
            if (activeCat === 0) showToast('All idioms cycled, restarted');
        } else {
            activeStep++;
        }
        render();
    });

    cardsEl.addEventListener('click', async e => {
        if (e.target.dataset.action === 'copy-prompt') {
            const p = currentPrompt();
            await copyText(p.prompt.trim() + '\n', p.title);
        }
    });

    window.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { activeStep = Math.min(3, activeStep + 1); render(); }
        if (e.key === 'ArrowLeft') { activeStep = Math.max(0, activeStep - 1); render(); }
        if (e.key === 'ArrowDown') { activeCat = Math.min(CATEGORIES.length - 1, activeCat + 1); activeStep = 0; render(); }
        if (e.key === 'ArrowUp') { activeCat = Math.max(0, activeCat - 1); activeStep = 0; render(); }
    });

    // --- Boot ---
    renderCatStrip();
    renderStepStrip();
    render();
})();
