package com.eudorahack.campus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Revendedora.
 */
@Entity
@Table(name = "revendedora")
public class Revendedora implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "status")
    private Boolean status;

    @OneToMany(mappedBy = "revendedora")
    @JsonIgnore
    private Set<Produto> produtos = new HashSet<>();

    @OneToMany(mappedBy = "revendedora")
    @JsonIgnore
    private Set<Localizacao> localizacaos = new HashSet<>();

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Revendedora latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Revendedora longitude(Double longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Boolean isStatus() {
        return status;
    }

    public Revendedora status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Set<Produto> getProdutos() {
        return produtos;
    }

    public Revendedora produtos(Set<Produto> produtos) {
        this.produtos = produtos;
        return this;
    }

    public Revendedora addProduto(Produto produto) {
        produtos.add(produto);
        produto.setRevendedora(this);
        return this;
    }

    public Revendedora removeProduto(Produto produto) {
        produtos.remove(produto);
        produto.setRevendedora(null);
        return this;
    }

    public void setProdutos(Set<Produto> produtos) {
        this.produtos = produtos;
    }

    public Set<Localizacao> getLocalizacaos() {
        return localizacaos;
    }

    public Revendedora localizacaos(Set<Localizacao> localizacaos) {
        this.localizacaos = localizacaos;
        return this;
    }

    public Revendedora addLocalizacao(Localizacao localizacao) {
        localizacaos.add(localizacao);
        localizacao.setRevendedora(this);
        return this;
    }

    public Revendedora removeLocalizacao(Localizacao localizacao) {
        localizacaos.remove(localizacao);
        localizacao.setRevendedora(null);
        return this;
    }

    public void setLocalizacaos(Set<Localizacao> localizacaos) {
        this.localizacaos = localizacaos;
    }

    public User getUser() {
        return user;
    }

    public Revendedora user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Revendedora revendedora = (Revendedora) o;
        if(revendedora.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, revendedora.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Revendedora{" +
            "id=" + id +
            ", latitude='" + latitude + "'" +
            ", longitude='" + longitude + "'" +
            ", status='" + status + "'" +
            '}';
    }
}
