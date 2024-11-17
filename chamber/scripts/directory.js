document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("membersContainer");
    const gridViewButton = document.getElementById("gridView");
    const listViewButton = document.getElementById("listView");
    const url = "../chamber/data/members.json";

    async function fetchMembers() {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }
        const members = await response.json();
        if (!Array.isArray(members)) {
            console.error("Fetched data is not an array");
            return;
        }
        displayMembers(members);
    }

    function displayMembers(members) {
        membersContainer.innerHTML = "";
        const isListView = membersContainer.classList.contains("list");
        if (isListView) {
            const ul = document.createElement("ul");
            members.forEach(member => {
                const li = document.createElement("li");
                li.classList.add("member");
                li.innerHTML = `
                    <h2>${member.name}</h2>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
		            <p>${member.email}</p>
                    <a href="${member.website}" target="_blank">${member.website}</a>
                    <p>Membership Level: ${member.membership_level}</p>
                `;
                ul.appendChild(li);
            });
            membersContainer.appendChild(ul);
        } else {
            members.forEach(member => {
                const memberDiv = document.createElement("div");
                memberDiv.classList.add("member");
                memberDiv.innerHTML = `
                    <img src="${member.image}" alt="${member.name}" loading="lazy">
                    <h2>${member.name}</h2>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
		            <p>${member.email}</p>
                    <a href="${member.website}" target="_blank">${member.website}</a>
                    <p>Membership Level: ${member.membership_level}</p>
                `;
                membersContainer.appendChild(memberDiv);
            });
        }
    }

    gridViewButton.addEventListener("click", () => {
        gridViewButton.classList.add("members-btn-teal-bg-color");
        gridViewButton.classList.add("members-btn-white-font-color");
        listViewButton.classList.add("members-btn-default-bg-color");
        listViewButton.classList.remove("members-btn-teal-bg-color");
        listViewButton.classList.add("members-btn-default-font-color");
        listViewButton.classList.remove("members-btn-white-font-color");
        membersContainer.classList.add("grid");
        membersContainer.classList.remove("list");
        fetchMembers();
    });

    listViewButton.addEventListener("click", () => {
        listViewButton.classList.add("members-btn-teal-bg-color");
        listViewButton.classList.remove("members-btn-default-bg-color");
        listViewButton.classList.add("members-btn-white-font-color");
        listViewButton.classList.remove("members-btn-default-font-color");
        gridViewButton.classList.add("members-btn-default-bg-color");
        gridViewButton.classList.remove("members-btn-teal-bg-color");
        gridViewButton.classList.add("members-btn-default-font-color");
        gridViewButton.classList.remove("members-btn-white-font-color");
        membersContainer.classList.add("list");
        membersContainer.classList.remove("grid");
        fetchMembers();
    });

    fetchMembers();
});