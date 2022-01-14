package pe.gob.ceabeserviceauth.model;

import java.io.Serializable;

public class UserKeycloak implements Serializable {

    private static final long serialVersionUID = -1L;

    private String username; // ruc
    private String email; // email
    private String firstName;
    private String lastName;
    private String password;

//    "ruc": "10738840718", //username
//    "razonSocial": "PAREDES ARTEAGA YAHYR ENRIQUE",
//    "correo": "demo@assdas.co",
//    "representante": "sasdf",
//    "telefono": "132546897",
//    "celular": "321546789"


    public UserKeycloak(String username, String email, String firstName, String lastName, String password) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
