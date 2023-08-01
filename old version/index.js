import { projects } from "./data.js"

// mobile nav button open/close
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileNav = document.getElementById('mobile-nav');

  mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('change');
  mobileNav.classList.toggle('change');
  document.body.classList.toggle('no-scroll');

});
// closes mobile nav when link is clicked
const links = document.querySelectorAll('.nav li a');
links.forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('change');
    mobileToggle.classList.remove('change');
    document.body.classList.remove('no-scroll');

  });
});

// sets colors to change on scroll
function setElementStyles(element, backgroundColor, textColor) {
  element.style.backgroundColor = backgroundColor;
  element.style.color = textColor;
}

function setSVGStyles(svgs, textColor) {
  svgs.forEach((svg) => {
    svg.style.fill = textColor;
  });
}

function setNavStyles(nav, textColor) {
  const links = nav.querySelectorAll('a');
  links.forEach((link) => {
    link.style.color = textColor;
  });
}

function setHamburgerStyles(hamburger, backgroundColor) {
  hamburger.forEach((span) => {
    span.style.background = backgroundColor;
  });
}
// header visible after home screen 
window.addEventListener('scroll', () => {
  const headerElements = document.querySelectorAll('.header');
  const sectionContent = document.querySelector('.section-content');
  const sections = document.querySelectorAll('section');
  const desktopNav = document.getElementById('desktop-nav');
  const mobileNav = document.getElementById('mobile-nav');
  const burgerBar = document.getElementById('burger-bar');

  const headerHeight = headerElements[0].offsetHeight;
  const scrollThreshold = sectionContent.offsetTop - headerHeight;

  headerElements.forEach((header) => {
    if (window.scrollY >= scrollThreshold) {
      header.classList.add('visible');
      const currentSection = getCurrentSection(sections, headerHeight);
      const backgroundColor = getComputedStyle(currentSection).backgroundColor;
      const textColor = getContrastColor(backgroundColor);

      setElementStyles(header, backgroundColor, textColor);
      setElementStyles(mobileNav, backgroundColor, textColor);

      const svgs = header.querySelectorAll('svg');
      setSVGStyles(svgs, textColor);

      setElementStyles(desktopNav, '', textColor);
      setNavStyles(desktopNav, textColor);
      setNavStyles(mobileNav, textColor);
      setHamburgerStyles(burgerBar.querySelectorAll('.bar'), textColor);
    } else {
      header.classList.remove('visible');
      setElementStyles(header, '', '');

      const svgs = header.querySelectorAll('svg');
      setSVGStyles(svgs, '');

      setElementStyles(desktopNav, '', '');
      setNavStyles(desktopNav, '');
      setNavStyles(mobileNav, '');
      setHamburgerStyles(burgerBar.querySelectorAll('.bar'), '');
    }
  });
});



function getCurrentSection(sections, headerHeight) {
  let currentSection = sections[0];
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    const sectionTop = section.offsetTop;
    if (sectionTop > window.scrollY + headerHeight) {
      break;
    }
    currentSection = section;
  }
  return currentSection;
}

// text and SVG color contrast related to backgrond colors
function getContrastColor(backgroundColor) {
 
  const threshold = 150; 
  const rgb = backgroundColor.match(/\d+/g); 
  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000; 
  return brightness > threshold ? '#232A79' : '#FDF3F6'; 
}

// projects 
const projectWrapper = document.querySelector('.project-wrapper')


const projectDisplay = projects.map((project) => `
  <div class='project-each'>
    <h3 class='project-title'>${project.name}</h3>
    <!--<h5 class='project-tech'>${project.tech}</h5>-->
    <img class='project-img' src='${project.image}' alt='${project.alt}'>
    <p class='project-description'>${project.description}</p>
    <h4 class='project-links'>${project.links}</h4>
    
  </div>
`).join('');

projectWrapper.innerHTML = projectDisplay;

// projects carousel
const projectEach = document.querySelector(".project-each");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const projectWidth = projectEach.clientWidth;

nextButton.addEventListener("click", () => {
  projectWrapper.scrollLeft += projectWidth;
  
  if (projectWrapper.scrollLeft + projectWrapper.clientWidth >= projectWrapper.scrollWidth) {
    projectWrapper.scrollLeft = 0;
  }
});

prevButton.addEventListener("click", () => {
  projectWrapper.scrollLeft -= projectWidth;
  
  if (projectWrapper.scrollLeft <= 0) {
    projectWrapper.scrollLeft = projectWrapper.scrollWidth - projectWrapper.clientWidth;
  }
});


// automatically updates year in footer (based on user's computer)
let date = (new Date()).getFullYear()
document.getElementById('year').textContent = date