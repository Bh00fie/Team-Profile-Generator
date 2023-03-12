// Defining Variables
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Defining output directory
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Defining Variable linked to HTML template page
const render = require("./src/page-template.js");

// as the team will be initially be empty, this can be expressed using an empty array that will be filled by the user
const team = [];

// The team will be filled by letting the user choose each member and the output a HTML file
const teamMembers = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'teamMember',
            message: 'Who would you like to add?',
            choices: ['Manager', 'Engineer', 'Intern', 'That is for today.'],
        },
    ]).then((response) => {
        if (response.teamMember === 'Manager') {
            getManager();
        } else if (response.teamMember === 'Engineer') {
            getEngineer();
        } else if (response.teamMember === 'Intern') {
            getIntern();
        } else {
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR)
            } else {
                fs.writeFileSync(outputPath, render(team), 'utf-8');
                console.log('HTML file created');
            }
        }
    });
}


// Requesting Manager Information
const getManager = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the team manager?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the employee ID of the team manager?', 
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employee email of the team manager?', 
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the office number of the team manager?', 
        },
    ]).then((response) => {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        console.table(manager);
        team.push(manager);
        teamMembers();
    });
}

// Requesting Engineer Information
const getEngineer = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the engineer?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the employee ID of the engineer?', 
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employee email of the engineer?', 
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the Github username of the engineer?', 
        },
    ]).then((response) => {
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        console.table(engineer);
        team.push(engineer);
        teamMembers();
    });
}

// Requesting Intern Information
const getIntern = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the intern?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the employee ID of the intern?', 
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employee email of the intern?', 
        },
        {
            type: 'input',
            name: 'school',
            message: 'Which school is the intern from?', 
        },
    ]).then((response) => {
        const intern = new Intern(response.name, response.id, response.email, response.school);
        console.table(intern);
        team.push(intern);
        teamMembers();
    });
}