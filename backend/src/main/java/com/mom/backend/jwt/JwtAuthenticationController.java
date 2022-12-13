package com.mom.backend.jwt;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import com.mom.backend.jwt.JwtRequest;
import com.mom.backend.jwt.JwtResponse;
import com.mom.backend.jwt.JwtUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mom.backend.jwt.JwtTokenUtil;

@RestController
@CrossOrigin
@Component
public class JwtAuthenticationController {
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	@PostMapping(value = "/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody Map<String, String> paramMap) throws Exception {
		HttpHeaders headers = new HttpHeaders();
		headers.set("ContentType", "application/json;charset=UTF-8");
		String clientId = paramMap.get("userId");
		String clientPw = paramMap.get("password");
		String companyCd = paramMap.get("companyCd");
		String divisionCd = paramMap.get("divisionCd");
		String languageCd = paramMap.get("languageCd");
		String comboType = paramMap.get("comboType");

		// System.out.println("클라이언트 인코딩pw="+encodedPassword);

		JwtLoginInfo.divisionCd = divisionCd;
		JwtLoginInfo.companyCd = companyCd;
		JwtLoginInfo.languageCd = languageCd;
		JwtLoginInfo.comboType = comboType;
		// authenticate(clientId, clientPw); //사용자 인증
		final UserDetails userDetails = userDetailsService.loadUserByUsername(clientId);
		if (passwordEncoder.matches(clientPw, userDetails.getPassword())) {
			// System.out.println("비밀번호 일치!");
			final String token = jwtTokenUtil.generateToken(userDetails); // 토큰생성

			// tokenMap.put("token", token);
			// JwtLoginInfo.resultMapList.add(tokenMap);
			if (clientId.equals("master")) {

				return ResponseEntity.ok().headers(headers).body(JwtLoginInfo.resultMapList);
			} else {
				return ResponseEntity.ok(new JwtResponse(token));
			}

			// return ResponseEntity.ok().headers(headers).body(JwtLoginInfo.resultMapList);
			// return ResponseEntity(HttpStatus.OK);
		} else {
			// System.out.println("비밀번호 불일치!");
			throw new BadCredentialsException(clientId);
		}
	}

	@PostMapping(value = "/loginCheck")
	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			System.out.println("USER_DISABLED");
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			System.out.println("INVALID_CREDENTIALS");
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}
