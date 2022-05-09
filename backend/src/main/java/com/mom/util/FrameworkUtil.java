package com.mom.util;

import java.io.IOException;
import java.io.SequenceInputStream;
import java.io.UnsupportedEncodingException;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.URLDecoder;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mom.jwt.JwtUserDetailsService;
//import com.thirautech.framework.security.manager.AuthManager;
import com.mom.service.MomService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FrameworkUtil {
	private final PasswordEncoder passwordEncoder;
	private  final JwtUserDetailsService userDetailsService;
	// private final Map<String, Object> multiLanguage;

	/*
	 * @Autowired public FrameworkUtil(PasswordEncoder passwordEncoder, Map<String,
	 * Object> multiLanguage){ this.passwordEncoder = passwordEncoder;
	 * this.multiLanguage = multiLanguage; }
	 */

	// Deprecated
	public static List<Map<String, Object>> toCamelCase(List<Map<String, Object>> oldList) {
		return oldList;
		/*
		 * if(oldList == null || oldList.size() < 1 || 1 == 1) { return oldList; }
		 * 
		 * List<Map<String,Object>> newList = new ArrayList<Map<String,Object>>();
		 * for(int i = 0; i < oldList.size(); i++) { Map<String, Object> oldMap =
		 * oldList.get(i); if(oldMap == null || oldMap.size() < 1) {
		 * newList.add(oldMap); continue; }
		 * 
		 * Map<String, Object> newMap = new HashMap<String, Object>(); Iterator<String>
		 * iteratorKey = oldMap.keySet().iterator(); while (iteratorKey.hasNext()) {
		 * String oldKey = iteratorKey.next(); if(oldKey.indexOf("_") < 0) {
		 * newMap.put(oldKey, oldMap.get(oldKey)); continue; } String newKey = "";
		 * for(int j = 0; j < oldKey.length(); j++) { if(oldKey.charAt(j) == '_' && j <
		 * oldKey.length()-1) { newKey += Character.toUpperCase(oldKey.charAt(j+1));
		 * j++; continue; } else if(Character.isUpperCase(oldKey.charAt(j))) { newKey +=
		 * Character.toLowerCase(oldKey.charAt(j)); } else { newKey += oldKey.charAt(j);
		 * } }
		 * 
		 * newMap.put(newKey, oldMap.get(oldKey)); }
		 * 
		 * oldMap.clear(); oldMap = null;
		 * 
		 * newList.add(newMap); }
		 * 
		 * return newList;
		 */
	}

	public static String toCamelCase(String underScore) {
		if (underScore.indexOf('_') < 0 && Character.isLowerCase(underScore.charAt(0))) {
			return underScore;
		}
		StringBuilder result = new StringBuilder();
		boolean nextUpper = false;
		int len = underScore.length();

		for (int i = 0; i < len; i++) {
			char currentChar = underScore.charAt(i);
			if (currentChar == '_') {
				nextUpper = true;
			} else {
				if (nextUpper) {
					result.append(Character.toUpperCase(currentChar));
					nextUpper = false;
				} else {
					result.append(Character.toLowerCase(currentChar));
				}
			}
		}
		return result.toString();
	}

	public static List<Map<String, Object>> jsonStrToListMap(String strParam)
			throws ParseException, JsonMappingException, JsonProcessingException {
		System.out.println("넘겨받은 문자=" + strParam);
		List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();
		Map<String, Object> map = new HashMap<String, Object>();
		String[] strArray = strParam.replaceAll("=", ":").replaceAll("&", ",").split(",");
		for (int i = 0; i < strArray.length; i++) {
			String[] strItem = strArray[i].split(":");
			map.put(strItem[0], strItem[1]);
		}

		listMap.add(map);
		return listMap;
	}

	public static List<Map<String, Object>> jsonStrToListMap2(String jsonString)
			throws ParseException, JsonMappingException, JsonProcessingException {
		System.out.println("넘겨받은 json문자=" + jsonString);
		List<Map<String, Object>> listMap = new ObjectMapper().readValue(jsonString,
				new TypeReference<List<Map<String, Object>>>() {
				});
		return listMap;
	}

	public static Map<String, Object> toCamelCase(Map<String, Object> oldMap) {

		return oldMap;

		/*
		 * if(oldMap == null || oldMap.size() < 1 || 1 == 1) { return oldMap; }
		 * 
		 * Map<String, Object> newMap = new HashMap<String, Object>(); Iterator<String>
		 * iteratorKey = oldMap.keySet().iterator(); while (iteratorKey.hasNext()) {
		 * String oldKey = iteratorKey.next(); if(oldKey.indexOf("_") < 0) {
		 * newMap.put(oldKey, oldMap.get(oldKey)); continue; } String newKey = "";
		 * for(int i = 0; i < oldKey.length(); i++) { if(oldKey.charAt(i) == '_' && i <
		 * oldKey.length()-1) { newKey += Character.toUpperCase(oldKey.charAt(i+1));
		 * i++; continue; } else if(Character.isUpperCase(oldKey.charAt(i))) { newKey +=
		 * Character.toLowerCase(oldKey.charAt(i)); } else { newKey += oldKey.charAt(i);
		 * } }
		 * 
		 * newMap.put(newKey, oldMap.get(oldKey)); }
		 * 
		 * oldMap.clear(); oldMap = null;
		 * 
		 * return newMap;
		 */
	}

	/*
	 * public String checkMultiLanguage(MomService momService, String companyCd,
	 * String divisionCd, String locale) {
	 * 
	 * if(multiLanguage == null) { multiLanguage = new HashMap<String, Object>(); }
	 * 
	 * 
	 * 
	 * if(AuthManager.getSessionAttribute("userId") == null) { return null; }
	 * 
	 * 
	 * if( ( FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale +
	 * "SERVER") != null && ((Map<String,
	 * Object>)FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale +
	 * "SERVER")).size() > 0 ) || //( //multiLanguage.get(companyCd + divisionCd +
	 * locale + "XML") != null && //((Map<String,
	 * Object>)multiLanguage.get(companyCd + divisionCd + locale + "XML")).size() >
	 * 0 //) ) { return companyCd + divisionCd + locale; }
	 * 
	 * String query = "com.thirautech.mom.lang.get_language_list"; Map<String,
	 * Object> param = new HashMap<String, Object>(); param.put("companyCd",
	 * companyCd); param.put("divisionCd", divisionCd); param.put("locale", locale);
	 * param.put("widget", "SERVER");
	 * 
	 * Map<String, Object> xmlMap = new HashMap<String, Object>();
	 * List<Map<String,Object>> list = momService.getMapList(query, param); for(int
	 * i = 0; i < list.size(); i++) {
	 * if(list.get(i).get("pageId").toString().equals("SERVER")) {
	 * serverMap.put(list.get(i).get("codeType").toString(),
	 * list.get(i).get("keyword").toString()); } else {
	 * xmlMap.put(list.get(i).get("codeType").toString(),
	 * list.get(i).get("keyword").toString()); //} }
	 * 
	 * //FrameworkUtil.multiLanguage.put(companyCd + divisionCd + locale + "SERVER",
	 * serverMap); //multiLanguage.put(companyCd + divisionCd + locale + "XML",
	 * xmlMap);
	 * 
	 * return companyCd + divisionCd + locale; }
	 */

	// flag means "SERVER" or "XML", key1 means key of Multi-Lang
	/*
	 * public static String getMultiMessage(String flag, String key1) { String
	 * companyCd = AuthManager.getSessionAttribute("companyCd").toString(); String
	 * divisionCd = AuthManager.getSessionAttribute("divisionCd").toString(); String
	 * locale = AuthManager.getSessionAttribute("locale").toString();
	 * 
	 * if(FrameworkUtil.multiLanguage == null ||
	 * FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale + flag) ==
	 * null) { return null; }
	 * 
	 * @SuppressWarnings("unchecked") Map<String, Object> map = (Map<String,
	 * Object>)FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale +
	 * flag);
	 * 
	 * return map.get(key1) == null ? null : map.get(key1).toString(); }
	 */

	public  String removeDummy(String query, String crud) {
		if (query == null || query.equals("")) {
			return "";
		}
		int pos = query.lastIndexOf(".") + 1;

		if (crud.equals("R")) {
			query = query.substring(0, pos) + "get_" + query.substring(pos);
		} else if (crud.equals("C")) {
			query = query.substring(0, pos) + "create_" + query.substring(pos);
		} else if (crud.equals("CU")) {
			query = query.substring(0, pos) + "upsert_" + query.substring(pos);
		} else if (crud.equals("U")) {
			query = query.substring(0, pos) + "modify_" + query.substring(pos);
		} else if (crud.equals("D")) {
			query = query.substring(0, pos) + "remove_" + query.substring(pos);
		} else if (crud.equals("P")) {
			query = query.substring(0, pos) + "proc_" + query.substring(pos);
		}
		else {
			query = query.substring(0, pos) + "get_" + query.substring(pos);
		}

		return query;
	}

	// Deprecated.., 이제 사용 안함
	/*
	 * public static Map<String, Object> createParam(Map<String, Object> oldParam) {
	 * Map<String, Object> newParam = new HashMap<String, Object>();
	 * Iterator<String> iteratorKey = oldParam.keySet().iterator(); String strD =
	 * ""; while (iteratorKey.hasNext()) { String key = iteratorKey.next();
	 * 
	 * try { if(oldParam.get(key) == null) { newParam.put(key, null); } else { //
	 * 특수문자(+)를 ASCII 코드로 변환 strD = oldParam.get(key).toString().replaceAll("\\+",
	 * "%2B"); newParam.put(key, URLDecoder.decode(strD,
	 * StandardCharsets.UTF_8.name())); } } catch (IllegalArgumentException e) { //
	 * 특수문자 %로 에러 발생 시 [%, +]를 ASCII 코드로 변환 strD =
	 * oldParam.get(key).toString().replaceAll("\\%", "%25").replaceAll("\\+",
	 * "%2B"); try { newParam.put(key, URLDecoder.decode(strD,
	 * StandardCharsets.UTF_8.name())); } catch (Exception ex) {
	 * ex.printStackTrace(); } } catch (UnsupportedEncodingException e) { // TODO
	 * Auto-generated catch block PrintUtil.print("FrameworkUtil", "createParam",
	 * "#", "$", "URLDecoder.decode 오류", oldParam.get(key).toString() +
	 * "을 디코딩 하려다 오류 발생", true, true, true, true); e.printStackTrace();
	 * 
	 * oldParam.clear(); oldParam = null;
	 * 
	 * return new HashMap<String, Object>(); } }
	 * 
	 * oldParam.clear(); oldParam = null;
	 * 
	 * if(AuthManager.getSessionAttribute("userId") != null) { String userId =
	 * AuthManager.getSessionAttribute("userId").toString(); String companyCd =
	 * AuthManager.getSessionAttribute("companyCd").toString(); String divisionCd =
	 * AuthManager.getSessionAttribute("divisionCd").toString(); String locale =
	 * AuthManager.getSessionAttribute("locale").toString();
	 * 
	 * @SuppressWarnings("unchecked") Map<String, Object> map = (Map<String,
	 * Object>)FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale +
	 * "XML");
	 * 
	 * newParam.put("userId" , userId); newParam.put("createBy" , userId);
	 * newParam.put("updateBy" , userId); newParam.put("companyCd" , companyCd);
	 * newParam.put("divisionCd", divisionCd); if(newParam.get("locale") == null) {
	 * newParam.put("locale", locale); }
	 * 
	 * if(map != null) { iteratorKey = map.keySet().iterator(); while
	 * (iteratorKey.hasNext()) { String key1 = iteratorKey.next(); String value1 =
	 * map.get(key1).toString(); newParam.put(key1, value1); } } }
	 * 
	 * newParam.put("p_err_code", ""); newParam.put("p_err_msg" , "");
	 * 
	 * return newParam; }
	 */

	public Map<String, Object> createParam(Map<String, Object> param, String crud, Map<String, Object> map,
			String userId, String divisionCd, String companyCd, String locale) {
		/*
		 * 2020.04.04 hyjeong begin oldParam -> newParam 복사를 param 레퍼런스로 교체
		 */
		Iterator<String> iteratorKey = param.keySet().iterator();

		while (iteratorKey.hasNext()) {
			String key = iteratorKey.next();
			String strD;
			try {
				if (param.get(key) != null) {
					// 특수문자(+)를 ASCII 코드로 변환
					strD = param.get(key).toString().replaceAll("\\+", "%2B");
					param.put(key, URLDecoder.decode(strD, StandardCharsets.UTF_8.name()));
				}
			} catch (IllegalArgumentException e) {
				// 특수문자 %로 에러 발생 시 [%, +]를 ASCII 코드로 변환
				strD = param.get(key).toString().replaceAll("\\%", "%25").replaceAll("\\+", "%2B");
				try {
					param.put(key, URLDecoder.decode(strD, StandardCharsets.UTF_8.name()));
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				PrintUtil.print("FrameworkUtil", "createParam", "#", "$", "URLDecoder.decode 오류",
						param.get(key).toString() + "을 디코딩 하려다 오류 발생", true, true, true, true);
				e.printStackTrace();

				return new HashMap<String, Object>();
			}
		}

		/*
		 * if(param.get("userId") == null) { if(userId != null) { param.put("userId" ,
		 * userId); param.put("createBy", userId); param.put("updateBy", userId); } else
		 * { userId = AuthManager.getSessionAttribute("userId") == null ? null :
		 * AuthManager.getSessionAttribute("userId").toString(); if(userId != null) {
		 * param.put("userId" , userId); param.put("createBy", userId);
		 * param.put("updateBy", userId); } } } if(param.get("divisionCd") == null) {
		 * if(divisionCd != null) { param.put("divisionCd", divisionCd); } else {
		 * divisionCd = AuthManager.getSessionAttribute("divisionCd") == null ? null :
		 * AuthManager.getSessionAttribute("divisionCd").toString(); if(divisionCd !=
		 * null) { param.put("divisionCd", divisionCd); } } } if(param.get("companyCd")
		 * == null) { if(companyCd != null) { param.put("companyCd", companyCd); } else
		 * { companyCd = AuthManager.getSessionAttribute("companyCd") == null ? null :
		 * AuthManager.getSessionAttribute("companyCd").toString(); if(companyCd !=
		 * null) { param.put("companyCd", companyCd); } } } if(param.get("locale") ==
		 * null) { if(locale != null) { param.put("locale", locale); } else { locale =
		 * AuthManager.getSessionAttribute("locale") == null ? null :
		 * AuthManager.getSessionAttribute("locale").toString(); if(locale != null) {
		 * param.put("locale", locale); } } }
		 */

		if (divisionCd != null && companyCd != null && locale != null && !crud.equals("C") && !crud.equals("L")) {
			/*
			 * if(map == null) { map = (Map<String, Object>)multiLanguage.get(companyCd +
			 * divisionCd + locale + "XML"); }
			 */

			iteratorKey = map.keySet().iterator();
			while (iteratorKey.hasNext()) {
				String key1 = iteratorKey.next();
				String value1 = map.get(key1).toString();
				param.put(key1, value1);
			}
		}

		param.put("p_err_code", "");
		param.put("p_err_msg", "");

		return param;
	}

	public  List<Map<String, Object>> createParam(List<Map<String, Object>> list, String crud) {
		/*
		 * String userId = AuthManager.getSessionAttribute("userId").toString(); String
		 * companyCd = AuthManager.getSessionAttribute("companyCd").toString(); String
		 * divisionCd = AuthManager.getSessionAttribute("divisionCd").toString(); String
		 * locale = AuthManager.getSessionAttribute("locale") == null ? null :
		 * AuthManager.getSessionAttribute("locale").toString();
		 */

		/* Map<String, Object> multiMap = null; */
		/*
		 * if(!crud.equals("C") && !crud.equals("L")) { //multiMap = (Map<String,
		 * Object>)FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale +
		 * "XML"); }
		 */
          
		for (int i = 0; i < list.size(); i++) { 
			Map<String, Object> map = list.get(i);
			 if(map.get("pwEncode")!=null) {	
				if (map.get("pwEncode").toString().equals("Y")) {
					map.put("encodePw", passwordEncode(map.get("password").toString()));	
					list.remove(i);
					list.add(map);
				} 
			 }		
			if (map == null || map.isEmpty()) {
				if (i == 0) {
					return new ArrayList<Map<String, Object>>();
				}

				break;
			}

			// FrameworkUtil.createParam(map, crud, multiMap, userId, divisionCd, companyCd,
			// locale);
		}

		return list;
	}

	public static Map<String, Object> json2Map(String json) {
		/*
		 * java.nio.charset.Charset UTF8_CHARSET =
		 * java.nio.charset.Charset.forName("UTF-8");
		 */
		if (json == null || json.toString().length() < 1) {
			return null;
		}

		try {
			json = URLDecoder.decode(json, StandardCharsets.UTF_8.name());
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		String line = json.replace("{", "").replace("}", "").replace("[", "").replace("]", "").replace("\"", "");
		String[] tokens = line.split(",");
		Map<String, Object> map = new HashMap<String, Object>();
		for (int j = 0; j < tokens.length; j++) {
			tokens[j] = tokens[j].replaceAll("#22#", "\"").replaceAll("#44#", ",");
			if (tokens[j].indexOf(":") == tokens[j].length() - 1) {
				if (tokens[j].indexOf(":") < 0) {
					break;
				} else {
					map.put(tokens[j].substring(0, tokens[j].indexOf(":")).trim(), null);
				}
			} else if (tokens[j].indexOf(":") < 0) {
				int k = j - 1;
				for (; k >= 0; k--) {
					if (map.get(tokens[k].substring(0, tokens[k].indexOf(":")).trim()) != null) {
						break;
					}
				}

				map.put(tokens[k].substring(0, tokens[k].indexOf(":")).trim(),
						map.get(tokens[k].substring(0, tokens[k].indexOf(":")).trim()) + "," + tokens[j]);
			} else {
				String value = tokens[j].substring(tokens[j].indexOf(":") + 1).trim();
				if (value.equals("true")) {
					map.put(tokens[j].substring(0, tokens[j].indexOf(":")).trim(), true);
				} else if (value.equals("false")) {
					map.put(tokens[j].substring(0, tokens[j].indexOf(":")).trim(), false);
				} else {
					map.put(tokens[j].substring(0, tokens[j].indexOf(":")).trim(), value);
				}
			}
		}

		return map;
	}

	public static List<Map<String, Object>> json2List(String json) {
		if (json == null || json.toString().length() < 1) {
			return null;
		}

		String[] tokens = json.split("},");

		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for (int i = 0; i < tokens.length; i++) {
			Map<String, Object> map = FrameworkUtil.json2Map(tokens[i]);
			if (map == null) {
				return list;
			}

			list.add(map);
		}

		return list;
	}

	public static List<Map<String, Object>> map2List(Map<String, Object> map) {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		list.add(map);

		return list;
	}

	public static String isDirectQuery(String query) {
		// 2019.01.20 hyjeong begin
		return null;
		/*
		 * if(FrameworkUtil.directQueryMap == null) { FrameworkUtil.directQueryMap = new
		 * HashMap<String, Object>(); }
		 * 
		 * if(FrameworkUtil.directQueryMap.size() == 0) {
		 * FrameworkUtil.directQueryMap.put(
		 * "com.thirautech.mom.reference.itemInfo.item.get_item_list",
		 * "getItemItemList"); FrameworkUtil.directQueryMap.put(
		 * "com.thirautech.mom.plan.demand.demandPlan.get_demandPlan_list",
		 * "getDemandPlanItemList"); }
		 * 
		 * return FrameworkUtil.directQueryMap.get(query) == null ? null :
		 * FrameworkUtil.directQueryMap.get(query).toString();
		 */
		// 2019.01.20 hyjeong end
	}

	public static Map<String, Object> createResponseMapEmpty() {
		Map<String, Object> map = new HashMap<String, Object>();
		return map;
	}

	public static List<Map<String, Object>> createResponseMap(boolean result) {
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Map<String, Object> errMap = new HashMap<String, Object>();
		if (result) {
			errMap.put("p_err_code", "S");
			errMap.put("p_err_msg", "DB성공");
			errMap.put("result", "success");
		} else {
			errMap.put("p_err_code", "E");
			errMap.put("p_err_msg", "DB에러");
			errMap.put("result", "fail");
		}

		resultList.add(errMap);
		return resultList;
	}

	public static List<Map<String, Object>> createResponseMap(boolean result, String p_err_msg) {
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Map<String, Object> errMap = new HashMap<String, Object>();
		if (result) {
			errMap.put("p_err_code", "S");
			errMap.put("p_err_msg", p_err_msg);
			errMap.put("result", "success");
		} else {
			errMap.put("p_err_code", "E");
			errMap.put("p_err_msg", p_err_msg);
			errMap.put("result", "fail");
		}

		resultList.add(errMap);
		return resultList;
	}

	public static List<Map<String, Object>> createResponseListEmpty() {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

		return list;
	}

	public static List<Map<String, Object>> createResponseList(List<Map<String, Object>> list, boolean result) {
		if (list == null) {
			list = new ArrayList<Map<String, Object>>();
		}

		if (list.size() == 0) {
			Map<String, Object> map = new HashMap<String, Object>();
			if (result) {
				map.put("result", "success");
			} else {
				map.put("result", "fail");
			}
			list.add(map);
		} else {
			for (int i = 0; i < list.size(); i++) {
				if (result) {
					list.get(i).put("result", "success");
				} else {
					list.get(i).put("result", "fail");
				}
			}
		}

		return list;
	}

	public static Map<String, Object> jsonDataMap(String json) {
		Map<String, Object> map = new HashMap<String, Object>();
		ObjectMapper mapper = new ObjectMapper();
		try {
			if (null != json && !"".equals(json)) {
				map = mapper.readValue(json, new TypeReference<HashMap<String, Object>>() {
				});
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return map;
	}

	public static List<Map<String, Object>> getMapList(List<Map<String, Object>> list, String query) {
		if (list == null) {
			return FrameworkUtil.createResponseListEmpty();
		}

		if (list.isEmpty() || !query.equals("com.thirautech.mom.plan.plan.planningUpload.get_planningUpload_list")) {
			return list;
		}

		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).get("attr1") == null || list.get(i).get("attr1").toString().length() < 2) {
				continue;
			}
			String pivot = list.get(i).get("attr1").toString();
			String[] tokens = pivot.split(",");
			if (tokens != null && tokens.length > 0) {
				for (int j = 0; j < tokens.length; j++) {
					String key = tokens[j].substring(0, tokens[j].indexOf(":"));
					String value = tokens[j].substring(tokens[j].indexOf(":") + 1);
					list.get(i).put(key, value);
				}
			}
		}

		return list;
	}

	public static String passwordEncription(String password) {
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");

			byte[] hash = messageDigest.digest(password.getBytes(StandardCharsets.UTF_8.name()));
			StringBuffer encryptPassword = new StringBuffer();

			for (int i = 0; i < hash.length; i++) {
				String hex = Integer.toHexString(0xff & hash[i]);
				if (hex.length() == 1)
					encryptPassword.append('0');
				encryptPassword.append(hex);
			}

			return encryptPassword.toString();

		} catch (Exception e) {
		}

		return password;
	}

	public String passwordEncode(String password) {
		try {
			String encodedPassword = passwordEncoder.encode(password);

			return encodedPassword;

		} catch (Exception e) {
		}

		return password;
	}
	public boolean comparePassword(String loginId,String password) {
		    boolean result = false;
		try {
			
			UserDetails userDetails = userDetailsService.loadUserByUsername(loginId);
			if(passwordEncoder.matches(password, userDetails.getPassword())) {
				result = true;
			}
			else {
				
			}
		} catch (Exception e) {
		}		     
			return result;       			        
	}
	/**
	 * @메소드명 : GetAddress
	 * @작성일 : 2020.06.16
	 * @작성자 : gs.seo
	 * @변경이력 :
	 * @메소드 설명 : 로컬 IP주소 or 로컬MAC주소 Get
	 * @param addressType : ip:IP주소, mac:MAC주소
	 * @return String 로컬 IP주소 or 로컬MAC주소
	 * @throws @사용예 FrameworkUtil.GetAddress("ip") IP주소Get :
	 *              FrameworkUtil.GetAddress("ip") MAC주소Get :
	 *              FrameworkUtil.GetAddress("mac")
	 * @참조문서 :
	 *       https://www.it-swarm.dev/ko/java/java%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EB%A1%9C%EC%BB%AC-%EC%BB%B4%ED%93%A8%ED%84%B0%EC%97%90%EC%84%9C-mac-%EC%A3%BC%EC%86%8C-%EA%B0%80%EC%A0%B8-%EC%98%A4%EA%B8%B0/972850791/
	 */
	public static String GetAddress(String addressType) {
		String address = "";
		InetAddress lanIp = null;
		try {

			String ipAddress = null;
			Enumeration<NetworkInterface> net = null;
			net = NetworkInterface.getNetworkInterfaces();

			while (net.hasMoreElements()) {
				NetworkInterface element = net.nextElement();
				Enumeration<InetAddress> addresses = element.getInetAddresses();
				while (addresses.hasMoreElements() && element.getHardwareAddress() != null
						&& element.getHardwareAddress().length > 0 && !isVMMac(element.getHardwareAddress())) {
					InetAddress ip = addresses.nextElement();
					if (ip instanceof Inet4Address) {

						if (ip.isSiteLocalAddress()) {
							ipAddress = ip.getHostAddress();
							lanIp = InetAddress.getByName(ipAddress);
						}

					}

				} // End of second while-loop

			} // End of first while-loop
			if (lanIp == null)
				return null;

			if (addressType.equals("ip")) {
				address = lanIp.toString().replaceAll("^/+", "");
			} else if (addressType.equals("mac")) {
				address = getMacAddress(lanIp);
			} else {
				throw new Exception("Specify \"ip\" or \"mac\"");
			}

		} catch (UnknownHostException ex) {
			ex.printStackTrace();
		} catch (SocketException ex) {
			ex.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return address;

	}

	// GetAddress 의 부속 메소드
	private static String getMacAddress(InetAddress ip) {
		String address = null;
		try {

			NetworkInterface network = NetworkInterface.getByInetAddress(ip);
			byte[] mac = network.getHardwareAddress();
			StringBuilder sb = new StringBuilder();
			for (int i = 0; i < mac.length; i++) {
				sb.append(String.format("%02X", mac[i]));
			}
			address = sb.toString();

		} catch (SocketException ex) {
			ex.printStackTrace();
		}

		return address;
	}

	// GetAddress 의 부속 메소드
	private static boolean isVMMac(byte[] mac) {
		if (null == mac)
			return false;
		byte invalidMacs[][] = { { 0x00, 0x05, 0x69 }, // VMWare
				{ 0x00, 0x1C, 0x14 }, // VMWare
				{ 0x00, 0x0C, 0x29 }, // VMWare
				{ 0x00, 0x50, 0x56 }, // VMWare
				{ 0x08, 0x00, 0x27 }, // Virtualbox
				{ 0x0A, 0x00, 0x27 }, // Virtualbox
				{ 0x00, 0x03, (byte) 0xFF }, // Virtual-PC
				{ 0x00, 0x15, 0x5D } // Hyper-V
		};

		for (byte[] invalid : invalidMacs) {
			if (invalid[0] == mac[0] && invalid[1] == mac[1] && invalid[2] == mac[2])
				return true;
		}

		return false;
	}

	public static String getIp(HttpServletRequest request) { // 호스팅 서버의 특수한 네트워크 환경에서 실제 Client의 내부 IP를 얻어낼수 있다.

		String ip = request.getHeader("X-Forwarded-For");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;

	}

	public static String ArpMacAddressGet(String originIp) {
		// mac어드레스정보를 가져와야할 ip어드레스
		String ip = originIp;
		String macAddress = null;
		// 실행 커맨드(arp명령 사용)
		String[] cmd = { "cmd", "/c", "arp", "-a", ip };
		Process process = null;

		try {
			// 프로세스빌더 실행
			process = new ProcessBuilder(cmd).start();

			// SequenceInputStream은 여러개의 스트림을 하나의 스트림으로 연결해줌.
			SequenceInputStream seqIn = new SequenceInputStream(process.getInputStream(), process.getErrorStream());

			Scanner s = new Scanner(seqIn);
			while (s.hasNextLine() == true) {
				macAddress = s.nextLine();
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
		return macAddress;

	}

	// ----------------------------------------------------------
	// End of GetAddress
	// ----------------------------------------------------------
	public static String GetRealTime() {
		TimeZone tz = TimeZone.getTimeZone("Asia/Seoul");
		Date now = new Date();
		Calendar currentDate = Calendar.getInstance();
		DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss"); // yyyy-MM-dd HH:mm:ss
		df.setTimeZone(tz);
		// System.out.println(df.format(now));
		// System.out.println(df.format(currentDate.getTime()));
		return df.format(now);
	}

}
