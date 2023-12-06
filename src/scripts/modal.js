const openPopup = (el) => {
    el.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeToEsc);
};

const closePopup = (el) => {
    el.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeToEsc);
};

const closeToEsc = (evt) => {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        closePopup(openedPopup);
    }
};

const closeToOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
};

export { openPopup, closePopup, closeToOverlay };
