package com.mom.backend.serviceimpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mom.backend.util.FrameworkUtil;

import com.mom.backend.util.PrintUtil;
import com.mom.backend.util.PropertyEncryptConfiguration;
import com.mom.backend.dao.MomDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor 
public class MomServiceImpl  {
	private final MomDao momDao ;
	private final FrameworkUtil frameworkUtil;
	private final PrintUtil printUtil;

	// 조회 서비스 
	public List<Map<String,Object>> getMapList(String query, Map<String,Object> param) {
		printUtil.print("MomService", "getMapList", "#", "$", "query", query, true, false, false, false);
		printUtil.print(null, null, null, "$", "param", param, false, false, true, false);

		List<Map<String,Object>> result = momDao.getMapList(query, param);
		
		return frameworkUtil.getMapList(result, query);
	}
	// 프로시저 호출 서비스 
	public List<Map<String, Object>> procMapList(String query, List<Map<String,Object>> param) {
		printUtil.print("MomService", "createMapList", "#", "$", "query", query, true, false, false, false);
		printUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		       
       	 List<Map<String,Object>> result = momDao.procMapList(query, param);
        	   return result;	

	}
	// 등록 서비스
	public List<Map<String, Object>> createMapList(String query, List<Map<String,Object>> param) {
		printUtil.print("MomService", "createMapList", "#", "$", "query", query, true, false, false, false);
		printUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		  String[] array = query.split("_");
		  if(array[0].contains(".upsert")) {
       	   List<Map<String,Object>> result = momDao.upsertMapList(query, param);
       	   return result;	
          }
          else {
       	   List<Map<String,Object>> result = momDao.createMapList(query, param);
        	   return result;	
           }	

	}
	// 수정 서비스
	public List<Map<String,Object>> modifyMapList(String query, List<Map<String,Object>> param) {
		printUtil.print("MomService", "modifyMap", "#", "$", "query", query, true, false, false, false);
		printUtil.print(null, null, null, "$", "param", param, false, true, false, false);
		
		// start 20200707 
		if(param != null && param.size() > 0 && param.get(0).get("encPassword") != null) {
			String pwd = "";			
			for(int i=0; i<param.size(); i++) {
				pwd = PropertyEncryptConfiguration.encryptPBE(param.get(i).get("encPassword").toString());
				param.get(i).put("encPassword", pwd);
			}
		}
		String[] array = query.split("_");
		
		
        if(array[0].equals("upsert")) {
        	   List<Map<String,Object>> result = momDao.upsertMapList(query, param);
        	   return result;	
        }
        else {
        	   List<Map<String,Object>> result = momDao.modifyMapList(query, param);
        	   return result;	
        }		
	}
	// 삭제 서비스
	public List<Map<String,Object>> removeMapList(String query, List<Map<String,Object>> param) {
		printUtil.print("MomService", "removeMapList", "#", "$", "query", query, true, false, false, false);
		printUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		List<Map<String,Object>> result = momDao.removeMapList(query, param);
		return result;
	}
}
