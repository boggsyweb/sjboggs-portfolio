import { projects } from "./data.js"

window.addEventListener('scroll', function() {
  const header = document.querySelectorAll('.header');
  const sectionContent = document.querySelector('.section-content');
  const sections = document.querySelectorAll('section');

  const headerHeight = header[0].offsetHeight; 

  const scrollThreshold = sectionContent.offsetTop - headerHeight;

  header.forEach(function(header) {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('visible');
      const currentSection = getCurrentSection(sections, headerHeight);
      const backgroundColor = getComputedStyle(currentSection).backgroundColor;
      header.style.backgroundColor = backgroundColor;

      const textColor = getContrastColor(backgroundColor);
      header.style.color = textColor;

      const svgs = header.querySelectorAll('svg');
      svgs.forEach(function(svg) {
        svg.style.fill = textColor;
      });
    } else {
      header.classList.remove('visible');
      header.style.backgroundColor = '';
      header.style.color = '';

      const svgs = header.querySelectorAll('svg');
      svgs.forEach(function(svg) {
        svg.style.fill = '';
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

function getContrastColor(backgroundColor) {
 
  const threshold = 200; 
  const rgb = backgroundColor.match(/\d+/g); 
  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000; 
  return brightness > threshold ? '#232A79' : '#FDF3F6'; 
}




const projectWrapper = document.querySelector('.project-wrapper')

function displayProjects() {
  let projectDisplay = ''
  for (let project of projects) {
    projectDisplay += `
    <div class='projects'>
    <h3 class='project-title'>${project.name}</h3>
    <!--<h5 class='project-tech'>${project.tech}</h5>-->
    <img class='project-img' src='${project.image}'>
    <p class='project-description'>${project.description}</p>
    <h4 class='project-links'>${project.links}</h4>
    </div>`
  }

projectWrapper.innerHTML = projectDisplay
}
displayProjects()

// **automatically updates year in footer (based on user's computer)**
let date = (new Date()).getFullYear()
document.getElementById('year').innerHTML = date