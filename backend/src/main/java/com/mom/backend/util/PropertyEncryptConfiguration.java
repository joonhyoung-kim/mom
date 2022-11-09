package com.mom.backend.util;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.EnvironmentPBEConfig;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PropertyEncryptConfiguration {

	static String algorithm = "PBEWITHMD5ANDDES";
	static String keyPwd = "!thirautech2020!";
	
	public static StandardPBEStringEncryptor StandardPBEStringEncryptor() {
		StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
		EnvironmentPBEConfig config = new EnvironmentPBEConfig();

		config.setAlgorithm(algorithm);
		config.setPassword(keyPwd);
		
		encryptor.setConfig(config);
		return encryptor;
	}
	
	
	public static String encryptPBE(String str) {
		StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();

		encryptor.setAlgorithm(algorithm);
		encryptor.setPassword(keyPwd);
		
		String pwd = encryptor.encrypt(str);
		return pwd;
	} 
	
	public static String decryptPBE(String str) {
		StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();

		encryptor.setAlgorithm(algorithm);
		encryptor.setPassword(keyPwd);
		
		String pwd = encryptor.decrypt(str);
		return pwd;
	} 
	
	public static String AES128_Encode(String str, String Key)
			throws java.io.UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException,
			InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		byte[] keyData = Key.getBytes();
		SecretKey secureKey = new SecretKeySpec(keyData, "AES");
		Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
		c.init(Cipher.ENCRYPT_MODE, secureKey, new IvParameterSpec(Key.getBytes()));
		byte[] encrypted = c.doFinal(str.getBytes("UTF-8"));
		String enStr = new String(Base64.encodeBase64(encrypted));
		return enStr;
	}

}
