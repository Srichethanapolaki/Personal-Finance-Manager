let users = JSON.parse(localStorage.getItem("users")) || [];

function register() {
    let email = regEmail.value;
    let password = regPassword.value;

    if (!email || !password) return alert("Fill all fields");

    if (users.find(u => u.email === email)) {
        alert("User already exists");
        return;
    }

    users.push({
        email,
        password,
        transactions: []
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfully!");
    window.location.href = "index.html";
}

function login() {
    let email = loginEmail.value;
    let password = loginPassword.value;

    let user = users.find(u => u.email === email && u.password === password);
    if (!user) return alert("Invalid login");

    localStorage.setItem("currentUser", email);
    window.location.href = "dashboard.html";
}
