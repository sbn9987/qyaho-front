import { Component, OnInit } from '@angular/core';
import { User } from "../../models/User"
import { EmployeesService } from "../../services/employees.service";
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  employees: User[] = [];
  employeeForm: FormGroup;
  selectedEmployee: User = new User();
  employeesQuantity: number = 0;

  constructor(private employesService: EmployeesService, private _builder: FormBuilder) {
    this.employesService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.employeesQuantity = data.length;
    });

    this.employeeForm = this._builder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      avatar: ["", Validators.required],
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  _blankControls() {
    this.employeeForm.get("name").reset();
    this.employeeForm.get("email").reset();
    this.employeeForm.get("username").reset();
    this.employeeForm.get("password").reset();
    this.employeeForm.get("birth").reset();
  }

  manageSubmit(values: User) {
    if (this.selectedEmployee._id === undefined) {
      this.employesService.addEmployee(values).subscribe((data) => {
        return this.employees.push(data);
      });
      this.employeesQuantity = this.employeesQuantity + 1;
      Swal.fire({
        title: "예약 성공! ",
        icon: "success",
        confirmButtonText: "Cool",
      });
    } else {
      this.employesService.editEmployee(this.selectedEmployee._id, values);

      const index = this.employees.findIndex(
        (user) => user._id === this.selectedEmployee._id
      );
      this.employees[index].name = this.employeeForm.get("first_name").value;
      this.employees[index].email = this.employeeForm.get("last_name").value;
      this.employees[index].username = this.employeeForm.get("email").value;
      this.employees[index].password = this.employeeForm.get("avatar").value;
      this.employees[index].birth = this.employeeForm.get("avatar").value;
      Swal.fire({
        title: "예약이 수정되었습니다!",
        icon: "success",
        confirmButtonText: "Cool",
      });
    }
    this.selectedEmployee = new User();
    this._blankControls();
  }
  // 수정, 삭제
  deleteEmployee(id: string) {
     Swal.fire({
     title: "Delete the employee?",
     text: "You won't be able to revert this!",
       icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
     cancelButtonColor: "#3085d6",
       confirmButtonText: "Yes, delete it!",
    }).then((result) => {
       if (result.value) {
      this.employesService.deleteEmployee(id);
      this.employees = this.employees.filter((employee) => employee._id !== id);
      this.employeesQuantity = this.employeesQuantity - 1;
       Swal.fire("Deleted!", "The employee has been deleted.", "success");
     }
  });
  }

   editEmployee(employee: User) {
    this.selectedEmployee = employee;
    this.employeeForm.get("first_name").setValue(this.selectedEmployee.name);
     this.employeeForm.get("last_name").setValue(this.selectedEmployee.email);
     this.employeeForm.get("email").setValue(this.selectedEmployee.username);
     this.employeeForm.get("avatar").setValue(this.selectedEmployee.password);
    this.employeeForm.get("avatar").setValue(this.selectedEmployee.birth);
   }
}