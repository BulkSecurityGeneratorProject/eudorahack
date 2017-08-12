package com.eudorahack.campus.web.rest;

import com.eudorahack.campus.EudorahackApp;
import com.eudorahack.campus.domain.Revendedora;
import com.eudorahack.campus.repository.RevendedoraRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RevendedoraResource REST controller.
 *
 * @see RevendedoraResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EudorahackApp.class)
public class RevendedoraResourceIntTest {

    private static final Double DEFAULT_LATITUDE = 1D;
    private static final Double UPDATED_LATITUDE = 2D;

    private static final Double DEFAULT_LONGITUDE = 1D;
    private static final Double UPDATED_LONGITUDE = 2D;

    private static final Boolean DEFAULT_STATUS = false;
    private static final Boolean UPDATED_STATUS = true;

    @Inject
    private RevendedoraRepository revendedoraRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restRevendedoraMockMvc;

    private Revendedora revendedora;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        RevendedoraResource revendedoraResource = new RevendedoraResource();
        ReflectionTestUtils.setField(revendedoraResource, "revendedoraRepository", revendedoraRepository);
        this.restRevendedoraMockMvc = MockMvcBuilders.standaloneSetup(revendedoraResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Revendedora createEntity(EntityManager em) {
        Revendedora revendedora = new Revendedora();
        revendedora = new Revendedora()
                .latitude(DEFAULT_LATITUDE)
                .longitude(DEFAULT_LONGITUDE)
                .status(DEFAULT_STATUS);
        return revendedora;
    }

    @Before
    public void initTest() {
        revendedora = createEntity(em);
    }

    @Test
    @Transactional
    public void createRevendedora() throws Exception {
        int databaseSizeBeforeCreate = revendedoraRepository.findAll().size();

        // Create the Revendedora

        restRevendedoraMockMvc.perform(post("/api/revendedoras")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(revendedora)))
                .andExpect(status().isCreated());

        // Validate the Revendedora in the database
        List<Revendedora> revendedoras = revendedoraRepository.findAll();
        assertThat(revendedoras).hasSize(databaseSizeBeforeCreate + 1);
        Revendedora testRevendedora = revendedoras.get(revendedoras.size() - 1);
        assertThat(testRevendedora.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testRevendedora.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testRevendedora.isStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void getAllRevendedoras() throws Exception {
        // Initialize the database
        revendedoraRepository.saveAndFlush(revendedora);

        // Get all the revendedoras
        restRevendedoraMockMvc.perform(get("/api/revendedoras?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(revendedora.getId().intValue())))
                .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
                .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())))
                .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())));
    }

    @Test
    @Transactional
    public void getRevendedora() throws Exception {
        // Initialize the database
        revendedoraRepository.saveAndFlush(revendedora);

        // Get the revendedora
        restRevendedoraMockMvc.perform(get("/api/revendedoras/{id}", revendedora.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(revendedora.getId().intValue()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRevendedora() throws Exception {
        // Get the revendedora
        restRevendedoraMockMvc.perform(get("/api/revendedoras/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRevendedora() throws Exception {
        // Initialize the database
        revendedoraRepository.saveAndFlush(revendedora);
        int databaseSizeBeforeUpdate = revendedoraRepository.findAll().size();

        // Update the revendedora
        Revendedora updatedRevendedora = revendedoraRepository.findOne(revendedora.getId());
        updatedRevendedora
                .latitude(UPDATED_LATITUDE)
                .longitude(UPDATED_LONGITUDE)
                .status(UPDATED_STATUS);

        restRevendedoraMockMvc.perform(put("/api/revendedoras")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedRevendedora)))
                .andExpect(status().isOk());

        // Validate the Revendedora in the database
        List<Revendedora> revendedoras = revendedoraRepository.findAll();
        assertThat(revendedoras).hasSize(databaseSizeBeforeUpdate);
        Revendedora testRevendedora = revendedoras.get(revendedoras.size() - 1);
        assertThat(testRevendedora.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testRevendedora.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testRevendedora.isStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void deleteRevendedora() throws Exception {
        // Initialize the database
        revendedoraRepository.saveAndFlush(revendedora);
        int databaseSizeBeforeDelete = revendedoraRepository.findAll().size();

        // Get the revendedora
        restRevendedoraMockMvc.perform(delete("/api/revendedoras/{id}", revendedora.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Revendedora> revendedoras = revendedoraRepository.findAll();
        assertThat(revendedoras).hasSize(databaseSizeBeforeDelete - 1);
    }
}
