package com.eudorahack.campus.repository;

import com.eudorahack.campus.domain.Localizacao;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Localizacao entity.
 */
@SuppressWarnings("unused")
public interface LocalizacaoRepository extends JpaRepository<Localizacao,Long> {

}
