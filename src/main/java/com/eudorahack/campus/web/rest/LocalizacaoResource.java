package com.eudorahack.campus.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eudorahack.campus.domain.Localizacao;

import com.eudorahack.campus.repository.LocalizacaoRepository;
import com.eudorahack.campus.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Localizacao.
 */
@RestController
@RequestMapping("/api")
public class LocalizacaoResource {

    private final Logger log = LoggerFactory.getLogger(LocalizacaoResource.class);
        
    @Inject
    private LocalizacaoRepository localizacaoRepository;

    /**
     * POST  /localizacaos : Create a new localizacao.
     *
     * @param localizacao the localizacao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new localizacao, or with status 400 (Bad Request) if the localizacao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/localizacaos",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Localizacao> createLocalizacao(@RequestBody Localizacao localizacao) throws URISyntaxException {
        log.debug("REST request to save Localizacao : {}", localizacao);
        if (localizacao.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("localizacao", "idexists", "A new localizacao cannot already have an ID")).body(null);
        }
        Localizacao result = localizacaoRepository.save(localizacao);
        return ResponseEntity.created(new URI("/api/localizacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("localizacao", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /localizacaos : Updates an existing localizacao.
     *
     * @param localizacao the localizacao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated localizacao,
     * or with status 400 (Bad Request) if the localizacao is not valid,
     * or with status 500 (Internal Server Error) if the localizacao couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/localizacaos",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Localizacao> updateLocalizacao(@RequestBody Localizacao localizacao) throws URISyntaxException {
        log.debug("REST request to update Localizacao : {}", localizacao);
        if (localizacao.getId() == null) {
            return createLocalizacao(localizacao);
        }
        Localizacao result = localizacaoRepository.save(localizacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("localizacao", localizacao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /localizacaos : get all the localizacaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of localizacaos in body
     */
    @RequestMapping(value = "/localizacaos",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Localizacao> getAllLocalizacaos() {
        log.debug("REST request to get all Localizacaos");
        List<Localizacao> localizacaos = localizacaoRepository.findAll();
        return localizacaos;
    }

    /**
     * GET  /localizacaos/:id : get the "id" localizacao.
     *
     * @param id the id of the localizacao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the localizacao, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/localizacaos/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Localizacao> getLocalizacao(@PathVariable Long id) {
        log.debug("REST request to get Localizacao : {}", id);
        Localizacao localizacao = localizacaoRepository.findOne(id);
        return Optional.ofNullable(localizacao)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /localizacaos/:id : delete the "id" localizacao.
     *
     * @param id the id of the localizacao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/localizacaos/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteLocalizacao(@PathVariable Long id) {
        log.debug("REST request to delete Localizacao : {}", id);
        localizacaoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("localizacao", id.toString())).build();
    }

}
