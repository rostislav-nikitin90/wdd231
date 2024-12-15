document.addEventListener("DOMContentLoaded", () => {
    const attractionsContainer = document.querySelector("#budvaAttractionsContainer");
    const url = "../finalproject/data/attractions.json";

    async function fetchAttractions() {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }
        const attractions = await response.json();
        if (!Array.isArray(attractions)) {
            console.error("Fetched data is not an array");
            return;
        }
        displayAttractions(attractions);
    }

    function displayAttractions(attractions) {
        attractionsContainer.innerHTML = "";
        attractions.forEach(attraction => {
	        // Create the main div element
            let budvaAttractionBox = document.createElement("div");
	        budvaAttractionBox.classList.add("budva-attraction-box");

	        // Create the h3 element
            let name = document.createElement("h3");
	        name.textContent = attraction.name;
	        name.classList.add("budva-attraction-heading");
	
	        // Create the picture element
	        let picture = document.createElement("picture");
	        picture.setAttribute("id", "budvaAttractionPhoto");

	        // Create the source elements
	        let sourceLarge = document.createElement("source");
	        sourceLarge.setAttribute("media", "(min-width: 1025px)");
	        sourceLarge.setAttribute("srcset", `${attraction.image.desktop}`);

	        let sourceMedium = document.createElement("source");
	        sourceMedium.setAttribute("media", "(min-width: 768px)");
	        sourceMedium.setAttribute("srcset", `${attraction.image.tablet}`);

	        // Create the img element
	        let img = document.createElement("img");

	        img.setAttribute("src", attraction.image.mobile);
	        img.setAttribute("alt", `${attraction.name}`);
	        img.setAttribute("loading", "lazy");

	        // Append the source and img elements to the picture element
	        picture.appendChild(sourceLarge);
	        picture.appendChild(sourceMedium);
	        picture.appendChild(img);

	        // Append the heading and picture elements to the div
            budvaAttractionBox.appendChild(name);
	        budvaAttractionBox.appendChild(picture);

            attractionsContainer.appendChild(budvaAttractionBox);

            budvaAttractionBox.addEventListener("click", () => {
                displayAttractionDetails(attraction);
            });
        });
    }

    fetchAttractions();

    const attractionDetails = document.querySelector("#attractionDetails");

    function displayAttractionDetails(attraction) {
        attractionDetails.innerHTML = "";
        attractionDetails.innerHTML = `
        <div id="modalContainer"><button id="closeModal">✕</button>
        <h3 id="modalTitle">${attraction.name}</h3>
        <img src="${attraction.image.mobile}" id="modalImage" alt="${attraction.name}" loading="lazy">
        <p id="modalDescription">${attraction.description}</p>
        <a href="${attraction.location}" id="modalLink" target="_blank">Show on Map</a></div>
        `;
        attractionDetails.showModal();

        const closeModal = document.querySelector("#closeModal");
        closeModal.addEventListener("click", () => {
        attractionDetails.close();
        });

        // Add event listener to close modal when clicking outside of it
        window.addEventListener("click", (event) => {
            if (event.target === attractionDetails) {
                attractionDetails.close();
            }
        });
    }
});