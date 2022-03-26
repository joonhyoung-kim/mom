package com.mom.util;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.mom.mail.SMTPAuthenticator;
import com.mom.service.MomService;

public class SMTPUtil {
	public static boolean sendMail(MomService momService, String queryId,  Map<String,Object> param) {
		param.put("action", queryId);

		// 메일발송 할 대상 및 업체 조회
		List<Map<String,Object>> mailInfoList = momService.getMapList("com.thirautech.mom.smtp.get_smtpVendorInfo_list", param);
		
		if(mailInfoList.isEmpty()) {
			return false;
		}
		
		Properties properties = new Properties();
		
		properties.put("mail.smtp.starttls.enable", "true");
		
		//properties.put("mail.smtp.ssl.protocols", "SSLv2Hello SSLv3");
		properties.put("mail.transport.protocol", "smtps");
		properties.put("type", "javax.mail.Session");
		
		properties.put("mail.smtp.auth", "true"); 
		properties.put("mail.smtp.debug", "true");
		
		/*properties.put("mail.smtp.socketFactory.port", "587");		
		properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		properties.put("mail.smtp.socketFactory.fallback", "false");*/
		
		for(int z=0; z<mailInfoList.size(); z++) {
			Map<String, Object> mailInfoMap = mailInfoList.get(z);
			mailInfoMap.put("action", queryId);
//			System.out.println("mailInfoMap..........." + mailInfoMap.toString());
			// 메일발송 정보 조회
			List<Map<String, Object>> resultList = momService.getMapList("com.thirautech.mom.smtp.get_smtpinfo_list", mailInfoMap);
			
//			Map<String, Object> result = momService.getMap("com.thirautech.mom.smtp.get_smtpinfo", param);
			
			List<Map<String,Object>> paramList = new ArrayList<Map<String,Object>>(); 
		    paramList.add(param);
			
		    // 메일내용에 첨부 할 Html 양식 및 데이터 조회
			String htmlContents = mailContents(momService, paramList, mailInfoMap);
			
			// 메일 첨부 할 내용 없으면 끝내기.
			if(htmlContents.equals("")) {
				continue;
			}
			
			try {
				for (int i=0; i<resultList.size(); i++) {
					Map<String, Object> result = resultList.get(i);
					
					properties.put("mail.smtp.host", result.get("smtpUrl").toString());
					properties.put("mail.smtp.port", result.get("smtpPort").toString());

					Authenticator authenticator = new SMTPAuthenticator(result.get("sendUser").toString(), result.get("sendPwd").toString());
				    Session session = Session.getInstance(properties, authenticator);

				    session.setDebug(true);
				    MimeMessage mimeMessage = new MimeMessage(session); 						// 메일의 내용을 담을 객체  

				    mimeMessage.setSubject(result.get("title").toString()); 					//  제목 

				    String contents = 	result.get("contents").toString();						// 내용
				    
				    contents = contents + "<br><br>" + htmlContents; // 메일내용에 첨부 할 Html 양식 및 데이터 조회
				    
				    Address fromAddr = new InternetAddress(result.get("sendUser").toString());
				    mimeMessage.setFrom(fromAddr);  
				    
//				    Address toAddr = new InternetAddress(result.get("receivUser").toString());
				    Address toAddr = new InternetAddress(result.get("email").toString());
				    mimeMessage.addRecipient(Message.RecipientType.TO, toAddr); 				// 받는 사람 

				    mimeMessage.setContent(contents, "text/html;charset=UTF-8"); 				// 내용
				    
				    //Transport.send(mimeMessage); 												// 전송   
				    Transport transport = session.getTransport("smtp");
				    transport.connect();
				    
				    transport.sendMessage(mimeMessage, mimeMessage.getAllRecipients());
				    transport.close();
				}
			    
			} catch(Exception e){
			    e.printStackTrace();
			    return false;
			}
		}
		
		
		
		return true;
	}
	
