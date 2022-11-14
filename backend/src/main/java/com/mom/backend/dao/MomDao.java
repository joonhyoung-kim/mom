package com.mom.backend.dao;

import java.rmi.UnexpectedException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.time.DurationFormatUtils;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.mom.backend.util.FrameworkUtil;
import com.mom.backend.util.Monitor;
import com.mom.backend.util.PrintUtil;
import com.mom.backend.util.ProgressInfo;
import com.mom.backend.util.TestInnerResultHandler;
import com.mom.backend.util.exception.CustomDataAccessException;

import lombok.RequiredArgsConstructor;
@Repository("momDao")
@RequiredArgsConstructor 
public class MomDao {
	
	private final SqlSessionTemplate sqlSession ;
	private final SqlSessionFactory sqlSessionFactory;	
	private final DataSourceTransactionManager dataSourceTransactionManager;
	private final TestInnerResultHandler testInnerResultHandler;

	//@Value("#{tuPlatformProperties['momDao.debug.on']}")
	boolean debugOn = true;
	
	//@Value("#{tuPlatformProperties['exception.debug.on']}")
	boolean exceptionOn;
	
	public List<Map<String,Object>> getMapList(String query, Map<String,Object> param) {
		PrintUtil.print("MomDao", "getMapList", "#", "$", "query", query, true, true, false, debugOn);
		//PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseListEmpty();
		}
		//List<Map<String,Object>> result =  new ArrayList<>();
		List<Map<String,Object>> result =  null;
		long start = System.currentTimeMillis();
		try {	
			 		
			System.out.println("조회파람="+param);
			long diff = System.currentTimeMillis() - start;
			Date today = new Date(System.currentTimeMillis() + (9 * 3600 * 1000));
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("#### " + simpleDateFormat.format(today) + " Select " + param.get("companyCd") + ", " + query.substring(query.indexOf("get_")) + " = " + DurationFormatUtils.formatDuration(diff, "HH:mm:ss:SS"));
			result = sqlSession.selectList(query.trim(), param);
					  
		} catch(Exception e) {
			e.printStackTrace();
			PrintUtil.print(null, null, null, "$", "getMapList : " + PrintUtil.queryString(query, "E", 0), null, false, true, true, debugOn);
			long diff = System.currentTimeMillis() - start;
			Date today = new Date(System.currentTimeMillis() + (9 * 3600 * 1000));
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("#### FAIL : " + simpleDateFormat.format(today) + " Select " + param.get("companyCd") + ", " + query.substring(query.indexOf("get_")) + " = " + DurationFormatUtils.formatDuration(diff, "HH:mm:ss:SS"));
			
			return FrameworkUtil.createResponseListEmpty();
		}
		finally {			     
					//sqlSession1.flushStatements();  
			
		}
		 
