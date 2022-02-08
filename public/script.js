const password = document.getElementById("pass");
const confirmPassword = document.getElementById("repass");

function Validate() {
  const passwordValue = password.value;
  const confirmPasswordValue = confirmPassword.value;
  console.log(passwordValue, confirmPasswordValue);
  if (passwordValue != confirmPasswordValue) {
    alert(
      "You first Passwords is not similar with 2nd password. Please enter same password in both"
    );
    return false;
  }
  return true;
}
