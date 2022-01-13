import {User} from './../models/user';
import {UserService} from './../services/user.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormSupplier, Supplier} from "../models/supplier";
import {Category} from "../models/category";
import {FormGroup} from "@angular/forms";
import {RxFormBuilder} from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // username: string;
  // email: string;
  // firstName: string;
  // lastName: string;
  // password: string;

  ruc: string = "";
  loading: boolean;
  supplier: Supplier;
  categoryList: Category[] = [];
  categorySelect: Category[] = [];
  formGroup: FormGroup;
  captcha: boolean = false;

  constructor(private userService: UserService, private router: Router, private rxFormBuilder: RxFormBuilder,) {
  }

  ngOnInit(): void {
    // this.searchRUC("10738840718");

    let formSupplier = new FormSupplier();
    this.formGroup = this.rxFormBuilder.formGroup(formSupplier);
    this.loadCategoryList();

  }

  onRegisterSupplier(): void {
    console.log(this.formGroup.value)

    if (!this.captcha) {
      console.log('error', 'CEABE', 'Se debe validar el captcha para registrarse.');
    } else if (!this.formGroup.valid) {
      console.log('error', 'CEABE', 'Se deben proporcionar todos los campos requeridos.');
    } else if (this.supplier.businessName == null || this.supplier.businessName.length == 0) {
      console.log('error', 'CEABE', 'Se debe buscar un ruc.');
    } else if (this.categorySelect.length == 0) {
      console.log('error', 'CEABE', 'Se deben seleccionar categorias.');
    } else {
      this.loading = true;
      this.formGroup.value.ruc = this.ruc
      this.formGroup.value.businessName = this.supplier.businessName
      this.formGroup.value.category = this.categorySelect
      console.log(this.formGroup.value)
      this.userService.registerSupplier(this.formGroup.value).subscribe(
        data => {
          console.log(data);
          this.volver();
        },
        err => console.log(err)
      );
    }


    // const user = new User(this.username, this.email, this.firstName, this.lastName, this.password);
    // this.userService.create(user).subscribe(
    //   data => {
    //     console.log(data);
    //     this.volver();
    //   },
    //   err => console.log(err)
    // );
  }

  searchRUC() {
    if (this.ruc == null || this.ruc.toString().length != 11) {
      console.log('error', 'CEABE', 'Se debe ingresar un RUC válido');
    } else {
      this.loading = true;
      this.userService.searchByRUC(this.ruc).subscribe((dataItem) => {
        if (dataItem.codigo >= 1) {
          this.supplier = new Supplier();
          this.supplier.businessName = dataItem.dato.razonSocial
        } else {
          this.supplier = new Supplier();
          console.log('error', 'CEABE', dataItem.msj);
        }
        this.loading = false;
      });
    }
  }

  loadCategoryList() {
    this.userService.getCategoryList({}).subscribe((dataItem) => {
      if (dataItem.codigo >= 1) {
        dataItem.dato.forEach((item) => {
          this.categoryList.push(new Category(item.id, item.nombre, item.total))
        });
        this.categoryList = dataItem.dato;
      } else {
        console.log('error', 'CEABE', 'Se produjo un error');
      }
    });
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  expireCaptchaShow(event) {
    this.captcha = false;
  }

}
