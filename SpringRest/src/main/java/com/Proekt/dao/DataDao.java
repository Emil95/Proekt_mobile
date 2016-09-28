package com.Proekt.dao;

import java.util.List;

import com.Proekt.models.Album;
import com.Proekt.models.Sliki;
import com.Proekt.models.User;

public interface DataDao {
	///// FOR USER
	public boolean addUser(User user) throws Exception;
	public User getUserById(long id) throws Exception;
	public User getUserByUsername(String name) throws Exception;
	public List<User> getUserList() throws Exception;
	public boolean deleteUser(long id) throws Exception;
	public boolean checkUserName(String name) throws Exception;
	public boolean updateUserById(long id, User user) throws Exception;
	
	///// FOR ALBUMI
	public boolean addAlbum(Album album) throws Exception;
	public Album getAlbumById(long id) throws Exception;
	public List<Album> getAlbumList() throws Exception;
	public boolean deleteAlbum(long id) throws Exception;
	public boolean updateAlbumById(long id, Album album) throws Exception;
	
	///// FOR SLIKI
	
	public boolean addSlika(Sliki slika) throws Exception;
	public Sliki getSlikaById(long id) throws Exception;
	public List<Sliki> getSlikiList() throws Exception;
	public boolean deleteSlika(long id) throws Exception;
	public boolean updateSlikaById(long id, Sliki slika) throws Exception;
	
}
