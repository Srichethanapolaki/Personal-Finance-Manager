let currentUser = localStorage.getItem("currentUser");
if (!currentUser) window.location.href = "index.html";

let users = JSON.parse(localStorage.getItem("users"));
let userIndex = users.findIndex(u => u.email === currentUser);

// Clear only transactions
function clearTransactions() {
    if (!confirm("Are you sure you want to delete all transactions?")) return;

    users[userIndex].transactions = [];
    localStorage.setItem("users", JSON.stringify(users));

    alert("All transactions cleared!");
}

// Reset whole account
function resetAccount() {
    if (!confirm("This will delete your entire account. Are you sure?")) return;

    users.splice(userIndex, 1);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("currentUser");

    alert("Account deleted!");
    window.location.href = "index.html";
}

// Logout
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
