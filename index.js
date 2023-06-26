import { projects } from "./data.js"

window.addEventListener('scroll', function() {
    const headers = document.querySelectorAll('.header');
    const sectionContent = document.querySelector('.section-content');

    const scrollThreshold = sectionContent.offsetTop - window.innerHeight * 0.1;

  
    headers.forEach(function(header) {
        if (window.scrollY > scrollThreshold) {
          header.classList.add('visible');
        } else {
          header.classList.remove('visible');
        }
      });
    });

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