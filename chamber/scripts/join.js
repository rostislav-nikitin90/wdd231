const membershipLevelsInfo = [
    {
        coreBenefits: [
            "SEO (Search Engine Optimized) placement in the online chamber business directory on the chamber website",
            "Networking opportunities throughout the year with member prices for programs, meetings and branded events",
            "Referral of the chamber to your business / organization",
            "The ability to post your company announcements in the news for members on the Chamber website and on social media",
            "“Proud Member” Online Certificate",
            "Advertising and sponsorship opportunities (print and online)",
            "Targeting the launch of the Chamber to explore the benefits and get to know other members",
            "Invitations to seminars, trainings and programs designed to keep you updated on key topics, upcoming events and unique opportunities",
            "Possibility to post vacancies on the Board of Employment of the Chamber",
            "Discounts (i.e. Budva Drug Card, Office Depot merchandise, services and certificates of origin)",
            "Ability to post corporate events to the community calendar"
        ],
        membershipLevels: [
            {
                membershipLevelTitle: "Non Profit",
                price: "no fee",
                description: "This membership level is only viable for non-profit organizations or companies with 3 or less employees.",
                benefits: [
                    "One registration to Chamber Launch",
                    "Two registrations for Business After Hours event (participation in the opening of the chamber is required)"
                ]
            },
            {
                membershipLevelTitle: "Bronze",
                price: "€200",
                description: "This membership level is designed to help you increase visibility in the business community.",
                benefits: [
                    "Two registrations for one Business After Hours event",
                    "Two registrations for the Annual Legislative Admission",
                    "Two registrations to Chamber Launch",
                    "Invitation to participate in Chamber committees or working groups (i.e. Small Business Committee, Health Systems Reform, Natural Resources Business Council)",
                    "Invitation to participate in the Business Women Forum",
                    "Expanded website listing in the Chamber's business directory (organization name and contact name, additional category, logo, two keywords, website and map)",
                    "In the spotlight of the members (featured on social media platforms)"
                ]
            },
            {
                membershipLevelTitle: "Silver",
                price: "€400",
                description: "This membership level provides you with strategic networking and access to interact with key decision-makers and peers, learn best practices that drive community development, and includes a wide range of opportunities for enhanced engagement and disclosure.",
                benefits: [
                    "Four registrations to each Business After Hours event",
                    "Four registrations to Annual Legislative Reception",
                    "Two registrations to Chamber Launch",
                    "Invitation to participate in Chamber committees or working groups (i.e. Small Business Committee, Health Systems Reform, Natural Resources Business Council)",
                    "One registration a quarter to a Policy Forum (i.e. Cybersecurity, Workforce, Education, Infrastructure)",
                    "Invitation to Circle of Influence events",
                    "Expanded website listing in the Chamber's business directory",
                    "In the spotlight of the members (featured on social media platforms)"
                ]
            },
            {
                membershipLevelTitle: "Gold",
                price: "€1000",
                description: "This membership level increases your influence among elected officials and access to your customers and peers to help develop policies and positions on key issues affecting the Budva community.",
                benefits: [
                    "Unlimited registrations to each Business After Hours event",
                    "Unlimited registrations to Annual Legislative Reception",
                    "Invitation to participate in Chamber committees or working groups (i.e. Small Business Committee, Health Systems Reform, Natural Resources Business Council)",
                    "Two registrations to each Policy Forum (i.e. Cybersecurity, Workforce, Education, Infrastructure)",
                    "Invitation to Circle of Influence events",
                    "Host CEO Roundtables (space requirements apply)",
                    "Invitation to Business Champion Awards",
                    "Invitation to Business Champion Awards",
                    "Sponsor a Starter Entrepreneur or Nonprofit with Basic Membership Level for One Year",
                    "Prime-positioned website listing in the Chamber's business directory",
                    "In the spotlight of the members (featured on social media platforms)",
                    "Advertising of the company on the website of the Chamber (based on availability)"
                ]
            } 
        ]
    }      
];

