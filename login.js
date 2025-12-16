async function logIn() {
    const username = document.getElementById("UserNameInput").value;
    const password = document.getElementById("PassWordInput").value;

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.status === "ok") {
            // Save to LocalStorage so other pages know we are logged in
            localStorage.setItem("currentUser", result.username);
            localStorage.setItem("currentAvatar", result.avatar);
            localStorage.setItem("FavColor", result.color);

            alert("Du er logget ind, " + result.username + "!");
            window.location.href = "index.html"; // Redirect to home
        } else {
            alert("Login failed: " + result.message);
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert("Something went wrong with the server.");
    }
}