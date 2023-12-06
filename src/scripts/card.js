const cardTemplate = document.querySelector("#card-template").content;
const createCard = (card, deleteCard, likeCard, popupImageOpen) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardButtonLike = cardElement.querySelector(".card__like-button");

    cardTitle.textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;

    cardDeleteButton.addEventListener("click", (evt) => {
        deleteCard(evt);
    });

    cardButtonLike.addEventListener("click", (evt) => {
        likeCard(evt);
    });

    cardImage.addEventListener("click", () => {
        popupImageOpen(cardImage.src, cardImage.alt, cardTitle.textContent);
    });

    return cardElement;
};

const renderCard = (item, container, likeCard, deleteCard, popupImageOpen, place = "end",) => {
    const cardEl = createCard(item, deleteCard, likeCard, popupImageOpen);
    if (place === "end") {
        container.append(cardEl);
    } else {
        container.prepend(cardEl);
    }
};

export { renderCard };
