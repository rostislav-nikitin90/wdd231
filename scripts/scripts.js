const currentUrl = window.location.href;

// Divide the url into two halves
const everything = currentUrl.split("?");

// Grab just second half
let formData = everything[1].split("&");

function show(i) {
    formData.forEach((element) => {
        if (element.startsWith(i)) {
            result = element.split("=")[1].replace("%40","@")
        }
    });
    return(result)
}

const showInfo = document.querySelector("#results");
showInfo.innerHTML = `
<p>Appointment for ${show("first")} ${show("last")}</p>
<p>Proxy ${show("ordinance")} on ${show("fecha")} in the ${show("location")} Temple. </p>
<p>Your Phone: ${show("phone")}</p>
<p>Your Email: <a href="mailto:${show("email")}">${show("email")}</a></p>`;

