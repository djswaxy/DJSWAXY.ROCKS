const loggedInUser = localStorage.getItem("currentUser");
const loggedInAvatar = localStorage.getItem("currentAvatar");

avatarArray = ["./localresources/accountpicture1", "./localresources/accountpicture2", "./localresources/accountpicture3", "./localresources/accountpicture4", "./localresources/accountpicture5", "./localresources/accountpicture6"];

if(loggedInUser) {
    console.log("Logged in: " + loggedInUser);
    let picIndex = 0;
    if (loggedInAvatar) {
        // Removes "pic" and subtracts 1 to get the array index
        picIndex = parseInt(loggedInAvatar.replace("pic", "")) - 1;
    }
    let loggedInProfilePic = avatarArray[picIndex];

    document.getElementById("UserStatus").innerHTML = `du er <span style="color:red">${loggedInUser}</span>`;
    document.getElementById("IndexPic").innerHTML = `<img src="${loggedInProfilePic}.png" width="64" height="64">`;
    document.getElementById("LogoutButton").innerHTML = "<button onclick='logout()'>LOG OUT</button>"

}
function logout() {

    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentAvatar");

    alert("Logged out!");
    window.location.reload(); // Refresh the page
}