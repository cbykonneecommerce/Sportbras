/**
 * We Onnee - 2/8/2022 - 19:44
 * License: ISC
 * Gerado em 2022
 */

!function(){function n(){if("#/shipping"===window.location.hash){const n=$("input#ship-complement");if(n.length){n.prop("placeholder","Complemento");const e=$("button#btn-go-to-payment");""===n.val()&&(n.css("border","1px solid red"),e.prop("disabled",!0)),$("p.input.ship-complement").addClass("required"),n.on("input",(function(){""===n.val()?(n.css("border","1px solid red"),e.prop("disabled",!0)):(n.css("border","2px solid #e0e0e0"),e.prop("disabled",!1))}))}}}$(window).on("ready hashchange",(function(){const n=window.location.hash.replace("#/",""),e=[{name:"cart"},{name:"profile"},{name:"shipping"},{name:"payment"}],o=e.findIndex((e=>e.name===n));function a(n){$(`#${n}`).addClass("active"),$(`#${n} + span`).addClass("active")}function i(n){$(`#${n}`).removeClass("active"),$(`#${n} + span`).removeClass("active")}e.forEach(((n,e)=>{e<o?a(n.name):e>o&&i(n.name),e===o&&($(`#${n.name}`).addClass("active"),$(`#${n.name} + span`).removeClass("active"))}))})),$(window).on("orderFormUpdated.vtex",(function(e,o){n()})),$(window).on("ready hashchange",(function(){n()}))}(),$(document).ready((function(){setTimeout((()=>{const n="<a href='/' id='go-back-link'>Escolher mais produtos</a>";$(".coupon.summary-coupon").prepend(n),$("div#shipping-preview-container").prepend(n)}),3e3)}));