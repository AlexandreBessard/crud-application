import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {EmployeeService} from '../services/employee.service';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  private readonly database: any;

  constructor() {
    this.database = this.createDb();
    this.setData('employee', this.database.employees);
  }

  createDb() {

    const employees = [];

    // Array of sample first names and last names
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sophia', 'William', 'Olivia', 'Daniel', 'Isabella'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
    const educations = ['Diploma', 'Intermediate', 'Graduate', 'Post Graduate',];
    const genders = ['male', 'female', 'others'];

    for (let i = 1; i <= 10; i++) {
      const firstName = this.getRandomElement(firstNames);
      const lastName= this.getRandomElement(lastNames);
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.doe@example.com`;
      const education = this.getRandomElement(educations);
      const gender = this.getRandomElement(genders);
      const dateOfBirth = this.getRandomDateOfBirth(1980, 2005); // Adjust the range as needed

      const employee = {
        id: i,
        firstName: firstName,
        lastName: lastName,
        email: email,
        dob: dateOfBirth,
        gender: gender,
        education: education,
        company: 'Company' + (i % 5 + 1),
        experience: `${i % 10 + 1}`,
        package: Math.floor(Math.random() * 1000000) + 500000, // Random package value between 500,000 and 1,500,000
      };

      employees.push(employee);
    }

    return { employees };
  }

  getRandomDateOfBirth(startYear: number, endYear: number) {
    const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    // Assume 28 days in a month for simplicity
    const randomDay = Math.floor(Math.random() * 28) + 1;
    return new Date(`${randomYear}-${String(randomMonth).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`);
  }

  getRandomElement(array: string[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  getData(entity: string): any[] {
    return this.database?.[entity] || [];
  }

  setData(entity: string, data: any[]): void {
    if (this.database) {
      this.database[entity] = data;
    }
  }
}
