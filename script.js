const headerEl = document.querySelector('.header');
const goToUpBtn = document.querySelector('.up-btn');
const allLinks = document.querySelectorAll('a:link');
const projectBoxEls = document.querySelectorAll('.project-box');
const projectPopups = document.querySelectorAll('.popup');
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');
const mobileNavBtn = document.querySelector('.btn--mobile-nav');
const headerNav = document.querySelector('.header__nav');

/////////////////////////////////////////
// FUNCTIONS
const openPopup = function (targetEl) {
  targetEl.classList.add('active');
  const overlay = targetEl.closest('.popup__overlay');
  overlay.classList.remove('hidden');
  document.body.classList.add('popup-show');
};

const closePopup = function () {
  const targetEl = Array.from(projectPopups).find((element) =>
    element.classList.contains('active')
  );
  projectPopups.forEach((popup) => {
    popup.classList.remove('active');
  });

  if (!targetEl) return;
  const overlay = targetEl.closest('.popup__overlay');
  overlay.classList.add('hidden');
  document.body.classList.remove('popup-show');
};

/////////////////////////////////////////
// EVENT LISTENERS
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

    openPopup(popup);
  });
});

popupCloseBtns.forEach((button) =>
  button.addEventListener('click', closePopup)
);

projectPopups.forEach((popup) => {
  popup.closest('.popup__overlay').addEventListener('click', closePopup);
});

mobileNavBtn.addEventListener('click', () => {
  headerNav.classList.toggle('nav-open');
  mobileNavBtn.classList.toggle('clicked');
});
