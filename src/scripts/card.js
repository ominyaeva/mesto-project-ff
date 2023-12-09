import {openPopupImage} from "../index";

const cardTemplate = document.querySelector("#card-template").content;

const createCard = (card, deleteCard, likeCard, openPopupImage) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardButtonLike = cardElement.querySelector(".card__like-button");

    cardTitle.textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;

    cardDeleteButton.addEventListener("click", deleteCard);
    cardButtonLike.addEventListener("click", likeCard);
    cardImage.addEventListener("click", () => {
        openPopupImage(card.link, card.name);
    });

    return cardElement;
};

const likeCard = (evt) => {
    evt.target.classList.toggle("card__like-button_is-active");
};
const deleteCard = (evt) => {
    evt.target.closest(".card").remove();
};

const renderCard = (item, container, likeCard, deleteCard, openPopupImage, place = "end",) => {
    const cardEl = createCard(item, deleteCard, likeCard, openPopupImage);
    if (place === "end") {
        container.append(cardEl);
    } else {
        container.prepend(cardEl);
    }
};

export { renderCard, deleteCard, likeCard };
