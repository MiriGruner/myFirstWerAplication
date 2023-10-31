
const login = async () => {        
    try {
        const LoginUserName = document.getElementById("LoginUserName").value
        const LoginPassword = document.getElementById("Password").value
        var URL = 'api/RegisterAndLogin' + "?" + "userName=" + LoginUserName + "&password=" + LoginPassword
        const res = await fetch(URL,);
      if (!res.ok) { 
            throw new Error("the fetch failed")}
        else {
            const data = await res.json();
            sessionStorage.setItem("user", JSON.stringify(data))
            window.location.href = "./update.html"
        }
    }
    catch (er) {
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
    checkCode(user)
    const presponseData = await fetch('api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const dataPost = await presponseData.json();

    console.log('POST data:', dataPost);
}


const update = async () =>
{
    const userFromStorage = sessionStorage.getItem("user")
    const user = JSON.parse(userFromStorage)
    console.log(user);
    const firstName = document.getElementById("firstName").value ? document.getElementById("firstName").value: user.firstName
    const lastName = document.getElementById("lastName").value ? document.getElementById("lastName").value: user.lastName
    const userName = document.getElementById("userName").value ? document.getElementById("userName").value: user.userName
    const password = document.getElementById("password").value ? document.getElementById("password").value: user.password
    var updateUser = { firstName, lastName, userName, password }
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

}

async function checkCode() {
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
