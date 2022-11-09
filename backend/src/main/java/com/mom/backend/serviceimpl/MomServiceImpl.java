package com.mom.backend.serviceimpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mom.backend.util.FrameworkUtil;
import com.mom.backend.util.InterfaceUtilAdv;
import com.mom.backend.util.PrintUtil;
import com.mom.backend.util.PropertyEncryptConfiguration;
import com.mom.backend.util.SMTPUtil;
import com.mom.backend.dao.MomDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor 
public class MomServiceImpl  {
	private final MomDao momDao ;


	
	public List<Map<String,Object>> getMapList(String query, Map<String,Object> param) {
		System.out.println("서비스임플접근");
		PrintUtil.print("MomService", "getMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);

		List<Map<String,Object>> result = momDao.getMapList(query, param);
		
		return FrameworkUtil.getMapList(result, query);
	}

	public List<Map<String, Object>> procMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomService", "createMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		       
       	 List<Map<String,Object>> result = momDao.procMapList(query, param);
        	   return result;	

	}

	public List<Map<String, Object>> createMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomService", "createMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		

		/*
		 * if(param != null && param.size() > 0 && param.get(0).get("encPassword") !=
		 * null) { String pwd = "";
		 * 
		 * for(int i=0; i<param.size(); i++) { pwd =
		 * PropertyEncryptConfiguration.encryptPBE(param.get(i).get("encPassword").
		 * toString()); param.get(i).put("encPassword", pwd); } }
		 */
		  String[] array = query.split("_");
		  if(array[0].contains(".upsert")) {
       	   List<Map<String,Object>> result = momDao.upsertMapList(query, param);
       	   return result;	
          }
          else {
       	   List<Map<String,Object>> result = momDao.createMapList(query, param);
        	   return result;	
           }	

		/*
		 * if(result.get("result").toString().equals("success") &&
		 * result.get("v_if_flag") != null &&
		 * result.get("v_if_flag").toString().equals("Y")) { for(int i = 0; i <
		 * param.size(); i++) { param.get(i).put("tableId", result.get("v_if_table"));
		 * if( param.get(i).get("crudFlag") == null) { param.get(i).put("crudFlag",
		 * "C"); }
		 * 
		 * }
		 * 
		 * InterfaceUtilAdv.writeOut(this, param); }
		 * 
		 * 
		 * if(!result.get("result").toString().equals("fail") && param.size() > 0 &&
		 * param.get(0).get("mailFlag") != null &&
		 * "Y".equals(param.get(0).get("mailFlag").toString())) { boolean rtn =
		 * SMTPUtil.sendMail(this, query, param); }
		 */

	}
	
	public List<Map<String,Object>> modifyMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomService", "modifyMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, false);
		
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


	public List<Map<String,Object>> removeMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomService", "removeMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		List<Map<String,Object>> result = momDao.removeMapList(query, param);

		/*
		 * if(result.get("result").toString().equals("success") &&
		 * result.get("v_if_flag") != null &&
		 * result.get("v_if_flag").toString().equals("Y")) { for(int i = 0; i <
		 * param.size(); i++) { param.get(i).put("tableId", result.get("v_if_table"));
		 * param.get(i).put("crudFlag", "D"); }
		 * 
		 * InterfaceUtilAdv.writeOut(this, param); }
		 */

		return result;
	}
}
