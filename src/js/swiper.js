const swiper = new Swiper(".swiper", {
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    // Optional parameters
    direction: "horizontal",
    loop: true,

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
