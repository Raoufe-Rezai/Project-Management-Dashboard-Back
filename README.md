# Project Management Site - Back 

A web application for managing projects, tasks, and team memberships.

## Features
- Create and manage projects.
- Assign tasks to users with priority and due dates.
- Track task progress with history logs.
- Role-based access (admin and users).

## Tech Stack
- **Backend**: Node.js, Sequelize ORM
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)

## Technical Requirements
- **Node.js**: [Node.js](https://nodejs.org/en) for building scalable network applications and server-side applications using JavaScript.
- **Xampp**: [Xampp](https://www.apachefriends.org/) used to develop and test PHP applications locally by providing a web server, database management and scripting language support.

## Setup and Installation
   
1. Clone the repository:
    ```bash
    git clone https://github.com/Raoufe-Rezai/Project-Management-Site-Back.git
    ```

2. Enter the project directory:
    ```bash
    cd Project-Management-Site-Back
    ```

3. Install dependencies:
    ```bash
    npm install
    ```
4.  Create an .env file and copy all the Variables that are in the .env.template file into it, then delete it. and edit your database information.

5. Start the development server:
    ```bash
    nodemon index.js
    ```