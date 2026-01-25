let currentUser = localStorage.getItem("currentUser");
if (!currentUser) window.location.href = "index.html";

let users = JSON.parse(localStorage.getItem("users")) || [];
let user = users.find(u => u.email === currentUser);

document.getElementById("welcome").innerText = "Welcome, " + user.email;

let incomeSpan = document.getElementById("income");
let expenseSpan = document.getElementById("expense");
let balanceSpan = document.getElementById("balance");
let list = document.getElementById("list");

function updateDashboard() {
    let income = 0;
    let expense = 0;

    user.transactions.forEach(t => {
        if (t.type === "income") income += Number(t.amount);
        if (t.type === "expense") expense += Number(t.amount);
    });

    animateNumber(incomeSpan, income);
    animateNumber(expenseSpan, expense);
    animateNumber(balanceSpan, income - expense);

    renderList();
}

/* -------- Animate Numbers -------- */
function animateNumber(element, target) {
    let start = 0;
    let duration = 600;
    let startTime = null;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let percent = Math.min(progress / duration, 1);

        let value = Math.floor(start + percent * target);
        element.innerText = "₹" + value;

        if (percent < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

/* -------- Render List -------- */
function renderList() {
    list.innerHTML = "";

    user.transactions.slice().reverse().forEach((t, i) => {
        let li = document.createElement("li");

        let text = "";
        if (t.type === "expense") {
            text = `EXPENSE: ₹${t.amount} - ${t.category || ""} - ${t.note || ""}`;
        } else {
            text = `INCOME: ₹${t.amount} - ${t.note || ""}`;
        }

        li.innerHTML = `
            <span>${text}</span>
            <button onclick="deleteTx(${i})">🗑️</button>
        `;

        list.appendChild(li);
    });
}

/* -------- Delete Transaction -------- */
function deleteTx(i) {
    let realIndex = user.transactions.length - 1 - i;
    user.transactions.splice(realIndex, 1);
    localStorage.setItem("users", JSON.stringify(users));
    updateDashboard();
}

/* -------- Logout -------- */
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

updateDashboard();


