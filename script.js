'use strict';

const headerEl = document.querySelector('.header');
const goToUpBtn = document.querySelector('.up-btn');
const allLinks = document.querySelectorAll('a:link');
const projectBoxEls = document.querySelectorAll('.project-box');
const projectPopups = document.querySelectorAll('.project__popup');
const bodyOverlay = document.querySelector('.overlay');
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');

const closePopup = function () {
  projectPopups.forEach((popup) => {
    popup.classList.remove('active');
  });
  bodyOverlay.classList.add('hidden');
};

goToUpBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    document.body.classList.remove('sticky-nav');
  }
  if (window.scrollY > 0) {
    document.body.classList.add('sticky-nav');
  }
});

allLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');

    if (href === '#') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else if (href !== '#' && href.startsWith('#')) {
      e.preventDefault();
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

projectBoxEls.forEach((project) => {
  project.addEventListener('click', (e) => {
    const projectName = e.target.closest('div.project-box').dataset.name;

    const popup = Array.from(projectPopups).find(
      (element) => element.dataset.project === projectName
    );

    popup.classList.add('active');
    bodyOverlay.classList.remove('hidden');
  });
});

popupCloseBtns.forEach((button) =>
  button.addEventListener('click', closePopup)
);

bodyOverlay.addEventListener('click', closePopup);
