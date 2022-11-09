package com.mom.backend.jwt;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mom.backend.dao.MomDao;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	@Autowired
	private MomDao momDao;

	@Override
	public UserDetails loadUserByUsername(String clientId) throws UsernameNotFoundException {
		String serverPw = "";
		Map<String, Object> paramMap = new HashMap<String, Object>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		paramMap.put("userId", clientId);
		paramMap.put("companyCd", JwtLoginInfo.companyCd);
		paramMap.put("divisionCd", JwtLoginInfo.divisionCd);		
		paramMap.put("comboType", JwtLoginInfo.comboType);
		//paramMap.put("companyCd","");
		if(clientId.equals("master")) {
			if(paramMap.get("comboType").equals("company")) {
				JwtLoginInfo.resultMapList = momDao.getMapList("com.mom.backend.DD.get_DD00012", paramMap); // 로그인 결과 담기
				//resultMap = momDao.getMapList("com.mom.backend.XUSM1010.get_userInfo", paramMap).get(0); // 로그인 결과 담기
				resultMap.put("password", JwtLoginInfo.password);
				// System.out.println("컴퍼니리스트조회성공="+JwtLoginInfo.resultMapList);
			}
			else {
				JwtLoginInfo.resultMapList = momDao.getMapList("com.mom.backend.DD.get_DD00013", paramMap); // 로그인 결과 담기
				resultMap.put("password", JwtLoginInfo.password);
				//resultMap = momDao.getMapList("com.mom.backend.XUSM1010.get_userInfo", paramMap).get(0); // 로그인 결과 담기
				// System.out.println("디비전리스트조회성공="+JwtLoginInfo.resultMapList);
			}
			
		}
		else {
			
			if(momDao.getMapList("com.mom.backend.XUSM1010.get_userInfo", paramMap).size()== 0) {
				throw new UsernameNotFoundException("User not found with username: " + clientId);	
			}
			else {
				 resultMap = momDao.getMapList("com.mom.backend.XUSM1010.get_userInfo", paramMap).get(0); // 로그인 결과 담기
			}
			 
			  
		}
			System.out.println("pw결과=" + resultMap.get("password"));
			if (resultMap.get("password") != null) {
				 serverPw = resultMap.get("password").toString();
				 if(JwtLoginInfo.userInfo.get(clientId) != null) {
					 JwtLoginInfo.userInfo.remove(clientId);
				 }				 
				 JwtLoginInfo.userInfo.put(clientId, serverPw);
				 if (!resultMap.get("password").toString().equals("")) {
					 System.out.println("패스워드존재");
					 return new User(clientId, serverPw, new ArrayList<>());
				}
				 else {
					 System.out.println("패스워드값없음!");
					 throw new UsernameNotFoundException("User not found with username: " + clientId);	
				 }
			}
			else {
				   System.out.println("패스워드조회결과없음!");
				   throw new UsernameNotFoundException("User not found with username: " + clientId);	
			}
		
		
			
		
	

	}


}
