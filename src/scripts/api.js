const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const getUserData = async () => {
    return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-2/users/me", {
        headers: {
            authorization: "dcce3247-8603-4728-ba3c-79236af66946",
            "Content-Type": "application/json",
        }
    }).then((res) => getResponseData(res));
};

const editUserProfile = async (userProfileData) => {
    return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-2/users/me", {
        method: "PATCH",
        headers: {
            authorization: "dcce3247-8603-4728-ba3c-79236af66946",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userProfileData.name,
            about: userProfileData.about,
        }),
    }).then((res) => getResponseData(res));
};

const getInitialCards = async () => {
    return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-2/cards", {
        headers: {
            authorization: "dcce3247-8603-4728-ba3c-79236af66946",
            "Content-Type": "application/json",
        }
    }).then((res) => getResponseData(res));
};

const getInitialInfo = async () => {
    return Promise.all([getUserData(), getInitialCards()]);
};

const addNewCard = async (cardData) => {
    return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-2/cards", {
        method: "POST",
        headers: {
            authorization: "dcce3247-8603-4728-ba3c-79236af66946",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link,
        }),
    }).then((res) => getResponseData(res));
};

const addLike = async (cardId) => {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-2/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
            authorization: "dcce3247-8603-4728-ba3c-79236af66946",
            "Content-Type": "application/json",
        },
    }).then((res) => getResponseData(res));
};

const dislike = async (cardId) => {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-2/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: "dcce3247-8603-4728-ba3c-79236af66946",
            "Content-Type": "application/json",
        },
    }).then((res) => getResponseData(res));
};

const deleteCardTotal = async (cardId) => {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-2/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: "dcce3247-8603-4728-ba3c-79236af66946",
            "Content-Type": "application/json",
        },
    }).then((res) => getResponseData(res));
};

const updateAvatar = async (avatarLink) => {
    return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-2/users/me/avatar", {
        method: "PATCH",
        headers: {
            authorization: "dcce3247-8603-4728-ba3c-79236af66946",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avatar: avatarLink,
        }),
    }).then((res) => getResponseData(res));
};

export {
    getUserData,
    editUserProfile,
    getInitialCards,
    getInitialInfo,
    addNewCard,
    addLike,
    dislike,
    deleteCardTotal,
    updateAvatar
};
