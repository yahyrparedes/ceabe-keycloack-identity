import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {ReactiveFormConfig} from "@rxweb/reactive-form-validators";
import {DialogService} from "primeng/dynamicdialog";
import {SignupComponent} from "./signup/signup.component";

@Component({
  providers: [DialogService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.primengConfig.setTranslation({
      startsWith: "Iniciar Con",
      contains: "Contiene",
      notContains: "No contiene",
      endsWith: "Termina con",
      equals: "Igual",
      notEquals: "Diferente",
      noFilter: "No filtrar",
      lt: "Menor que",
      lte: "Menor o igual que",
      gt: "Mayor que",
      gte: "Mayor o igual que",
      is: "Es",
      isNot: "No es",
      before: "Antes",
      after: "Después",
      clear: "Limpiar",
      apply: "Aplicar",
      matchAll: "Coincidir todo",
      matchAny: "Coincidir parte",
      addRule: "Agregar regla",
      removeRule: "Quitar regla",
      accept: "Si",
      reject: "No",
      choose: "Elegir",
      upload: "Cargar",
      cancel: "Cancelar",
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      today: "Hoy",
      weekHeader: "Sm",
      weak: 'Débil',
      medium: 'Medio',
      strong: 'Fuerte',
      passwordPrompt: 'Ingrese una contraseña',
      emptyMessage: 'No se encontraron registros',
      emptyFilterMessage: 'Sin resultados',
      dateIs: "Fecha es",
      dateIsNot: "Fecha no es",
      dateAfter: "Fecha después de",
      dateBefore: "Fecha antes de"
    });
    ReactiveFormConfig.set({
      "internationalization": {
        "dateFormat": "dmy",
        "seperator": "/"
      },
      "validationMessage": {
        "numeric": "Campo numérico.",
        "alpha": "Solo letras están permitidas.",
        "alphaNumeric": "Solo letras y números están permitidos.",
        "compare": "Los datos ingresados no coinciden.",
        "contains": "El valor no se contiene en en el input",
        "creditcard": "El número de tarjeta de crédito es incorrecto.",
        "digit": "Solo un dígito está permitido.",
        "email": "El correo no es válido.",
        "greaterThanEqualTo": "Ingrese un valor mayor o igual {{0}}.",
        "greaterThan": "Ingrese un valor mayor que {{0}}.",
        "hexColor": "Ingrese un color hexadecimal.",
        "json": "Ingrese un JSON válido.",
        "lessThanEqualTo": "Ingrese un valor menor o igual a {{0}}.",
        "lessThan": "Ingrese un valor menor que {{0}}.",
        "lowerCase": "Solo minúsculas están permitidas.",
        "maxNumber": "Ingrese un número menor o igual a {{0}}",
        "minNumber": "Ingrese un número mayor o igual a {{0}}",
        "password": "Ingrese una contraseña válida.",
        "pattern": "Se debe ingresar en el formato requerido.",
        "range": "Ingresa un valor en el rango de {{0}} a {{1}}",
        "required": "Este campo es requerido.",
        "time": "Solo se permite el formato de hora.",
        "upperCase": "Solo mayúsculas están permitidas.",
        "url": "Solo el formato de URL está permitido.",
        "zipCode": "Ingrese un código Zip válido.",
      }
    });

  }

  title = 'Ceabe Essalud';

  username: string;
  isLogged: boolean;
  isAdmin: boolean;
  token: string;

  constructor(private primengConfig: PrimeNGConfig, private dialogService: DialogService) {

  }


}
