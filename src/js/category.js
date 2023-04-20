const adminNavigation = document.querySelectorAll(".header-nav-list ul li a");

const getType = (clicks) => {
  return clicks.dataset.type;
};

const displayToggle = (e) => {
    const type = getType(e.target);
    document.querySelector(`#${type}`).classList.toggle("on");
}

adminNavigation.forEach((nav) => {
  nav.addEventListener("click", displayToggle);
});
