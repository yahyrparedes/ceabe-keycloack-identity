package pe.gob.ceabeserviceauth.controller;

import pe.gob.ceabeserviceauth.dto.ResponseMessage;
import pe.gob.ceabeserviceauth.model.UserKeycloak;
import pe.gob.ceabeserviceauth.service.KeycloakService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/supplier")
public class SupplierController {

    @Autowired
    private KeycloakService keycloakService;

    @PostMapping("/create")
    public ResponseEntity<ResponseMessage> create(@RequestBody UserKeycloak userKeycloak) {
        Object[] obj = keycloakService.createUser(userKeycloak);
        int status = (int) obj[0];
        ResponseMessage message = (ResponseMessage) obj[1];
        return ResponseEntity.status(status).body(message);
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


