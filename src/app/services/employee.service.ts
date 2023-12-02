import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InMemoryDataService } from '../core/in-memory-data.service'; // Update with the correct path

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  readonly entityName = 'employees';

  constructor(private inMemoryDataService: InMemoryDataService) {}

  addEmployee(data: any): Observable<any> {
    const employees = this.inMemoryDataService.getData(this.entityName);
    const newEmployee = { ...data, id: employees.length + 1 };
    employees.push(newEmployee);
    this.inMemoryDataService.setData(this.entityName, employees);
    return of(newEmployee);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    const employees = this.inMemoryDataService.getData(this.entityName);
    const index = employees.findIndex((employee) => employee.id === id);

    if (index !== -1) {
      employees[index] = { ...employees[index], ...data };
      this.inMemoryDataService.setData(this.entityName, employees);
      return of(employees[index]);
    } else {
      return of(null); // Employee not found
    }
  }

  getEmployeeList(): Observable<any[]> {
    const employees = this.inMemoryDataService.getData(this.entityName);
    return of(employees);
  }

  deleteEmployee(id: number): Observable<any> {
    const employees = this.inMemoryDataService.getData(this.entityName);
    const index = employees.findIndex((employee) => employee.id === id);

    if (index !== -1) {
      const deletedEmployee = employees.splice(index, 1)[0];
      this.inMemoryDataService.setData(this.entityName, employees);
      return of(deletedEmployee);
    } else {
      return of(null); // Employee not found
    }
  }
}
