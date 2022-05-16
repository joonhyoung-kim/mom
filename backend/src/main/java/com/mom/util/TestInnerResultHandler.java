package com.mom.util;

import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Map;


@Component
public class TestInnerResultHandler implements ResultHandler<Map<String,Object>>  {
    //public List<Map<String,Object>> returnList = null;
	 public List<Map<String,Object>> returnList = null;
	 	
	   public TestInnerResultHandler() {

	    }
	
	  public TestInnerResultHandler(List<Map<String,Object>> returnList) {
	  this.returnList = returnList; }
	 
    
    		//ResultContext context
    @Override
    public void handleResult(ResultContext context) {
        Object object = context.getResultObject();
        
       // System.out.println("핸들러데이터실행="+object.toString());
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.convertValue(object, Map.class);
        returnList.add(map);
    }
	
}
