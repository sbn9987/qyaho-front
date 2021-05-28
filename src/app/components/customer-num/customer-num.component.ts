import { Component, OnInit } from '@angular/core';
import { Cus_num } from "../../models/cus.num"
import { CustomerNumService } from "../../services/customers_num.service";
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-customer-num',
  templateUrl: './customer-num.component.html',
  styleUrls: ['./customer-num.component.scss']
})
export class CustomerNumComponent implements OnInit {

  customers: Cus_num[] = [];
  customerForm: FormGroup;
  selectedCustomer: Cus_num = new Cus_num();
  customersQuantity: number = 0;

  constructor(private customer1Service: CustomerNumService, private _builder: FormBuilder) {
    this.customer1Service.getCustomerNums().subscribe((data) => {
      this.customers = data;
      this.customersQuantity = data.length;
    });

    this.customerForm = this._builder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      avatar: ["", Validators.required],
    });
  }
  ngOnInit(): void {

  }

  _blankControls() {
    this.customerForm.get("name").reset();
    this.customerForm.get("email").reset();
    this.customerForm.get("username").reset();
    this.customerForm.get("password").reset();
    this.customerForm.get("birth").reset();
  }

  manageSubmit(values: Cus_num) {
    if (this.selectedCustomer._id === undefined) {
      this.customer1Service.addCustomerNum(values).subscribe((data) => {
        return this.customers.push(data);
      });
      this.customersQuantity = this.customersQuantity + 1;
      Swal.fire({
        title: "예약 성공! ",
        icon: "success",
        confirmButtonText: "Cool",
      });
    } else {
      this.customer1Service.editCustomerNum(this.selectedCustomer._id, values);

      const index = this.customers.findIndex(
        (user) => user._id === this.selectedCustomer._id
      );
      this.customers[index].name = this.customerForm.get("first_name").value;
      this.customers[index].email = this.customerForm.get("last_name").value;
      this.customers[index].username = this.customerForm.get("email").value;
      this.customers[index].password = this.customerForm.get("avatar").value;
      this.customers[index].birth = this.customerForm.get("avatar").value;
      Swal.fire({
        title: "예약이 수정되었습니다!",
        icon: "success",
        confirmButtonText: "Cool",
      });
    }
    this.selectedCustomer = new Cus_num();
    this._blankControls();
  }
  // 수정, 삭제
  deleteCustomer(id: string) {
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
      this.customer1Service.deleteCustomerNum(id);
      this.customers = this.customers.filter((customer) => customer._id !== id);
      this.customersQuantity = this.customersQuantity - 1;
       Swal.fire("Deleted!", "The employee has been deleted.", "success");
     }
  });
  }

   editCustomer(customer: Cus_num) {
    this.selectedCustomer = customer;
    this.customerForm.get("first_name").setValue(this.selectedCustomer.name);
     this.customerForm.get("last_name").setValue(this.selectedCustomer.email);
     this.customerForm.get("email").setValue(this.selectedCustomer.username);
     this.customerForm.get("avatar").setValue(this.selectedCustomer.password);
    this.customerForm.get("avatar").setValue(this.selectedCustomer.birth);
   }
}
