package com.Proekt.services;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.Proekt.dao.DataDao;
import com.Proekt.models.Album;
import com.Proekt.models.Sliki;
import com.Proekt.models.User;

public class DataServicesImpl implements DataServices {

	@Autowired
	DataDao dataDao;
	
	@Override
	public boolean addUser(User user) throws Exception {
		return dataDao.addUser(user);
	}

	@Override
	public User getUserById(long id) throws Exception {
		return dataDao.getUserById(id);
	}

	@Override
	public List<User> getUserList() throws Exception {
		return dataDao.getUserList();
	}

	@Override
	public boolean deleteUser(long id) throws Exception {
		return dataDao.deleteUser(id);
	}
	@Override
	public boolean updateUserById(long id, User updated) throws Exception {
		
	    return    dataDao.updateUserById(id, updated);
	       
		
		
	}

	@Override
	public boolean addAlbum(Album album) throws Exception {
		return dataDao.addAlbum(album);
	}

	@Override
	public Album getAlbumById(long id) throws Exception {
		return dataDao.getAlbumById(id);
	}

	@Override
	public List<Album> getAlbumList() throws Exception {
		return dataDao.getAlbumList();
	}

	@Override
	public boolean deleteAlbum(long id) throws Exception {
			return deleteAlbum(id);
	}

	@Override
	public boolean updateAlbumById(long id, Album album) throws Exception {
		return dataDao.updateAlbumById(id, album);
	}

	@Override
	public boolean addSlika(Sliki slika) throws Exception {
		return dataDao.addSlika(slika);
	}

	@Override
	public Sliki getSlikaById(long id) throws Exception {
		return dataDao.getSlikaById(id);
	}

	@Override
	public List<Sliki> getSlikiList() throws Exception {
		return dataDao.getSlikiList();
	}

	@Override
	public boolean deleteSlika(long id) throws Exception {
		return dataDao.deleteSlika(id);
	}

	@Override
	public boolean updateSlikaById(long id, Sliki slika) throws Exception {
		return dataDao.updateSlikaById(id, slika);
	}

	@Override
	public User getUserByUsername(String name) throws Exception {
		return dataDao.getUserByUsername(name);
	}

	@Override
	public boolean checkUserName(String name) throws Exception {
		return dataDao.checkUserName( name);
	}

}
