package com.mom.backend.controller;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import com.mom.backend.util.PrintUtil;
import com.mom.backend.util.ProgressInfo;
import com.mom.backend.util.ReportUtil;
import com.mom.backend.util.exception.CustomDataAccessException;
import lombok.RequiredArgsConstructor;
import com.mom.backend.util.FrameworkUtil;
import com.mom.backend.serviceimpl.MomServiceImpl;

@RestController
@CrossOrigin
@RequestMapping("/mom")
@RequiredArgsConstructor
public class MomController {
	private final MomServiceImpl momService;
	private final FrameworkUtil frameworkUtil;
	private final ReportUtil reportUtil;
	private final PrintUtil printUtil;
	@Value("${file.dir}")
	private String fileDir;

	@GetMapping(value = "/passwordChange") // 비밀번호변경
	public Map<String, Object> passwordChange(@RequestParam Map<String, Object> param) {
		String loginId = param.get("loginId").toString();
		String nowPass = param.get("nowPass").toString();
		Map<String, Object> returnMap = new HashMap<String, Object>();
		if (frameworkUtil.comparePassword(loginId, nowPass)) {
			returnMap.put("result", "Y");
		} else {
			returnMap.put("result", "N");
		}

		return returnMap;
	}

	@GetMapping(value = "/createReport") // 리포트 생성
	public Map<String, Object> createReport(@RequestParam Map<String, Object> param) {

		String title = param.get("fileName").toString();
		String type = param.get("fileType").toString();
		return reportUtil.createReport(title, type, param);
	}

	@GetMapping(value = "/progressBar")
	public Map<String, Object> getProgress(@RequestParam Map<String, Object> param) {
		// System.out.println("받아온파람"+param);
		Map<String, Object> returnMap = new HashMap<String, Object>();
		if (ProgressInfo.useYn == true) {
			returnMap.put("percent", ProgressInfo.successCount);
		} else {
			returnMap.put("percent", 0);
		}

		return returnMap;
	}

	@GetMapping("/request/{query}/{action}") // 조회 컨트롤러
	public List<Map<String, Object>> getMapList(@PathVariable String query, @PathVariable String action,
			@RequestParam Map<String, Object> param) {
		query = frameworkUtil.removeDummy(query, action);
		param = frameworkUtil.createParam(param, action, null, null, null, null, null);

		printUtil.print("MomController", "getMapList", "#", "$", "query", query, true, false, false, false);
		printUtil.print(null, null, null, "$", "param", param, false, false, true, false);

		return momService.getMapList(query, param);
	}

	@PostMapping("/request/{query}/{action}") // 등록 컨트롤러
	public List<Map<String, Object>> createMapList(@PathVariable String query, @PathVariable String action,
			@RequestBody List<Map<String, Object>> param) {
		query = frameworkUtil.removeDummy(query, action);
		param = frameworkUtil.createParam(param, action);
		List<Map<String, Object>> result = new ArrayList<>();
		printUtil.print("MomController", "createMapList", "#", "$", "query", query, true, false, false, false);
		printUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		try {
			if (action.equals("P")) {
				result = momService.procMapList(query, param);
			} else {
				result = momService.createMapList(query, param);
			}

		} catch (CustomDataAccessException e) {
			System.out.println(e.getMsg());
			result = frameworkUtil.createResponseMap(false, e.getMsg());

		}
		return result;
	}

	@PutMapping("/request/{query}/{action}") // 수정 컨트롤러
	public List<Map<String, Object>> modifyMapList(@PathVariable String query, @PathVariable String action,
			@RequestBody List<Map<String, Object>> param) {
		query = frameworkUtil.removeDummy(query, action);
		param = frameworkUtil.createParam(param, action);

		printUtil.print("MomController", "modifyMapList", "#", "$", "query", query, true, false, false, false);
		printUtil.print(null, null, null, "$", "param", param, false, false, true, false);

		return momService.modifyMapList(query, param);
	}

