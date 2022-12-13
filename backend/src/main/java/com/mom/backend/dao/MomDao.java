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

	public List<Map<String, Object>> getMapList(String query, Map<String, Object> param) { // 조회 이벤트 처리
		printUtil.print("MomDao", "getMapList", "#", "$", "query", query, true, true, false, debugOn);

		if (query == null || query.length() < 1 || param == null || param.isEmpty()) {
			printUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true,
					exceptionOn);
			return frameworkUtil.createResponseListEmpty();
		}
		List<Map<String, Object>> result = null;
		long start = System.currentTimeMillis();
		try {

			// System.out.println("parameter="+param);
			printUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
			long diff = System.currentTimeMillis() - start;
			Date today = new Date(System.currentTimeMillis() + (9 * 3600 * 1000));
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("#### " + simpleDateFormat.format(today) + " Select " + param.get("companyCd") + ", "
					+ query.substring(query.indexOf("get_")) + " = "
					+ DurationFormatUtils.formatDuration(diff, "HH:mm:ss:SS"));
			result = sqlSession.selectList(query.trim(), param);

		} catch (Exception e) {
			e.printStackTrace();
			printUtil.print(null, null, null, "$", "getMapList : " + printUtil.queryString(query, "E", 0), null, false,
					true, true, debugOn);
			long diff = System.currentTimeMillis() - start;
			Date today = new Date(System.currentTimeMillis() + (9 * 3600 * 1000));
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("#### FAIL : " + simpleDateFormat.format(today) + " Select " + param.get("companyCd")
					+ ", " + query.substring(query.indexOf("get_")) + " = "
					+ DurationFormatUtils.formatDuration(diff, "HH:mm:ss:SS"));

			return frameworkUtil.createResponseListEmpty();
		} finally {

		}

		return result;

	}

	public List<Map<String, Object>> procMapList(String query, List<Map<String, Object>> param) {
		printUtil.print("MomDao", "getMapList", "#", "$", "query", query, true, true, false, debugOn);
		printUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);

		if (query == null || query.length() < 1 || param == null || param.isEmpty()) {
			printUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true,
					exceptionOn);
			return frameworkUtil.createResponseListEmpty();
		}
		List<Map<String, Object>> result = new ArrayList<>();
		long start = System.currentTimeMillis();
		try {

			if (param.size() > 1) {
				sqlSession.select(query.trim(), param, new TestInnerResultHandler(result));
			} else {
				sqlSession.select(query.trim(), param.get(0), new TestInnerResultHandler(result));
			}
			result = param;

			System.out.println("조회파람=" + param);
			long diff = System.currentTimeMillis() - start;
			Date today = new Date(System.currentTimeMillis() + (9 * 3600 * 1000));
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		} catch (Exception e) {
			e.printStackTrace();
			printUtil.print(null, null, null, "$", "getMapList : " + printUtil.queryString(query, "E", 0), null, false,
					true, true, debugOn);
			long diff = System.currentTimeMillis() - start;
			Date today = new Date(System.currentTimeMillis() + (9 * 3600 * 1000));
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

			return frameworkUtil.createResponseListEmpty();
		} finally {

		}
		return result;
	}

	public List<Map<String, Object>> createMapList(String query, List<Map<String, Object>> param) {
		ProgressInfo.successCount = 0;
		printUtil.print("MomDao", "createMapList", "#", "$", "query", query, true, true, false, debugOn);
		printUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		// System.out.println("크리에이트!");
		if (query == null || query.length() < 1 || param == null || param.isEmpty()) {
			printUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true,
					exceptionOn);
			return frameworkUtil.createResponseMap(false, "query가 null 이거나 param이 null입니다.");
		}

		long startTime = System.currentTimeMillis();
		int resultCount = 0;
		int paramSize = param.size();

		SqlSession sqlSession1 = null;
		try {
			sqlSession1 = sqlSessionFactory.openSession();

			resultCount = sqlSession1.insert(query, param);
			System.out.println("insert count=" + resultCount);
			if (resultCount != 0) {
				if (param.get(0).get("commitYn") != null) {
					if (param.get(0).get("commitYn").toString().equals("Y")) {
						sqlSession1.flushStatements();
						System.out.println("commit success!");
					}
				}

			} else {
				System.out.println("fail count=" + resultCount);
				sqlSession1.flushStatements();
				return frameworkUtil.createResponseMap(false, "DB수정 실패");
			}
		}

		catch (Exception e) {
			sqlSession1.rollback();
			CustomDataAccessException cdae = new CustomDataAccessException(e.getMessage(), e.getCause());
			throw cdae;

		}

		finally {

			long endTime = System.currentTimeMillis();
			long resutTime = endTime - startTime;
			printUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime / 1000 + "(ms)", false, true, true,
					debugOn);
		}
		return frameworkUtil.createResponseMap(resultCount == 0 ? false : true);
	}

	public List<Map<String, Object>> modifyMapList(String query, List<Map<String, Object>> param) {
		printUtil.print("MomDao", "modifyMapList", "#", "$", "query", query, true, true, false, debugOn);
		printUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);

		if (query == null || query.length() < 1 || param == null || param.isEmpty()) {
			printUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true,
					exceptionOn);
			return frameworkUtil.createResponseMap(false, "query가 null 이거나 param이 null입니다.");
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
			System.out.println("카운트" + resultCount);
			if (resultCount != 0) {
				sqlSession1.flushStatements();
				dataSourceTransactionManager.commit(transactionStatus);
				System.out.println("업데이트후 커밋실행");
			} else {
				return frameworkUtil.createResponseMap(false, "DB수정 실패");
			}

		} catch (Exception e) {
			dataSourceTransactionManager.rollback(transactionStatus);
		} finally {
			sqlSession1.close();
			long endTime = System.currentTimeMillis();
			long resutTime = endTime - startTime;
			printUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime / 1000 + "(ms)", false, true, true,
					debugOn);
		}

		return frameworkUtil.createResponseMap(resultCount == 0 ? false : true);
	}

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
		SqlSession sqlSession1 = null;
		try {
			sqlSession1 = sqlSessionFactory.openSession(ExecutorType.BATCH);

			if (paramSize >= 1000) {
				ProgressInfo.useYn = true;
				int upsertCount = paramSize / 1000; // 총 upsert 실행횟수
				int upsertRemainCount = paramSize - upsertCount * 1000; // 잔여 데이터 개수
				int splitCount = 0; // 누적 upsert 실행횟수
				/*
				 * System.out.println("1000개단위 쿼리실행수="+upsertCount);
				 * System.out.println("1000개단위 잔여개수="+upsertRemainCount);
				 * System.out.println("누적 스플릿 카운트="+splitCount);
				 */
				List<Map<String, Object>> splitParam = new ArrayList<>();

				for (int i = 0; i < upsertCount; i++) {
					splitParam.clear();
					for (int j = splitCount; j <= splitCount + 1000; j++) {
						splitParam.add(param.get(j));
					}
					splitCount += 1000; // 스플릿 카운트 누적
					for (Map<String, Object> param1 : splitParam) {
						try {
							sqlSession1.insert(query, param1); // 쿼리 실행결과 카운트 누적
						} finally {
							sqlSession.flushStatements();

						}

					}

					ProgressInfo.successCount = resultCount += 1000;

				}

				if (upsertRemainCount > 0) {
					System.out.println("upsert count=" + upsertCount);
					System.out.println("parameter size=" + paramSize);
					for (int k = (upsertCount * 1000) + 1; k < paramSize; k++) {
						splitParam.clear();
						splitParam.add(param.get(k));

						for (Map<String, Object> param2 : splitParam) {
							try {
								sqlSession1.insert(query, param2);
							} finally {
								sqlSession.flushStatements();

							}
						}

						sqlSession.clearCache();
						splitParam.clear();
						ProgressInfo.successCount = paramSize;

					}
				}
				ProgressInfo.useYn = false;
			} else {

				for (Map<String, Object> param3 : param) {
					sqlSession1.insert(query, param3);
					resultCount++;

				}

			}

			if (resultCount == param.size()) {

			} else if (resultCount < param.size()) {
				sqlSession1.flushStatements();
				sqlSession1.clearCache();
				ProgressInfo.successCount = 0;
				return frameworkUtil.createResponseMap(false, "DB UPSERT 실패");

			} else {

			}
		} catch (Exception e) {
			sqlSession1.flushStatements();
			sqlSession1.clearCache();
			ProgressInfo.successCount = 0;

			// System.out.println("에러사유="+e.getMessage());
			return frameworkUtil.createResponseMap(false, "DB UPSERT 실패");

		} finally {

			sqlSession1.flushStatements();
			// sqlSession1.close();
			sqlSession1.clearCache();
			long endTime = System.currentTimeMillis();
			long resutTime = endTime - startTime;
			printUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime / 1000 + "(ms)", false, true, true,
					debugOn);
		}
		System.out.println("최종 카운트=" + resultCount);
		return frameworkUtil.createResponseMap(resultCount != 0 ? true : false);
	}

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

		SqlSession sqlSession1 = null;
		try {
			sqlSession1 = sqlSessionFactory.openSession(ExecutorType.SIMPLE);
			resultCount = sqlSession1.delete(query, param);
			System.out.println("리절트카운트=" + resultCount);
			if (resultCount != 0) {

			} else {

				return frameworkUtil.createResponseMap(false, "삭제할 데이터 없음!");
			}
		} catch (Exception e) {
			System.out.println("에러=" + resultCount);
			CustomDataAccessException cdae = new CustomDataAccessException(e.getMessage(), e.getCause());
			throw cdae;
		} finally {
			sqlSession1.flushStatements();
			sqlSession1.close();
			long endTime = System.currentTimeMillis();
			long resutTime = endTime - startTime;
			printUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime / 1000 + "(ms)", false, true, true,
					debugOn);
		}
		return frameworkUtil.createResponseMap(resultCount == 0 ? false : true);
	}
}
