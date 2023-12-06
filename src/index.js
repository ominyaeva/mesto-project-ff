import "./index.css";
import { initialCards } from "./scripts/cards";
import { closePopup, openPopup, closeToOverlay } from "./scripts/modal";
import { renderCard } from "./scripts/card";

const placesList = document.querySelector(".places__list");
const popupProfile = document.querySelector(".popup_type_edit");
const popupProfileForm = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardForm = document.forms["new-place"];
const popupImageElement = document.querySelector(".popup_type_image");
const popupImage = popupImageElement.querySelector(".popup__image");
const popupCaption = popupImageElement.querySelector(".popup__caption");

const popupImageOpen = (CardImageURL, CardImageAlt, CardImageTitle) => {
    popupCaption.textContent = CardImageTitle;
    popupImage.src = CardImageURL;
    popupImage.alt = CardImageAlt;
    openPopup(popupImageElement);
};
const likeCard = (evt) => {
    evt.target.classList.toggle("card__like-button_is-active");
};
const deleteCard = (evt) => {
    evt.target.closest(".card").remove();
};

const handleFormSubmit = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = popupProfileForm.name.value;
    profileDescription.textContent = popupProfileForm.description.value;
    closePopup(popupProfile);
};

const profilePopup = (form, name, description) => {
    form.elements.name.value = name;
    form.elements.description.value = description;
};

initialCards.forEach((card) =>
    renderCard(card, placesList, likeCard, deleteCard, popupImageOpen),
);
popupImageElement.addEventListener("click", (evt) => {
    closeToOverlay(evt);
});
profileEditButton.addEventListener("click", () => {
    profilePopup(
        popupProfileForm,
        profileTitle.textContent,
        profileDescription.textContent,
    );
    openPopup(popupProfile);
});

popupProfileForm.addEventListener("submit", handleFormSubmit);
popupProfile.addEventListener("click", (evt) => {
    closeToOverlay(evt);
});

popupNewCard.addEventListener("click", (evt) => {
    closeToOverlay(evt);
});
document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
        closePopup(evt.target.parentNode.parentNode);
    }
});
newCardButton.addEventListener("click", () => {
    openPopup(popupNewCard);
});
popupNewCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const name = popupNewCardForm.elements["place-name"].value;
    const link = popupNewCardForm.elements.link.value;
    const description = name;
    const newCard = {name, link, description};
    renderCard(newCard, placesList, likeCard, deleteCard, popupImageOpen, "start");
    closePopup(popupNewCard);
    popupNewCardForm.reset();
});

