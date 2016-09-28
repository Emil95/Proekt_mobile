package com.Proekt.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Map;



import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.Proekt.models.User;
import com.Proekt.models.Album;
import com.Proekt.models.Sliki;
import com.Proekt.models.Status;
import com.Proekt.services.DataServices;
import com.google.gson.JsonObject;


@Controller
@RequestMapping("/services")
public class RestController {

	@Autowired
	DataServices dataServices;

	static final Logger logger = Logger.getLogger(RestController.class);
	

	@RequestMapping(value = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	Status addUser(@RequestBody Map<String, String> filter ) {
		try {
			String username = filter.get("username");
			boolean check;
			check =	dataServices.checkUserName(username);
			if(check){
				User u = new User();
				String firstN = filter.get("firstName");
				String lastN = filter.get("lastName");
				String email = filter.get("email");
				String pass  = filter.get("password");
				u.setEmail(email);
				u.setFirstName(firstN);
				u.setLastName(lastN);
				u.setPassword(pass);
				u.setUsername(username);
				dataServices.addUser(u);
				return new Status(1, "User added Successfully !");
			}
			else {
				 return new Status(0, "Username exists !");
			}
			
		} catch (Exception e) {
			 e.printStackTrace();
			return new Status(0, e.toString());
		}

	}
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public @ResponseBody Status some() throws Exception{
		try{
		User u1 = new User();
		u1.setFirstName("Nekoj");
		u1.setLastName("Nikoj");
		u1.setEmail("nema");
		u1.setUsername("admin");
		u1.setPassword("pasent");
		
		Album a1 = new Album();
		a1.setName("ablum1");
		a1.setNumber(3);
		a1.setUser(u1);
		
		Album a2 =new Album();
		a2.setName("ablum2");
		a2.setNumber(1);
		a2.setUser(u1);
		
		Sliki s1 = new Sliki();
		s1.setComment("com1");
		s1.setUrl("url1");
		s1.setAlbum(a1);
		
	
		Sliki s2 = new Sliki();
		s2.setComment("com2");
		s2.setUrl("url2");
		s2.setAlbum(a1);
		
		Sliki s3 = new Sliki();
		s3.setComment("com3");
		s3.setUrl("url3");
		s3.setAlbum(a1);
		
		Sliki s4 = new Sliki();
		s4.setComment("com3");
		s4.setUrl("url3");
		s4.setAlbum(a2);
		
	
		(a1.getSliki()).add(s1);
		(a1.getSliki()).add(s2);
		(a2.getSliki()).add(s3);
		(a2.getSliki()).add(s4);
		
		(u1.getAlbumi()).add(a1);
		(u1.getAlbumi()).add(a2);
		
		dataServices.addUser(u1);
		
		System.out.println("done");
		return new Status(1, "Inserted data");
		}
		catch (Exception e){
			e.printStackTrace();
		}
		return null;
	}
	
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	User getEmployee(@PathVariable("id") long id) {
		User user = null;
		try {
			user = dataServices.getUserById(id);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return user;
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	List<User> getUsers() {

		List<User> userList = null;
		try {
			userList = dataServices.getUserList();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return userList;
	}

	@RequestMapping(value = "delete/{id}", method = RequestMethod.GET)
	public @ResponseBody
	Status deleteUser(@PathVariable("id") long id) {

		try {
			dataServices.deleteUser(id);
			return new Status(1, "User deleted Successfully !");
		} catch (Exception e) {
			return new Status(0, e.toString());
		}
	}
	
		@RequestMapping(value = "/update/{id}", method = RequestMethod.POST , consumes = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody Status update(@PathVariable int id, @RequestBody User u) throws Exception
		{ 
			try{
				dataServices.updateUserById(id, u);
				return new Status(1, "Updated ");
				
			}
			catch(Exception e){
			 	System.err.println(e.toString());
			}
			return null;
		
		
		}
		
		@RequestMapping(value = "/login", method = RequestMethod.POST , consumes = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody
		 User loging (@RequestBody Map<String, String> fiter ){
			
			try{
				
				String username = fiter.get("username");
				String password = fiter.get("password");
				
				User check = dataServices.getUserByUsername(username);
				
				if (check.getPassword().equals(password)){
					return check;
				}
				else 
					return null;
				
			}
			catch(Exception e){
			 	System.err.println(e.toString());
			}
			return null;
		
		}
		
		@RequestMapping(value = "/synchronize", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
		public @ResponseBody
		Status Sync(@RequestBody User u ) {
			try {
					dataServices.updateUserById(u.getUserId(), u);
					return new Status(1, "User synchronized Successfully !");
				
				
			} catch (Exception e) {
				 e.printStackTrace();
				return new Status(0, e.toString());
			}

		}
			

	
	
	
}
