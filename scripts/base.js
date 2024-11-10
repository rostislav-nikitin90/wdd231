const hamButton = document.querySelector("#menuButton");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
	navigation.classList.toggle("open");
	hamButton.classList.toggle("open");
});

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