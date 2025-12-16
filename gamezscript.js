

document.getElementById("shufflebutton").addEventListener("click", shuffleWallpaper);
let wallpaperindex = 0;
if (localStorage.getItem("currentUser")) {
    // Optional: Alert them so they know why they were redirected
    alert("You are already logged in! Redirecting to home...");

    // 2. Redirect to index.html (or coolrocks.html)
    window.location.href = "index.html";
}
function shuffleWallpaper() {
    wallpaperindex++;
    const wallpapersarray = ["url(localresources/pixelartwallpaper1.png)","url(localresources/pixelartwallpaper2.png)","url(localresources/pixelartwallpaper3.jpg)","url(localresources/pixelartwallpaper4.jpg)"]
    if (wallpaperindex >= wallpapersarray.length) {
        wallpaperindex = 0;
    }
    document.body.style.backgroundImage = wallpapersarray[wallpaperindex];
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";

}
async function register() {
    const username = document.getElementById("UserNameInput").value;
    const password = document.getElementById("PassWordInput").value;
    const favcolor = document.getElementById("ColorInput").value;
    const selectedAvatar = document.querySelector('input[name="avatar"]:checked');

    if (!username || !password || !selectedAvatar || !favcolor) {
        alert("Behøver billede, brugernavn og passord! + favourittfarge")
        return;
    }
    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password,
            avatar: selectedAvatar.value, // This will be "pic1", "pic2", etc.
            color: favcolor
        })
    });
    const result = await response.json();

    if (result.status === "ok") {
        alert("Bruger lavet :P    :3    >:-) .");
        // Optional: clear inputs
        document.getElementById("UserNameInput").value = "";
        document.getElementById("PassWordInput").value = "";
        localStorage.setItem("currentUser", username);
        localStorage.setItem("currentAvatar", selectedAvatar.value);
        localStorage.setItem("FavColor",favcolor)
    } else {
        alert("Username Taken :( or something went wrong)");
    }
}