let alerting = document.getElementById('alerting');

let final = false;

let formfilled = 0;

const togglePassword1 = document.querySelector("#toggle1");
const password_toggle1 = document.querySelector("#exampleInputPassword1");

togglePassword1.addEventListener("click", function () {
    const type = password_toggle1.getAttribute("type") === "password" ? "text" : "password";
    password_toggle1.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
});

const togglePassword2 = document.querySelector("#toggle2");
const password_toggle2 = document.querySelector("#exampleInputPassword2");

togglePassword2.addEventListener("click", function () {
    const type = password_toggle2.getAttribute("type") === "password" ? "text" : "password";
    password_toggle2.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
});

const form = document.querySelector("form");
form.addEventListener('submit', function (e) {
    e.preventDefault();
});

function getName() {
    const name = document.getElementById('exampleInputName1').value;
    let check = 1;
    for(let i = 0; i < name.length; i++) {
        if((name[i]>='A' && name[i]<='Z') || (name[i]>='a' && name[i]<='z') || name[i]==' '){
            continue;
        }else{
            check = 0;
            break;
        }
    }
    if(check){
        return true;
    }else{
        return false;
    }
}

function getEmail() {
    const email = document.getElementById('exampleInputEmail1').value;
    var regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?(.[a-z]+)?$/;

    if(regx.test(email) || email==""){
        return true;
    }else{
        return false;
    }
}

function getPhone() {
    const phone = document.getElementById('exampleInputPhone').value;
    if(phone.length!=10 && phone.length!=0){
        return false;
    }
    for(let i=0; i<phone.length; i++) {
        if(phone[i]=='.') return false;
    }
    return true;
}

function getAge() {
    const age = document.getElementById('exampleInputAge').value;
    let age_num = parseInt(age);
    if(age_num<=17 || age_num>=25){
        return false;
    }else{
        return true;
    }
}

function getPassword() {
    const password = document.getElementById('exampleInputPassword1').value;
    let upper = 0, lower = 0, digit = 0, special = 0;
    if((password.length<8 || password.length>14)){
        if(password.length==0) return 1;
        return 0;
    }else{
        for(let i=0; i<password.length; i++){
            if(password[i]>='A' && password[i]<='Z') upper++;
            else if(password[i]>='0' && password[i]<='9') digit++;
            else if(password[i]>='a' && password[i]<='z') lower++;
            else if(password[i]==' ') return -1;
            else special++;
        }
        if(upper && lower && digit && special){
            return 1;
        }else{
            return 2;
        }
    }
}

function getConfirmPassword() {
    const password = document.getElementById('exampleInputPassword1').value;
    const conf_password = document.getElementById('exampleInputPassword2').value;
    if(conf_password=="") return true;
    if(password!==conf_password) return false;
    return true;
}

function validateForm(){
    let reqd_checking = false;
    const name = document.getElementById('exampleInputName1').value;
    const email = document.getElementById('exampleInputEmail1').value;
    const phone = document.getElementById('exampleInputPhone').value;
    const age = document.getElementById('exampleInputAge').value;
    const password = document.getElementById('exampleInputPassword1').value;
    const conf_password = document.getElementById('exampleInputPassword2').value;
    const gender = document.getElementById('male').value;
    const select = document.getElementById('exampleInputOption').value;
    if(name!="" && email!="" && phone!="" && age!="" && password!="" && conf_password!="" && gender!="" && select!=""){
        reqd_checking = true;
    }
    return (reqd_checking && final);
}

function fn() {
    if(validateForm() && sendEmail()){
        alert("Thanks your form is submitted!");
        formfilled = 1;
        return true;
    }
    return false;
}

function sendEmail() {
    const email = document.getElementById('exampleInputEmail1').value;
    Email.send({
        SecureToken : "a4aebccd-b155-4ddc-bbd5-0fdde241bc8d",
        To : email,
        From : "biswanathsanto@gmail.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => {
          console.log(message);
          if(message=="OK"){
              return true;
          }else{
              alert("Invalid email address!");
              return false;
          }
      }
    );
}

setInterval(() => {
    if(formfilled==1){
        form.reset();
        formfilled = 0;
    }
    let name_check = getName();
    let email_check = getEmail();
    let age_check = getAge();
    let check_password = getPassword();
    let check_conf_password = getConfirmPassword();
    let get_phone = getPhone();
    if(name_check && email_check && age_check && check_password==1 && check_conf_password && get_phone){
        alerting.style.visibility = "hidden";
        alerting.textContent = "";
        final = true;
    }else{
        final = false;
        alerting.style.visibility = "visible";
        if(name_check==false){
            alerting.textContent = "Name should contain only letters and space!";
        }else if(email_check==false){
            alerting.textContent = "Email is invalid!";
        }else if(age_check==false){
            alerting.textContent = "You are outside valid age range!";
        }else if(check_password==-1){
            alerting.textContent = "Password cannot have spaces!";
        }else if(check_password==2){
            alerting.textContent = "Password must have atleast one uppercase, one lowercase letter, one digit and one special character";
        }else if(check_password==0){
            alerting.textContent = "Password must be of length between atleast 8 and atmost 14 characters";
        }else if(check_conf_password==false){
            alerting.textContent = "Password and Confirm Password dont match!!"
        }else if(get_phone==false){
            alerting.textContent = "Phone number is not valid!"
        }
    }
},200);