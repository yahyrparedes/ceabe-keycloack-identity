import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from "../models/contact";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() title: String;
  @Input() index: number = 0;
  @Input() contact: Contact;
  formContact: FormGroup;
  @Output() sendFormEmitter = new EventEmitter<FormGroup>();
  @Output() registerFormEmitter = new EventEmitter<FormGroup>();
  @Output() removeFormEmitter = new EventEmitter<FormGroup>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formContact = this.formBuilder.group({
      name: ['', [Validators.required,]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      position: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      index: [this.index, [Validators.required]],
    })
    this.formContact.patchValue({
      name: this.contact.name,
      lastName: this.contact.lastName,
      email: this.contact.email,
      position: this.contact.position,
      phone: this.contact.phone,
    });
    this.registerForm();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formContact.controls;
  }

  registerForm() {
    this.registerFormEmitter.emit(this.formContact);
  }

  removeForm() {
    console.log("CONTACT", "remove Form")
    this.removeFormEmitter.emit(this.formContact);
  }

  sendForm() {
    this.sendFormEmitter.emit(this.formContact);
  }

}
