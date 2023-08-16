"use strict";

// Form elements
const submit = document.querySelector(".inputs__submit");
const arrInputs = [...document.querySelectorAll("input")];

// Result elements
const resultYear = document.getElementById("result-year");
const resultMonth = document.getElementById("result-month");
const resultDay = document.getElementById("result-day");

// Current date
const currDate = new Date();
const currDay = currDate.getDate();
const currMonth = currDate.getMonth();
const currYear = currDate.getFullYear();

// Date introduced
let day;
let month;
let year;

// Number of days in that month
const daysInMonth = function (month, year) {
  return new Date(year, month, 0).getDate();
};

// Get empty inputs
const getEmptyInputs = function () {
  return arrInputs.filter((input) => +input.value === 0);
};

/**
 *
 * @param {array of empty inputs} date
 */
const displayEmptyErrors = function (date) {
  //   Change label color
  date.forEach((input) => {
    input.previousElementSibling.classList.add("inputs__label--error");
    input.classList.add("inputs__input-num--error");
    input.nextElementSibling.textContent = "This field is required";
    input.nextElementSibling.classList.remove("hidden");
  });
};

// Checking if they are empty values
const isEmpty = function () {
  if (arrInputs.some((input) => +input.value === 0)) {
    // Start display errors to the user
    displayEmptyErrors(getEmptyInputs());
    return true;
  }
  return false;
};

const displayNotValid = function (input, phrase) {
  input.previousElementSibling.classList.add("inputs__label--error");
  input.classList.add("inputs__input-num--error");
  input.nextElementSibling.textContent = `${phrase}`;
  input.nextElementSibling.classList.remove("hidden");
};

const isValidInput = function () {
  let isMonthValid = true;
  let isYearValid = true;
  let validatedInputs = true;

  day = arrInputs.find((input) => input.id === "day");
  month = arrInputs.find((input) => input.id === "month");
  year = arrInputs.find((input) => input.id === "year");

  if (year.value < 0 || year.value > currYear) {
    displayNotValid(
      year,
      year.value < 0 ? "Must be a valid year" : "Must be in the past"
    );
    isYearValid = validatedInputs = false;
  }

  if (month.value < 0 || month.value > 12) {
    displayNotValid(month, "Must be a valid month");
    isMonthValid = validatedInputs = false;
  }

  if (isYearValid && isMonthValid) {
    if (month.value > currMonth + 1 && +year.value === currYear) {
      displayNotValid(month, "Must be a valid month");
      isMonthValid = validatedInputs = false;
    }
  }

  if (day.value < 0 || day.value > 31) {
    displayNotValid(day, "Must be a valid month");
    return false;
  }

  if (isYearValid && isMonthValid) {
    if (
      day.value > currDay &&
      +month.value === currMonth + 1 &&
      +year.value === currYear
    ) {
      displayNotValid(day, "Must be a valid day");
      return false;
    }
  }

  if (isYearValid && isMonthValid) {
    console.log(currDay);
    console.log(currMonth);

    if (
      // +month.value === 2 &&
      day.value > daysInMonth(month.value, year.value)
    ) {
      displayNotValid(day, "Must be a valid day");
      return false;
    }
  }

  return validatedInputs;
};

const clearErrors = function () {
  arrInputs.forEach(function (input) {
    if (input.classList.contains("inputs__input-num--error")) {
      input.previousElementSibling.classList.remove("inputs__label--error");
      input.classList.remove("inputs__input-num--error");
      input.nextElementSibling.classList.add("hidden");
    }
  });
};

// Validate if each value is correct and every function has to be executed
const isCorrect = function () {
  let emptyChecked = !isEmpty();
  let validInputs = isValidInput();

  if (emptyChecked && validInputs) {
    return true;
  }

  return false;
};

const displayAge = function (year, month, day) {
  resultYear.textContent = year;
  resultMonth.textContent = month;
  resultDay.textContent = day;
};

const calcAge = function () {
  const introducedDate = new Date(year.value, month.value - 1, day.value);

  const timePassed = currDate - introducedDate;
  // console.log(introducedDate);

  // 31_557_600_000 Aprox miliseconds of 1 year
  const ageYear = Math.floor(timePassed / 31_557_600_000);

  // 2_629_800_000 Aprox miliseconds of 1 month
  const ageMonth = Math.floor((timePassed / 2_629_800_000) % 12);

  const yearMonthPast = introducedDate;

  yearMonthPast.setMilliseconds(
    31_557_600_000 * ageYear + 2_629_800_000 * ageMonth
  );

  const ageDay = Math.floor((currDate - yearMonthPast) / 1000 / 60 / 60 / 24);

  displayAge(ageYear, ageMonth, ageDay);
};

// Event listeners
submit.addEventListener("click", function (e) {
  e.preventDefault();
  clearErrors();

  if (isCorrect()) {
    calcAge();
  }
});

arrInputs.forEach((input) =>
  input.addEventListener("change", function () {
    if (input.classList.contains("inputs__input-num--error")) {
      input.previousElementSibling.classList.remove("inputs__label--error");
      input.classList.remove("inputs__input-num--error");
      input.nextElementSibling.classList.add("hidden");
    }
  })
);
