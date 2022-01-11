package pe.gob.ceabeserviceauth.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.gob.ceabeserviceauth.dto.ResponseMessage;
import pe.gob.ceabeserviceauth.model.Ping;

import javax.annotation.security.RolesAllowed;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@CrossOrigin
@RequestMapping("/ping")
public class PingController {

    List<Ping> pingList = Stream.of(
            new Ping((long) 1, "Ping 1"),
            new Ping((long) 2, "Ping 2"),
            new Ping((long) 3, "Ping 3"),
            new Ping((long) 4, "Ping 4")
    ).collect(Collectors.toList());

    @GetMapping("/list")
    @RolesAllowed("ceabe-user")
    public ResponseEntity<List<Ping>> list() {
        System.out.println("LIST");
        return new ResponseEntity(pingList, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    @RolesAllowed("ceabe-user")
    public ResponseEntity<Ping> detail(@PathVariable("id") int id) {
        System.out.println("Detail");
        Ping ping = pingList.stream().filter(f -> f.getId() == id).findFirst().orElse(pingList.get(0));
        return new ResponseEntity(ping, HttpStatus.OK);
    }

    @RolesAllowed("ceabe-admin")
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Ping foo) {
        Long maxIndex = pingList.stream().max(Comparator.comparing(m -> m.getId())).get().getId();
        foo.setId(maxIndex + 1);
        pingList.add(foo);
        return new ResponseEntity(new ResponseMessage("creado"), HttpStatus.CREATED);
    }

    @RolesAllowed("ceabe-admin")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody Ping foo) {
        Ping fooUpdate = pingList.stream().filter(f -> f.getId() == id).findFirst().orElse(null);
        fooUpdate.setName(foo.getName());
        return new ResponseEntity(new ResponseMessage("actualizado"), HttpStatus.OK);
    }

    @RolesAllowed("ceabe-admin")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        Ping foo = pingList.stream().filter(f -> f.getId() == id).findFirst().orElse(null);
        pingList.remove(foo);
        return new ResponseEntity(new ResponseMessage("eliminado"), HttpStatus.OK);
    }


}
