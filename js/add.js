let currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
    window.location.href = "index.html";
}

let users = JSON.parse(localStorage.getItem("users")) || [];
let user = users.find(u => u.email === currentUser);

/* ---------- ADD INCOME ---------- */
function addIncome() {
    let amount = Number(document.getElementById("incomeAmount").value);
    let note = document.getElementById("incomeNote").value;
    let date = document.getElementById("incomeDate").value;

    if (!amount || !note || !date) {
        alert("Please fill all fields");
        return;
    }

    user.transactions.push({
        type: "income",
        amount: amount,
        note: note,
        date: date
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Income added successfully!");

    // Clear fields
    document.getElementById("incomeAmount").value = "";
    document.getElementById("incomeNote").value = "";
    document.getElementById("incomeDate").value = "";

    // Close sheet
    closeSheets();
}

/* ---------- ADD EXPENSE ---------- */
function addExpense() {
    let amount = Number(document.getElementById("expenseAmount").value);
    let category = document.getElementById("expenseCategory").value;
    let note = document.getElementById("expenseNote").value;
    let date = document.getElementById("expenseDate").value;

    if (!amount || !category || !date) {
        alert("Please fill all fields");
        return;
    }

    user.transactions.push({
        type: "expense",
        amount: amount,
        category: category,
        note: note,
        date: date
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Expense added successfully!");

    // Clear fields
    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseCategory").value = "";
    document.getElementById("expenseNote").value = "";
    document.getElementById("expenseDate").value = "";

    // Close sheet
    closeSheets();
}

/* ---------- LOGOUT ---------- */
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
