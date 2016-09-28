package com.Proekt.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@Entity
@Table(name = "sliki")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Sliki implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private long slikaId;
	private String url;
	private String comment;
	@ManyToOne
	@JoinColumn(name="albumId")
	@JsonIgnore
	private Album album;
	
	
	public Album getAlbum() {
		return album;
	}

	public void setAlbum(Album album) {
		this.album = album;
	}

	public String getUrl() {
		return url;
	}

	public long getSlikaId() {
		return slikaId;
	}

	public void setSlikaId(long slikaId) {
		this.slikaId = slikaId;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String string) {
		this.comment = string;
	}
}
