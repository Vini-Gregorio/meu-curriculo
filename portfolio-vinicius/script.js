// Navegação e melhorias opcionais, sem dependências de execução.
document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
const closeMenu = ({ restoreFocus = false } = {}) => {
  const wasOpen = mainNav?.classList.contains('open');
  mainNav?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Abrir menu');
  if (wasOpen && restoreFocus) menuButton?.focus();
};
if (menuButton && mainNav) menuButton.addEventListener('click', () => {
  const opened = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(opened));
  menuButton.setAttribute('aria-label', opened ? 'Fechar menu' : 'Abrir menu');
});
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mainNav?.classList.contains('open')) {
    event.preventDefault();
    closeMenu({ restoreFocus: true });
  }
});
document.addEventListener('click', event => {
  if (!menuButton?.contains(event.target) && !mainNav?.contains(event.target)) closeMenu();
});

const mobileMenu = window.matchMedia('(max-width: 700px)');
const resetMenu = event => {
  const focusWillBeHidden = event.matches && mainNav?.contains(document.activeElement);
  closeMenu();
  if (focusWillBeHidden) menuButton?.focus();
};
if (mobileMenu.addEventListener) mobileMenu.addEventListener('change', resetMenu);
else mobileMenu.addListener(resetMenu);

// O conteúdo permanece visível sem JavaScript ou sem suporte ao efeito.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObserver = 'IntersectionObserver' in window && !prefersReducedMotion
  ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 })
  : null;
const reveal = element => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('visible');
};
document.querySelectorAll('.reveal').forEach(reveal);

// Filtro de projetos. O conteúdo continua visível sem JavaScript.
const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');
const projectCount = document.querySelector('#project-count');
const filterProjects = button => {
  const selected = button.dataset.filter;
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  let visibleCount = 0;
  projects.forEach(project => {
    const show = selected === 'todos' || project.dataset.category === selected;
    const wasHidden = project.hidden;
    project.hidden = !show;
    if (!show) revealObserver?.unobserve(project);
    else {
      visibleCount += 1;
      if (wasHidden) project.classList.remove('visible');
      if (!project.classList.contains('visible')) reveal(project);
    }
  });
  if (projectCount) projectCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'projeto' : 'projetos'}`;
};
filters.forEach(button => button.addEventListener('click', () => filterProjects(button)));
const initialFilter = [...filters].find(button => button.dataset.filter === 'todos') || filters[0];
if (initialFilter) filterProjects(initialFilter);

// Capturas reais: o fallback visual permanece até uma imagem ser adicionada.
// Arquivos esperados: assets/screenshots/nomes-definidos-no-README.webp
for (const image of document.querySelectorAll('img[data-screenshot]')) {
  const preview = image.closest('.project-preview');
  const loaded = () => { if (image.naturalWidth > 0) preview?.classList.add('has-screenshot'); };
  image.addEventListener('load', loaded);
  image.addEventListener('error', () => preview?.classList.remove('has-screenshot'));
  if (image.complete) loaded();
}

// Copiar e-mail. Se a API Clipboard estiver indisponível, abre o cliente de e-mail.
const copyButton = document.querySelector('[data-copy]');
const copyStatus = document.querySelector('#copy-status');
const copyLabel = copyButton?.querySelector('strong');
const originalCopyLabel = copyLabel?.textContent;
let copyResetTimer;
let copyStatusTimer;
const announceCopyStatus = message => {
  if (!copyStatus) return;
  window.clearTimeout(copyStatusTimer);
  copyStatus.textContent = '';
  copyStatusTimer = window.setTimeout(() => { copyStatus.textContent = message; }, 50);
};
copyButton?.addEventListener('click', async () => {
  const email = copyButton.dataset.copy;
  if (!email) return;
  try {
    if (!navigator.clipboard?.writeText) throw Error('Clipboard indisponível');
    await navigator.clipboard.writeText(email);
    if (copyLabel) copyLabel.textContent = 'E-mail copiado!';
    announceCopyStatus('E-mail copiado para a área de transferência.');
    window.clearTimeout(copyResetTimer);
    copyResetTimer = window.setTimeout(() => {
      if (copyLabel) copyLabel.textContent = originalCopyLabel;
    }, 2400);
  } catch {
    announceCopyStatus('Não foi possível copiar. Abrindo seu aplicativo de e-mail.');
    window.location.href = `mailto:${email}`;
  }
});

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
