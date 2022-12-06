package com.mom.backend.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
@Component
public class PrintUtil {
	public static int loopCount 	= 3;
	public static String space 		= " ";
	public static String dot 		= ".";
	public static String colon 		= ":";
	public static String indent 	= "    ";
	public static String tab 		= "\t";
	public static String newLine 	= "\n";
	public static String quotation 	= "\'";
	
	public void print(String domain, String function, String mark1, String mark2, String key, Object value, boolean header, boolean start, boolean end, boolean show) {
		
		if(!show){
			return;
		}
		
		if(start) {
			System.out.println();
		}
		
		if(header) {
			for(int i = 0; i < PrintUtil.loopCount; i++){
				System.out.print(mark1);
			}
			System.out.println(PrintUtil.space + "In" + PrintUtil.space + domain + ", at" + PrintUtil.space + function);
		}
		
		if(key != null){
			for(int i = 0; i < PrintUtil.loopCount; i++){
				System.out.print(mark2);
			}
			System.out.println(PrintUtil.space + key);
		}
		
		if(key != null && key.equals("query")) {
			if(value != null && !value.equals("")) {
				System.out.println(queryString(String.valueOf(value), null, 0));
			}
		} else {
			if(value != null && !value.equals("")) {
				printMap(value);
			}
		}
		
		if(end) {
			System.out.println();
		}
	}
	
	public  void printMap(Object value) {
		if(value == null) {
			return;
		}
		
		if(value instanceof String) {
			System.out.println(PrintUtil.indent + value.toString());
		} else if(value instanceof Map || value instanceof HashMap) {
			@SuppressWarnings(value="unchecked") 
			Map<String, Object> map = (Map<String, Object>)value;
			if(map.isEmpty()) {
				System.out.println(PrintUtil.indent + "{}");
				return;
			}
			int i = 0, size = map.size();
			System.out.println(PrintUtil.indent + "{");
			for(String key1 : map.keySet()) {
				if(key1.indexOf("MESSAGES3") >= 0) {
					continue;
				}
				System.out.print(PrintUtil.tab + PrintUtil.quotation + key1 + PrintUtil.quotation);
				for(int k = 18; k > key1.length(); k--) {
					System.out.print(PrintUtil.space);
				}
				System.out.print(PrintUtil.colon + PrintUtil.space + PrintUtil.quotation + (map.get(key1) == null ? "" : map.get(key1).toString()) + PrintUtil.quotation);
				
				if(i == size -1){
					System.out.println();
				}else{
					System.out.println(",");
				}
				i++;
			}
			
			System.out.println(PrintUtil.indent + "}");
		} else if(value instanceof List || value instanceof ArrayList) {
			@SuppressWarnings(value="unchecked") 
			List<Map<String, Object>> list = (List<Map<String, Object>>)value;
			if(list.isEmpty()) {
				System.out.println(PrintUtil.indent + "[{}]");
				return;
			}
			System.out.println("[");
			for(int i = 0; i < list.size(); i++) {
				Map<String, Object> map = list.get(i);
				int j = 0, size = map.size();
				System.out.println(PrintUtil.indent + "{");
				for(String key1 : map.keySet()) {
					if(key1.indexOf("MESSAGES3") >= 0) {
						continue;
					}
					System.out.print(PrintUtil.tab + PrintUtil.quotation + key1 + PrintUtil.quotation);
					for(int k = 18; k > key1.length(); k--) {
						System.out.print(PrintUtil.space);
					}
					System.out.print(PrintUtil.colon + PrintUtil.space + PrintUtil.quotation + (map.get(key1) == null ? "" : map.get(key1).toString()) + PrintUtil.quotation);
					
					if(j == size -1){
						System.out.println();
					}else{
						System.out.println(",");
					}
					j++;
				}
				
				if(i == list.size()-1){
					System.out.println(PrintUtil.indent + "}");
				}else{
					System.out.println(PrintUtil.indent + "},");
				}
			}
			System.out.println("]");
		}
	}
	
	public  String queryString(String query, String crud, int count) {
		if(query == null || query.equals("")) {
			return "";
		}
		
		String prefix = query.substring(0, query.lastIndexOf(PrintUtil.dot));
		String postfix = query.substring(query.lastIndexOf(PrintUtil.dot) + 1);
		
		String returnString = "namespace=" + PrintUtil.space + prefix + PrintUtil.newLine + PrintUtil.indent + 
							  "query_id =" + PrintUtil.space + postfix;
		
		if(crud == null) {
			returnString = PrintUtil.indent + returnString;
		} else  {
			returnString = "Query 결과" + PrintUtil.newLine + PrintUtil.indent + returnString;
			if(crud.equals("R")) {
				returnString = returnString + PrintUtil.newLine + PrintUtil.indent + "Retrieve = [" + count + "] 개의 tuple이 추출되었습니다."; 
			} else if(crud.equals("C")) {
				returnString = returnString + PrintUtil.newLine + PrintUtil.indent + "Insert   = [" + count + "] 개의 tuple이 등록되었습니다.";
			} else if(crud.equals("U")) {
				returnString = returnString + PrintUtil.newLine + PrintUtil.indent + "Update   = [" + count + "] 개의 tuple이 수정되었습니다.";
			} else if(crud.equals("D")) {
				returnString = returnString + PrintUtil.newLine + PrintUtil.indent + "Delete   = [" + count + "] 개의 tuple이 삭제되었습니다.";
			} else if(crud.equals("E")) {
				returnString = returnString + PrintUtil.newLine + PrintUtil.indent + "수행중 오류가 발생하였습니다.";
			}
		}
		
		return returnString;
	}
	
	public  String errMsgString(String query) {
		if(query != null) {
			if (query.indexOf("ORA-") > 0) {
				if (query.indexOf("ORA-00913") > 0) {
					query = "MESSAGES20013";
				} else if (query.indexOf("ORA-00917") > 0) {
					query = "MESSAGES20019";
				} else if (query.indexOf("ORA-00936") > 0) {
					query = "MESSAGES20027";
				} else if (query.indexOf("ORA-01861") > 0) {
					query = "MESSAGES20016";
				} else if (query.indexOf("ORA-00001") > 0) {
					query = "MESSAGES20018";
				} else if (query.indexOf("ORA-00904") > 0) {
					query = "MESSAGES20017";
				} else if (query.indexOf("ORA-00942") > 0) {
					query = "MESSAGES20020";
				} else if (query.indexOf("ORA-01400") > 0) {
					query = "MESSAGES20021";
				} else if (query.indexOf("ORA-12899") > 0) {
					query = "MESSAGES20014";
				} else if (query.indexOf("ORA-00911") > 0) {
					query = "MESSAGES20028";
				}
			}
		} else {
			query = "MESSAGES20015+MESSAGES20026";
		}
		
		return query;
	}
}
