package com.mom.jwt;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class JwtRequest implements Serializable {

    private static final long serialVersionUID = 5926468583005150707L;
    private String userId;
    private String password;
    private String companyCd;
    private String divisionCd;
    private String languageCd;
    //need default constructor for JSON Parsing
    public JwtRequest()
    {

    }

    public JwtRequest(String userId,  String password, String companyCd, String divisionCd, String languageCd) {         
        this.setUserId(userId);
        this.setPassword(password);
        this.setCompanyCode(companyCd);
        this.setDivisionCode(divisionCd);
        this.setLanguageCode(languageCd);
        
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getDivisionCode() {
        return this.divisionCd;
    }

    public void setDivisionCode(String divisionCd) {
        this.divisionCd = divisionCd;
    }
    public String getCompanyCode() {
        return this.companyCd;
    }

    public void setCompanyCode(String companyCd) {
        this.companyCd = companyCd;
    }

    public String getLanguageCode() {
        return this.languageCd;
    }

    public void setLanguageCode(String languageCd) {
        this.languageCd = languageCd;
    }
}
