// //Global Selectors
// const modal = document.querySelector(".modal");

// // Selectors for image pop up
// const imageModal = document.querySelector('.image-modal');

// //Selectors for Add modal
// const nameInput = document.querySelector('.form__input_image-title');
// const linkInput = document.querySelector('.form__input_image-link');
// const addCard = document.querySelector('.form_card');
// const addButton = document.querySelector('.profile__add-button');

// //Selectors for edit modal
// const editProfile = document.querySelector('.form_edit-profile');
// const editButton = document.querySelector('.profile__edit-button');
// const editNameInput = document.querySelector('.form__input_name');
// const editAboutInput = document.querySelector('.form__input_about');

// //Selectors for Avatar modal
// const avatarUpdateForm = document.querySelector('.form_update-avatar');
// const editAvatar = document.querySelector('.profile__avatar-container');
// const avatarElement = document.querySelector('.profile__avatar');

// //Selectors for delete modal
// const removeCardID = document.querySelector('.form__card-id');
// //api data
const apiEndpointsCards = {
  url: "https://api.danny-around-react.students.nomoreparties.site",
  // url: "http://localhost:3000",
    headers: { 
     "Content-Type": "application/json"
     }
}

const apiEndpointsRegister = {
  url:"https://api.danny-around-react.students.nomoreparties.site",
  // url: 'http://localhost:3000',
  headers:{
    "Content-Type": "application/json",
  },
}

//default validation config

// const defaultConfig = {
//     inputSelector: ".form__input",
//     submitButtonSelector: ".form__save-button",
//     inactiveButtonClass: "form__save-button_disabled",
//     inputErrorClass: "form__input-error",
//     errorClass: "form__error_visible"
// };

// function toggleModal() {
//     modal.classList.toggle('modal_display_visible');
// }

// function loadingIcon(isLoading, modal) {
//     if (isLoading) {
//      modal.querySelector('.form__save-button').textContent = "Saving...";
//     } else {
//      modal.querySelector('.form__save-button').textContent = "Saved!";
//     }
//    }

export { apiEndpointsCards, apiEndpointsRegister};