package com.mom.backend.util.exception;

import java.sql.SQLException;

import org.springframework.dao.DataAccessException;

public class CustomDataAccessException extends DataAccessException {
    String query;
    String msg;
    public CustomDataAccessException(String msg){
        super(msg);
      
    }
    public CustomDataAccessException(String msg, String query){
        this(msg);
        this.query = query;
      
    }
    public CustomDataAccessException(String msg, Throwable cause){

        super(msg,cause);
        SQLException se = (SQLException) cause;
        int errCode = se.getErrorCode();


        if(errCode==1) {
        	setMsg("MSG00044");
        }
        else if(errCode==2292) {
        	setMsg("MSG00051");
        }
        else {
        	setMsg("MSG00045");
        }
    }
    public CustomDataAccessException(String msg, Throwable cause, String query){
        this(msg,cause);
        this.query = query;
    }
    public String getMsg() {
        return this.msg;
    }
    public void setMsg(String msg) {
        this.msg = msg;
    }

}