		//PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "R", result == null ? 0 : result.size()), null, false, true, true, debugOn);
		return result;
		
	}
	public List<Map<String,Object>> procMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomDao", "getMapList", "#", "$", "query", query, true, true, false, debugOn);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseListEmpty();
		}
		List<Map<String,Object>> result =  new ArrayList<>();
	//	Map<String,Object> paramMap = param.get(0);
		long start = System.currentTimeMillis();
		try {	
			
			//TestInnerResultHandler(result)
			//result = sqlSession.selectList(query.trim(), param);	
			//new TestInnerResultHandler(result)
     
			// sqlSession.select(query.trim(), paramMap.get(paramMap), new TestInnerResultHandler(result));
			if(param.size()>1) {
				//System.out.println("파람체크"+param);
				sqlSession.select(query.trim(), param, new TestInnerResultHandler(result));
			}
			else {
				sqlSession.select(query.trim(), param.get(0), new TestInnerResultHandler(result));
			}
			
			//sqlSession.select(query.trim(), param, testInnerResultHandler);
			 
			
			 //result = testInnerResultHandler.returnList;
			// System.out.println("컴퍼니체크"+result.get(0).toString());
			 //System.out.println("컴퍼니체크"+result.get(1).get("companyCd"));
			/*
			 * for(Map<String,Object> mapList :result) { mapList.put("p_err_code",
			 * param.get("p_err_code")); mapList.put("p_err_msg", param.get("p_err_msg"));
			 * System.out.println("맵리스트="+mapList); //result.add(mapList); }
			 */
		  	
				result = param;
			  
		   
			//System.out.println("조회결과="+result);		
			System.out.println("조회파람="+param);
			long diff = System.currentTimeMillis() - start;
			Date today = new Date(System.currentTimeMillis() + (9 * 3600 * 1000));
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			//System.out.println("#### " + simpleDateFormat.format(today) + " Select " + param.get("companyCd") + ", " + query.substring(query.indexOf("get_")) + " = " + DurationFormatUtils.formatDuration(diff, "HH:mm:ss:SS"));
			
		} catch(Exception e) {
			e.printStackTrace();
			PrintUtil.print(null, null, null, "$", "getMapList : " + PrintUtil.queryString(query, "E", 0), null, false, true, true, debugOn);
			long diff = System.currentTimeMillis() - start;
			Date today = new Date(System.currentTimeMillis() + (9 * 3600 * 1000));
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			//System.out.println("#### FAIL : " + simpleDateFormat.format(today) + " Select " + param.get("companyCd") + ", " + query.substring(query.indexOf("get_")) + " = " + DurationFormatUtils.formatDuration(diff, "HH:mm:ss:SS"));
			
			return FrameworkUtil.createResponseListEmpty();
		}
		finally {			     
					//sqlSession1.flushStatements();          			        
		}
		 
		//PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "R", result == null ? 0 : result.size()), null, false, true, true, debugOn);
		return result;
	}	
	public List<Map<String, Object>> createMapList(String query, List<Map<String,Object>> param)  {
		ProgressInfo.successCount = 0;
		PrintUtil.print("MomDao", "createMapList", "#", "$", "query", query, true, true, false, debugOn);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		 //System.out.println("크리에이트!");
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseMap(false,"query가 null 이거나 param이 null입니다.");
		}
		
        long startTime = System.currentTimeMillis();   		
		int resultCount = 0;	
		int paramSize = param.size();
		/*
		 * DefaultTransactionDefinition defaultTransactionDefinition = new
		 * DefaultTransactionDefinition();
		 * defaultTransactionDefinition.setName("Transaction");
		 * defaultTransactionDefinition.setPropagationBehavior(TransactionDefinition.
		 * PROPAGATION_REQUIRED); TransactionStatus transactionStatus =
		 * dataSourceTransactionManager.getTransaction(defaultTransactionDefinition);
		 */
        SqlSession sqlSession1 = null;
        	try {
        	      sqlSession1 = sqlSessionFactory.openSession(); 		
        	      //sqlSession1 = SqlSessionFactorys.setSqlSession();
        	 
        	     
        	      resultCount = sqlSession1.insert(query, param);
    			  System.out.println("성공 카운트="+resultCount);
	        			if(resultCount != 0) {	        				
	        				//sqlSession1.commit();
	        				if(param.get(0).get("commitYn")!=null) {
	        					if(param.get(0).get("commitYn").toString().equals("Y")) {
	        						//sqlSession1.commit();
		        					//dataSourceTransactionManager.commit(transactionStatus);
		        					sqlSession1.flushStatements();          	
		        	            	//sqlSession1.close();  
		        		        	System.out.println("커밋성공!");
		        				} 
	        				}
	        			       	        	
	        			
	            		}
	        			else {	   
	        				   System.out.println("실패 카운트="+resultCount); 
	        				//dataSourceTransactionManager.rollback(transactionStatus);
	        				   //sqlSession1.rollback();
	        			 	   sqlSession1.flushStatements();
	                    	   //sqlSession1.close();  
	        				   return FrameworkUtil.createResponseMap(false,"DB수정 실패");      		 
	            		}            		       				        			       			
            }	

        	catch(Exception e) {
        		//dataSourceTransactionManager.rollback(transactionStatus);
        		sqlSession1.rollback();
        		CustomDataAccessException cdae =  new CustomDataAccessException(e.getMessage()+"치즈",e.getCause());
        		throw cdae;
            	//System.out.println("에러?"+e);
            	
            } 
        
        	
        	finally {			
            	//sqlSession1.flushStatements();          	
            	//sqlSession1.close();  
        		System.out.println("파이널리실행");
            	long endTime = System.currentTimeMillis();
                long resutTime = endTime - startTime;            
                PrintUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime/1000 + "(ms)", false, true, true, debugOn);                         
        	}  
        	System.out.println("최종 카운트="+resultCount); 
        return FrameworkUtil.createResponseMap(resultCount == 0 ? false : true);
	}
	

			
	public List<Map<String, Object>> modifyMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomDao", "modifyMapList", "#", "$", "query", query, true, true, false, debugOn);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseMap(false,"query가 null 이거나 param이 null입니다.");
		}
		
        long startTime = System.currentTimeMillis();
        int resultCount = 0;
    	
    	DefaultTransactionDefinition defaultTransactionDefinition = new DefaultTransactionDefinition();
    	defaultTransactionDefinition.setName("Transaction");
    	defaultTransactionDefinition.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    	
    	TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(defaultTransactionDefinition);
    	SqlSession sqlSession1 = null;
    	try {
    		sqlSession1 = sqlSessionFactory.openSession(ExecutorType.SIMPLE);   		 			
    				resultCount = sqlSession1.update(query, param);
    				System.out.println("카운트"+resultCount);
        			if(resultCount != 0 ) {
        				sqlSession1.flushStatements();
        	        	dataSourceTransactionManager.commit(transactionStatus);
        	        	System.out.println("업데이트후 커밋실행");
        			} else { 
        				      return FrameworkUtil.createResponseMap(false,"DB수정 실패");      				
        			}

        } catch(Exception e) {        	
        	dataSourceTransactionManager.rollback(transactionStatus);
        } finally {
        	sqlSession1.close();  
        	long endTime = System.currentTimeMillis();
            long resutTime = endTime - startTime;            
            PrintUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime/1000 + "(ms)", false, true, true, debugOn);          
    	}
    	
    	return FrameworkUtil.createResponseMap(resultCount == 0 ? false : true);
	}
	@Transactional
	public List<Map<String, Object>> upsertMapList(String query, List<Map<String,Object>> param) {
		//PrintUtil.print("MomDao", "upsertMapList", "#", "$", "query", query, true, true, false, debugOn);
		//PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseMap(false,"query가 null 이거나 param이 null입니다.");
		}
		
        long startTime = System.currentTimeMillis();   		
		int resultCount = 0;	
		int paramSize = param.size();
        DefaultTransactionDefinition defaultTransactionDefinition = new DefaultTransactionDefinition();
       // defaultTransactionDefinition.setName("Transaction");
        //defaultTransactionDefinition.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);        	
        //TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(defaultTransactionDefinition);
        SqlSession sqlSession1 = null;
        	try {
        	      sqlSession1 = sqlSessionFactory.openSession(ExecutorType.BATCH); 		
        	      //sqlSession1 = SqlSessionFactorys.setSqlSession();
        	      System.out.println("총데이터="+paramSize);
        	      if(paramSize>=1000) {
        	    	  ProgressInfo.useYn = true;
        	    	  // 데이터가 1000 건이상일떄         	    	  
        	    	  //System.out.println("1000건이상데이터!");
        	    	  int upsertCount = paramSize/1000;                     // 총 upsert 실행횟수
        	    	  int upsertRemainCount = paramSize - upsertCount*1000; // 잔여 데이터 개수
        	    	  int splitCount  = 0;                                  // 누적 upsert 실행횟수
        	          //System.out.println("1000개단위 쿼리실행수="+upsertCount);
        	          //System.out.println("1000개단위 잔여개수="+upsertRemainCount);
        	          //System.out.println("누적 스플릿 카운트="+splitCount);
        	    	  List<Map<String,Object>> splitParam = new ArrayList<>();
        	    	  
        	    	  for(int i=0;i<upsertCount;i++) {                     
        	    		  //splitParam = new ArrayList<>();
        	    		  splitParam.clear();
        	    		  for(int j=splitCount;j<=splitCount+1000;j++) {
        	    			  splitParam.add(param.get(j));
        	    		  }
        	    		  splitCount += 1000; // 스플릿 카운트 누적 
        	    		  for (Map<String, Object> param1 : splitParam) {
            	    	   sqlSession1.insert(query, param1); //  쿼리 실행결과 카운트 누적
        	    		  }
            	    	  ProgressInfo.successCount = resultCount+=1000;
            	    	  
            	      }       	    	  
        	    	
        	    	  if(upsertRemainCount>0) {
						  System.out.println("업서트카운트="+upsertCount);
						  System.out.println("파람사이즈="+paramSize);
        	    		  for(int k=(upsertCount*1000)+1;k<paramSize;k++) {
            	    		  //splitParam = new ArrayList<>();
        	    			  splitParam.clear();
            	    		  splitParam.add(param.get(k));
            	    		  
            	    		  //splitCount  += upsertRemainCount;
            	    		  for (Map<String, Object> param2 : splitParam) {
                	    	  sqlSession1.insert(query, param2);
            	    		  }
            	    		  //ProgressInfo.successCount += resultCount+upsertRemainCount;
            	    		  ProgressInfo.successCount = paramSize;
                	    	
                	      }     
        	    	  }
        	    	  ProgressInfo.useYn = false; 
        	      }
        	      else {        	    
						/*
						 * for (int j=0;j<param.size();j++) { //
						 * System.out.println("넣기직전파람?"+param.get(j)); }
						 */
        	    	     for (Map<String, Object> param3 : param) {
        	    	    	  sqlSession1.insert(query, param3);
        	    	 
        	    	     
        	    	     }
        	    	     resultCount = param.size();
        	      }
    			
    			  //System.out.println("성공 카운트="+resultCount);
	        			if(resultCount == param.size()) {	 
	        				//dataSourceTransactionManager.commit(transactionStatus);
	        				System.out.println("성공!");
	        				//System.out.println("파람갯수"+param.size());
	        				//System.out.println("resultcount"+resultCount);
	        				//sqlSession1.commit();
	        				//sqlSession1.flushStatements();          	
	                    	//sqlSession1.close();
	                    	//sqlSession1.clearCache();
	        				//sqlSession1.commit();
	        			        			       	        	
	        				//System.out.println("UPSERT 커밋안함!");
	            		}
	        			else {	
	        				   System.out.println("성공!");
	        				   //sqlSession1.commit();
	        				   //ProgressInfo.successCount = 0;
	        				   //sqlSession1.rollback();
	        				   //System.out.println("UPSERT 실패 카운트="+resultCount);
	                		   //return FrameworkUtil.createResponseMap(false,"DB UPSERT 실패");      					  		 
	            		}            		       				        			       			
            } catch(Exception e) {
            	ProgressInfo.successCount = 0;
            	//System.out.println("실패행?");
            	//sqlSession1.rollback();
            	//dataSourceTransactionManager.rollback(transactionStatus);
            	//CustomDataAccessException cdae =  new CustomDataAccessException(e.getMessage()+"치즈",e.getCause());
            	
            	System.out.println("에러사유="+e.getMessage());
            	return FrameworkUtil.createResponseMap(false,"DB UPSERT 실패");  
        		//throw cdae;
        		
            } finally {			
            	
            	sqlSession1.flushStatements();          	
            	sqlSession1.close();
            	sqlSession1.clearCache();
            	long endTime = System.currentTimeMillis();
                long resutTime = endTime - startTime;            
                PrintUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime/1000 + "(ms)", false, true, true, debugOn);                         
        	}  
        	System.out.println("최종 카운트="+resultCount); 
        return FrameworkUtil.createResponseMap(resultCount != 0 ? true : false);
	}
	
	public List<Map<String, Object>> removeMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomDao", "removeMapList", "#", "$", "query", query, true, true, false, debugOn);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseMap(false,"query가 null 이거나 param이 null입니다.");
		}
		
        long startTime = System.currentTimeMillis();
        int resultCount = 0;
        
		/*
		 * DefaultTransactionDefinition defaultTransactionDefinition = new
		 * DefaultTransactionDefinition();
		 * defaultTransactionDefinition.setName("Transaction");
		 * defaultTransactionDefinition.setPropagationBehavior(TransactionDefinition.
		 * PROPAGATION_REQUIRED);
		 * 
		 * TransactionStatus transactionStatus =
		 * dataSourceTransactionManager.getTransaction(defaultTransactionDefinition);
		 */
    	SqlSession sqlSession1 = null;
    	try {
    		sqlSession1 = sqlSessionFactory.openSession(ExecutorType.SIMPLE);  	
    		//sqlSession1 = sqlSessionFactory.openSession(true);  		
    		resultCount = sqlSession1.delete(query, param);
    		System.out.println("리절트카운트="+resultCount);
    		if(resultCount != 0 ) {
    			//sqlSession1.commit();
	        	//dataSourceTransactionManager.commit(transactionStatus);
			} else { 
				//sqlSession1.rollback();
				//dataSourceTransactionManager.rollback(transactionStatus);
				      return FrameworkUtil.createResponseMap(false,"삭제할 데이터 없음!");      				
			}
        } catch(Exception e) {
        	System.out.println("에러="+resultCount);
        	//dataSourceTransactionManager.rollback(transactionStatus);
        	//sqlSession1.rollback();
        	CustomDataAccessException cdae =  new CustomDataAccessException(e.getMessage()+"치즈",e.getCause());
    		throw cdae;
        } finally {
        	sqlSession1.flushStatements();
        	sqlSession1.close();  
        	long endTime = System.currentTimeMillis();
            long resutTime = endTime - startTime;            
            PrintUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime/1000 + "(ms)", false, true, true, debugOn);     
    	}           
        return FrameworkUtil.createResponseMap(resultCount == 0 ? false : true);
	}
}
