/* ─── app.js ─── */
'use strict';

(async () => {
  /* ══════════════════════════════════════════
     1. Load config
     ══════════════════════════════════════════ */
  let cfg;
  try {
    const res = await fetch('config.json');
    if (!res.ok) throw new Error('Failed to load config');
    cfg = await res.json();
  } catch (e) {
    console.error('Config load error:', e);
    return;
  }

  const { product, links, releases } = cfg;

  /* ══════════════════════════════════════════
     2. Populate hero / product info
     ══════════════════════════════════════════ */
  setTextAll('[data-product-name]',    product.name);
  setTextAll('[data-product-tagline]', product.tagline);
  setTextAll('[data-product-desc]',    product.description);

  /* ══════════════════════════════════════════
     3. Populate features grid
     ══════════════════════════════════════════ */
  const featureGrid = document.getElementById('features-grid');
  if (featureGrid && Array.isArray(product.features)) {
    featureGrid.innerHTML = product.features.map(f => `
      <div class="feature-card fade-in">
        <span class="feature-icon">${f.icon}</span>
        <h3>${esc(f.title)}</h3>
        <p>${esc(f.description)}</p>
      </div>
    `).join('');
  }

  /* ══════════════════════════════════════════
     4. Populate external links
     ══════════════════════════════════════════ */
  setHref('[data-link="setup"]',   links.setupGuide);
  setHref('[data-link="contact"]', links.contact);

  /* ══════════════════════════════════════════
     5. Populate releases table
     ══════════════════════════════════════════ */
  const tbody = document.getElementById('releases-tbody');
  if (tbody) {
    if (!releases || releases.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6">
        <div class="empty-state">
          <span>📦</span>No releases available yet. Check back soon!
        </div>
      </td></tr>`;
    } else {
      // Sort: newest first
      const sorted = [...releases].sort((a, b) =>
        new Date(b.releaseDate) - new Date(a.releaseDate));

      tbody.innerHTML = sorted.map(r => {
        const statusClass = r.status === 'active' ? 'status-active'
                          : r.status === 'lts'    ? 'status-lts'
                          : 'status-eol';
        const statusLabel = r.status === 'active' ? 'Active'
                          : r.status === 'lts'    ? 'LTS'
                          : 'End of Life';

        const eofCell = r.eofDate
          ? `<span style="color:var(--text-muted)">${fmt(r.eofDate)}</span>`
          : `<span style="color:var(--text-muted);font-style:italic">—</span>`;

        const dlBtn = (r.downloadUrl && r.status !== 'eol')
          ? `<a href="${esc(r.downloadUrl)}" class="dl-btn" target="_blank" rel="noopener">
               ⬇ Download
             </a>`
          : `<span class="dl-btn disabled">⬇ N/A</span>`;

        const noteLink = r.releaseNoteUrl
          ? `<a href="${esc(r.releaseNoteUrl)}" class="release-link" target="_blank" rel="noopener">
               View notes →
             </a>`
          : `<span style="color:var(--text-muted);font-style:italic">—</span>`;

        return `
          <tr>
            <td><span class="version-tag">🏷 v${esc(r.version)}</span></td>
            <td>${fmt(r.releaseDate)}</td>
            <td>${eofCell}</td>
            <td><span class="status-badge ${statusClass}">${statusLabel}</span></td>
            <td>${noteLink}</td>
            <td>${dlBtn}</td>
          </tr>`;
      }).join('');
    }
  }

  /* ══════════════════════════════════════════
     6. Scroll-triggered fade-in (Intersection Observer)
     ══════════════════════════════════════════ */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  /* ══════════════════════════════════════════
     7. Active nav link on scroll
     ══════════════════════════════════════════ */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

  const sio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${e.target.id}`
            ? 'var(--text-primary)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sio.observe(s));

  /* ══════════════════════════════════════════
     8. Smooth scroll for anchor nav
     ══════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── helpers ─── */
  function setTextAll(selector, text) {
    document.querySelectorAll(selector).forEach(el => el.textContent = text);
  }
  function setHref(selector, url) {
    document.querySelectorAll(selector).forEach(el => {
      if (url) el.setAttribute('href', url);
    });
  }
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function fmt(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
})();

