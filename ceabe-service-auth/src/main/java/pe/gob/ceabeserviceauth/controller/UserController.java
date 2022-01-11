package pe.gob.ceabeserviceauth.controller;

import pe.gob.ceabeserviceauth.dto.ResponseMessage;
import pe.gob.ceabeserviceauth.model.User;
import pe.gob.ceabeserviceauth.service.KeycloakService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    private KeycloakService keycloakService;

    @PostMapping("/create")
    public ResponseEntity<ResponseMessage> create(@RequestBody User user) {
        Object[] obj = keycloakService.createUser(user);
        int status = (int) obj[0];
        ResponseMessage message = (ResponseMessage) obj[1];
        return ResponseEntity.status(status).body(message);
    }
}


