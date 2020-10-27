(()=>{"use strict";window.debounce=function(e){let t=null;return function(...o){const n=o;t&&window.clearTimeout(t),t=setTimeout((function(){e(...n)}),500)}},(()=>{const e=document.querySelector(".map__pin--main"),t=document.querySelector(".map__overlay").getBoundingClientRect();e.addEventListener("mousedown",(function(o){o.preventDefault();let n={x:o.clientX,y:o.clientY};const r=function(o){o.preventDefault();let r=n.x-o.clientX,a=n.y-o.clientY;n={x:o.clientX,y:o.clientY},e.offsetLeft-r>=0-e.offsetWidth/2&&e.offsetLeft-r<=t.width-e.offsetWidth/2&&e.offsetTop-a>=t.top+130&&e.offsetTop-a<=t.top+630&&(e.style.top=e.offsetTop-a+"px",e.style.left=e.offsetLeft-r+"px")},a=function(e){e.preventDefault(),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",r),document.addEventListener("mouseup",a)}))})(),window.load=function(e,t){const o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(function(){200===o.status&&e?e(o.response):t&&t("Статус ответа: "+o.status+" "+o.statusText)})),o.addEventListener("error",(function(){t&&t("Произошла ошибка соединения")})),o.addEventListener("timeout",(function(){t&&t("Запрос не успел выполниться за "+o.timeout+"мс")})),o.timeout=1e4,o.open("GET","  https://21.javascript.pages.academy/keksobooking/data"),o.send()},window.save=function(e,t,o){const n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(function(){t(n.response)})),n.addEventListener("error",(function(){o&&o("Произошла ошибка соединения")})),n.open("POST","https://21.javascript.pages.academy/keksobooking"),n.send(e)},(()=>{const e=document.querySelector(".map");e.classList.remove("map--faded");const t=document.querySelector(".map__pin--main"),o=document.querySelector(".ad-form"),n=document.querySelector(".map__filters");function r(){e.classList.remove("map--faded"),o.classList.remove("ad-form--disabled"),o.querySelectorAll("fieldset").forEach((e=>{e.removeAttribute("disabled","")})),n.querySelectorAll("select").forEach((e=>{e.removeAttribute("disabled","")})),n.querySelector("fieldset").removeAttribute("disabled","")}function a(e){let o;o=e?parseFloat(parseFloat(getComputedStyle(t).left)+.5*parseFloat(getComputedStyle(t).width))+","+parseFloat(parseFloat(getComputedStyle(t).top)+1.5*parseFloat(getComputedStyle(t).height)):parseFloat(parseFloat(getComputedStyle(t).left)+.5*parseFloat(getComputedStyle(t).width))+","+parseFloat(parseFloat(getComputedStyle(t).top)+.5*parseFloat(getComputedStyle(t).height)),document.querySelector("#address").setAttribute("value",o)}a(!1),window.disabledSite=()=>{e.classList.add("map--faded"),o.classList.add("ad-form--disabled"),o.querySelectorAll("fieldset").forEach((e=>{e.setAttribute("disabled","")})),n.querySelectorAll("select").forEach((e=>{e.setAttribute("disabled","")})),n.querySelector("fieldset").setAttribute("disabled","")},document.addEventListener("DOMContentLoaded",window.disabledSite),t.addEventListener("mouseup",(function(e){0===e.button&&(r(),a(!0))})),t.addEventListener("keydown",(function(e){"Enter"===e.key&&r()}))})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin"),t=["palace","flat","house","bungalow"],o=["12:00","13:00","14:00"],n=["wifi","dishwasher","parking","washer","elevator","conditioner"];window.announcements=[];for(let e=0;e<8;e++){let e={author:{}};e.author.avatar=`img/avatars/user0${Math.floor(7*Math.random()+1)}.png`,e.offer={},e.offer.title="For sale",e.offer.address=`${Math.floor(1e3*Math.random())}, ${Math.floor(1e3*Math.random())}`,e.offer.price=Math.floor(1e4*Math.random())+"₽/ночь",e.offer.type=t[Math.floor(4*Math.random())],e.offer.rooms=Math.floor(6*Math.random()),e.offer.guests=Math.floor(10*Math.random()),e.offer.checkin=o[Math.floor(2*Math.random())],e.offer.checkout=o[Math.floor(2*Math.random())],e.offer.features=n[Math.floor(5*Math.random())]+", "+n[Math.floor(5*Math.random())],e.offer.description="огромная квартира для большой компании",e.offer.photos=["http://o0.github.io/assets/images/tokyo/hotel1.jpg","http://o0.github.io/assets/images/tokyo/hotel2.jpg","http://o0.github.io/assets/images/tokyo/hotel3.jpg"],e.location={},e.location.x=Math.floor(Math.random()*document.querySelector(".map__pins").getBoundingClientRect().width),e.location.y=Math.floor(500*Math.random()+130),window.announcements.push(e)}const r=(t,o)=>{document.querySelectorAll("button.map__pin").forEach((e=>{e.classList.contains("map__pin--main")||e.remove()}));for(let n=0;n<o&&n<t.length;n++){const o=e.cloneNode(!0);o.querySelector("img").src=t[n].author.avatar,o.querySelector("img").alt=t[n].offer.title,o.style.left=t[n].location.x+"px",o.style.top=t[n].location.y+"px",document.querySelector(".map__pins").appendChild(o),o.addEventListener("click",(()=>{window.getCard(n)})),o.addEventListener("keydown",(e=>{"Enter"===e.keycode&&window.getCard(n)}))}};window.load((function(e){window.announcements=e,window.filteredAnnounements=e,r(window.announcements,5)}),(function(e){const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)}));const a=document.querySelector(".map__filters").querySelectorAll("select");a.forEach((e=>{e.addEventListener("change",(function(){window.debounce((function(){!function(){const e=[],t={middle:[1e4,5e4],low:[0,9999],high:[50001,1e15]};a.forEach((t=>{e.push({name:t.getAttribute("name").replace("housing-",""),value:t.value})}));const o=window.announcements.filter((o=>e.every((e=>{return"price"===e.name&&"any"!==e.value?(n=o.offer.price,r=t[e.value][0],a=t[e.value][1],n>=r&&n<=a):String(o.offer[e.name])===String(e.value)||"any"===e.value;var n,r,a}))));window.filteredAnnounements=o,r(o,5)}()}))()}))}))})(),(()=>{const e=document.querySelector("#card").content.querySelector(".map__card"),t=e.querySelector(".popup__photos");function o(e){const o=t.querySelector(".popup__photo"),n=o.cloneNode(!0);return o.src=e,n}const n=()=>{const e=document.querySelector(".map__card.popup");e&&e.remove(),document.removeEventListener("keydown",r)},r=e=>{"Escape"===e.key&&n()};window.getCard=t=>{const a=document.querySelector(".map__card.popup");a&&a.remove();const c=document.createDocumentFragment(),u=document.querySelector(".map__filters-container"),d=document.querySelector(".map"),i=window.filteredAnnounements[t];c.appendChild(function(t){const n=e.cloneNode(!0);return n.querySelector(".popup__title").textContent=t.offer.title,n.querySelector(".popup__text--address").textContent=t.offer.address,n.querySelector(".popup__text--price").textContent=t.offer.price,n.querySelector(".popup__type").textContent=t.offer.type,n.querySelector(".popup__features").textContent=t.offer.features,n.querySelector(".popup__text--capacity").textContent=`${t.offer.rooms} комнаты для ${t.offer.guests} гостей`,n.querySelector(".popup__text--time").textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`,n.querySelector(".popup__description").textContent=t.offer.description,n.querySelector(".popup__avatar").src=t.author.avatar,n.querySelector(".popup__photos").innerHTML="",function(e,t,n){const r=document.createDocumentFragment();for(let n=0;n<t;n++){const t=e.offer.photos[n];r.appendChild(o(t))}n.appendChild(r)}(t,t.offer.photos.length,n.querySelector(".popup__photos")),n}(i)),document.addEventListener("keydown",r),c.querySelector(".popup__close").addEventListener("click",n),d.insertBefore(c,u)}})(),(()=>{const e=document.querySelector("#title"),t=document.querySelector("#price"),o=document.querySelector("#room_number"),n=document.querySelector("#price"),r=document.querySelector("#type"),a=document.querySelector("#timeout"),c=document.querySelector("#timein"),u=document.querySelector(".ad-form__submit"),d=document.querySelector(".ad-form"),i=document.querySelector("#success").content.querySelector(".success"),s=document.querySelector("#error").content.querySelector(".error"),l=document.querySelector(".ad-form__reset"),p={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]};e.addEventListener("input",(function(){let t=e.value.length;t<30?e.setCustomValidity("Ещё "+(30-t)+" симв."):t>100?e.setCustomValidity("Удалите лишние "+(t-100)+" симв."):e.setCustomValidity(""),e.reportValidity()})),t.addEventListener("input",(function(){t.value>1e6?t.setCustomValidity("Сумма может быть не больше 1000000"):t.setCustomValidity(""),t.reportValidity()}));let m=function(){"bungalow"===r.value?(n.setAttribute("min","0"),n.setAttribute("placeholder","0")):"flat"===r.value?(n.setAttribute("min","1000"),n.setAttribute("placeholder","1000")):"house"===r.value?(n.setAttribute("min","5000"),n.setAttribute("placeholder","5000")):"palace"===r.value&&(n.setAttribute("min","10000"),n.setAttribute("placeholder","10000"))};m(),r.addEventListener("change",(()=>{m()})),c.addEventListener("change",(()=>{"12:00"===c.value?a.value="12:00":"13:00"===c.value?a.value="13:00":"14:00"===c.value&&(a.value="14:00")})),a.addEventListener("change",(()=>{"12:00"===a.value?c.value="12:00":"13:00"===a.value?c.value="13:00":"14:00"===a.value&&(c.value="14:00")})),o.addEventListener("change",(()=>{let e=document.querySelector("#room_number").value;Array.from(document.querySelector("#capacity").options).forEach((function(t){p[e].includes(t.value)?(t.removeAttribute("disabled"),t.setAttribute("selected","")):(t.setAttribute("disabled",""),t.removeAttribute("selected"))}))})),document.querySelector("#avatar").setAttribute("accept","image/png, image/jpeg"),document.querySelector("#images").setAttribute("accept","image/png, image/jpeg");const f=()=>{window.disabledSite();const e=i.cloneNode(!0);document.querySelector(".ad-form").appendChild(e),e.addEventListener("click",(()=>{e.remove()})),document.addEventListener("keydown",(t=>{"Escape"===t.key&&e.remove()}))},y=()=>{const e=s.cloneNode(!0);document.querySelector("main").appendChild(e),e.addEventListener("click",(()=>{e.remove()})),document.addEventListener("keydown",(t=>{"Escape"===t.key&&e.remove()}))};u.addEventListener("click",(e=>{e.preventDefault();const t=new FormData(d);window.save(t,f,y)})),l.addEventListener("click",(()=>{d.reset()}))})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector("#avatar"),o=document.querySelector(".ad-form-header__preview img"),n=document.querySelector("#images"),r=document.querySelector(".ad-form__photo img"),a=function(t,o){t.addEventListener("change",(function(){const n=t.files[0],r=n.name.toLowerCase();if(e.some((function(e){return r.endsWith(e)}))){const e=new FileReader;e.addEventListener("load",(function(){o.src=e.result})),e.readAsDataURL(n)}}))};a(t,o),a(n,r)})()})();