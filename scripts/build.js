var versionTag = "Archipelago Web Client v0.4.3 Build 20231010";

document.getElementById('buildText').innerHTML = versionTag;

document.getElementById('changelog').innerHTML = `<h3>Changes to ` + versionTag + `</h3>
<ul>
<li>Fixed issue where clicking _Manual_Game_Complete_ wouldn't mark all checks as found.</li>
<li>Fixed issue where items other player found for player connected wouldn't display properly.</li>
</ul>
<h4>Upcoming Changes</h4>
<ul>
<li>Further formatting to clean up the appearance</li>
<li>Chat function</li>
<li>Hint Tracking</li>
</ul>`

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function changeLog() {
    modal.style.display = "block";
}