package com.eudorahack.campus.repository;

import com.eudorahack.campus.domain.Produto;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Produto entity.
 */
@SuppressWarnings("unused")
public interface ProdutoRepository extends JpaRepository<Produto,Long> {

	@Query("select produto from Produto produto left join produto.revendedora r where r.id = null")
    List<Produto> getProdutos();

}
