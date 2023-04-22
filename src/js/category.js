const adminNavigation = document.querySelectorAll(".header-nav-list ul li a");
const fixModal = document.querySelector(".fix_modal");
const fixButton = document.querySelectorAll(".item-fix-button");
const closeFixButton = document.querySelector(".fix-modal-close");

const getType = (clicks) => {
  return clicks.dataset.type;
};

const displayToggle = (e) => {
  const type = getType(e.target);
  document.querySelector(`#${type}`).classList.toggle("on");
};

adminNavigation.forEach((nav) => {
  nav.addEventListener("click", displayToggle);
});

const openFixModal = () => {
  fixModal.classList.add("on") || updateModal.classList.remove("on");
};

const closeFixModal = () => {
  fixModal.classList.remove("on") || updateModal.classList.remove("on");
};

fixButton.forEach((button) => {
  button.addEventListener("click", openFixModal);
});

closeFixButton.addEventListener("click", closeFixModal);

const updateModal = document.querySelector(".update_modal");
const addButton = document.querySelector(".add-item");
const closeUpdateButton = document.querySelector(".update-modal-close");

const openUpdateModal = () => {
  updateModal.classList.add("on");
};

const closeUpdateModal = () => {
  updateModal.classList.remove("on");
};

addButton.addEventListener("click", openUpdateModal);
closeUpdateButton.addEventListener("click", closeUpdateModal);
