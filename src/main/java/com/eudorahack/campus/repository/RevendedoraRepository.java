package com.eudorahack.campus.repository;

import com.eudorahack.campus.domain.Revendedora;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Revendedora entity.
 */
@SuppressWarnings("unused")
public interface RevendedoraRepository extends JpaRepository<Revendedora,Long> {

}
