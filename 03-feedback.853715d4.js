!function(){var e=document.querySelector(".feedback-form"),t="feedback-form-state",a=new FormData;function l(e){return"string"==typeof e?JSON.parse(e):JSON.stringify(Object.fromEntries(a.entries()))}e.addEventListener("input",(function(e){var r=e.target;a.set(r.name,r.value);var s=void localStorage.setItem(t,l(a));return _.throttle(s,500),a})),e.addEventListener("submit",(function(e){if(e.preventDefault(),null===a.get("email")||null===a.get("message"))return void window.alert("Please fill in all the fields!");console.log("email: ",a.get("email")),console.log("message: ",a.get("message")),a.delete("email"),a.delete("message"),e.target.reset(),localStorage.removeItem(t)})),function(){var r=localStorage.getItem(t);if(r){var s=l(r);a.set("email",s.email),a.set("message",s.message),e.email.value=a.get("email"),e.message.value=a.get("message")}}()}();
//# sourceMappingURL=03-feedback.853715d4.js.map
