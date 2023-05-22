const root = document.querySelector(":root");

function lightsOn() {
    root.style.setProperty("--base-color", "#000000");
    root.style.setProperty("--background-color", "#F7F7F7");
    root.style.setProperty("--secondary-color", "#606470");
    root.style.setProperty("--text-color", "#FFFFFF");
}

function lightsOff() {}
