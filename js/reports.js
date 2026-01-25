alert("Reports JS Loaded");

let currentUser = localStorage.getItem("currentUser");
if (!currentUser) window.location.href = "index.html";

let users = JSON.parse(localStorage.getItem("users")) || [];
let user = users.find(u => u.email === currentUser);

if (!user || !user.transactions || user.transactions.length === 0) {
    alert("No data found. Please add income/expense first.");
}

/* -------- BAR CHART (Income vs Expense) -------- */
let income = 0;
let expense = 0;

user.transactions.forEach(t => {
    if (t.type === "income") income += Number(t.amount);
    if (t.type === "expense") expense += Number(t.amount);
});

let barCtx = document.getElementById("barChart").getContext("2d");

new Chart(barCtx, {
    type: "bar",
    data: {
        labels: ["Income", "Expense"],
        datasets: [{
            label: "Amount",
            data: [income, expense],
            backgroundColor: ["#22c55e", "#ef4444"]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

/* -------- PIE CHART (Category-wise) -------- */
let catMap = {};

user.transactions.forEach(t => {
    if (t.type === "expense" && t.category) {
        if (!catMap[t.category]) catMap[t.category] = 0;
        catMap[t.category] += Number(t.amount);
    }
});

let labels = Object.keys(catMap);
let values = Object.values(catMap);

let pieCtx = document.getElementById("pieChart").getContext("2d");

if (labels.length > 0) {
    new Chart(pieCtx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
