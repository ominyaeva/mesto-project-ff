import { dislike, addLike } from "./api";
import { openPopup } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const popupConfirm = document.querySelector(".popup_type_confirm");
const createCard = (card, userId, deleteCard, likeCard, openPopupImage) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardButtonLike = cardElement.querySelector(".card__like-button");
    const cardLikeCount = cardElement.querySelector(".card__like-count");

    cardElement.dataset.cardId = card._id;
    cardElement.dataset.ownerId = card.owner._id;
    cardTitle.textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;

    cardLikeCount.textContent = card.likes.length;
    const isLiked = card.likes.some((like) => like._id === userId);
    if (isLiked) {
        cardButtonLike.classList.add("card__like-button_is-active");
    }

    if (card.owner._id === userId) {
        cardDeleteButton.addEventListener("click", (evt) => {deleteCard(evt, card._id);
        });
    } else {
        cardDeleteButton.remove();
    }

    cardButtonLike.addEventListener("click", (evt) => {likeCard(evt, card._id);
    });

    cardImage.addEventListener("click", () => {
        openPopupImage(cardImage.src, cardImage.alt, cardTitle.textContent);
    });

    return cardElement;
};

const likeCard = async (evt, cardId) => {
    let AllLike = evt.target.parentNode.querySelector(".card__like-count");

    if (evt.target.classList.contains("card__like-button_is-active")) {
        dislike(cardId)
            .then((updatedCard) => {
                evt.target.classList.remove("card__like-button_is-active");
                AllLike.textContent = updatedCard.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
       addLike(cardId)
            .then((updatedCard) => {
                evt.target.classList.add("card__like-button_is-active");
                AllLike.textContent = updatedCard.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

const deleteCard = (evt, cardId) => {
    openPopup(popupConfirm);
    popupConfirm.dataset.cardId = cardId;
};

const renderCard = (item, userId, container, likeCard, deleteCard, openPopupImage, place = "end",) => {
    const cardEl = createCard(item, userId, deleteCard, likeCard, openPopupImage);
    if (place === "end") {
        container.append(cardEl);
    } else {
        container.prepend(cardEl);
    }
};

export { renderCard, likeCard, deleteCard };
