package com.mom.util;
import java.sql.Array;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Struct;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


import oracle.sql.SQLName;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
public class ListMapTypeHandler implements TypeHandler<Object> {

	private static final Logger log = LoggerFactory.getLogger(ListMapTypeHandler.class);

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public void setParameter(PreparedStatement ps, int i, Object parameter,JdbcType jdbcType) throws SQLException {
			 List<Map> objects = (List<Map>) parameter; //mybatis 에서 넘어온 parameter 
			 Object[] paramArray = new Object[objects.size()];  // 

	        
			log.debug("List Size --------> {}",objects.size());
            
			for (int index = 0; index < objects.size(); index++) { // 반복문 돌면서 LIST 객체의 MAP  추출 
				Map map = objects.get(index);
				Object[] params = new Object[map.keySet().size()];
				Iterator<String> iterator = map.keySet().iterator();
				int keyIndex = 0;
				while (iterator.hasNext()) { // 반복문 돌면서 MAP 객체의 요소를 추출 
					String key = (String)iterator.next();
					params[keyIndex] = map.get(key);
					log.debug("{}:{}:{} -----> {}",index,keyIndex,key,map.get(key));
					keyIndex++;
				
				}

				log.debug("params -----> {}, length -----> {}",params,params.length);

				//STRUCT struct = new STRUCT(structDescriptor, ps.getConnection(), params);
				//struct[index] = ps.getConnection().createStruct("R_REPORT_OBJECT", params);
				paramArray[index] = params;

			}

			//ArrayDescriptor desc = ArrayDescriptor.createDescriptor("EMP_LIST",ps.getConnection());
			//Array array = new ARRAY(desc, ps.getConnection(),structs);
			Array array = ps.getConnection().createArrayOf("VARCHAR", paramArray);
			ps.setArray(i, array);

	}

	@Override
	public Object getResult(ResultSet rs, String columnName)
			throws SQLException {
		return null;
	}

	@Override
	public Object getResult(ResultSet rs, int columnIndex) throws SQLException {
		return null;
	}

	@Override
	public Object getResult(CallableStatement cs, int columnIndex)
			throws SQLException {
		if ( cs.wasNull() )
			return null;
		else
			return cs.getString(columnIndex);
	}

}