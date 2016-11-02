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
        $color = "white";
        changeBackground($color);
        return '<div id="imgDiv" align="left"><img align="right" height="220px" src="' + this.imgURL + '"></div>' +
            '<div id="infoDiv" align="right"><p>First name: ' + this.fname + '</p><p>Last name: ' + this.lname + '</p><p>Age: ' + this.age + '</p><hr><p>Email: ' + this.email + '</p></div>';
    }
}
var $color = "darkorange";
var arrUser = [];

function changeBackground(color) {
    document.body.style.background = color;
}

function checkName(name){
    return name.match(/([A-я]+[,.]?[ ]?|[A-я]+['-]?)+$/) != null;
}

function checkAge(age){
    return !isNaN(parseFloat(age)) && isFinite(age) && age > 0 && age <= 125 && age % 1 === 0;
}

function checkEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function checkImgURL(imgURL){
    return imgURL.match(/(https?:\/\/.*\.(?:png|jpg|jpeg|ico|gif))/) != null;
}

function checkAll(fname, lname, age, email, imgURL){
    if (!(checkName(fname) && checkName(lname))) {
        document.getElementById("status").innerHTML = "First/Last name error. User wasn't added";
        return false;
    }
    if(!checkAge(age)){
        document.getElementById("status").innerHTML = "Age error. User wasn't added";
        return false;
    }
    if(!checkEmail(email)){
        document.getElementById("status").innerHTML = "E-mail error. User wasn't added";
        return false;
    }
    if(!checkImgURL(imgURL)){
        document.getElementById("status").innerHTML = "Image URL error. User wasn't added";
        return false;
    }
    return true;
}

function btnSendClick() {
    let data = {};
    data.fname = document.getElementById("fname").value;
    data.lname = document.getElementById("lname").value;
    data.age = document.getElementById("age").value;
    data.email = document.getElementById("email").value;
    data.imgURL = document.getElementById("imgURL").value;
    if(!checkAll(data.fname, data.lname, data.age, data.email, data.imgURL))
        return;
    let objUser = new User(data.fname, data.lname, data.age, data.email, data.imgURL);
    arrUser.push(objUser);
    document.getElementById("status").innerHTML = "User was added";
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("email").value = "";
    document.getElementById("imgURL").value = "";
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
    let contents = '<div id="content">\n';
    contents += '<button id="back" onclick="btnBack()">Back</button>';
    for (let i = 0; i < arrUser.length; i++){
        contents += "<p>"  + arrUser[i].print() + "</p>\n";
    }
    contents += "</div>";
    body.innerHTML = contents;
}

function btnBack(){
    $color = "darkorange";
    changeBackground($color);
    document.body.innerHTML = savedState;
}
