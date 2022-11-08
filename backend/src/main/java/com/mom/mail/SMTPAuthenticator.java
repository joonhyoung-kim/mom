package com.mom.mail;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class SMTPAuthenticator extends Authenticator {
	private String sendUser;
	private String sendPwd;
	
	public SMTPAuthenticator(String sendUser, String sendPwd) {
		this.sendUser = sendUser;
		this.sendPwd = sendPwd;
	}
	
	@Override
	protected PasswordAuthentication getPasswordAuthentication() {
		return new PasswordAuthentication(sendUser, sendPwd);
	}
}
