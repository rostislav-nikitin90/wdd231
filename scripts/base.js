const hamButton = document.querySelector("#menuButton");
const navigation = document.querySelector(".navigation");
const weatherLocation = document.querySelector("#weatherPlace")
const currentTemp = document.querySelector("#currentTemp");
const weatherIcon = document.querySelector("#weatherIcon");
const weatherDesc = document.querySelector("#weatherDescription");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=42.29157919378453&lon=18.840046948534674&units=metric&appid=12f91a41bd21c1ca9341109b7e228eab";

hamButton.addEventListener("click", () => {
	navigation.classList.toggle("open");
	hamButton.classList.toggle("open");
});

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
}
  
apiFetch();

function displayResults(data) {
  let location = data.name; 
  weatherLocation.textContent = `${location}`;
  currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", data.weather[0].description);
  weatherIcon.setAttribute("loading", "lazy");
  weatherDesc.textContent = `${desc}`;
}

const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
        technology: [
            "Python"
        ],
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
        technology: [
            "HTML",
            "CSS"
        ],
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
        technology: [
            "Python"
        ],
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
        technology: [
            "C#"
        ],
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
        technology: [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Frontend Web Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
        technology: [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        completed: false
    }
];

function createCourseBox(filteredCourses) {
    document.querySelector("#coursesContainer").innerHTML = "";
    filteredCourses.forEach(course => {
        let box = document.createElement("div");
        box.classList.add("course-box");
        let name = document.createElement("p");
        name.classList.add("course-name");
        if (course.completed) {
            box.classList.add("completed");
            name.classList.add("completed-text-white");
        }
        name.innerHTML = `<span>${course.subject} ${course.number}</span>`;

        box.appendChild(name);

        document.querySelector("#coursesContainer").appendChild(box);

        box.addEventListener("click", () => {
            displayCourseDetails(course);
        });
    });
}

function calculateTotalCreditsAllCourses(courseList) {
    return courseList
    .reduce((total, course) => total + course.credits, 0); // Sum up the credits
}

createCourseBox(courses);

const totalCredits = calculateTotalCreditsAllCourses(courses);
document.querySelector(".credits-info").innerHTML = `<span>Total credits:</span><span> ${totalCredits}</span>`;

const allcoursesbtn = document.querySelector("#allCoursesBtn");
const csecoursesbtn = document.querySelector("#cseCoursesBtn");
const wddcoursesbtn = document.querySelector("#wddCoursesBtn");

allcoursesbtn.addEventListener("click", () => {
    createCourseBox(courses);
    document.querySelector(".credits-info").innerHTML = `<span>Total credits:</span><span> ${totalCredits}</span>`;
    allcoursesbtn.classList.add("courses-btn-dark-brown-bg-color");
    csecoursesbtn.classList.add("courses-btn-default-bg-color");
    csecoursesbtn.classList.remove("courses-btn-dark-brown-bg-color");
    wddcoursesbtn.classList.add("courses-btn-default-bg-color");
    wddcoursesbtn.classList.remove("courses-btn-dark-brown-bg-color");
});

csecoursesbtn.addEventListener("click", () => {
    function calculateTotalCreditsCseCourses(cseCourseList) {
        return cseCourseList
        .filter(course => course.subject.includes("CSE"))
        .reduce((total, course) => total + course.credits, 0); // Sum up the credits 
    }
    createCourseBox(courses.filter(course => course.subject.includes("CSE")));
    const totalCreditsCseCourses = calculateTotalCreditsCseCourses(courses);
    document.querySelector(".credits-info").innerHTML = `<span>Total credits:</span><span> ${totalCreditsCseCourses}</span>`;
    csecoursesbtn.classList.add("courses-btn-dark-brown-bg-color");
    csecoursesbtn.classList.remove("courses-btn-default-bg-color");
    allcoursesbtn.classList.add("courses-btn-default-bg-color");
    allcoursesbtn.classList.remove("courses-btn-dark-brown-bg-color");
    wddcoursesbtn.classList.add("courses-btn-default-bg-color");
    wddcoursesbtn.classList.remove("courses-btn-dark-brown-bg-color");
});

wddcoursesbtn.addEventListener("click", () => {
    function calculateTotalCreditsWddCourses(wddCourseList) {
        return wddCourseList
        .filter(course => course.subject.includes("WDD"))
        .reduce((total, course) => total + course.credits, 0); // Sum up the credits 
    }
    createCourseBox(courses.filter(course => course.subject.includes("WDD")));
    const totalCreditsWddCourses = calculateTotalCreditsWddCourses(courses);
    document.querySelector(".credits-info").innerHTML = `<span>Total credits:</span><span> ${totalCreditsWddCourses}</span>`;
    wddcoursesbtn.classList.add("courses-btn-dark-brown-bg-color");
    wddcoursesbtn.classList.remove("courses-btn-default-bg-color");
    allcoursesbtn.classList.add("courses-btn-default-bg-color");
    allcoursesbtn.classList.remove("courses-btn-dark-brown-bg-color");
    csecoursesbtn.classList.add("courses-btn-default-bg-color");
    csecoursesbtn.classList.remove("courses-btn-dark-brown-bg-color");
});

const courseDetails = document.querySelector("#courseDetails");

function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
    <button id="closeModal">✕</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
     `;
    courseDetails.showModal();

    const closeModal = document.querySelector("#closeModal");
    closeModal.addEventListener("click", () => {
    courseDetails.close();
    });
}