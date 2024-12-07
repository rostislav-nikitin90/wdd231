// Function to display the appropriate message
function displayMessage() {
    const messageText = document.querySelector("#messageText");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentTime = Date.now();

    if (!lastVisit) {
        // First visit
        messageText.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitTime = parseInt(lastVisit, 10);
        const timeDifference = currentTime - lastVisitTime;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (timeDifference < 24 * 60 * 60 * 1000) {
            // Less than a day
            messageText.textContent = "Back so soon! Awesome!";
        } else {
            // More than a day
            messageText.textContent = `You last visited ${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago.`;
        }
    }

    // Update the last visit time
    localStorage.setItem("lastVisit", currentTime.toString());
}

// Function to close the message
function closeMessage() {
    const sidebarMessage = document.querySelector("#timeBetweenPageVisitsMessage");
    sidebarMessage.style.display = "none";
}

// Add event listener to the close button
document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.querySelector(".close-btn");
    closeButton.addEventListener("click", closeMessage);
});

// Call the function to display the message
displayMessage();