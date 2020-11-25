(this["webpackJsonpreact-around-auth"]=this["webpackJsonpreact-around-auth"]||[]).push([[0],{30:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n(1),c=n.n(i),r=n(20),o=n.n(r),s=(n(30),n(23)),l=n(4),u=n(9),m=n(2),d=n.p+"static/media/logo.4e8e0a1d.svg";var h=function(e){function t(){localStorage.removeItem("token"),localStorage.removeItem("email"),e.toggleLoggedIn(!1),e.setEmail(""),window.location.reload()}function n(){e.toggleHamburgerState(!e.hamburger)}return Object(a.jsxs)("header",{className:"header width ".concat(e.hamburger?"header_hamburger_active":""),children:[Object(a.jsx)("img",{className:"logo",src:d,alt:"Around the US Logo"}),e.link?Object(a.jsx)(u.b,{className:"header__link",to:e.link,children:e.name}):e.email?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("p",{className:"header__email ".concat(e.hamburger?"header__email_hamburger_active":""),children:e.email}),Object(a.jsx)("button",{onClick:t,className:"header__logout ".concat(e.hamburger?"header__logout_hamburger_active":""),children:"Log Out"}),Object(a.jsx)("button",{onClick:n,className:"header__hamburger ".concat(e.hamburger?"header__hamburger_active":"")})]}):null]})},j=n.p+"static/media/edit-pencil.a086f758.svg",f=c.a.createContext();var b=function(e){var t=Object(i.useContext)(f),n=e.cardOwnerId===t._id,c=e.cardLikes.some((function(e){return e.replace(/^\s+|\s+$/gm,"")===t._id}));return Object(a.jsxs)("li",{className:"element",children:[Object(a.jsx)("button",{className:"element__delete ".concat(n?"element__delete_visible":""),onClick:function(){e.handleDeleteClick(e.cardId)}}),Object(a.jsx)("div",{className:"element__image",onClick:function(){e.handleCardClick(e.cardLink,e.cardName)},style:{backgroundImage:"url(".concat(e.cardLink,")")}}),Object(a.jsxs)("div",{className:"element__title-container",children:[Object(a.jsx)("h2",{className:"element__title",children:e.cardName}),Object(a.jsxs)("div",{className:"element__like-container",children:[Object(a.jsx)("button",{className:"element__like-button ".concat(c?"element__like-button_active":""),onClick:function(){e.onCardLike(e.cardLikes,e.cardId)}}),Object(a.jsx)("p",{className:"element__like-counter",children:e.cardLikes.length})]})]})]})};var _=function(e){var t=Object(i.useContext)(f);return Object(a.jsxs)("main",{className:"main",children:[Object(a.jsxs)("section",{className:"profile width",children:[Object(a.jsxs)("div",{className:"profile__avatar-container",children:[Object(a.jsx)("img",{className:"profile__avatar",src:t.avatar,alt:"Your profile"}),Object(a.jsx)("div",{className:"profile__overlay",children:Object(a.jsx)("img",{className:"profile__overlay-image",src:j,alt:"pencil",onClick:e.handleEditAvatarClick})})]}),Object(a.jsxs)("div",{className:"profile__name-container",children:[Object(a.jsx)("h2",{className:"profile__name",children:t.name}),Object(a.jsx)("button",{className:"profile__edit-button",onClick:e.handleEditProfileClick}),Object(a.jsx)("p",{className:"profile__subtitle",children:t.about})]}),Object(a.jsx)("button",{className:"form__save-button profile__add-button",onClick:e.handleAddCardClick})]}),Object(a.jsx)("section",{className:"elements width",children:Object(a.jsx)("ul",{className:"elements__grid-container",children:e.cards.map((function(t){return Object(a.jsx)(b,{cardName:t.name,cardId:t.id,cardOwnerId:t.ownerId,cardLink:t.link,cardLikes:t.likes,onCardLike:e.handleCardLike,handleDeleteClick:e.handleDeleteClick,handleCardClick:e.handleCardClick},t.id)}))})})]})};var p=function(){return Object(a.jsx)("footer",{className:"footer width",children:Object(a.jsx)("p",{className:"footer__copyright",children:"\xa9 2020 Danny Demosi"})})};var O=function(e){return Object(a.jsx)("section",{className:"image-modal ".concat(e.isOpen?"image-modal_visible":""),children:Object(a.jsxs)("div",{className:"image-modal__container ",children:[Object(a.jsx)("button",{className:"modal__exit image-modal__exit",onClick:e.onClose}),Object(a.jsx)("img",{className:"image-modal__image",src:e.link,alt:e.name}),Object(a.jsx)("p",{className:"image-modal__subtitle",children:e.name})]})})},g=n(13),v=n(14),k=function(){function e(t){Object(g.a)(this,e),this._apiEndpoint=t.url,this._auth=t.headers}return Object(v.a)(e,[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))}},{key:"setHeader",value:function(e){this._auth={Authorization:"Bearer ".concat(e),"Content-Type":"application/json"}}},{key:"getUserInfo",value:function(){var e=this;return fetch("".concat(this._apiEndpoint,"/users/me"),{headers:this._auth}).then((function(t){return e._checkResponse(t)}))}},{key:"getCardList",value:function(){var e=this;return fetch("".concat(this._apiEndpoint,"/cards"),{headers:this._auth}).then((function(t){return e._checkResponse(t)}))}},{key:"changeProfileInfo",value:function(e){var t=this;return fetch("".concat(this._apiEndpoint,"/users/me"),{method:"PATCH",headers:this._auth,body:JSON.stringify({name:e.name,about:e.about})}).then((function(e){return t._checkResponse(e)}))}},{key:"addCard",value:function(e){var t=this;return fetch("".concat(this._apiEndpoint,"/cards"),{method:"POST",headers:this._auth,body:JSON.stringify({name:e.name,link:e.link})}).then((function(e){return t._checkResponse(e)}))}},{key:"deleteCard",value:function(e){var t=this;return fetch("".concat(this._apiEndpoint,"/cards/").concat(e),{method:"DELETE",headers:this._auth}).then((function(e){return t._checkResponse(e)}))}},{key:"changeLikeCardStatus",value:function(e,t){var n=this;return!0===t?fetch("".concat(this._apiEndpoint,"/cards/likes/").concat(e),{method:"PUT",headers:this._auth}).then((function(e){return n._checkResponse(e)})):fetch("".concat(this._apiEndpoint,"/cards/likes/").concat(e),{method:"DELETE",headers:this._auth}).then((function(e){return n._checkResponse(e)}))}},{key:"updateAvatar",value:function(e){var t=this;return fetch("".concat(this._apiEndpoint,"/users/me/avatar"),{method:"PATCH",headers:this._auth,body:JSON.stringify({avatar:e})}).then((function(e){return t._checkResponse(e)}))}}]),e}(),x=new(function(){function e(t){Object(g.a)(this,e),this._apiEndpoint=t.url,this._headers=t.headers}return Object(v.a)(e,[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))}},{key:"getUserInfo",value:function(){var e=this;return fetch("".concat(this._apiEndpoint,"/users/me"),{headers:this._headers}).then((function(t){return e._checkResponse(t)}))}},{key:"signUp",value:function(e,t){var n=this;return fetch("".concat(this._apiEndpoint,"/signup"),{method:"POST",headers:this._headers,body:JSON.stringify({email:e,password:t})}).then((function(e){return n._checkResponse(e)}))}},{key:"signIn",value:function(e,t){var n=this;return fetch("".concat(this._apiEndpoint,"/signin"),{method:"POST",headers:this._headers,body:JSON.stringify({email:e,password:t})}).then((function(e){return n._checkResponse(e)}))}},{key:"checkToken",value:function(e){var t=this;return fetch("".concat(this._apiEndpoint,"/users/me"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)}}).then((function(e){return t._checkResponse(e)}))}}]),e}())({url:"http://api.danny-demosi.students.nomoreparties.site",headers:{"Content-Type":"application/json"}});var N=function(e){return Object(a.jsxs)("form",{name:e.name,onSubmit:e.onSubmit,className:"form form_".concat(e.name," ").concat(e.isOpen?"form_visible":""),children:[Object(a.jsx)("button",{className:"modal__exit form__exit form__exit_".concat(e.name),onClick:e.onClose,type:"reset"}),Object(a.jsx)("p",{className:"form__title form-width",children:e.title}),e.children]})};var C=function(e){var t=Object(i.useContext)(f),n=c.a.createRef(),r=c.a.createRef();return Object(a.jsxs)(N,{onSubmit:function(t){t.preventDefault();var a=n.current.value,i=r.current.value;e.onUpdateUser(a,i)},name:"edit-profile",title:"Edit Profile",isOpen:e.isOpen,onClose:e.onClose,children:[Object(a.jsxs)("div",{className:"form__text-field-wrapper form-width",children:[Object(a.jsx)("input",{ref:n,id:"profile-name",className:"form__text-field form__input form__input_name",placeholder:"Name",type:"text",defaultValue:t.name,minLength:"2",maxLength:"40",required:!0}),Object(a.jsx)("span",{id:"profile-name-error",className:"form__error"})]}),Object(a.jsxs)("div",{className:"form__text-field-wrapper form-width",children:[Object(a.jsx)("input",{ref:r,id:"profile-about",className:"form__text-field form__input form__input_about",placeholder:"About me",type:"text",defaultValue:t.about,minLength:"2",maxLength:"200",required:!0}),Object(a.jsx)("span",{id:"profile-about-error",className:"form__error"})]}),Object(a.jsx)("button",{type:"submit",className:"form__save-button form__save-button_profile form-width",children:e.isSaving?"Saving...":"Save"})]})};var S=function(e){var t=Object(i.useContext)(f),n=c.a.createRef();return Object(a.jsxs)(N,{name:"update-avatar",title:"Edit Avatar",onSubmit:function(t){t.preventDefault();var a=n.current.value;e.onUpdateAvatar(a)},isOpen:e.isOpen,onClose:e.onClose,children:[Object(a.jsxs)("div",{className:"form__text-field-wrapper form-width",children:[Object(a.jsx)("input",{ref:n,id:"avatar-link",className:"form__text-field form__input form__input_avatar-link",placeholder:"Image URL",type:"url",defaultValue:t.avatar,minLength:"1"}),Object(a.jsx)("span",{id:"avatar-link-error",className:"form__error"})]}),Object(a.jsx)("button",{type:"submit",className:"form__save-button form__save-button_avatar-link form-width",children:e.isSaving?"Saving...":"Save"})]})};var w=function(e){var t=c.a.createRef(),n=c.a.createRef();return Object(a.jsxs)(N,{name:"card",title:"New Place",isOpen:e.isOpen,onClose:e.onClose,onSubmit:function(a){a.preventDefault();var i=t.current.value,c=n.current.value;e.onAddPlace(i,c)},children:[Object(a.jsxs)("div",{className:"form__text-field-wrapper form-width",children:[Object(a.jsx)("input",{ref:t,id:"image-title",className:"form__text-field form__input form__input_image-title",placeholder:"Title",type:"text",defaultValue:"",minLength:"1",maxLength:"30"}),Object(a.jsx)("span",{id:"image-title-error",className:"form__error"})]}),Object(a.jsxs)("div",{className:"form__text-field-wrapper form-width",children:[Object(a.jsx)("input",{ref:n,id:"image-link",className:"form__text-field form__input form__input_image-link",placeholder:"Image URL",type:"url",defaultValue:"",minLength:"1"}),Object(a.jsx)("span",{id:"image-link-error",className:"form__error"})]}),Object(a.jsx)("button",{type:"submit",className:"form__save-button form__save-button_card form-width",children:e.isSaving?"Saving...":"Create"})]})};var y=function(e){return Object(a.jsx)(N,{name:"confirm",title:"Are you sure?",onSubmit:function(t){t.preventDefault(),e.onCardDelete(e.confirmDeleteId)},isOpen:e.isOpen,onClose:e.onClose,children:Object(a.jsx)("button",{type:"submit",className:"form__save-button form__save-button_avatar-link form-width",children:e.isSaving?"Saving...":"Yes"})})},E=function(e){var t=c.a.createRef(),n=c.a.createRef();return Object(a.jsxs)("form",{children:[Object(a.jsx)("input",{ref:t,className:"auth__input",type:"email",placeholder:"Email"}),Object(a.jsx)("input",{ref:n,className:"auth__input",type:"password",placeholder:"Password"}),Object(a.jsx)("button",{onClick:function(a){a.preventDefault(),e.registerRequest(t.current.value,n.current.value)},type:"submit",className:"auth__submit",children:e.name})]})},I=function(e){var t=c.a.createRef(),n=c.a.createRef();return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("input",{ref:t,className:"auth__input",type:"email",placeholder:"Email"}),Object(a.jsx)("input",{ref:n,className:"auth__input",type:"password",placeholder:"Password"}),Object(a.jsx)("button",{onClick:function(a){a.preventDefault(),e.loginRequest(t.current.value,n.current.value)},className:"auth__submit",type:"submit",children:e.name})]})},L=function(e){return Object(a.jsxs)("div",{className:"auth width",children:[Object(a.jsx)("h2",{className:"auth__title",children:e.name}),"Sign Up"===e.name?Object(a.jsx)(E,{name:e.name,registerRequest:e.registerRequest}):"Log in"===e.name?Object(a.jsx)(I,{name:e.name,loginRequest:e.loginRequest}):(console.log("Component doesn't exist"),null),Object(a.jsxs)("p",{className:"auth__button-description",children:[e.buttonDescription," ",Object(a.jsxs)(u.b,{className:"auth__link",to:e.link,children:[e.linkName," here!"]})]})]})},R=n(24),P=n(22),D=function(e){var t=e.component,n=Object(P.a)(e,["component"]);return Object(a.jsx)(m.b,{children:function(){return n.isLoggedIn?Object(a.jsx)(t,Object(R.a)({},n)):Object(a.jsx)(m.a,{to:"/login"})}})},U=function(e){var t=Object(i.useState)(""),n=Object(l.a)(t,2),c=n[0],r=n[1];return Object(i.useEffect)((function(){!0===e.registrationSuccess?r("Success! You have now been registered."):!1===e.registrationSuccess&&r("Oops, something went wrong! Please try again.")}),[e.registrationSuccess]),Object(a.jsx)("section",{className:"form info-tooltip ".concat(e.isOpen?"info-tooltip_visible":""),children:Object(a.jsxs)("div",{className:"form-width ",children:[Object(a.jsx)("button",{className:"modal__exit image-modal__exit",onClick:e.onClose}),Object(a.jsx)("div",{className:"info-tooltip__image ".concat(e.registrationSuccess?"info-tooltip__image_success":"info-tooltip__image_fail")}),Object(a.jsx)("p",{className:"info-tooltip__message",children:c})]})})};var A=function(){var e=Object(i.useState)({}),t=Object(l.a)(e,2),n=t[0],c=t[1],r=Object(i.useState)(!1),o=Object(l.a)(r,2),d=o[0],j=o[1],b=Object(i.useState)(!1),g=Object(l.a)(b,2),v=g[0],N=g[1],E=Object(i.useState)(!1),I=Object(l.a)(E,2),R=I[0],P=I[1],A=Object(i.useState)(!1),T=Object(l.a)(A,2),q=T[0],J=T[1],B=Object(i.useState)(!1),H=Object(l.a)(B,2),V=H[0],$=H[1],z=Object(i.useState)(""),Y=Object(l.a)(z,2),F=Y[0],W=Y[1],G=Object(i.useState)({link:"",name:"",isOpen:!1}),M=Object(l.a)(G,2),K=M[0],Q=M[1],X=Object(i.useState)(!1),Z=Object(l.a)(X,2),ee=Z[0],te=Z[1],ne=Object(i.useState)([]),ae=Object(l.a)(ne,2),ie=ae[0],ce=ae[1],re=Object(i.useState)(!1),oe=Object(l.a)(re,2),se=oe[0],le=oe[1],ue=Object(i.useState)(!1),me=Object(l.a)(ue,2),de=me[0],he=me[1],je=Object(i.useState)(""),fe=Object(l.a)(je,2),be=fe[0],_e=fe[1],pe=Object(i.useState)(!1),Oe=Object(l.a)(pe,2),ge=Oe[0],ve=Oe[1],ke=Object(i.useState)(""),xe=Object(l.a)(ke,2),Ne=xe[0],Ce=xe[1];Object(i.useEffect)((function(){localStorage.getItem("token")&&Ce(localStorage.getItem("token"))}),[Ne]);var Se=new k({url:"http://localhost:3000",headers:{authorization:"Bearer ".concat(Ne),"Content-Type":"application/json"}});function we(e,t){te(!0),Se.changeProfileInfo({name:e,about:t}).then((function(){ye()})).then((function(){te(!1),N(!1)})).catch((function(e){return console.log(e)}))}function ye(){Se.getUserInfo().then((function(e){c({name:e.name,about:e.about,avatar:e.avatar,_id:e._id})})).catch((function(e){return console.log(e)}))}function Ee(e){e.target===e.currentTarget&&(j(!1),N(!1),P(!1),J(!1),$(!1),Q({link:"",name:"",isOpen:!1}))}return Object(i.useEffect)((function(){localStorage.getItem("token")&&x.checkToken(localStorage.getItem("token")).then((function(e){return 400===e.status?(localStorage.removeItem("token"),localStorage.removeItem("email"),Promise.reject(new Error("No token or improper format"))):401===e.status?(localStorage.removeItem("token"),localStorage.removeItem("email"),Promise.reject(new Error("Invalid token"))):(le(!0),Ce(localStorage.getItem("token")),void _e(localStorage.getItem("email")))})).catch((function(e){console.log(e)}))}),[se]),Object(i.useEffect)((function(){Ne&&Se.getUserInfo().then((function(e){var t={name:e.name,about:e.about,avatar:e.avatar,_id:e._id};return c(t),t})).then((function(e){Se.getCardList().then((function(t){ce(t.map((function(t){return{name:t.name,link:t.link,likes:t.likes,id:t._id,ownerId:t.owner,myId:e._id}})))})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)}))}),[be,Ne]),Object(a.jsx)(f.Provider,{value:n,children:Object(a.jsx)("div",{className:"App",children:Object(a.jsxs)("div",{className:"page",children:[Object(a.jsx)(u.a,{children:Object(a.jsxs)(m.d,{children:[Object(a.jsxs)(m.b,{exact:!0,path:"/",children:[Object(a.jsx)(h,{email:be,setEmail:_e,hamburger:ge,toggleHamburgerState:ve,toggleLoggedIn:le}),Object(a.jsx)(D,{component:_,isLoggedIn:se,selectedCard:K,handleEditAvatarClick:function(e){j(!0)},handleEditProfileClick:function(e){N(!0)},handleAddCardClick:function(e){P(!0)},handleCardClick:function(e,t){Q({link:e,name:t,isOpen:!0})},setCards:ce,cards:ie,handleDeleteClick:function(e){W(e),J(!0)},handleCardLike:function(e,t){var a=e.some((function(e){return e.replace(/^\s+|\s+$/gm,"")===n._id}));Se.changeLikeCardStatus(t,!a).then((function(e){var n={name:e.name,link:e.link,likes:e.likes,id:e._id,ownerId:e.owner};return ie.map((function(e){return e.id.replace(/^\s+|\s+$/gm,"")===t?n:e}))})).then((function(e){ce(e)})).catch((function(e){return console.log(e)}))}})]}),Object(a.jsxs)(m.b,{exact:!0,path:"/login",children:[Object(a.jsx)(h,{name:"Sign Up",link:"/register"}),se?Object(a.jsx)(m.a,{to:"/"}):Object(a.jsx)(L,{name:"Log in",link:"/register",linkName:"Sign up",loginRequest:function(e,t){x.signIn(e,t).then((function(e){return 400===e.status?Promise.reject(new Error("The username or password was not provided")):401===e.status?Promise.reject(new Error("Could not find a user with that email")):(le(!0),Ce(e.token),e)})).then((function(t){_e(e),localStorage.setItem("email",e),localStorage.setItem("token",t.token),Ce(t.token)})).then().catch((function(e){console.log(e)}))},buttonDescription:"Not a member yet?"})]}),Object(a.jsxs)(m.b,{exact:!0,path:"/register",children:[Object(a.jsx)(h,{name:"Log in",link:"/login"}),se?Object(a.jsx)(m.a,{to:"/"}):Object(a.jsx)(L,{name:"Sign Up",link:"/login",linkName:"Log in",registerRequest:function(e,t){x.signUp(e,t).then((function(e){return 400===e.status?Promise.reject(new Error("The username or password is not in the proper format")):(he(!0),$(!0),le(!0),e.data)})).then((function(e){_e(e.email),c({name:e.name,about:e.about,avatar:e.avatar,_id:e._id}),Ce(e.token)})).catch((function(e){console.log(e),he(!1),$(!0)}))},buttonDescription:"Already a member?"})]}),Object(a.jsx)(m.a,{from:"*",to:"/"})]})}),Object(a.jsxs)("section",{className:"modal ".concat(K.isOpen||d||v||R||q||V?"modal_display_visible":""),onClick:Ee,children:[Object(a.jsx)(S,{onUpdateAvatar:function(e){te(!0),Se.updateAvatar(e).then((function(){ye()})).then((function(){te(!1),j(!1)})).catch((function(e){return console.log(e)}))},isOpen:d,onClose:Ee,isSaving:ee}),Object(a.jsx)(C,{onUpdateUser:we,isOpen:v,onClose:Ee,isSaving:ee}),Object(a.jsx)(w,{onUpdateUser:we,isOpen:R,onClose:Ee,onAddPlace:function(e,t){te(!0),Se.addCard({name:e,link:t}).then((function(e){var t={name:e.name,link:e.link,likes:e.likes,id:e._id,ownerId:e.owner};ce([].concat(Object(s.a)(ie),[t]))})).then((function(){te(!1),P(!1)})).catch((function(e){return console.log(e)}))},isSaving:ee}),Object(a.jsx)(y,{isOpen:q,onClose:Ee,onCardDelete:function(e){te(!0),Se.deleteCard(e).then((function(){var t=ie.filter((function(t){return t.id!==e}));ce(t)})).then((function(){te(!1),J(!1)})).catch((function(e){return console.log(e)}))},confirmDeleteId:F,isSaving:ee}),Object(a.jsx)(O,{isOpen:K.isOpen,onClose:Ee,name:K.name,link:K.link}),Object(a.jsx)(U,{isOpen:V,onClose:Ee,registrationSuccess:de})]}),Object(a.jsx)(p,{})]})})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(A,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[36,1,2]]]);
//# sourceMappingURL=main.da375980.chunk.js.map