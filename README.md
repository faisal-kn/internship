# Intern-test

In this assignment I have used Sql database and jwt auth.

It contains 3 pages: 
1. signup page
2. login page
3. detail page

### signup page
It consists of fields
* Name
* Email ID
* Phone Number (should be only 10 digit numeric value): I used regex ([1-9]{1}[0-9]{9})
* Password ( the password should be of 10 digits, and only 0-9, A-Z, a-z): I used regex ([0-9A-Za-z]{10})
* Confirm Password Field (should match with same password) : onclicking log, first if both password are same then
it will move to detail page and make cookie else it will give alert.

### login page
It consists of fields
* Name
* Password

if correct name password is given then it will move to detail page and make cookie else 
it will give warning.

### detail page
It shows details of all users who have registered (data stored in sql database).
It also has logout option to logout.

I also have used templates(ejs) for detail page and login to make dynamic changes easily.
Used jwt auth to check every route. And deployed whole assignment in heroku
