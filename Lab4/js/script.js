let zipElement = document.querySelector("#zipCode");
let stateElement = document.querySelector("#state");
let passElement = document.querySelector("#pass2");
let userElement = document.querySelector("#user");

userElement.addEventListener("change", displayuser)
zipElement.addEventListener("change", displayCity);
stateElement.addEventListener("change", displayCounty);
passElement.addEventListener("click", displaypass);

displayStates();

async function displayStates(){
    let url = "https://csumb.space/api/allStatesAPI.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();

        for (let i of data){
            let optionEl = document.createElement("option");
            optionEl.textContent = i.state;
            optionEl.value = i.usps;
            document.querySelector("#state").append(optionEl);
        }

    } catch (err) {
        alert("Error accessing API endpoint");
    }
}

async function displayCounty(){

    // clear old counties
    document.querySelector("#county").innerHTML = "";

    // get selected state
    let selectedState = stateElement.value;

    let url = "https://csumb.space/api/countyListAPI.php?state=" + selectedState;

    const response = await fetch(url);
    const data = await response.json();

    for (let i of data){
        let optionEl = document.createElement("option");
        optionEl.textContent = i.county;
        optionEl.value = i.county;
        document.querySelector("#county").append(optionEl);
    }
}

async function displaypass(){
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    let response = await fetch(url);
    let data = await response.json();

    // show suggested password
    document.querySelector("#pass").textContent = data.password;
}

async function displayuser(){

    let userpCode = userElement.value;
    let url = "https://csumb.space/api/usernamesAPI.php?username=" + userpCode;

    let response = await fetch(url);
    let data = await response.json();

    document.querySelector("#user2").textContent = data.available;

    // color message
    if(data.available == "true"){
        document.querySelector("#user2").style.color = "green";
    } else {
        document.querySelector("#user2").style.color = "red";
    }
}

async function displayCity(){

    let zipCode = zipElement.value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;

    let response = await fetch(url);
    let data = await response.json();

    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.latitude;
    document.querySelector("#longitude").textContent = data.longitude;

    // zip not found message
    if(!data.city){
        document.querySelector("#zipMsg").textContent = "Zip code not found";
    } else {
        document.querySelector("#zipMsg").textContent = "";
    }
}

// form validation
document.querySelector("#submitBtn").addEventListener("click", function(e){

    let isValid = true;

    // username length
    if(userElement.value.length < 3){
        alert("Username must be at least 3 characters");
        isValid = false;
    }

    // password length
    if(passElement.value.length < 6){
        alert("Password must be at least 6 characters");
        isValid = false;
    }

    // password match
    if(passElement.value != document.querySelector("#pass3").value){
        alert("Passwords must match");
        isValid = false;
    }

    if(!isValid){
        e.preventDefault();
    }
});