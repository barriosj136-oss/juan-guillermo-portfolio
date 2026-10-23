const languageButton = document.querySelector('.language-toggle');

function setLanguage(language) {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-es]').forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
  languageButton.textContent = language === 'en' ? 'ES' : 'EN';
  languageButton.setAttribute('aria-pressed', String(language === 'es'));
  languageButton.setAttribute('aria-label', language === 'en' ? 'Cambiar idioma a español' : 'Switch language to English');
}

languageButton.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'en' ? 'es' : 'en');
});
