package com.eudorahack.campus.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eudorahack.campus.domain.Revendedora;

import com.eudorahack.campus.repository.RevendedoraRepository;
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
 * REST controller for managing Revendedora.
 */
@RestController
@RequestMapping("/api")
public class RevendedoraResource {

    private final Logger log = LoggerFactory.getLogger(RevendedoraResource.class);
        
    @Inject
    private RevendedoraRepository revendedoraRepository;

    /**
     * POST  /revendedoras : Create a new revendedora.
     *
     * @param revendedora the revendedora to create
     * @return the ResponseEntity with status 201 (Created) and with body the new revendedora, or with status 400 (Bad Request) if the revendedora has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/revendedoras",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Revendedora> createRevendedora(@RequestBody Revendedora revendedora) throws URISyntaxException {
        log.debug("REST request to save Revendedora : {}", revendedora);
        if (revendedora.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("revendedora", "idexists", "A new revendedora cannot already have an ID")).body(null);
        }
        Revendedora result = revendedoraRepository.save(revendedora);
        return ResponseEntity.created(new URI("/api/revendedoras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("revendedora", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /revendedoras : Updates an existing revendedora.
     *
     * @param revendedora the revendedora to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated revendedora,
     * or with status 400 (Bad Request) if the revendedora is not valid,
     * or with status 500 (Internal Server Error) if the revendedora couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/revendedoras",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Revendedora> updateRevendedora(@RequestBody Revendedora revendedora) throws URISyntaxException {
        log.debug("REST request to update Revendedora : {}", revendedora);
        if (revendedora.getId() == null) {
            return createRevendedora(revendedora);
        }
        Revendedora result = revendedoraRepository.save(revendedora);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("revendedora", revendedora.getId().toString()))
            .body(result);
    }

    /**
     * GET  /revendedoras : get all the revendedoras.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of revendedoras in body
     */
    @RequestMapping(value = "/revendedoras",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Revendedora> getAllRevendedoras() {
        log.debug("REST request to get all Revendedoras");
        List<Revendedora> revendedoras = revendedoraRepository.findAll();
        return revendedoras;
    }

    /**
     * GET  /revendedoras/:id : get the "id" revendedora.
     *
     * @param id the id of the revendedora to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the revendedora, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/revendedoras/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Revendedora> getRevendedora(@PathVariable Long id) {
        log.debug("REST request to get Revendedora : {}", id);
        Revendedora revendedora = revendedoraRepository.findOne(id);
        return Optional.ofNullable(revendedora)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /revendedoras/:id : delete the "id" revendedora.
     *
     * @param id the id of the revendedora to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/revendedoras/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteRevendedora(@PathVariable Long id) {
        log.debug("REST request to delete Revendedora : {}", id);
        revendedoraRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("revendedora", id.toString())).build();
    }

    @RequestMapping(value = "/search/getRevendedoraByUser/{idUser}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public Revendedora getRevendedoraByUser(@PathVariable Long idUser) {
        Revendedora revendedora = revendedoraRepository.getRevendedoraByUser(idUser);
        return revendedora;
    }

}
