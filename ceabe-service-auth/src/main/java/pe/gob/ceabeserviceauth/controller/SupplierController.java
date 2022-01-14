package pe.gob.ceabeserviceauth.controller;

import org.springframework.http.HttpStatus;
import pe.gob.ceabeserviceauth.dto.ResponseKeycloak;
import pe.gob.ceabeserviceauth.model.Category;
import pe.gob.ceabeserviceauth.model.Supplier;
import pe.gob.ceabeserviceauth.model.UserKeycloak;
import pe.gob.ceabeserviceauth.service.KeycloakService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.gob.ceabeserviceauth.service.SupplierService;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("api/supplier")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private KeycloakService keycloakService;


    @PostMapping("/register")
    public ResponseEntity<ResponseKeycloak> create(@RequestBody Supplier supplier) {
        UserKeycloak userKeycloak = new UserKeycloak(supplier.getRuc(), supplier.getEmail(), supplier.getBusinessName(), supplier.getRepresentative(), supplier.getRuc());
        ResponseKeycloak responseKeycloak = keycloakService.createUser(userKeycloak);
        System.out.println(responseKeycloak.getId());
        if (responseKeycloak.isSuccess()) {
            supplier.setId(responseKeycloak.getId());

//            List<Category> categories = new ArrayList<>();
//            for (Category category : supplier.categories) {
//                category.setSupplier(supplier);
//                categories.add(category);
//            }
//            supplier.setCategories(categories);

            Supplier temporal = supplierService.create(supplier);

            try {
                return ResponseEntity.status(responseKeycloak.getStatus()).body(responseKeycloak);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

//            System.out.println(supplier.ruc + " " + supplier.email + " " + supplier.businessName + " " + supplier.representative + " " + supplier.ruc);
//            for (Category category : supplier.categories) {
//                System.out.println(category.getCode() + " " + category.getName());
//            }
        } else {
            return ResponseEntity.status(responseKeycloak.getStatus()).body(responseKeycloak);
        }


    }

    @GetMapping("/list")
    public List<Supplier> list() {
        return supplierService.list();
    }

}
//{
//    "categorias": [
//        {
//            "total": 0,
//            "id": 6,
//            "nombre": "INSUMO DE LABORATORIO"
//        },
//        {
//            "total": 0,
//            "id": 5,
//            "nombre": "EQUIPAMIENTO COMPLEMENTARIO"
//        },
//        {
//            "total": 0,
//            "id": 1,
//            "nombre": "PRODUCTO FARMACEUTICO"
//        },
//        {
//            "total": 0,
//            "id": 2,
//            "nombre": "DISPOSITIVO MEDICO"
//        }
//    ],
//    "ruc": "10738840718", //username
//    "razonSocial": "PAREDES ARTEAGA YAHYR ENRIQUE",
//    "correo": "demo@assdas.co",
//    "representante": "sasdf",
//    "telefono": "132546897",
//    "celular": "321546789"
//}


