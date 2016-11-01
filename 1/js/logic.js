/**
 * Created by storm2513 on 01.11.16.
 */
class User {
    constructor(fname, lname, age, email, imgURL) {
        this.fname = fname;
        this.lname = lname;
        this.age = age;
        this.email = email;
        this.imgURL = imgURL;
    }

    print() {
        return '<img src=\"' + this.imgURL + '\" align="left" /><br>' +
            "First name: " + this.fname + "<br>Last name: " + "<br>Age: " + this.age + "<br><hr>Email: " + this.email;
        console.log('<img src=\"' + this.email + '\" align="left" /><br>');
    }
}


var arrUser = [];

function btnSendClick(){
    let data = {};
    data.fname = document.getElementById("fname").value;
    data.lname = document.getElementById("lname").value;
    data.age = document.getElementById("age").value;
    data.email = document.getElementById("email").value;
    data.imgURL = document.getElementById("imgURL").value;

    if(data.fname != "" && data.lname != "" && data.age > 0 && data.age < 125) {
        let objUser = new User(data.fname, data.lname, data.age, data.email, data.imgURL);
        arrUser.push(objUser);
        objUser.print();
    }
    else document.getElementById("status").innerHTML = "Input error";
}

function clearPage(){
    document.body.innerHTML = "";
}

function savePage(){
    savedState = document.body.innerHTML;
}

var savedState;
function btnPrintClick(){
    if (arrUser.length == 0) {
        document.getElementById("status").innerHTML = "There are no users :(";
        return
    }
    clearPage();
    let body = document.body;
    let contents = "<div>\n";
    contents += '<button onclick="btnBack()">Back</button>';
    for (let i = 0; i < arrUser.length; i++){
        contents += "<p>"  + arrUser[i].print() + "</p>\n";
    }
    contents += "</div>";
    body.innerHTML = contents
}

function btnBack(){
    document.body.innerHTML = savedState;
}