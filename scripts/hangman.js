var password = words[Math.floor(Math.random() * words.length)];
password = password.toUpperCase();

var length = password.length;
var password2 = "";
var misses = 0;

var yes = new Audio("sounds/yes.wav");
var no = new Audio("sounds/no.wav");

for (i = 0; i < length; i++) {
    if (password.charAt(i) == ' ') password2 = password2 + " ";
    else password2 += "-";
}

function write_password() {
    document.getElementById("phrase").innerHTML = password2;
}

window.onload = init;

function init() {
    var divv = "";

    for (i = 0; i < 26; i++) {
        var element = "let" + i;
        divv = divv + '<div class="letter" onclick="check(' + i + ')" id="' + element + '">' + String.fromCharCode(65 + i) + '</div>';
        if ((i + 1) % 7 == 0) divv += '<div style = "clear:both;"></div>'

    }

    document.getElementById("alphabet").innerHTML = divv;
    write_password();
}

String.prototype.setChar = function (place, char) {
    if (place > this.length - 1) return this.toString();
    else return this.substr(0, place) + char + this.substr(place + 1);
}

function check(letter_index) {
    var hit = false;
    for (i = 0; i < length; i++) {
        if (password.charAt(i) == String.fromCharCode(65 + letter_index)) {
            password2 = password2.setChar(i, String.fromCharCode(65 + letter_index));
            hit = true;
        }
    }
    if (hit == true) {
        yes.play();
        var element = "let" + letter_index;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";
        write_password();
    }
    else {
        no.play();
        var element = "let" + letter_index;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");
        misses++;
        var pic = "images/s" + misses + ".jpg";
        document.getElementById("gallows").innerHTML = '<img src="' + pic + '"alt = ""/>';
    }
    if (password == password2)
        document.getElementById("alphabet").innerHTML = "YOU WON! Correct password is: " + password +
            '<br/><br/><span class="reset" onclick="location.reload()">AGAIN?</span>';

    if (misses >= 9)
        document.getElementById("alphabet").innerHTML = "YOU LOST! Correct password is: " + password +
            '<br/><br/><span class="reset" onclick="location.reload()">AGAIN?</span>';
}