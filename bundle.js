(()=>{"use strict";window.debounce=function(e){let t=null;return function(...n){const o=n;t&&window.clearTimeout(t),t=setTimeout((function(){e(...o)}),500)}},(()=>{const e=document.querySelector(".map__overlay").getBoundingClientRect();window.mainPin=document.querySelector(".map__pin--main"),window.mainPin.addEventListener("mousedown",(t=>{t.preventDefault();let n={x:t.clientX,y:t.clientY};const o=t=>{t.preventDefault();let o=n.x-t.clientX,r=n.y-t.clientY;if(n={x:t.clientX,y:t.clientY},window.mainPin.offsetLeft-o>=0-window.mainPin.offsetWidth/2&&window.mainPin.offsetLeft-o<=e.width-window.mainPin.offsetWidth/2&&window.mainPin.offsetTop-r>=e.top+130&&window.mainPin.offsetTop-r<=e.top+630)window.mainPin.style.top=window.mainPin.offsetTop-r+"px",window.mainPin.style.left=window.mainPin.offsetLeft-o+"px";else{const e=new Event("mouseup");document.dispatchEvent(e)}},r=e=>{e.preventDefault(),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",r)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",r)}))})(),window.load=(e,t)=>{const n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(()=>{200===n.status&&e?e(n.response):t&&t("Статус ответа: "+n.status+" "+n.statusText)})),n.addEventListener("error",(()=>{t&&t("Произошла ошибка соединения")})),n.addEventListener("timeout",(()=>{t&&t("Запрос не успел выполниться за "+n.timeout+"мс")})),n.timeout=1e4,n.open("GET","  https://21.javascript.pages.academy/keksobooking/data"),n.send()},window.save=(e,t,n)=>{const o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(()=>{t(o.response)})),o.addEventListener("error",(()=>{n&&n("Произошла ошибка соединения")})),o.open("POST","https://21.javascript.pages.academy/keksobooking"),o.send(e)},(()=>{const e=document.querySelector(".map");e.classList.remove("map--faded");const t=document.querySelector(".ad-form"),n=document.querySelector(".map__filters");window.startMainPin=window.mainPin.getAttribute("style"),window.disabledSite=()=>{e.classList.add("map--faded"),t.classList.add("ad-form--disabled"),t.querySelectorAll("fieldset").forEach((e=>{e.setAttribute("disabled","disabled")})),n.querySelectorAll("select").forEach((e=>{e.setAttribute("disabled","disabled")})),n.querySelector("fieldset").setAttribute("disabled","disabled")},document.addEventListener("DOMContentLoaded",window.disabledSite);const o=()=>{window.load(r,i),e.classList.remove("map--faded"),t.classList.remove("ad-form--disabled"),t.querySelectorAll("fieldset").forEach((e=>{e.removeAttribute("disabled","disabled")})),n.querySelectorAll("select").forEach((e=>{e.removeAttribute("disabled","disabled")})),n.querySelector("fieldset").removeAttribute("disabled","disabled")};window.getAddress=e=>{let t;t=e?parseInt(parseInt(getComputedStyle(window.mainPin).left)+.5*parseInt(getComputedStyle(window.mainPin).width))+","+parseInt(parseInt(getComputedStyle(window.mainPin).top)+parseInt(getComputedStyle(window.mainPin).height)+18):parseInt(parseInt(getComputedStyle(window.mainPin).left)+.5*parseInt(getComputedStyle(window.mainPin).width))+","+parseInt(parseInt(getComputedStyle(window.mainPin).top)+.5*parseInt(getComputedStyle(window.mainPin).height)),document.querySelector("#address").setAttribute("value",t)},window.getAddress(!1),window.mainPin.addEventListener("mouseup",(function(e){0===e.button&&(o(),window.getAddress(!0))})),window.mainPin.addEventListener("keydown",(function(e){"Enter"===e.key&&o()}));const r=e=>{window.announcements=e,window.filteredAnnounements=e,window.renderPins(window.announcements,window.COUNT_PINS)},i=e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin");window.announcements=[],window.renderPins=(t,n)=>{document.querySelectorAll("button.map__pin").forEach((e=>{e.classList.contains("map__pin--main")||(e.remove(),e.removeEventListener("keydown",(e=>{"Enter"===e.key&&window.getCard()})))}));for(let o=0;o<n&&o<t.length;o++){const n=e.cloneNode(!0);n.querySelector("img").src=t[o].author.avatar,n.querySelector("img").alt=t[o].offer.title,n.style.left=t[o].location.x+"px",n.style.top=t[o].location.y+"px",document.querySelector(".map__pins").appendChild(n),n.addEventListener("click",(()=>{window.getCard(o)})),n.addEventListener("keydown",(e=>{"Enter"===e.key&&window.getCard(o)}))}},window.COUNT_PINS=5;const t=document.querySelector(".map__filters"),n=t.querySelectorAll("select"),o=t.querySelectorAll("input[type=checkbox]"),r={middle:[1e4,5e4],low:[0,9999],high:[50001,1e15]},i=()=>{window.getClosePopup();const e=[],o=t.querySelectorAll("input[type=checkbox]:checked"),i=[];n.forEach((t=>{e.push({name:t.getAttribute("name").replace("housing-",""),value:t.value})})),o.forEach((e=>{i.push(e.value)}));let s=window.announcements.filter((t=>e.every((e=>"price"===e.name&&"any"!==e.value?d(t.offer.price,r[e.value][0],r[e.value][1]):String(t.offer[e.name])===String(e.value)||"any"===e.value))));i.length&&(s=s.filter((e=>{const t=[];return i.forEach((n=>{t.push(e.offer.features.includes(n))})),t.every((e=>!0===e))}))),window.filteredAnnounements=s,window.renderPins(s,window.COUNT_PINS)};n.forEach((e=>{e.addEventListener("change",(function(){window.debounce((function(){i()}))()}))})),o.forEach((e=>{e.addEventListener("change",(()=>{window.debounce((()=>{i()}))()}))}));const d=(e,t,n)=>e>=t&&e<=n})(),(()=>{const e=document.querySelector("#card").content.querySelector(".map__card"),t=e.querySelector(".popup__photos"),n=e=>{const n=t.querySelector(".popup__photo"),o=n.cloneNode(!0);return n.src=e,o};window.getClosePopup=()=>{const e=document.querySelector(".map__card.popup");e&&e.remove(),document.removeEventListener("keydown",o)};const o=e=>{"Escape"===e.key&&window.getClosePopup()};window.getCard=t=>{const r=document.querySelector(".map__card.popup");r&&r.remove();const i=document.createDocumentFragment(),d=document.querySelector(".map__filters-container"),s=document.querySelector(".map"),a=window.filteredAnnounements[t];i.appendChild((t=>{const o=e.cloneNode(!0);return o.querySelector(".popup__title").textContent=t.offer.title,o.querySelector(".popup__text--address").textContent=t.offer.address,o.querySelector(".popup__text--price").textContent=t.offer.price+"/ночь",o.querySelector(".popup__type").textContent=t.offer.type,o.querySelector(".popup__features").innerHTML="",t.offer.features.forEach((e=>{const t=document.createElement("li");t.classList.add("popup__feature");const n="popup__feature--"+e;t.classList.add(n),o.querySelector(".popup__features").appendChild(t)})),o.querySelector(".popup__text--capacity").textContent=`${t.offer.rooms} комнаты для ${t.offer.guests} гостей`,o.querySelector(".popup__text--time").textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`,o.querySelector(".popup__description").textContent=t.offer.description,o.querySelector(".popup__avatar").src=t.author.avatar,o.querySelector(".popup__photos").innerHTML="",((e,t,o)=>{const r=document.createDocumentFragment();for(let o=0;o<t;o++){const t=e.offer.photos[o];r.appendChild(n(t))}o.appendChild(r)})(t,t.offer.photos.length,o.querySelector(".popup__photos")),o})(a)),document.addEventListener("keydown",o),i.querySelector(".popup__close").addEventListener("click",window.getClosePopup),s.insertBefore(i,d)}})(),(()=>{const e=document.querySelector("#title"),t=document.querySelector("#price"),n=document.querySelector("#room_number"),o=document.querySelector("#price"),r=document.querySelector("#type"),i=document.querySelector("#timeout"),d=document.querySelector("#timein"),s=document.querySelector(".ad-form__submit"),a=document.querySelector(".ad-form"),c=document.querySelector("#success").content.querySelector(".success"),u=document.querySelector("#error").content.querySelector(".error"),l=document.querySelector(".ad-form__reset"),p={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]};let m=new class{constructor(){this.fields={name:!1,price:!1,rooms:!1}}check(){let e=!0;for(let t in this.fields)!1===this.fields[t]&&(e=!1);return e}reset(){for(let e in this.fields)this.fields.hasOwnProperty(e)&&(this.fields[e]=!1)}};const w=e=>{let t=e.value.length;m.fields.name=!1,t<30?e.setCustomValidity("Ещё "+(30-t)+" симв."):t>100?e.setCustomValidity("Удалите лишние "+(t-100)+" симв."):(e.setCustomValidity(""),m.fields.name=!0),e.reportValidity()};e.addEventListener("input",(()=>{w(e)}));const f=e=>{let t=e.value;m.fields.price=!1,t>1e6?e.setCustomValidity("Сумма может быть не больше 1000000"):(e.setCustomValidity(""),m.fields.price=!0),e.reportValidity()};t.addEventListener("input",(()=>{f(t)}));let y=()=>{switch(r.value){case"bungalow":o.setAttribute("min","0"),o.setAttribute("placeholder","0"),o.setAttribute("value","0"),o.value=0;break;case"flat":o.setAttribute("min","1000"),o.setAttribute("placeholder","1000"),o.setAttribute("value","1000"),o.value=1e3;break;case"house":o.setAttribute("min","5000"),o.setAttribute("placeholder","5000"),o.setAttribute("value","5000"),o.value=5e3;break;case"palace":o.setAttribute("min","10000"),o.setAttribute("placeholder","10000"),o.setAttribute("value","10000"),o.value=1e4}};y(),r.addEventListener("input",(()=>{y()})),d.addEventListener("change",(()=>{(()=>{switch(d.value){case"12:00":i.value="12:00";break;case"13:00":i.value="13:00";break;case"14:00":i.value="14:00"}})()})),i.addEventListener("change",(()=>{(()=>{switch(i.value){case"12:00":d.value="12:00";break;case"13:00":d.value="13:00";break;case"14:00":d.value="14:00"}})()})),1==n.value&&(Array.from(document.querySelector("#capacity").options).forEach((e=>{1!==Number(e.getAttribute("value"))&&e.setAttribute("disabled","disabled")})),console.log(document.querySelector("#capacity").options)),n.addEventListener("change",(()=>{let e=document.querySelector("#room_number").value;m.fields.rooms=!1,Array.from(document.querySelector("#capacity").options).forEach((t=>{p[e].includes(t.value)?(t.removeAttribute("disabled"),t.setAttribute("selected",""),m.fields.rooms=!0):(t.setAttribute("disabled",""),t.removeAttribute("selected"))}))})),document.querySelector("#avatar").setAttribute("accept","image/png, image/jpeg"),document.querySelector("#images").setAttribute("accept","image/png, image/jpeg");const v=()=>{window.disabledSite();const e=c.cloneNode(!0);document.querySelector(".ad-form").appendChild(e),e.addEventListener("click",(()=>{e.remove()})),document.addEventListener("keydown",(t=>{"Escape"===t.key&&e.remove()}))},S=()=>{const e=u.cloneNode(!0);document.querySelector("main").appendChild(e),e.addEventListener("click",(()=>{e.remove()})),document.addEventListener("keydown",(t=>{"Escape"===t.key&&e.remove()}))};s.addEventListener("click",(n=>{n.preventDefault();const o=new FormData(a);if(m.check()){window.getClosePopup(),window.save(o,v,S),window.mainPin.setAttribute("style",window.startMainPin),window.getAddress(!1),window.disabledSite(),a.reset(),document.querySelectorAll("button.map__pin").forEach((e=>{e.classList.contains("map__pin--main")||e.remove()}));const e=document.querySelector(".ad-form-header__preview img");e.dataset.src&&(e.src=e.dataset.src);const t=document.querySelector(".ad-form__photo img");t.dataset.src&&(t.src=t.dataset.src),m.reset(),y()}else w(e),f(t)})),l.addEventListener("click",(()=>{a.reset(),y(),window.mainPin.setAttribute("style",window.startMainPin),window.getAddress(!1);const e=document.querySelector(".ad-form-header__preview img");e.dataset.src&&(e.src=e.dataset.src);const t=document.querySelector(".ad-form__photo img");t.dataset.src&&(t.src=t.dataset.src),document.querySelectorAll("button.map__pin").forEach((e=>{e.classList.contains("map__pin--main")||e.remove()})),window.disabledSite()}))})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector("#avatar"),n=document.querySelector(".ad-form-header__preview img"),o=document.querySelector("#images"),r=document.querySelector(".ad-form__photo img"),i=(t,n)=>{t.addEventListener("change",(()=>{const o=t.files[0],r=o.name.toLowerCase();if(e.some((function(e){return r.endsWith(e)}))){const e=new FileReader;e.addEventListener("load",(()=>{n.setAttribute("data-src",n.src),n.src=e.result})),e.readAsDataURL(o)}}))};i(t,n),i(o,r)})()})();