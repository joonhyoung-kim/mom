package com.mom.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.mom.service.MomService;
import com.mom.util.FrameworkUtil;
import com.mom.util.PrintUtil;
import com.mom.util.ProgressInfo;
import com.mom.util.ReportUtil;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequestMapping("/mom")
@RequiredArgsConstructor 
public class MomController {	
	private final MomService momService;
	private final FrameworkUtil frameworkUtil;
	private final ReportUtil reportUtil;
	
	@GetMapping(value = "/createReport")
	public Map<String,Object> createReport(@RequestParam Map<String, Object> param) {
		
        System.out.println("리포트 컨트롤러 진입="+param);     
        String title = param.get("fileName").toString();
        String type  = param.get("fileType").toString();
		return reportUtil.createReport(title,type,param);
	}
	@GetMapping(value = "/progressBar")
	public Map<String,Object> getProgress(@RequestParam Map<String, Object> param) {
		//System.out.println("받아온파람"+param);
		Map<String,Object> returnMap = new HashMap<String, Object>();
		if(ProgressInfo.useYn == true) {
			returnMap.put("percent", ProgressInfo.successCount);
		}
		else {
			returnMap.put("percent", 0);
		}

		return returnMap;
	}
	@GetMapping("/request/{query}/{action}") 
	public List<Map<String,Object>> getMapList(@PathVariable String query,@PathVariable String action, @RequestParam Map<String, Object> param) {
		System.out.println("받아온쿼리="+query);
		//System.out.println("받아온파람="+param.get("DIVISION_CD"));
		System.out.println("받아온파람"+param);
		System.out.println("받아온액션"+action);
		query = frameworkUtil.removeDummy(query, action);
		param = frameworkUtil.createParam(param, action, null, null, null, null, null);
		
		PrintUtil.print("MomController", "getMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.getMapList(query, param);
	}
		
	@PostMapping("/request/{query}/{action}")
	public List<Map<String,Object>> createMapList(@PathVariable String query,@PathVariable String action, @RequestBody List<Map<String,Object>> param) {
		query = frameworkUtil.removeDummy(query, action);
		param = frameworkUtil.createParam(param, action);
		
		PrintUtil.print("MomController", "createMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.createMapList(query, param);
	}
	

	
	@PutMapping("/request/{query}/{action}")
	public List<Map<String,Object>> modifyMapList(@PathVariable String query,@PathVariable String action, @RequestBody List<Map<String,Object>> param) { 
		System.out.println("받아온쿼리="+query);
		//System.out.println("받아온파람="+param.get("DIVISION_CD"));
		System.out.println("받아온파람"+param);
		System.out.println("받아온액션"+action);
		query = frameworkUtil.removeDummy(query, action);
		param = frameworkUtil.createParam(param, action);
		
		PrintUtil.print("MomController", "modifyMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.modifyMapList(query, param);
	}

	@DeleteMapping("/request/{query}/{action}")
	public List<Map<String,Object>> removeMapList(@PathVariable String query,@PathVariable String action, @RequestBody List<Map<String,Object>> param) {
		query = frameworkUtil.removeDummy(query, action);
		param = frameworkUtil.createParam(param, action);
		
		PrintUtil.print("MomController", "createMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.removeMapList(query, param);
	}
	
	//@DeleteMapping("/request/{query}/{action}/{param}")
	//public List<Map<String,Object>> removeMapList(@PathVariable String query,@PathVariable String action, @PathVariable String param) throws JsonMappingException, JsonProcessingException, ParseException {
		//System.out.println("치환한파람"+param);
		//System.out.println("받아온액션"+action);
		//List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();
		
		//listMap = FrameworkUtil.jsonStrToListMap(param);					
		//query = FrameworkUtil.removeDummy(query, action);
		//param = FrameworkUtil.createParam(param, action);
		
		//PrintUtil.print("MomController", "removeMapList", "#", "$", "query", query, true, false, false, false);
		//PrintUtil.print(null, null, null, "$", "param", listMap, false, false, true, false);
		
		//return momService.removeMapList(query, listMap);
	//}
}
