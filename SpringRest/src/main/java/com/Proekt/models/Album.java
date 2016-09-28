package com.Proekt.models;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonBackReference;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonManagedReference;

@Entity
@Table(name = "albumi")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Album implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private long albumId;
	private String name;
	private int number;
	@ManyToOne
	@JoinColumn(name="userId")
	@JsonIgnore
	private User user;

	@OneToMany(targetEntity=Sliki.class,mappedBy="album", cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	private Set <Sliki> sliki = new HashSet<Sliki>();
	
	
	public Set<Sliki> getSliki() {
		return sliki;
	}

	public void setSliki(Set<Sliki> sliki) {
		this.sliki = sliki;
	}

	public long getAlbumId() {
		return albumId;
	}

	public void setAlbumId(long albumId) {
		this.albumId = albumId;
	}
	@JsonBackReference
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getName() {
		return name;
	}

	public void setName(String string) {
		this.name = string;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

}
