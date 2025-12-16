const loggedInUser = localStorage.getItem("currentUser");
const loggedInAvatar = localStorage.getItem("currentAvatar");
const FavColor = localStorage.getItem("FavColor")

avatarArray = ["./localresources/accountpicture1", "./localresources/accountpicture2", "./localresources/accountpicture3", "./localresources/accountpicture4", "./localresources/accountpicture5", "./localresources/accountpicture6"];

if(loggedInUser) {
    console.log("Logged in: " + loggedInUser);


    let picIndex = 0;
    if (loggedInAvatar) {
        // Removes "pic" and subtracts 1 to get the array index
        picIndex = parseInt(loggedInAvatar.replace("pic", "")) - 1;
    }
    let loggedInProfilePic = avatarArray[picIndex];

    document.getElementById("GuestUserTextAndBtn").innerHTML = `
            <a href="#">Hei ${loggedInUser}!</a> 
            <button id="GuestUserBtn" style="background-color: red; color:white;" onclick="logout()">LOG OUT</button>
            <img src="${loggedInProfilePic}.png" width="32" height="32">
        `;




    document.getElementById("chatinput").placeholder = "Type a message now!";
}
/*if (!loggedInUser) {
    document.getElementById("LogOutOrInButton").innerHTML = `<button style='background-color: greenyellow' onclick="location.href='login.html'">LOG IN</button>`;

}*/
function logout() {

    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentAvatar");

    alert("Logged out!");
    window.location.reload(); // Refresh the page
}