// Function to create the modal structure
function createModal() {
    // Get the dialog element
    let modal = document.querySelector("#membershipLevelDetails");

    // Create modal content elements
    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    let closeButton = document.createElement("button");
    closeButton.classList.add("close");
    closeButton.textContent = "✕";

    let modalTitle = document.createElement("h3");
    modalTitle.setAttribute("id", "modalTitle");

    let modalPrice = document.createElement("p");
    modalPrice.setAttribute("id", "modalPrice");

    let modalDescription = document.createElement("p");
    modalDescription.setAttribute("id", "modalDescription");

    let coreBenefitsTitle = document.createElement("h4");
    coreBenefitsTitle.textContent = "Core Benefits";

    let modalCoreBenefits = document.createElement("ul");
    modalCoreBenefits.setAttribute("id", "modalCoreBenefits");

    let membershipBenefitsTitle = document.createElement("h4");
    membershipBenefitsTitle.textContent = "Membership Benefits";

    let modalBenefits = document.createElement("ul");
    modalBenefits.setAttribute("id", "modalBenefits");

    // Append elements to modal content
    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalPrice);
    modalContent.appendChild(modalDescription);
    modalContent.appendChild(coreBenefitsTitle);
    modalContent.appendChild(modalCoreBenefits);
    modalContent.appendChild(membershipBenefitsTitle);
    modalContent.appendChild(modalBenefits);

    // Append modal content to modal
    modal.appendChild(modalContent);

    // Add event listener to close button
    closeButton.addEventListener("click", () => {
        modal.close();
    });

    // Close the modal when the user clicks outside of the modal
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });

    // Close the modal when the user presses the Esc key
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            modal.close();
        }
    });
}

// Call the function to create the modal
createModal();

// Function to create membership level boxes
function createMembershipLevelBox(membershipLevelBoxes) {
    document.querySelector("#membershipLevelsContainer").innerHTML = "";
    membershipLevelBoxes.forEach(membershipLevelBox => {
        if (membershipLevelBox.membershipLevels && Array.isArray(membershipLevelBox.membershipLevels)) {
            membershipLevelBox.membershipLevels.forEach(level => {
                let box = document.createElement("div");
                let membershipLevelName = document.createElement("h3");
                let link = document.createElement("a");
                let text = document.createTextNode("Learn More");

                membershipLevelName.textContent = level.membershipLevelTitle;
                link.setAttribute("href", "#");
                link.appendChild(text);

                // Add click event listener to open modal
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    openModal(level, membershipLevelBox.coreBenefits);
                });

                box.appendChild(membershipLevelName);
                box.appendChild(link);

                document.querySelector("#membershipLevelsContainer").appendChild(box);
            });
        }
    });
}

createMembershipLevelBox(membershipLevelsInfo);

// Function to open the modal with the correct data
function openModal(level, coreBenefits) {
    // Get modal elements
    const modal = document.querySelector("#membershipLevelDetails");
    const modalTitle = document.querySelector("#modalTitle");
    const modalPrice = document.querySelector("#modalPrice");
    const modalDescription = document.querySelector("#modalDescription");
    const modalCoreBenefits = document.querySelector("#modalCoreBenefits");
    const modalBenefits = document.querySelector("#modalBenefits");

    // Set modal content
    modalTitle.textContent = level.membershipLevelTitle;
    modalPrice.innerHTML = `<strong>Price: ${level.price}</strong>`;
    modalDescription.textContent = level.description;

    // Clear and set core benefits
    modalCoreBenefits.innerHTML = "";
    coreBenefits.forEach(benefit => {
        let li = document.createElement("li");
        li.textContent = benefit;
        modalCoreBenefits.appendChild(li);
    });

    // Clear and set membership benefits
    modalBenefits.innerHTML = "";
    level.benefits.forEach(benefit => {
        let li = document.createElement("li");
        li.textContent = benefit;
        modalBenefits.appendChild(li);
    });

    // Display the modal
    modal.showModal();
}

// Set the timestamp value
document.querySelector("#timestamp").value = new Date().toISOString();

