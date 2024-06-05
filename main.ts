#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk";
class Student {
    static counter = 10000
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }

    enroll_course(course: string) {
        this.courses.push(course);
    }
    view_balance() {
        console.log(`\nBalance for ${this.name} : $${this.balance}\n`)
    }
    pay_fees(amount: number) {
        this.balance -= amount;
        console.log(`\n$${amount} Fees paid successfully for ${this.name}\n`)
    }
    show_status() {
        console.log(`ID : ${this.id}`)
        console.log(`Name : ${this.name}`)
        console.log(`Courses : ${this.courses}`)
        console.log(`Balance : ${this.balance}`)
    }
}
class Student_manager {
    students: Student[]

    constructor() {
        this.students = [];
    }
    add_student(name: string){
        let student = new Student(name)
        this.students.push(student)
        console.log(`\nStudent: ${name} added successfully!, Student ID: ${student.id}\n`)
    }
    find_student(student_id: number) {
        return this.students.find(std => std.id === student_id);
    }
    enroll_student(student_id: number, course: string) {
        let student = this.find_student(student_id)
        if (student) {
            student.enroll_course(course);
            console.log(`\n${student.name} enroll in ${course} successfully!\n`);
        }
    }
    view_student_balance(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        } else {
            console.log("\nStudent not found, please enter a correct student ID.\n")
        }
    }
    pay_student_fees(student_id: number, amount: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount)
        } else {
            console.log("\nStudent not found, please enter a correct student ID.\n")
        }
    }
    show_student_status(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
};
//Main function to run a program
async function main() {
    console.log(chalk.bold("\n\t Wellcome to `SARA - Student Management System`\n"));
    console.log("=".repeat(60))

    let studentManager = new Student_manager();

    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "Choice",
                type: "list",
                message: "Select an option:",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        switch (choice.Choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student name: "
                    }
                ]);
                studentManager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message: "Enter a Student ID: "
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course name: "
                    }
                ]);
                studentManager.enroll_student(course_input.Student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message: "Enter a Student ID: "
                    }
                ]);
                studentManager.view_student_balance(balance_input.Student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message: "Enter a Student ID: "
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay: "
                    }
                ]);
                studentManager.pay_student_fees(fees_input.Student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message: "Enter a Student ID: "
                    }
                ]);
                studentManager.show_student_status(status_input.Student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
main(); 