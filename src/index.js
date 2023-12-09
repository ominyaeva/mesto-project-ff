import "./index.css";
import { initialCards } from "./scripts/cards";
import { closePopup, openPopup, closeToOverlay } from "./scripts/modal";
import { renderCard, deleteCard, likeCard } from "./scripts/card";

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
const closeButtons = document.querySelectorAll(".popup__close");
export const openPopupImage = (CardImageURL, CardImageAlt, CardImageTitle) => {
    popupCaption.textContent = CardImageTitle;
    popupImage.src = CardImageURL;
    popupImage.alt = CardImageAlt;
    openPopup(popupImageElement);
};

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = popupProfileForm.name.value;
    profileDescription.textContent = popupProfileForm.description.value;
    closePopup(popupProfile);
};

const fillProfilePopup = (popupProfileForm, name, description) => {
    popupProfileForm.elements.name.value = name;
    popupProfileForm.elements.description.value = description;
};

initialCards.forEach((card) =>
    renderCard(card, placesList, likeCard, deleteCard, openPopupImage),
);

popupImageElement.addEventListener("click", closeToOverlay);

profileEditButton.addEventListener("click", () => {
    fillProfilePopup(
        popupProfileForm,
        profileTitle.textContent,
        profileDescription.textContent,
    );
    openPopup(popupProfile);
});

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

popupProfile.addEventListener("click", closeToOverlay);

popupNewCard.addEventListener("click", closeToOverlay);

closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
});
newCardButton.addEventListener("click", () => {
    openPopup(popupNewCard);
});
popupNewCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const name = popupNewCardForm.elements["place-name"].value;
    const link = popupNewCardForm.elements.link.value;
    const newCard = {name, link};
    renderCard(newCard, placesList, likeCard, deleteCard, openPopupImage, "start");
    closePopup(popupNewCard);
    popupNewCardForm.reset();
});

