// Get the current URL
const currentUrl = window.location.href;

// Divide the URL into two halves
const everything = currentUrl.split("?");

// Check if there are query parameters
if (everything.length > 1) {
    // Grab just the second half
    let formData = everything[1].split("&");

    function show(i) {
        let result = "";
        formData.forEach((element) => {
            if (element.startsWith(i)) {
                result = decodeURIComponent(element.split("=")[1].replace("+"," "));
            }
        });
        return result;
    }

    const showInfo = document.querySelector("#submittedFormData");
    showInfo.innerHTML = `
    <h3>Submitted Form Data:</h3>
    <p><strong>New Member:</strong> ${show("first-name")} ${show("last-name")}</p>
    <p><strong>Email:</strong> <a href="mailto:${show("email")}">${show("email")}</a></p>
    <p><strong>Phone:</strong> ${show("mobile-phone")}</p>
    <p><strong>Business Name:</strong> ${show("organization")}</p>
    <p><strong>Selected Membership Level:</strong> ${show("membership-level")}</p>
    <p><strong>Form Data Submitted:</strong> ${show("timestamp")}</p>`;
} else {
    console.error("No query parameters found in the URL.");
}