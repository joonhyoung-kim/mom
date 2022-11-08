/**
 * @클래스명 : JwtLoginInfo
 * @작성일 : 2022.02.01
 * @author : kjh
 * @변경이력 :
 * @클래스 설명 : 각종 전역변수 정의하는 유틸리티 클래스
 *           스레드 안전한 전역변수 사용을 위해 ThreadLocal 변수 사용
 */
package com.mom.jwt;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class JwtLoginInfo {
     static String divisionCd  = "";
     static String companyCd   = "";
     static String languageCd  = "";
     static String comboType   = "";
     static String password    = "$2a$10$WaSAOdHvCNIhEhbrMkadtuv8SSMIf6wGg1qkdg49C0mnyWXj2YYl2";
     static List<Map<String, Object>> resultMapList = null;
     static HashMap<String,String> userInfo = new HashMap<String,String>();
  
}
