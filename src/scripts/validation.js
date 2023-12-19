const showError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass,) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};
const hideError = (formElement, inputElement, inputErrorClass, errorClass,) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
};

function disabledButton(buttonElement, config) {
     buttonElement.classList.add(config);
     buttonElement.disabled = true;
}

function enableButton(buttonElement, config) {
     buttonElement.classList.remove(config);
     buttonElement.disabled = false;
}
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        disabledButton(buttonElement, inactiveButtonClass);
    } else {
        enableButton(buttonElement, inactiveButtonClass);
    }
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass,) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass,);
    } else {
        hideError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const setEventListeners = (formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass,) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButtonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass,);
            toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
        });
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const enableValidation = (validationConfig) => {
    const formList = Array.from(
        document.querySelectorAll(validationConfig.formSelector),
    );
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationConfig.inputSelector, validationConfig.inputErrorClass, validationConfig.errorClass, validationConfig.submitButtonSelector, validationConfig.inactiveButtonClass,);
    });
};

const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(
        formElement.querySelectorAll(validationConfig.inputSelector),
    );
    const buttonElement = formElement.querySelector(
        validationConfig.submitButtonSelector,
    );
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    inputList.forEach((inputElement) => {
        hideError(
            formElement,
            inputElement,
            validationConfig.inputErrorClass,
            validationConfig.errorClass,
        );
        inputElement.setCustomValidity("");
    });
};

export { enableValidation, clearValidation };
