import "./index.css";
import { closePopup, openPopup, closeToOverlay } from "./scripts/modal";
import { renderCard, likeCard, deleteCard } from "./scripts/card";
import { enableValidation, clearValidation } from "./scripts/validation";
import { getInitialInfo, addNewCard, editUserProfile, deleteCardTotal, updateAvatar } from "./scripts/api";

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
const profileAvatar = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarForm = document.forms["edit-avatar"];
const avatarEditButton = document.querySelector(".profile__image-container");
const popupConfirmDel = document.querySelector(".popup_type_confirm");
const popupConfirmDelButton = popupConfirmDel.querySelector(".popup__button");

let userId;
export const openPopupImage = (CardImageURL, CardTitle) => {
    popupCaption.textContent = CardTitle;
    popupImage.src = CardImageURL;
    popupImage.alt = CardTitle;
    openPopup(popupImageElement);
};

const fillProfileInfo = (userInfo) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
};
const statusLoading = (isLoading, button) => {button.textContent = isLoading ? "Сохранение..." : "Сохранить"};
const handleProfileFormSubmit = async (evt) => {
    evt.preventDefault();
    statusLoading(true, popupProfileForm.querySelector(".popup__button"));
    profileTitle.textContent = popupProfileForm.name.value;
    profileDescription.textContent = popupProfileForm.description.value;
    closePopup(popupProfile);
    clearValidation(popupProfile, validationConfig);
    editUserProfile({
        name: popupProfileForm.name.value,
        about: popupProfileForm.description.value,
    })
        .then((updatedProfile) => {
            fillProfileInfo(updatedProfile);
            closePopup(popupProfile);
            clearValidation(popupProfileForm, validationConfig);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            statusLoading(false, popupProfileForm.querySelector(".popup__button"));
        });
};

const handleAvatarFormSubmit = async (evt) => {
    evt.preventDefault();
    statusLoading(true, popupAvatarForm.querySelector(".popup__button"));
    updateAvatar(popupAvatarForm.link.value)
        .then((updatedProfile) => {
            fillProfileInfo(updatedProfile);
            closePopup(popupAvatar);
            clearValidation(popupAvatarForm, validationConfig);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            statusLoading(false, popupAvatarForm.querySelector(".popup__button"));
        });
};

const handleNewCardFormSubmit = async (evt) => {
    evt.preventDefault();
    statusLoading(true, popupNewCardForm.querySelector(".popup__button"));
    const name = popupNewCardForm.elements["place-name"].value;
    const link = popupNewCardForm.elements.link.value;
    addNewCard({ name, link })
        .then((newCard) => {
            renderCard(newCard, userId, placesList, likeCard, deleteCard, openPopupImage, "start");
            closePopup(popupNewCard);
            popupNewCardForm.reset();
            clearValidation(popupNewCardForm, validationConfig);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            statusLoading(false, popupNewCardForm.querySelector(".popup__button"));
        });
};

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};


const renderInitialCards = (initialCards, userId) => {
    initialCards.forEach((card) => {renderCard(card, userId, placesList, likeCard, deleteCard, openPopupImage);
    });
};

const handleConfirmDelete = async (evt) => {
    deleteCardTotal(popupConfirmDel.dataset.cardId)
        .then((result) => {
            const card = document.querySelector(
                `[data-card-id="${popupConfirmDel.dataset.cardId}"]`,
            );
            card.remove();
            closePopup(popupConfirmDel);
        })
        .catch((err) => {
            console.log(err);
        });
};

const fillProfilePopup = (popupProfileForm, name, description) => {
    popupProfileForm.elements.name.value = name;
    popupProfileForm.elements.description.value = description;
};
getInitialInfo()
    .then((result) => {
        const userInfo = result[0];
        userId = userInfo._id;
        const initialCards = result[1];
        fillProfileInfo(userInfo);
        renderInitialCards(initialCards, userId);
    })
    .catch((err) => {
        console.log(err);
    });

popupImageElement.addEventListener("click", closeToOverlay);

profileEditButton.addEventListener("click", () => {
    clearValidation(popupProfileForm, validationConfig);
    fillProfilePopup(
        popupProfileForm,
        profileTitle.textContent,
        profileDescription.textContent,
    );
    openPopup(popupProfile);
});

avatarEditButton.addEventListener("click", (evt) => {
    clearValidation(popupAvatarForm, validationConfig);
    popupAvatarForm.reset();
    openPopup(popupAvatar);
});

popupAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

popupAvatar.addEventListener("click", (evt) => {
    closeToOverlay(evt);
});

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

popupProfile.addEventListener("click", closeToOverlay);

popupNewCard.addEventListener("click", closeToOverlay);

closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
});
newCardButton.addEventListener("click", () => {
    popupNewCardForm.reset();
    clearValidation(popupNewCardForm, validationConfig);
    openPopup(popupNewCard);
});
popupNewCardForm.addEventListener("submit", handleNewCardFormSubmit);

popupConfirmDel.addEventListener("click", (evt) => {closeToOverlay(evt)});

popupConfirmDelButton.addEventListener("click", handleConfirmDelete);

enableValidation(validationConfig);
