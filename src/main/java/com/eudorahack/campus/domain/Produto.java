package com.eudorahack.campus.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Produto.
 */
@Entity
@Table(name = "produto")
public class Produto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "foto")
    private String foto;

    @Column(name = "quantidade")
    private Integer quantidade;

    @ManyToOne
    private Revendedora revendedora;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Produto nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCodigo() {
        return codigo;
    }

    public Produto codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getFoto() {
        return foto;
    }

    public Produto foto(String foto) {
        this.foto = foto;
        return this;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public Produto quantidade(Integer quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Revendedora getRevendedora() {
        return revendedora;
    }

    public Produto revendedora(Revendedora revendedora) {
        this.revendedora = revendedora;
        return this;
    }

    public void setRevendedora(Revendedora revendedora) {
        this.revendedora = revendedora;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Produto produto = (Produto) o;
        if(produto.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, produto.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Produto{" +
            "id=" + id +
            ", nome='" + nome + "'" +
            ", codigo='" + codigo + "'" +
            ", foto='" + foto + "'" +
            ", quantidade='" + quantidade + "'" +
            '}';
    }
}