	public static boolean sendMail(MomService momService, String queryId,  List<Map<String,Object>> paramList) {
		Map<String, Object> vendorInfoMap = paramList.get(0);
		vendorInfoMap.put("action", queryId);
		// 메일발송 할 대상 및 업체 조회
		List<Map<String,Object>> mailInfoList = momService.getMapList("com.thirautech.mom.smtp.get_smtpVendorInfo_list", vendorInfoMap);
		
		if(mailInfoList.isEmpty()) {
			return false;
		}
		
		Properties properties = new Properties();
		
		properties.put("mail.smtp.starttls.enable", "true");
		
		//properties.put("mail.smtp.ssl.protocols", "SSLv2Hello SSLv3");
		properties.put("mail.transport.protocol", "smtps");
		properties.put("type", "javax.mail.Session");
		
		properties.put("mail.smtp.auth", "true"); 
		properties.put("mail.smtp.debug", "true");
		
		for(int z=0; z<mailInfoList.size(); z++) {
			Map<String, Object> param = mailInfoList.get(z);
			param.put("action", queryId);
			
//			System.out.println("param..........." + param.toString());
			// 메일발송 정보 조회
			List<Map<String, Object>> resultList = momService.getMapList("com.thirautech.mom.smtp.get_smtpinfo_list", param);
			
			// 메일내용에 첨부 할 Html 양식 및 데이터 조회
			String htmlContents = mailContents(momService, paramList, param);
			
			// 메일 첨부 할 내용 없으면 끝내기.
			if(htmlContents.equals("")) {
				continue;
			}
			
			try {
				for (int i=0; i<resultList.size(); i++) {
					Map<String, Object> result = resultList.get(i);
					properties.put("mail.smtp.host", result.get("smtpUrl").toString());
					properties.put("mail.smtp.port", result.get("smtpPort").toString());

					Authenticator authenticator = new SMTPAuthenticator(result.get("sendUser").toString(), result.get("sendPwd").toString());
				    Session session = Session.getInstance(properties, authenticator);

				    session.setDebug(true);
				    MimeMessage mimeMessage = new MimeMessage(session); 						// 메일의 내용을 담을 객체  

				    mimeMessage.setSubject(result.get("title").toString()); 					// 제목 

				    String contents = 	result.get("contents").toString();						// 내용
				    
				    contents = contents + "<br><br>" + 	htmlContents;							// 메일내용에 추가 될 항목 
				    
				    Address fromAddr = new InternetAddress(result.get("sendUser").toString());
				    mimeMessage.setFrom(fromAddr);  
				    
				    Address toAddr = new InternetAddress(result.get("email").toString());
				    mimeMessage.addRecipient(Message.RecipientType.TO, toAddr); 				// 받는 사람 

				    mimeMessage.setContent(contents, "text/html;charset=UTF-8"); 				// 내용
				    
				    //Transport.send(mimeMessage); 												// 전송   
				    Transport transport = session.getTransport("smtp");
				    transport.connect();
				    
				    transport.sendMessage(mimeMessage, mimeMessage.getAllRecipients());
				    transport.close();
				}
			    
			} catch(Exception e){
			    e.printStackTrace();
			    return false;
			}
		}
		
		return true;
	}
	
	protected static String mailContents(MomService momService, List<Map<String,Object>> paramList, Map<String, Object> mailInfo) {
		String mailGridStart = "<table border = '1'>";
		String mailGridRowStart = "<tr>";
		String mailGridColStart = "<td>";
		String mailGridColEnd = "</td>";
		String mailGridRowEnd = "</tr>";
		String mailGridEnd = "</table>";
		
		StringBuffer sf = new StringBuffer();
		String mailQueryId = "";
		
		Map<String,Object> param = paramList.get(0);
		
		Iterator<String> iteratorKey = mailInfo.keySet().iterator(); 
		while (iteratorKey.hasNext()) {
			String key = iteratorKey.next();
//			System.out.println(" key = " + key + ", value = " +  mailInfo.get(key));
			param.put(key, mailInfo.get(key));
		}
		
		List<Map<String, Object>> mailInfoList = momService.getMapList("com.thirautech.mom.smtp.get_smtpDocInfo_list", param);
		
		// 메일 첨부 되는 데이터 Html 양식 header 생성
		sf.append(mailGridStart);
		sf.append(mailGridRowStart);
		
		for(int i=0; i<mailInfoList.size(); i++) {
			Map<String,Object> mailHeader = mailInfoList.get(i);
			if(i == 0) {
				mailQueryId = mailHeader.get("attachActionId").toString();
			}
			sf.append(mailGridColStart + mailHeader.get("attachHeaderName").toString() + mailGridColEnd);
		}
		sf.append(mailGridRowEnd);
		
		// 메일 첨부 되는 데이터 Html 양식 Body 생성
		List<Map<String, Object>> resultList = momService.getMapList(mailQueryId, param);
		if(!resultList.isEmpty()) {
			for(int k=0; k<resultList.size(); k++) {
				Map<String, Object> result = resultList.get(k);
				sf.append(mailGridRowStart);
				for(int j=0; j<mailInfoList.size(); j++) {
	    			Map<String,Object> mailContents = mailInfoList.get(j);
	    			String attachContents = mailContents.get("attachContents").toString();
	    			if(result.get(attachContents) == null) {
	    				sf.append(mailGridColStart + "" + mailGridColEnd);
	    			} else {
	    				sf.append(mailGridColStart + result.get(attachContents) + mailGridColEnd);
	    			}
	    		}
				sf.append(mailGridRowEnd);
			}
		} else {
			return "";
		}
		
		sf.append(mailGridEnd);
		return sf.toString();
	}
}
