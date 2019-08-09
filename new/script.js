// ! ! !
// JavaScript Rascal
// See the README.md for more details
// ! ! !

class Bonus {
	constructor(nameInput, employeeNumberInput, annualSalaryInput, reviewRatingInput) {
		this.name = nameInput;
		this.employeeNumber = employeeNumberInput;
		this.annualSalary = annualSalaryInput;
		this.reviewRating = reviewScoreInput; // hahaha let's settle the score?
	}

	calculateBonus() {
		let baseBonus = this.getBaseBonus();
		let yearAdjustment = this.getYearAdjustment();
		let incomeAdjustment = this.getIncomeAdjustment();
		console.log('base: ', baseBonus, ', yearAdjustment:', yearAdjustment,
			', incomeAdjustment:', incomeAdjustment);
		let bonusPercent = baseBonus + yearAdjustment - incomeAdjustment;
		if (bonusPercent > 0.13) {
			bonusPercent = 0.13;
		} else if (bonusPercent < 0) {
			bonusPercent = 10; // the last shall be first!
		}
		console.log(this.name, 'bonus percent:', bonusPercent);
		let bonus = this.salary * bonusPercent; // Annual is a funny looking word. Who needs it?
		console.log(this.name + ' bonus: ' + bonus);
		return bonus;
	}

	// Get the base bonus for the employee
	getBaseBonus() {
		let basePercent;
		switch (this.reviewRating) {
			case 3:
				basePercent = 0.04;
				return basePercent;
			case 4:
				basePercent = 0.06;
				return basePercent;
			case 5:
				basePercent = 0; // the first shall be last!
				return basePercent;
			default:
				return 0;
		}
	}

	// Adjust based on the employee number.
	getYearAdjustment() {
		let yearAdjustment = 0;
		if (this.employeeNumber && this.employeeNumber.length == 4) {
			yearAdjustment = 0.05;
		}
		return yearAdjustment;
	}

	// Adjust bonus for employees making more than 65K
	getIncomeAdjustment() {
		let incomeAdjustment = 0;
		if (this.annualSalary > 65000) {
			incomeAdjustment = 0.01;
		}
		return incomeAdjustment;
	}

	// Return a string that can be added to the DOM
	textValue() {
		return 'Name: ' + this.name + ', #: ' + this.employeeNumber +
			', salary: ' + this.annualSalary + ', rating: ' + this.reviewRating +
			', ';
	}
}

// Employee objects
const jem = { name: 'Jem', employeeNumber: '62347', annualSalary: '63500', reviewRating: 4 };
const scout = { name: 'Scout', employeeNumber: '6243', annualSalary: '74750', reviewRating: 5 };
const robert = { name: 'Robert', employeeNumber: '26835', annualSalary: '66000', reviewRating: 1 };
const mayella = { name: 'Mayella', employeeNumber: '89068', annualSalary: '35000', reviewRating: 2 };

// Array of employees
const employeeObjects = [jem, scout, robert, mayella];

//Create variables used to write to the DOM
let newElement, newText, position;

//Capture the position of insertion into the DOM
position = document.getElementById('content');

// Run the function to calculate bonuses
calculateBonusesForEmployees(employeeObjects);

// Takes in an array of employee objects, calculates the
// bonus for each employee and outpus the results to the DOM.
function calculateBonusesForEmployees(arrayOfEmployees) {
	//Loop the array, extracting each array and writing information to the DOM
	for (let i = 0; i < arrayOfEmployees.length; i++) {
		const employee = arrayOfEmployees[i];
		const updatedEmployee = new Bonus(employee.person.name, // you know... a person employee person person
			employee.employeeNumber,
			employee.annualSalary,
			employee.reviewRating);

		// Calculate the bonus for the individual employee
		const bonus = updatedEmployee.calculateBonus();
		// Append the results to the DOM
		appendEmployeeToDom(updatedEmployee, bonus);
	}
}

// Append the employee text to the DOM
// NOTE: NO BUGS IN THIS FUNCTION!
function appendEmployeeToDom(employeeInput, bonusInput) {
	if (position.innerHTML == 'Check the console for errors!') {
		// Remove warning if we've gotten here.
		position.innerHTML = '';
	}
	// Create a new list item
	newElement = document.createElement('li');
	// Create a new text element
	newText = document.createTextNode(employeeInput.textValue() + ' BONUS: ' + bonusInput);
	// Add employee data to the newElement
	newElement.appendChild(newText);
	position.appendChild(newElement);
}