	@DeleteMapping("/request/{query}/{action}") // 삭제 컨트롤러
	public List<Map<String, Object>> removeMapList(@PathVariable String query, @PathVariable String action,
			@RequestBody List<Map<String, Object>> param) throws Exception {
		query = frameworkUtil.removeDummy(query, action);
		param = frameworkUtil.createParam(param, action);
		List<Map<String, Object>> result = new ArrayList<>();
		printUtil.print("MomController", "createMapList", "#", "$", "query", query, true, false, false, false);
		printUtil.print(null, null, null, "$", "param", param, false, false, true, false);

		try {

			result = momService.removeMapList(query, param);

		} catch (CustomDataAccessException e) {
			System.out.println(e.getMsg());
			result = frameworkUtil.createResponseMap(false, e.getMsg());

		}

		return result;

	}

	@DeleteMapping("/request/file/{query}/{action}") // 파일삭제 컨트롤러
	public List<Map<String, Object>> removeFileMapList(@PathVariable String query, @PathVariable String action,
			@RequestBody List<Map<String, Object>> param) throws Exception {
		query = frameworkUtil.removeDummy(query, action);
		param = frameworkUtil.createParam(param, action);
		List<Map<String, Object>> result = new ArrayList<>();
		printUtil.print("MomController", "createMapList", "#", "$", "query", query, true, false, false, false);
		printUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		for (Map<String, Object> map : param) {
			String deletePath = map.get("filePath").toString();
			String deleteName = map.get("fileUuid").toString();
			frameworkUtil.deleteFile(fileDir + deletePath, deleteName);
		}
		try {
			result = momService.removeMapList(query, param);
		} catch (CustomDataAccessException e) {
			System.out.println(e.getMsg());
			result = frameworkUtil.createResponseMap(false, e.getMsg());

		}

		return result;

	}

	@PostMapping("/request/file/{query}/{action}/{overWrite}") // 파일첨부 컨트롤러
	public List<Map<String, Object>> createFileMapList(@PathVariable String query, @PathVariable String action,
			@PathVariable String overWrite, @RequestPart(value = "fileInfo") Map<String, Object> fileInfo,
			@RequestPart(value = "param") List<Map<String, Object>> param,
			@RequestPart(value = "blob", required = true) MultipartFile multipartRequest) throws Exception {
		query = frameworkUtil.removeDummy(query, action);
		List<Map<String, Object>> result = new ArrayList<>();
		printUtil.print("MomController", "createMapList", "#", "$", "query", query, true, false, false, false);
		printUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		String filePath = fileInfo.get("filePath").toString();
		try {
			MultipartFile file = multipartRequest;
			byte[] byteFile = frameworkUtil.convertFileToByte(file);
			String fileUuid = frameworkUtil.createFile(filePath, overWrite, file);
			if (!file.isEmpty()) { // 파일 존재하면
				if (fileUuid.equals("NONE")) { // 파일 고유식별키 없다면 생성 실패.
					result = frameworkUtil.createResponseMap(false, "fileUpload fail"); // 오류메시지 리턴
				} else if (fileUuid.equals("OVER")) {
					result = frameworkUtil.createResponseMap(true, "overLap "); // 오류메시지 리턴
				} else {
					param = frameworkUtil.createFileParam(param, action, byteFile, fileUuid); // DB에 파일 식별키와 경로를 삽입
					result = momService.createMapList(query, param);
				}

			} else { // 파일 존재안하면
				result = frameworkUtil.createResponseMap(false, "fileUpload fail");
			}
		} catch (CustomDataAccessException e) {
			System.out.println(e.getMsg());
			result = frameworkUtil.createResponseMap(false, e.getMsg());

		}
		return result;
	}

	@GetMapping("/fileDown")
	public byte[] downloadFile(@RequestParam Map<String, Object> param, String filename) throws IOException {
		String filePath = param.get("filePath").toString(); // 서버 파일경로
		String fileName = param.get("fileName").toString(); // UUID + 확장자 붙여서 이름 완성해서 넘어옴
		File file = new File(fileDir + filePath + "\\" + fileName);
		if (ObjectUtils.isEmpty(file)) {
			return null;
		}

		byte[] byteFile = FileUtils.readFileToByteArray(file);
		return byteFile;
		/*
		 * response.setContentType("application/octet-stream");
		 * response.setContentLength(byteFile.length);
		 * response.setHeader("Content-Disposition", "attachment; fileName=\"" +
		 * URLEncoder.encode("manual2.pdf","UTF-8")+"\";");
		 * response.setHeader("Content-Transfer-Encoding", "binary");
		 * response.getOutputStream().write(byteFile);
		 * response.getOutputStream().flush(); response.getOutputStream().close();
		 */
	}

}
