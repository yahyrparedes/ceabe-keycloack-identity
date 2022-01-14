package pe.gob.ceabeserviceauth.service;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.ceabeserviceauth.model.Supplier;
import pe.gob.ceabeserviceauth.repository.SupplierRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public Supplier create(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public List<Supplier> list() {
        return supplierRepository.findAll();
    }

    public void delete(Supplier supplier) {
        supplierRepository.delete(supplier);
    }

    public Optional<Supplier> detail(Long id) {
        return supplierRepository.findById(id);
    }

}
