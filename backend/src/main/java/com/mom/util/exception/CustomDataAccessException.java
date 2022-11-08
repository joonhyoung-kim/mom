package com.mom.util.exception;

import java.sql.SQLException;

import org.springframework.dao.DataAccessException;

public class CustomDataAccessException extends DataAccessException {
    String query;
    String msg;
    public CustomDataAccessException(String msg){
        super(msg);
        System.out.println("에러1"+msg);
    }
    public CustomDataAccessException(String msg, String query){
        this(msg);
        this.query = query;
        System.out.println("에러2"+msg);
    }
    public CustomDataAccessException(String msg, Throwable cause){

        super(msg,cause);
        SQLException se = (SQLException) cause;
        int errCode = se.getErrorCode();
        
      
    
        System.out.println("에러3"+msg);
        System.out.println("에러Code"+errCode);
        System.out.println("에러cause="+cause.getMessage());
        

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