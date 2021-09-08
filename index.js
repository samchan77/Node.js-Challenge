
const fs = require("fs");
const path = require ("path");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");


const questions = [
    {
        type: "input",
        name: "title",
        message: "What is your project's name?"
    
    },
    {
        type: "input",
        name: "github",
        message: "Please enter your GitHub username."
        
    },
    {
        type: "input",
        name: "repo",
        message: "Please enter the name of your repo."
        
    },
    {
        type: "input",
        name: "description",
        message: "Provide a description of your application."
        
    },
    {
        type: "input",
        name: "usage",
        message: "Please provide information for using your application."
        
    },
    {
        type: "checkbox",
        name: "contents",
        message: "Any additional sections you would like to include in your README?",
        choices: [
            {
                name: "Deployed Application",
                checked: false
            },
            {
                name: "Installation",
                checked: false
            },
            
            {
                name: "License",
                checked: false
            },
            {
                name: "Contributing",
                checked: false
            },
            {
                name: "Tests",
                checked: false
            },
            {
                name: "Questions",
                checked: true
            },
            {
                name: "Credits",
                checked: true
            },
        ]
    },
    {
        type: "input",
        name: "link",
        message: "Please provide a link to your deployed application.",
        
    },
    {
        type: "input",
        name: "installation",
        message: "Please list any required packages for installation of your application.",
        
    },
    {
        type: "list",
        name: "license",
        message: "Please provide license information.",
        choices: ["MIT", "GNU", "Apache 2.0", "ISC"],
        
    }, 
    {
        type: "checkbox",
        name: "built with",
        message: "Please select the technologies that your application was built with.",
        choices: ["HTML", "CSS","JavaScript", "Node.js"],
        
    }, 
    {
        type: "input",
        name: "contributing",
        message: "Please enter your guidelines for contributing.",
        
    },
    {
        type: "input",
        name: "tests",
        message: "Please enter test information for your application.",
        
    },
    {
        type: "input",
        name: "questions",
        message: "Please provide an email address for others to reach you with questions.",
        
    }
];


// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`./dist/${fileName}`, data, err => {
        if (err) {
            throw err
        };
        console.log('README created!')
    });
};
// function to initialize program
function init() {
    return inquirer.prompt(questions);
};
init()
    .then(userResponse => { 
        // calls function to add screenshots based on user selection
        if (userResponse.contents.indexOf('Screenshots') > -1) {
            return addScreenshots(userResponse);
        } else {
            return userResponse;
        }
    })
    .then(response => {
        // calls function to add credits based on user selection
        if (response.contents.indexOf('Credits') > -1) {
            return addCredits(response);
        } else {
            return response;
        }
    })
    .then(answers => generateMarkdown(answers))
    .then(generatedReadme => writeToFile('README.md', generatedReadme))
    .catch(err => {
        console.log(err);
    });

