package com.mom.backend.dao;

import java.rmi.UnexpectedException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.time.DurationFormatUtils;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.mom.backend.util.FrameworkUtil;
import com.mom.backend.util.PrintUtil;
import com.mom.backend.util.ProgressInfo;
import com.mom.backend.util.TestInnerResultHandler;
import com.mom.backend.util.exception.CustomDataAccessException;

import lombok.RequiredArgsConstructor;

@Repository("momDao")
@RequiredArgsConstructor
public class MomDao {
	private final SqlSessionTemplate sqlSession;
	private final SqlSessionFactory sqlSessionFactory;
	private final DataSourceTransactionManager dataSourceTransactionManager;
	private final TestInnerResultHandler testInnerResultHandler;
	private final FrameworkUtil frameworkUtil;
	private final PrintUtil printUtil;
	boolean debugOn = true; // 콘솔 디버깅 출력여부
	boolean exceptionOn; // 콘솔 예외 출력여부
	
	// 조회 서비스 처리
	public List<Map<String, Object>> getMapList(String query, Map<String, Object> param) { 
		printUtil.print("MomDao", "getMapList", "#", "$", "query", query, true, true, false, debugOn); // 쿼리 정보 출력
		printUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn); // 파라미터 정보 출력
		if (query == null || query.length() < 1 || param == null || param.isEmpty()) {       // 쿼리 경로 NULL 체크
			printUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true,
					exceptionOn);
			return frameworkUtil.createResponseListEmpty();
		}	
		long startTime = System.currentTimeMillis(); // 시작시간 정보 출력
		List<Map<String, Object>> result = null; // 결과를 담을 LIST MAP 
		try {		
			result = sqlSession.selectList(query.trim(), param);

		} catch (Exception e) {
			e.printStackTrace();
			printUtil.print(null, null, null, "$", "getMapList : " + printUtil.queryString(query, "E", 0), null, false,true, true, debugOn); // 에러 발생시 메시지 출력
			return frameworkUtil.createResponseListEmpty();
		} finally {
			        long endTime = System.currentTimeMillis();
			        long resutTime = endTime - startTime;
			        printUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime / 1000 + "(ms)", false, true, true,debugOn);
		}
		
		return result;
	}
	// 프로시저 호출 서비스 처리
	public List<Map<String, Object>> procMapList(String query, List<Map<String, Object>> param) {
		printUtil.print("MomDao", "getMapList", "#", "$", "query", query, true, true, false, debugOn); // 파라미터 정보 출력
		printUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);           // 쿼리 경로 NULL 체크
		if (query == null || query.length() < 1 || param == null || param.isEmpty()) { // 쿼리 경로 NULL 체크
			printUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true,
					exceptionOn);
			return frameworkUtil.createResponseListEmpty();
		}
		long startTime = System.currentTimeMillis(); // 시작시간 정보 출력
		List<Map<String, Object>> result = new ArrayList<>();
		
		try {

			if (param.size() > 1) { // 파라미터 단건
				sqlSession.select(query.trim(), param, new TestInnerResultHandler(result));
			} else {               // 파라미터 복수건
				sqlSession.select(query.trim(), param.get(0), new TestInnerResultHandler(result));
			}
			result = param;

		} catch (Exception e) {
			e.printStackTrace();
			printUtil.print(null, null, null, "$", "getMapList : " + printUtil.queryString(query, "E", 0), null, false,true, true, debugOn);

			return frameworkUtil.createResponseListEmpty();
		} finally {
			  long endTime = System.currentTimeMillis();
		      long resutTime = endTime - startTime;
		      printUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime / 1000 + "(ms)", false, true, true,debugOn);
		}
		return result;
	}
	// 등록 서비스 처리
	public List<Map<String, Object>> createMapList(String query, List<Map<String, Object>> param) {
		ProgressInfo.successCount = 0;
		printUtil.print("MomDao", "createMapList", "#", "$", "query", query, true, true, false, debugOn); // 파라미터 정보 출력
		printUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn); 			  // 쿼리 경로 NULL 체크
		if (query == null || query.length() < 1 || param == null || param.isEmpty()) {
			printUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true,
					exceptionOn);
			return frameworkUtil.createResponseMap(false, "query가 null 이거나 param이 null입니다.");
		}

		long startTime = System.currentTimeMillis(); // 시작시간 정보 출력
		int resultCount = 0;
		int paramSize = param.size();

		try {
			resultCount = sqlSession.insert(query, param);
			if (resultCount != 0) {
				if (param.get(0).get("commitYn") != null) {
					if (param.get(0).get("commitYn").toString().equals("Y")) {
					}
				}

			} else {
				sqlSession.flushStatements();
				return frameworkUtil.createResponseMap(false, "DB수정 실패");
			}
		}

		catch (Exception e) {
			CustomDataAccessException cdae = new CustomDataAccessException(e.getMessage(), e.getCause()); // 에러 메시지 리턴
			throw cdae;

		}

		finally {
			long endTime = System.currentTimeMillis();
			long resutTime = endTime - startTime;
			printUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime / 1000 + "(ms)", false, true, true,debugOn);
		}
		return frameworkUtil.createResponseMap(resultCount == 0 ? false : true);
	}
	// 수정 서비스 처리
	public List<Map<String, Object>> modifyMapList(String query, List<Map<String, Object>> param) {
		printUtil.print("MomDao", "modifyMapList", "#", "$", "query", query, true, true, false, debugOn);
		printUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);

		if (query == null || query.length() < 1 || param == null || param.isEmpty()) {
			printUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true,exceptionOn);
			return frameworkUtil.createResponseMap(false, "query가 null 이거나 param이 null입니다.");
		}

		long startTime = System.currentTimeMillis(); // 시작시간 정보 출력
		int resultCount = 0; 				        // 결과 카운트 

		try {
			resultCount = sqlSession.update(query, param);
			if (resultCount != 0) {
				sqlSession.flushStatements();
			} else {
				return frameworkUtil.createResponseMap(false, "DB수정 실패");
			}

		} catch (Exception e) {
		} finally {
			long endTime = System.currentTimeMillis();
			long resutTime = endTime - startTime;
			printUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime / 1000 + "(ms)", false, true, true,debugOn);
		}

		return frameworkUtil.createResponseMap(resultCount == 0 ? false : true);
	}
	// 엑셀 업로드시에 사용 BATCH 로 작동
	@Transactional
	public List<Map<String, Object>> upsertMapList(String query, List<Map<String, Object>> param) { // 엑셀 업로드 이벤트 처리
		printUtil.print("MomDao", "upsertMapList", "#", "$", "query", query, true, true, false, debugOn);
		printUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		if (query == null || query.length() < 1 || param == null || param.isEmpty()) {
			printUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true,
					exceptionOn);
			return frameworkUtil.createResponseMap(false, "query가 null 이거나 param이 null입니다.");
		}

		long startTime = System.currentTimeMillis();
		int resultCount = 0;
		int paramSize = param.size();
		try {
			if (paramSize >= 1000) {
				ProgressInfo.useYn = true;
				int upsertCount = paramSize / 1000; // 총 upsert 실행횟수
				int upsertRemainCount = paramSize - upsertCount * 1000; // 잔여 데이터 개수
				int splitCount = 0; // 누적 upsert 실행횟수
				List<Map<String, Object>> splitParam = new ArrayList<>();

				for (int i = 0; i < upsertCount; i++) { // 1000개기준 몇번돌지
					splitParam.clear();
					for (int j = splitCount; j < splitCount + 1000; j++) { // 1000개씩 split 배열에 담음 	
						splitParam.add(param.get(j));
					}
					splitCount += 1000; // 스플릿 카운트 누적
					for (Map<String, Object> param1 : splitParam) {	 // 실제 DB에 UPSERT 처리(BATCH)						
							sqlSession.insert(query, param1);			
					}
					ProgressInfo.successCount = resultCount += 1000; // 1000개단위로 %처리

				}

				if (upsertRemainCount > 0) { // 1000개 이상일떄 남은 데이터 처리
					for (int k = (upsertCount * 1000) + 1; k < paramSize; k++) {
						splitParam.clear();
						splitParam.add(param.get(k));

						for (Map<String, Object> param2 : splitParam) {						
								sqlSession.insert(query, param2);
						
						}
						splitParam.clear();
						ProgressInfo.successCount = paramSize;

					}
					resultCount += upsertRemainCount;
				}
				ProgressInfo.useYn = false;
			} else {
			
			}

			if (resultCount == param.size()) {

			} else if (resultCount < param.size()) {
				ProgressInfo.successCount = 0;
				System.out.println("실패1" + resultCount + "/" + param.size());
				return frameworkUtil.createResponseMap(false, "DB UPSERT 실패");

			} else {

			}
		} catch (Exception e) {
			System.out.println("실패2=" +e.getMessage());
			ProgressInfo.successCount = 0;
			// System.out.println("에러사유="+e.getMessage());
			return frameworkUtil.createResponseMap(false, "DB UPSERT 실패");

		} finally {
			sqlSession.flushStatements();
			sqlSession.clearCache();
			long endTime = System.currentTimeMillis();
			long resutTime = endTime - startTime;
			printUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime / 1000 + "(ms)", false, true, true,debugOn);
		}
		return frameworkUtil.createResponseMap(resultCount != 0 ? true : false);
	}
	// 삭제 서비스 처리
	public List<Map<String, Object>> removeMapList(String query, List<Map<String, Object>> param) {
		printUtil.print("MomDao", "removeMapList", "#", "$", "query", query, true, true, false, debugOn);
		printUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);

		if (query == null || query.length() < 1 || param == null || param.isEmpty()) {
			printUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true,
					exceptionOn);
			return frameworkUtil.createResponseMap(false, "query가 null 이거나 param이 null입니다.");
		}

		long startTime = System.currentTimeMillis();
		int resultCount = 0;

	
		try {
			resultCount = sqlSession.delete(query, param);
			
			if (resultCount != 0) {

			} else {
				return frameworkUtil.createResponseMap(false, "삭제할 데이터 없음!");
			}
		} catch (Exception e) {
			//System.out.println("에러=" + resultCount);
			CustomDataAccessException cdae = new CustomDataAccessException(e.getMessage(), e.getCause());
			throw cdae;
		} finally {
			sqlSession.flushStatements();
			long endTime = System.currentTimeMillis();
			long resutTime = endTime - startTime;
			printUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime / 1000 + "(ms)", false, true, true,
					debugOn);
		}
		return frameworkUtil.createResponseMap(resultCount == 0 ? false : true);
	}
}
