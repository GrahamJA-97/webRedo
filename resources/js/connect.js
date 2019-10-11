


function submitForm() {
    let formName = document.contactForm.Name;
    let formPhone = document.contactForm.Phone;
    var formEmail = document.contactForm.Email;
    var formAvail = document.contactForm.Avail;
    
    if (validName(formName)) {
        if (validPhone(formPhone)){
            if (validEmail(formEmail)) {
                if (validAvail(formAvail)) {
                    sendData(formName, formPhone, formEmail, formAvail);
                    console.log("valid submission")
                    return true;
                }                
            }
        }
        
    }
    console.log("invalid submission")
    return false;

}

function validName(name) {
    if (name.value.length >= 2 && name.value.length <= 40) {
        return true;
    } else {
        alert("Name field is invalid / length must be between 2-40!");
        name.focus();
        return false;
    }
}

function validPhone(phone) {
    let phoneFormat = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (phone.value.match(phoneFormat)) {
        return true;
    } else {
        alert("You have entered an invalid phone number!");
        phone.focus();
        return false;
    }
}

function validEmail(email) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value.match(mailformat)) {
        return true;
    }
    else {
        alert("You have entered an invalid email address!");
        email.focus();
        return false;
    }
}

function validAvail(avail) {
    let days = Array.from(avail.querySelectorAll("option:checked"),e=>e.value);
    if (days.length > 0) {
        return true;
    }
    else {
        alert("You must enter at least one day!");
        email.focus();
        return false;
    }
}

function sendData(name, email, phone, days) {
    // Build FormData
    var data = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        days: Array.from(days.querySelectorAll("option:checked"),e=>e.value)
    }
    var FD = new FormData();
    for (point in data) {
        FD.append(point, data[point]);
    }

    var XHR = new XMLHttpRequest();

    // Define what happens on successful data submission
    XHR.addEventListener("load", function (event) {
        alert(event.target.responseText);
    });

    // Define what happens in case of error
    XHR.addEventListener("error", function (event) {
        alert('Oops! Something went wrong.');
    });

    // Set up our request
    XHR.open("POST", "https://example.com/cors.php");

    // The data sent is what the user provided in the form
    XHR.send(FD);
}
