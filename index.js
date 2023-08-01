// Contact form
window.onbeforeunload = () => {
    for(const form of document.getElementsByTagName('form')) {
      form.reset();
    }
  }

  //   Theme toggle 
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

const setTheme = (theme) => {
  body.classList.remove("dark-theme", "light-theme");
  body.classList.add(theme);
};

const toggleTheme = () => {
  const isLightTheme = body.classList.contains("light-theme");
  setTheme(isLightTheme ? "dark-theme" : "light-theme");
};

document.addEventListener("DOMContentLoaded", () => {
  setTheme("dark-theme");
});

themeToggle.addEventListener("change", toggleTheme);

// Updates year in footer based on user's settings
let date = (new Date()).getFullYear()
document.getElementById('year').innerHTML = date