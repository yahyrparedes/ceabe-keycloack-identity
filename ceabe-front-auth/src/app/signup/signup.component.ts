import {UserService} from './../services/user.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormSupplier, Supplier} from "../models/supplier";
import {Category} from "../models/category";
import {FormGroup} from "@angular/forms";
import {RxFormBuilder} from "@rxweb/reactive-form-validators";
import {RecaptchaErrorParameters} from "ng-recaptcha";
import {Contact} from "../models/contact";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  activeIds: string[] = ['categories', 'supplier', 'representative'];

  ruc: string;
  loading: boolean;
  supplier: Supplier = new Supplier();
  categoryList: Category[] = [];
  categorySelect: Category[] = [];
  contacts: Contact[] = [new Contact(), ]
  fg: FormGroup;
  captcha: boolean = false;

  constructor(private userService: UserService, private router: Router,
              private rxFormBuilder: RxFormBuilder) {
  }

  ngOnInit(): void {
    let formSupplier = new FormSupplier();

    this.fg = this.rxFormBuilder.formGroup(formSupplier);
    this.loadCategoryList();
    // this.searchRUC("10738840718");

  }

  onRegisterSupplier(): void {
    console.log(this.fg.value)

    if (!this.captcha) {
      console.log('error', 'CEABE', 'Se debe validar el captcha para registrarse.');
    } else if (!this.fg.valid) {
      console.log('error', 'CEABE', 'Se deben proporcionar todos los campos requeridos.');
    } else if (this.supplier.businessName == null || this.supplier.businessName.length == 0) {
      console.log('error', 'CEABE', 'Se debe buscar un ruc.');
    } else if (this.categorySelect.length == 0) {
      console.log('error', 'CEABE', 'Se deben seleccionar categorias.');
    } else {
      this.loading = true;
      this.fg.value.ruc = this.ruc
      this.fg.value.businessName = this.supplier.businessName
      this.fg.value.category = this.categorySelect
      console.log(this.fg.value)
      this.userService.registerSupplier(this.fg.value).subscribe(
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

  searchRUC(ruc: string) {
    if (ruc == null || ruc.toString().length < 11) {
      console.log('error', 'CEABE', 'Se debe ingresar un RUC válido');
    } else {
      this.ruc = ruc;
      this.loading = true;
      this.userService.searchByRUC(ruc).subscribe((dataItem) => {
        if (dataItem.codigo >= 1) {
          this.supplier.businessName = dataItem.dato.razonSocial
        } else {
          console.log('error', 'CEABE', dataItem.msj);
        }
        this.loading = false;
      });
    }
  }

  loadCategoryList() {
    this.userService.getCategoryList({}).subscribe((dataItem) => {
      console.log(dataItem)
      if (dataItem.codigo >= 1) {
        dataItem.dato.forEach((item) => {
          this.categoryList.push(new Category(item.id, item.nombre, item.total))
        });
        // this.categoryList = dataItem.dato;
      } else {
        console.log('error', 'CEABE', 'Se produjo un error');
      }
    });
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  showResponse(event) {
    if (event.response.length > 0) {
      this.captcha = true;
    } else {
      this.captcha = false;
    }
  }

  expireCaptchaShow(event) {
    this.captcha = false;
  }

  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

  openAll() {
    this.activeIds = ['categories', 'supplier', 'representative'];
    console.log(this.activeIds);
  }

  addContact() {
    this.contacts.push(new Contact())
  }
}
