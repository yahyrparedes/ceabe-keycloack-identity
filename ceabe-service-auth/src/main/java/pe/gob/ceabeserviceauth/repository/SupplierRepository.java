package pe.gob.ceabeserviceauth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.gob.ceabeserviceauth.model.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}
