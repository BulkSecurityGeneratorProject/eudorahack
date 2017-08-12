package com.eudorahack.campus.repository;

import com.eudorahack.campus.domain.Revendedora;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Revendedora entity.
 */
@SuppressWarnings("unused")
public interface RevendedoraRepository extends JpaRepository<Revendedora,Long> {

	@Query("select revendedora from Revendedora revendedora left join revendedora.user u where u.id = :idUser")
    Revendedora getRevendedoraByUser(@Param("idUser") Long idUser);

}
