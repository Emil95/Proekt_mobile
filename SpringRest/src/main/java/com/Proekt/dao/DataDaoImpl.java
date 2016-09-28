package com.Proekt.dao;

import java.util.HashSet;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;

import com.Proekt.models.Album;
import com.Proekt.models.Sliki;
import com.Proekt.models.User;

public class DataDaoImpl implements DataDao {

	@Autowired
	SessionFactory sessionFactory;
	
	Session session = null;
	Transaction tx = null;

	@Override
	public boolean addUser(User user) throws Exception {
		
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		
		session.save(user);
		tx.commit();
		session.close();

		return false;
	}

	@Override
	public User getUserById(long id) throws Exception {
		session = sessionFactory.openSession();
		User user = (User) session.load(User.class,new Long(id));
		tx = session.getTransaction();
		session.beginTransaction();
		tx.commit();
		return user;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<User> getUserList() throws Exception {
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		List<User> userList = session.createCriteria(User.class)
				.list();
		tx.commit();
		session.close();
		return userList;
	}
	
	@Override
	public boolean deleteUser(long id)
			throws Exception {
		session = sessionFactory.openSession();
		Object o = session.load(User.class, id);
		tx = session.getTransaction();
		session.beginTransaction();
		session.delete(o);
		tx.commit();
		return false;
	}
	@Override
	public boolean updateUserById(long id , User updated) throws Exception{
		 Session session = sessionFactory.openSession();
	      Transaction tx = null;
	      User u = (User) session.load(User.class, new Long(id));
         
	         u.setAlbumi(updated.getAlbumi());
		        
		        for (Album a : updated.getAlbumi()) {
		        		for (Sliki s : a.getSliki()) {
		        			s.setAlbum(a);
							(a.getSliki()).add(s);
						}
		        	a.setUser(u);	
					(u.getAlbumi()).add(a);
					
				}
		     
		    session.saveOrUpdate(u);
		     tx = session.beginTransaction();
		     tx.commit();
		     session.close();
	      
		return false;
	}

	@Override
	public boolean addAlbum(Album album) throws Exception {
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		
		session.save(album);
		tx.commit();
		session.close();

		return false;
	}

	@Override
	public Album getAlbumById(long id) throws Exception {
		session = sessionFactory.openSession();
		Album album = (Album) session.load(Album.class,
				new Long(id));
		tx = session.getTransaction();
		session.beginTransaction();
		tx.commit();
		return album;
	}

	@Override
	public List<Album> getAlbumList() throws Exception {
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		List<Album> albumList = session.createCriteria(Album.class)
				.list();
		tx.commit();
		session.close();
		return albumList;
	}

	@Override
	public boolean deleteAlbum(long id) throws Exception {
		session = sessionFactory.openSession();
		Object o = session.load(Album.class, id);
		tx = session.getTransaction();
		session.beginTransaction();
		session.delete(o);
		tx.commit();
		return false;
	}

	@Override
	public boolean updateAlbumById(long id, Album updated) throws Exception {
		session = sessionFactory.openSession();
		Album album = (Album) session.load(Album.class,
				new Long(id));
		album = updated;
		tx = session.beginTransaction();
		
		session.save(album);
		tx.commit();
		session.close();

		return false;
	}

	@Override
	public boolean addSlika(Sliki slika) throws Exception {
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		
		session.save(slika);
		tx.commit();
		session.close();

		return false;
	}

	@Override
	public Sliki getSlikaById(long id) throws Exception {
		session = sessionFactory.openSession();
		Sliki slika = (Sliki) session.load(Sliki.class,
				new Long(id));
		tx = session.getTransaction();
		session.beginTransaction();
		tx.commit();
		return slika;
	}

	@Override
	public List<Sliki> getSlikiList() throws Exception {
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		List<Sliki> slikiList = session.createCriteria(Sliki.class)
				.list();
		tx.commit();
		session.close();
		return slikiList;
	}

	@Override
	public boolean deleteSlika(long id) throws Exception {
		session = sessionFactory.openSession();
		Object o = session.load(Sliki.class, id);
		tx = session.getTransaction();
		session.beginTransaction();
		session.delete(o);
		tx.commit();
		return false;
	}

	@Override
	public boolean updateSlikaById(long id, Sliki updated) throws Exception {
		session = sessionFactory.openSession();
		Sliki slika = (Sliki) session.load(Sliki.class,
				new Long(id));
		slika = updated;
		tx = session.beginTransaction();
		
		session.save(slika);
		tx.commit();
		session.close();

		return false;
	}

	@Override
	public User getUserByUsername(String name) throws Exception {
		session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(User.class).add(Restrictions.eq("username", name));
		
		User user = (User) cr.list().get(0);
		tx = session.getTransaction();
		session.beginTransaction();
		tx.commit();
		return user;
	}

	@Override
	public boolean checkUserName(String name) throws Exception {
		session = sessionFactory.openSession();
		Criteria cr = session.createCriteria(User.class).add(Restrictions.eq("username", name));
		boolean check;
		if (cr.list().isEmpty()){
			return true;
		}
		return false;
	}

}
