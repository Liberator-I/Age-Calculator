const yearOfBirth = document.querySelector('#year');
const monthOfBirth = document.querySelector('#month');
const dayOfBirth = document.querySelector('#day');
const btn = document.querySelector('#btn');

let date = document.querySelector('#date');
const stat = document.querySelector('#stat');

const inputs = document.querySelectorAll('.i');

// D is for Display
const yearD = document.querySelector('.yearD');
const monthD = document.querySelector('.monthD');
const dayD = document.querySelector('.dayD');

yearOfBirth.value = '';
monthOfBirth.value = '';
dayOfBirth.value = '';

// DD / MM / YYYY
let storeInput = []; 

function extractDate(inputFromUser) {
    // Checking if array is empty or not
    if (storeInput.length <= 0) { 
        inputs.forEach(input => {
            inputFromUser = input.value;
            storeInput.push(inputFromUser); // DD / MM / YYYY
        });
    } else {
        // Clearing array if it's empty
        storeInput = []; 
        inputs.forEach(input => {
            inputFromUser = input.value;
            storeInput.push(inputFromUser); // DD / MM / YYYY
        });
    }
    // Destructering, so first element becomes last
    [storeInput[0], storeInput[2]] = [storeInput[2], storeInput[0]];
    date.value = `${storeInput[0]}-${storeInput[1]}-${storeInput[2]}`; // YYYY / MM / DD for input
    isDateValid(date.value);
}


// TODO: Validate Date
function isDateValid(userDate){
    let validDate = !isNaN(new Date(userDate)); // true / false
    if(validDate) {
        inputs.forEach(input => {
            if (input.classList.contains('err')) {
                input.classList.remove('err');
                stat.innerText = '';
            } else {
                // do nothing
                return false;
            }
        });
        convertAge(userDate);
    } else {
        stat.classList.add('fadeIn');
        stat.innerText = 'Please enter a valid date';
        inputs.forEach(input => {
            input.classList.add('shake');
            input.classList.add('err');
            setTimeout(function() {
                input.classList.remove('shake');
            }, 500);
        })
    }
}

function convertAge(value) {
    let DOB = value;
    let dobYear = parseInt(DOB.substring(0,4), 10); // year
    let dobMonth = parseInt(DOB.substring(5,7), 10); // month
    let dobDate = parseInt(DOB.substring(8,10), 10); // day / date

    // Todays Date
    let today = new Date();
    let bDay = new Date(dobYear, dobMonth-1, dobDate); // YY, MM, DD
    
    // Calc diff of dates
    let diffInMillisec = today.valueOf() - bDay.valueOf();

    // Convert diff in milliseconds and store in day and year variables
    let yearAge = Math.floor(diffInMillisec / 31536000000);
    let dayAge = Math.floor((diffInMillisec % 31536000000) / 86400000);

    // When birth date and month is the same as today's date
    if ((today.getMonth() == bDay.getMonth()) && (today.getDate() == bDay.getDate())) {
        alert('Happy Birthday!');
    }

    let monthAge = Math.floor(dayAge / 30);
        dayAge = dayAge % 31;
    
    yearD.innerText = yearAge;
    monthD.innerText = monthAge;
    dayD.innerText = dayAge;

}

btn.addEventListener('click', extractDate);

inputs.forEach((input) => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            extractDate()
        }
    })
});