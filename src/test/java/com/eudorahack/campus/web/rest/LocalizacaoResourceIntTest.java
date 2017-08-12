package com.eudorahack.campus.web.rest;

import com.eudorahack.campus.EudorahackApp;
import com.eudorahack.campus.domain.Localizacao;
import com.eudorahack.campus.repository.LocalizacaoRepository;

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
 * Test class for the LocalizacaoResource REST controller.
 *
 * @see LocalizacaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EudorahackApp.class)
public class LocalizacaoResourceIntTest {

    private static final Double DEFAULT_LATITUDE = 1D;
    private static final Double UPDATED_LATITUDE = 2D;

    private static final Double DEFAULT_LONGITUDE = 1D;
    private static final Double UPDATED_LONGITUDE = 2D;

    @Inject
    private LocalizacaoRepository localizacaoRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restLocalizacaoMockMvc;

    private Localizacao localizacao;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        LocalizacaoResource localizacaoResource = new LocalizacaoResource();
        ReflectionTestUtils.setField(localizacaoResource, "localizacaoRepository", localizacaoRepository);
        this.restLocalizacaoMockMvc = MockMvcBuilders.standaloneSetup(localizacaoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Localizacao createEntity(EntityManager em) {
        Localizacao localizacao = new Localizacao();
        localizacao = new Localizacao()
                .latitude(DEFAULT_LATITUDE)
                .longitude(DEFAULT_LONGITUDE);
        return localizacao;
    }

    @Before
    public void initTest() {
        localizacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalizacao() throws Exception {
        int databaseSizeBeforeCreate = localizacaoRepository.findAll().size();

        // Create the Localizacao

        restLocalizacaoMockMvc.perform(post("/api/localizacaos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(localizacao)))
                .andExpect(status().isCreated());

        // Validate the Localizacao in the database
        List<Localizacao> localizacaos = localizacaoRepository.findAll();
        assertThat(localizacaos).hasSize(databaseSizeBeforeCreate + 1);
        Localizacao testLocalizacao = localizacaos.get(localizacaos.size() - 1);
        assertThat(testLocalizacao.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testLocalizacao.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
    }

    @Test
    @Transactional
    public void getAllLocalizacaos() throws Exception {
        // Initialize the database
        localizacaoRepository.saveAndFlush(localizacao);

        // Get all the localizacaos
        restLocalizacaoMockMvc.perform(get("/api/localizacaos?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(localizacao.getId().intValue())))
                .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
                .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())));
    }

    @Test
    @Transactional
    public void getLocalizacao() throws Exception {
        // Initialize the database
        localizacaoRepository.saveAndFlush(localizacao);

        // Get the localizacao
        restLocalizacaoMockMvc.perform(get("/api/localizacaos/{id}", localizacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(localizacao.getId().intValue()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingLocalizacao() throws Exception {
        // Get the localizacao
        restLocalizacaoMockMvc.perform(get("/api/localizacaos/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalizacao() throws Exception {
        // Initialize the database
        localizacaoRepository.saveAndFlush(localizacao);
        int databaseSizeBeforeUpdate = localizacaoRepository.findAll().size();

        // Update the localizacao
        Localizacao updatedLocalizacao = localizacaoRepository.findOne(localizacao.getId());
        updatedLocalizacao
                .latitude(UPDATED_LATITUDE)
                .longitude(UPDATED_LONGITUDE);

        restLocalizacaoMockMvc.perform(put("/api/localizacaos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedLocalizacao)))
                .andExpect(status().isOk());

        // Validate the Localizacao in the database
        List<Localizacao> localizacaos = localizacaoRepository.findAll();
        assertThat(localizacaos).hasSize(databaseSizeBeforeUpdate);
        Localizacao testLocalizacao = localizacaos.get(localizacaos.size() - 1);
        assertThat(testLocalizacao.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testLocalizacao.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
    }

    @Test
    @Transactional
    public void deleteLocalizacao() throws Exception {
        // Initialize the database
        localizacaoRepository.saveAndFlush(localizacao);
        int databaseSizeBeforeDelete = localizacaoRepository.findAll().size();

        // Get the localizacao
        restLocalizacaoMockMvc.perform(delete("/api/localizacaos/{id}", localizacao.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Localizacao> localizacaos = localizacaoRepository.findAll();
        assertThat(localizacaos).hasSize(databaseSizeBeforeDelete - 1);
    }
}
