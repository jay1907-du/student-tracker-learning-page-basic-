function showAttendance() {
    document.getElementById("attendanceBox").style.display = "block";
}

function checkAttendance() {
    const days = document.querySelectorAll(".day");
    let present = 0;

    days.forEach(function(day) {
        if (day.checked) {
            present++;
        }
    });

    const percentage = (present / days.length) * 100;

    document.getElementById("attendanceResult").innerText =
        "Attendance: " + percentage + "% (" +
        present + " out of " + days.length + " days)";
}

function showClasswork() {
    document.getElementById("classworkBox").style.display = "block";
}

function addClasswork() {
    const className = document.getElementById("className").value.trim();
    const subjectName = document.getElementById("subjectName").value.trim();
    const chapterName = document.getElementById("chapter Name").value.trim();

    if (!className || !subjectName || !chapterName) {
        alert("Please fill in all details!");
        return;
    }

    const result = document.getElementById("classworkResult");
    const item = document.createElement("p");

    item.textContent =
        "Class: " + className +
        " | Subject: " + subjectName +
        " | chapter: " + chapterName;

    result.appendChild(item);

    document.getElementById("subjectName").value = "";
    document.getElementById("chapterName").value = "";
}

function showSyllabus() {
    document.getElementById("syllabusBox").style.display = "block";
}
const syllabusSubjects = {
    "1": ["Hindi", "English", "Mathematics"],
    "2": ["Hindi", "English", "Mathematics"],
    "3": ["Hindi", "English", "Mathematics", "EVS"],
    "4": ["Hindi", "English", "Mathematics", "EVS"],
    "5": ["Hindi", "English", "Mathematics", "EVS"],
    "6": ["Hindi", "English", "Mathematics", "Science", "Social Science"],
    "7": ["Hindi", "English", "Mathematics", "Science", "Social Science"],
    "8": ["Hindi", "English", "Mathematics", "Science", "Social Science"],
    "9": ["Hindi", "English", "Mathematics", "Science", "Social Science"],
    "10": ["Hindi", "English", "Mathematics", "Science", "Social Science"],
    "11": ["Hindi", "English", "Physics", "Chemistry", "Mathematics", "Biology", "History", "Geography", "Economics"],
    "12": ["Hindi", "English", "Physics", "Chemistry", "Mathematics", "Biology", "History", "Geography", "Economics"]
};
/* ===== STUDENT HOMEWORK ===== */

// Load homework saved in the browser
let homeworkItems = [];

try {
    const saved = localStorage.getItem("studentHomework");
    homeworkItems = saved ? JSON.parse(saved) : [];

    if (!Array.isArray(homeworkItems)) {
        homeworkItems = [];
    }
} catch (error) {
    homeworkItems = [];
}

// Open homework section
function showHomework() {
    document.getElementById("homeworkBox").style.display = "block";
    displayHomework();
}

// Save homework in localStorage
function saveHomeworkData() {
    try {
        localStorage.setItem(
            "studentHomework",
            JSON.stringify(homeworkItems)
        );
        return true;
    } catch (error) {
        alert("Homework save nahi hua. Browser storage check karo.");
        return false;
    }
}

// Add new homework
function addHomework() {
    const subject = document.getElementById("homeworkSubject")
        .value.trim();

    const details = document.getElementById("homeworkText")
        .value.trim();

    const dueDate = document.getElementById("homeworkDueDate").value;

    if (subject === "" || details === "") {
        alert("Subject aur homework details dono bharo.");
        return;
    }

    const homework = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        subject: subject,
        details: details,
        dueDate: dueDate,
        completed: false
    };

    homeworkItems.push(homework);

    if (!saveHomeworkData()) {
        homeworkItems.pop();
        return;
    }

    document.getElementById("homeworkSubject").value = "";
    document.getElementById("homeworkText").value = "";
    document.getElementById("homeworkDueDate").value = "";

    displayHomework();
}

// Display homework list
function displayHomework() {
    const list = document.getElementById("homeworkList");
    const summary = document.getElementById("homeworkSummary");

    list.replaceChildren();

    const completed = homeworkItems.filter(
        item => item.completed
    ).length;

    summary.textContent =
        "Total: " + homeworkItems.length +
        " | Completed: " + completed +
        " | Pending: " + (homeworkItems.length - completed);

    if (homeworkItems.length === 0) {
        summary.textContent = "No homework added yet.";
        return;
    }

    homeworkItems.forEach(function(item) {
        const card = document.createElement("div");

        card.style.backgroundColor = "#ffffff";
        card.style.border = "1px solid #cccccc";
        card.style.borderRadius = "8px";
        card.style.padding = "12px";
        card.style.marginBottom = "12px";

        const heading = document.createElement("h3");
        heading.textContent = item.subject;
        card.appendChild(heading);

        const details = document.createElement("p");
        details.textContent = item.details;
        card.appendChild(details);

        const date = document.createElement("p");
        date.textContent = item.dueDate ?
            "Due date: " + item.dueDate :
            "Due date: Not set";
        card.appendChild(date);

        const status = document.createElement("p");
        status.textContent = item.completed ?
            "Status: Completed" :
            "Status: Pending";
        card.appendChild(status);

        const label = document.createElement("label");
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = item.completed;

        checkbox.addEventListener("change", function() {
            const oldValue = item.completed;
            item.completed = checkbox.checked;

            if (!saveHomeworkData()) {
                item.completed = oldValue;
            }

            displayHomework();
        });

        label.appendChild(checkbox);
        label.appendChild(
            document.createTextNode(" Mark as completed")
        );
        card.appendChild(label);

        card.appendChild(document.createElement("br"));
        card.appendChild(document.createElement("br"));

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete Homework";

        deleteButton.addEventListener("click", function() {
            const oldItems = homeworkItems;

            homeworkItems = homeworkItems.filter(
                homework => homework.id !== item.id
            );

            if (!saveHomeworkData()) {
                homeworkItems = oldItems;
            }

            displayHomework();
        });

        card.appendChild(deleteButton);
        list.appendChild(card);
    });
}

// Show saved homework on page load
displayHomework();