(()=>{"use strict";window.debounce=e=>{let t=null;return(...o)=>{const n=o;t&&window.clearTimeout(t),t=setTimeout((()=>{e(...n)}),500)}},(()=>{const e=document.querySelector(".map__overlay").getBoundingClientRect();window.mainPin=document.querySelector(".map__pin--main"),window.mainPin.addEventListener("mousedown",(t=>{t.preventDefault();let o={x:t.clientX,y:t.clientY};const n=t=>{t.preventDefault();let n=o.x-t.clientX,r=o.y-t.clientY;window.mainPin.offsetLeft-n>=0-window.mainPin.offsetWidth/2&&window.mainPin.offsetLeft-n<=e.width-window.mainPin.offsetWidth/2&&window.mainPin.offsetTop-r>=e.top+47&&window.mainPin.offsetTop-r<=e.top+547&&(o={x:t.clientX,y:t.clientY},window.getAddress(!0),window.mainPin.style.top=window.mainPin.offsetTop-r+"px",window.mainPin.style.left=window.mainPin.offsetLeft-n+"px")},r=e=>{e.preventDefault(),window.getAddress(!0),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",r)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",r)}))})(),window.load=(e,t)=>{const o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(()=>{200===o.status&&e?e(o.response):t&&t("Статус ответа: "+o.status+" "+o.statusText)})),o.addEventListener("error",(()=>{t&&t("Произошла ошибка соединения")})),o.addEventListener("timeout",(()=>{t&&t("Запрос не успел выполниться за "+o.timeout+"мс")})),o.timeout=1e4,o.open("GET","  https://21.javascript.pages.academy/keksobooking/data"),o.send()},window.save=(e,t,o)=>{const n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(()=>{200===n.status&&t?t(n.response):o&&o("Статус ответа: "+n.status+" "+n.statusText)})),n.addEventListener("error",(()=>{o&&o("Произошла ошибка соединения")})),n.addEventListener("timeout",(()=>{o&&o("Запрос не успел выполниться за "+n.timeout+"мс")})),n.open("POST","https://21.javascript.pages.academy/keksobooking"),n.send(e)},(()=>{const e=document.querySelector(".map");e.classList.remove("map--faded");const t=document.querySelector(".ad-form"),o=document.querySelector(".map__filters");window.startMainPin=window.mainPin.getAttribute("style"),window.disabledSite=()=>{e.classList.add("map--faded"),t.classList.add("ad-form--disabled"),t.querySelectorAll("fieldset").forEach((e=>{e.setAttribute("disabled","disabled")})),o.querySelectorAll("select").forEach((e=>{e.setAttribute("disabled","disabled")})),o.querySelector("fieldset").setAttribute("disabled","disabled")},document.addEventListener("DOMContentLoaded",window.disabledSite);const n=()=>{window.load(r,i),e.classList.remove("map--faded"),t.classList.remove("ad-form--disabled"),t.querySelectorAll("fieldset").forEach((e=>{e.removeAttribute("disabled","disabled")})),o.querySelectorAll("select").forEach((e=>{e.removeAttribute("disabled","disabled")})),o.querySelector("fieldset").removeAttribute("disabled","disabled")};window.getAddress=e=>{let t;t=e?parseInt(parseInt(getComputedStyle(window.mainPin).left)+.5*parseInt(getComputedStyle(window.mainPin).width))+","+parseInt(parseInt(getComputedStyle(window.mainPin).top)+parseInt(getComputedStyle(window.mainPin).height)+18):parseInt(parseInt(getComputedStyle(window.mainPin).left)+.5*parseInt(getComputedStyle(window.mainPin).width))+","+parseInt(parseInt(getComputedStyle(window.mainPin).top)+.5*parseInt(getComputedStyle(window.mainPin).height)),document.querySelector("#address").setAttribute("value",t)},window.getAddress(!1),window.mainPin.addEventListener("mouseup",(e=>{0===e.button&&(n(),window.getAddress(!0))})),window.mainPin.addEventListener("keydown",(e=>{"Enter"===e.key&&n()}));const r=e=>{window.announcements=e,window.filteredAnnounements=e,window.renderPins(window.announcements,window.COUNT_PINS)},i=e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin");window.announcements=[],window.renderPins=(t,o)=>{document.querySelectorAll("button.map__pin").forEach((e=>{e.classList.contains("map__pin--main")||(e.remove(),e.removeEventListener("keydown",(e=>{"Enter"===e.key&&window.getCard()})))}));for(let n=0;n<o&&n<t.length;n++){const o=e.cloneNode(!0);o.querySelector("img").src=t[n].author.avatar,o.querySelector("img").alt=t[n].offer.title,o.style.left=t[n].location.x+"px",o.style.top=t[n].location.y+"px",o.style.transform="translate(-50%, -100%)",document.querySelector(".map__pins").appendChild(o),o.addEventListener("click",(()=>{window.getCard(n)})),o.addEventListener("keydown",(e=>{"Enter"===e.key&&window.getCard(n)}))}},window.COUNT_PINS=5;const t=document.querySelector(".map__filters"),o=t.querySelectorAll("select"),n=t.querySelectorAll("input[type=checkbox]"),r={middle:[1e4,5e4],low:[0,9999],high:[50001,1e15]},i=()=>{window.getClosePopup();const e=[],n=t.querySelectorAll("input[type=checkbox]:checked"),i=[];o.forEach((t=>{e.push({name:t.getAttribute("name").replace("housing-",""),value:t.value})})),n.forEach((e=>{i.push(e.value)}));let d=window.announcements.filter((t=>e.every((e=>"price"===e.name&&"any"!==e.value?s(t.offer.price,r[e.value][0],r[e.value][1]):String(t.offer[e.name])===String(e.value)||"any"===e.value))));i.length&&(d=d.filter((e=>{const t=[];return i.forEach((o=>{t.push(e.offer.features.includes(o))})),t.every((e=>!0===e))}))),window.filteredAnnounements=d,window.renderPins(d,window.COUNT_PINS)};o.forEach((e=>{e.addEventListener("change",(()=>{window.debounce((()=>{i()}))()}))})),n.forEach((e=>{e.addEventListener("change",(()=>{window.debounce((()=>{i()}))()}))}));const s=(e,t,o)=>e>=t&&e<=o})(),(()=>{const e=document.querySelector("#card").content.querySelector(".map__card"),t=e.querySelector(".popup__photos"),o=e=>{const o=t.querySelector(".popup__photo"),n=o.cloneNode(!0);return o.src=e,n};window.getClosePopup=()=>{const e=document.querySelector(".map__card.popup");e&&e.remove(),document.removeEventListener("keydown",n)};const n=e=>{"Escape"===e.key&&window.getClosePopup()};window.getCard=t=>{const r=document.querySelector(".map__card.popup");r&&r.remove();const i=document.createDocumentFragment(),s=document.querySelector(".map__filters-container"),d=document.querySelector(".map"),a=window.filteredAnnounements[t];i.appendChild((t=>{const n=e.cloneNode(!0);return n.querySelector(".popup__title").textContent=t.offer.title,n.querySelector(".popup__text--address").textContent=t.offer.address,n.querySelector(".popup__text--price").textContent=t.offer.price+"/ночь",n.querySelector(".popup__type").textContent=t.offer.type,n.querySelector(".popup__features").innerHTML="",t.offer.features.forEach((e=>{const t=document.createElement("li");t.classList.add("popup__feature");const o="popup__feature--"+e;t.classList.add(o),n.querySelector(".popup__features").appendChild(t)})),n.querySelector(".popup__text--capacity").textContent=`${t.offer.rooms} комнаты для ${t.offer.guests} гостей`,n.querySelector(".popup__text--time").textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`,n.querySelector(".popup__description").textContent=t.offer.description,n.querySelector(".popup__avatar").src=t.author.avatar,n.querySelector(".popup__photos").innerHTML="",((e,t,n)=>{const r=document.createDocumentFragment();for(let n=0;n<t;n++){const t=e.offer.photos[n];r.appendChild(o(t))}n.appendChild(r)})(t,t.offer.photos.length,n.querySelector(".popup__photos")),n})(a)),document.addEventListener("keydown",n),i.querySelector(".popup__close").addEventListener("click",window.getClosePopup),d.insertBefore(i,s)}})(),(()=>{const e=document.querySelector("#title"),t=document.querySelector("#price"),o=document.querySelector("#room_number"),n=document.querySelector("#price"),r=document.querySelector("#type"),i=document.querySelector("#timeout"),s=document.querySelector("#timein"),d=document.querySelector(".ad-form__submit"),a=document.querySelector(".ad-form"),c=document.querySelector("#success").content.querySelector(".success"),l=document.querySelector("#error").content.querySelector(".error"),u=document.querySelector(".ad-form__reset"),m={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]};let p=new class{constructor(){this.fields={name:!1,price:!1,rooms:!1}}check(){let e=!0;for(let t in this.fields)!1===this.fields[t]&&(e=!1);return e}reset(){for(let e in this.fields)this.fields.hasOwnProperty(e)&&(this.fields[e]=!1)}};const w=e=>{let t=e.value.length;p.fields.name=!1,t<30?e.setCustomValidity("Ещё "+(30-t)+" симв."):t>100?e.setCustomValidity("Удалите лишние "+(t-100)+" симв."):(e.setCustomValidity(""),p.fields.name=!0),e.reportValidity()};e.addEventListener("input",(()=>{w(e)}));const y=e=>{let t=e.value;p.fields.price=!1,t>1e6?e.setCustomValidity("Сумма может быть не больше 1000000"):(e.setCustomValidity(""),p.fields.price=!0),e.reportValidity()};t.addEventListener("input",(()=>{y(t)}));let f=()=>{switch(r.value){case"bungalow":n.setAttribute("min","0"),n.setAttribute("placeholder","0"),n.setAttribute("value","0"),n.value=0;break;case"flat":n.setAttribute("min","1000"),n.setAttribute("placeholder","1000"),n.setAttribute("value","1000"),n.value=1e3;break;case"house":n.setAttribute("min","5000"),n.setAttribute("placeholder","5000"),n.setAttribute("value","5000"),n.value=5e3;break;case"palace":n.setAttribute("min","10000"),n.setAttribute("placeholder","10000"),n.setAttribute("value","10000"),n.value=1e4}};f(),r.addEventListener("input",(()=>{f()})),s.addEventListener("change",(()=>{(()=>{switch(s.value){case"12:00":i.value="12:00";break;case"13:00":i.value="13:00";break;case"14:00":i.value="14:00"}})()})),i.addEventListener("change",(()=>{(()=>{switch(i.value){case"12:00":s.value="12:00";break;case"13:00":s.value="13:00";break;case"14:00":s.value="14:00"}})()})),1===o.value&&Array.from(document.querySelector("#capacity").options).forEach((e=>{1!==Number(e.getAttribute("value"))&&e.setAttribute("disabled","disabled")})),o.addEventListener("change",(()=>{let e=document.querySelector("#room_number").value;p.fields.rooms=!1,Array.from(document.querySelector("#capacity").options).forEach((t=>{m[e].includes(t.value)?(t.removeAttribute("disabled"),t.setAttribute("selected",""),p.fields.rooms=!0):(t.setAttribute("disabled",""),t.removeAttribute("selected"))}))})),document.querySelector("#avatar").setAttribute("accept","image/png, image/jpeg"),document.querySelector("#images").setAttribute("accept","image/png, image/jpeg");const v=()=>{window.disabledSite();const e=c.cloneNode(!0);document.querySelector(".ad-form").appendChild(e),e.addEventListener("click",(()=>{e.remove()})),document.addEventListener("keydown",(t=>{"Escape"===t.key&&e.remove()}))},S=()=>{const e=l.cloneNode(!0);document.querySelector("main").appendChild(e),e.addEventListener("click",(()=>{e.remove()})),document.addEventListener("keydown",(t=>{"Escape"===t.key&&e.remove()}))};d.addEventListener("click",(o=>{o.preventDefault();const n=new FormData(a);if(p.check()){window.getClosePopup(),window.save(n,v,S),window.mainPin.setAttribute("style",window.startMainPin),window.getAddress(!1),window.disabledSite(),a.reset(),document.querySelectorAll("button.map__pin").forEach((e=>{e.classList.contains("map__pin--main")||e.remove()}));const e=document.querySelector(".ad-form-header__preview img");e.dataset.src&&(e.src=e.dataset.src);const t=document.querySelector(".ad-form__photo img");t.dataset.src&&(t.src=t.dataset.src),p.reset(),f()}else w(e),y(t)})),u.addEventListener("click",(()=>{a.reset(),f(),window.mainPin.setAttribute("style",window.startMainPin),window.getAddress(!1);const e=document.querySelector(".ad-form-header__preview img");e.dataset.src&&(e.src=e.dataset.src);const t=document.querySelector(".ad-form__photo img");t.dataset.src&&(t.src=t.dataset.src),document.querySelectorAll("button.map__pin").forEach((e=>{e.classList.contains("map__pin--main")||e.remove()})),window.disabledSite()}))})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector("#avatar"),o=document.querySelector(".ad-form-header__preview img"),n=document.querySelector("#images"),r=document.querySelector(".ad-form__photo img"),i=(t,o)=>{t.addEventListener("change",(()=>{const n=t.files[0],r=n.name.toLowerCase();if(e.some((e=>r.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{o.setAttribute("data-src",o.src),o.src=e.result})),e.readAsDataURL(n)}}))};i(t,o),i(n,r)})()})();