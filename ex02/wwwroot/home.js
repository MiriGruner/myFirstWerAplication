
////I recommend to change the project name to webApiShopSite or ShopSite etc. 


const login = async () => {        
    try {
        //loginUserName,loginPassword,url - By convention, JavaScript variable names start with camelCase.

        const LoginUserName = document.getElementById("LoginUserName").value
        const LoginPassword = document.getElementById("Password").value
        var URL = 'api/RegisterAndLogin' + "?" + "userName=" + LoginUserName + "&password=" + LoginPassword
        const res = await fetch(URL,);
        //check statuses- if status==400 validation error etc. 
      if (!res.ok) { 
            throw new Error("the fetch failed")}
        else {
            const data = await res.json();
            sessionStorage.setItem("user", JSON.stringify(data))
            window.location.href = "./update.html"
        }
    }
    catch (er) {
          //Alerting errors to the user is not recommended, log them to the console.
          alert("error")
    }
}


const  register= async()=>
{
const firstName = document.getElementById("firstName").value
const lastName = document.getElementById("lastName").value
const userName = document.getElementById("userName").value
    const password = document.getElementById("password").value
    var user = { firstName, lastName, userName, password }
    //const User = { UserName:userName, Password:password, FirstName:firstName, LastName:lastName }, Prefix -UpperCase
    //If checkCode
    checkCode(user)
    //presponseData - change the variable name(clean code)
    const presponseData = await fetch('api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const dataPost = await presponseData.json();
    //Check if status==201, user created successfully- alert a message, if status==400 - validation error/password is weak...
    console.log('POST data:', dataPost);
}


const update = async () =>
{
    const userFromStorage = sessionStorage.getItem("user")
    const user = JSON.parse(userFromStorage)
    //Remove console logs... (clean code)
    console.log(user);
    const firstName = document.getElementById("firstName").value ? document.getElementById("firstName").value: user.firstName
    const lastName = document.getElementById("lastName").value ? document.getElementById("lastName").value: user.lastName
    const userName = document.getElementById("userName").value ? document.getElementById("userName").value: user.userName
    const password = document.getElementById("password").value ? document.getElementById("password").value: user.password
    var updateUser = { firstName, lastName, userName, password }
    //Check password strength. 
    console.log(updateUser);
    const userId = user.userId;
    const res = await fetch("api/user/" + userId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateUser)
    });
    const response = await res.json();
    aler("update succeed");
    //Maybe the updating failed?
     //Check if status==200, user updated successfully- alert a message, if status==400 - validation error/password is weak...


}

//checkPasswordStrength- is better name than checkCode. (Do you have code here? no...)
async function checkCode() {
    //Your server does not have a 'user/check' endpoint (in the controller)!!
    //Acoording to your implementation - it seems that this function should return a Boolean value(True / False).
    //In the 'register' function, check if 'checkCode' returns 'false' and return from 'register' accordingly
    //Think again about this implementation... and the best way to do it...
    var strength = {
        0: "Worst",
        1: "Bad",
        2: "Weak",
        3: "Good",
        4: "Strong"
    }
    var meter = document.getElementById('password-strength-meter');
    var text = document.getElementById('password-strength-text');
    const Code = document.getElementById("password").value;
    const res = await fetch('api/user/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Code)
    });
    if (!res.ok)
        throw new Error("error in adding your details to our site")
    const data = await res.json();
    if (data <= 2) alert("your password is weak!! try again")
    // Update the password strength meter
    meter.value = data;

    // Update the text indicator
    if (Code !== "") {
        text.innerHTML = "Strength: " + strength[data.score];
    } else {
        text.innerHTML = "";
    }


}
