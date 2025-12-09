document.getElementById("shufflebutton").addEventListener("click", shuffleWallpaper);
let wallpaperindex = 0;
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