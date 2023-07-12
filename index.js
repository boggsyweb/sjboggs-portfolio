import { projects } from "./data.js"

// mobile nav button open/close

const mobileToggle = document.querySelector('.mobile-toggle');
const mobileNav = document.getElementById('mobile-nav');

  mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('change');
  mobileNav.classList.toggle('change');
  document.body.classList.toggle('no-scroll');

});

const links = document.querySelectorAll('.nav li a');
links.forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('change');
    mobileToggle.classList.remove('change');
    document.body.classList.remove('no-scroll');

  });
});

window.addEventListener('scroll', () => {
  const headerElements = document.querySelectorAll('.header');
  const sectionContent = document.querySelector('.section-content');
  const sections = document.querySelectorAll('section');
  const desktopNav = document.getElementById('desktop-nav');
  const burgerBar = document.getElementById('burger-bar')


  const headerHeight = headerElements[0].offsetHeight;
  const scrollThreshold = sectionContent.offsetTop - headerHeight;

  headerElements.forEach((header) => {
    if (window.scrollY >= scrollThreshold) {
      header.classList.add('visible');
      const currentSection = getCurrentSection(sections, headerHeight);
      const backgroundColor = getComputedStyle(currentSection).backgroundColor;
      header.style.backgroundColor = backgroundColor;

      const textColor = getContrastColor(backgroundColor);
      header.style.color = textColor;

      mobileNav.style.backgroundColor = backgroundColor;

      const svgs = header.querySelectorAll('svg');
      svgs.forEach((svg) => {
        svg.style.fill = textColor;
      });

      desktopNav.style.color = textColor;

      const navLinks = desktopNav.querySelectorAll('a');
      navLinks.forEach((link) => {
        link.style.color = textColor;
      });

      const mobileLinks = mobileNav.querySelectorAll('a');
      mobileLinks.forEach((link) => {
        link.style.color = textColor;
      });

      const hamburger = burgerBar.querySelectorAll('.bar');
      hamburger.forEach((span) => {
        span.style.background = textColor;
      });
    } else {
      header.classList.remove('visible');
      header.style.backgroundColor = '';
      header.style.color = '';

      const svgs = header.querySelectorAll('svg');
      svgs.forEach((svg) => {
        svg.style.fill = '';
      });

      desktopNav.style.color = '';

      const navLinks = desktopNav.querySelectorAll('a');
      navLinks.forEach((link) => {
        link.style.color = '';
      });

      const hamburger = burgerBar.querySelectorAll('.bar');
      hamburger.forEach((span) => {
        span.style.background = '';
      });
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

// text and SVG colors related to backgrond colors
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