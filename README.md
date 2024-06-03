# Expense Tracker Application

## Overview

This project involves the development of a web-based personal expense tracker application designed to help users manage their daily expenses efficiently. The application is built using HTML, CSS, JavaScript, and jQuery, with enhancements using Bootstrap and other styling frameworks. It includes features for adding, editing, deleting, and viewing expenses, as well as secure login and signup functionality.

## Features

- **Expense Management**: Add, edit, delete, and view expenses.
- **User Authentication**: Secure login and signup functionality.
- **Responsive Design**: Enhanced user interface using Bootstrap.
- **Data Persistence**: User data stored in local storage using JSON.
- **Interactive Charts**: Visual representation of expenses using Highcharts.js.

## Technologies and Libraries Used

### HTML, CSS, JavaScript, and Bootstrap
- **HTML**: Structure of the application.
- **CSS**: Styling and visual enhancements.
- **JavaScript**: Interactivity and dynamic behavior.
- **Bootstrap**: Responsive and mobile-friendly interface.

### jQuery
- Enhances the functionality of components like date picker and event handling.

### JSON
- Used for storing and managing user data and expenses in local storage.

### External Libraries
- **Moment.js**: Date formatting and manipulation.
- **Highcharts.js**: Interactive charts for visualizing expenses.

## Installation

To run this project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/expense-tracker.git
    ```
2. Open the `index.html` file in your web browser.

## User Manual

### 1. Home Page (`index.html`)
When users access the application, they are greeted by the home page showcasing the logo and slogan. There are two buttons for `Login` and `Sign Up`.

<img src="">

### 2. Sign Up (`signUp.html`)
New users can sign up by entering their username, password, and email.

<img src="">

#### 2.1 Successful Sign Up
After successful registration, users will see a confirmation pop-up.

<img src="">

#### 2.2 Username Duplication
If the username already exists, an error message is displayed.

<img src="">

### 3. Login (`login.html`)
Users can log in using their username and password.

<img src="">

#### 3.1 Invalid Credentials
If the login information is incorrect, an error message is shown.

<img src="">

### 4. Home Page After Login (`home.html`)
Displays a welcome message, total expenses for the current month, and recent expense activities.

<img src="">

### 5. Expense Management (`expense.html`)
Users can add new expenses and view a list of recent expenses.

<img src="">

#### 5.1 Add Expense
Users can fill in details of their new expense.

<img src="">

#### 5.2 Edit Expense
Users can edit or delete existing expenses.

<img src="">

### 6. Statistics (`statistic.html`)
Users can view their expenses in a visual format and filter by month and year.

<img src="">

## Conclusion
This project provides a comprehensive solution for personal expense tracking, utilizing modern web technologies and libraries to deliver a responsive and user-friendly experience. Future enhancements may include backend integration and advanced security features.
