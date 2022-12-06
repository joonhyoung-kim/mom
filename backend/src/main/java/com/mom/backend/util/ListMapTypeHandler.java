package com.mom.backend.util;
import java.sql.Array;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Struct;
import java.util.Iterator;
import java.util.List;
import java.util.Map;



import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
import oracle.jdbc.OracleConnection;
@Slf4j
@Component
public class ListMapTypeHandler implements TypeHandler<Object> {

	//private static final Logger log = LoggerFactory.getLogger(ListMapTypeHandler.class);

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public void setParameter(PreparedStatement ps, int i, Object parameter,JdbcType jdbcType) throws SQLException {
		   System.out.println("JDBC타입="+jdbcType.toString());
		   System.out.println("진입1");
			List<Map> objects = (List<Map>) parameter;
			Struct [] structs = new Struct[objects.size()];
		    String mapName = "";
		    String listName = "";
		    int    exceptNum = 2;
		    ObjectMapper oMapper = new ObjectMapper();
		   // String mapName = "WG_COPY_PROC_MAP";
		   // String listName = "WG_COPY_PROC_LIST";
			log.info("List Size --------> {}",objects.size());

			for (int index = 0; index < objects.size(); index++) {
				 
				//Map map = objects.get(index);
				 Map<String, Object> map = oMapper.convertValue(objects.get(index), Map.class);
				//Map map = objects.get(index);
				listName  =  map.get("typeList").toString().trim();
			    mapName   =  map.get("typeMap").toString().trim();
			    map.remove("typeList");
			    map.remove("typeMap");
				//Object[] params = new Object[map.keySet().size()-exceptNum];
				Object[] params = new Object[map.keySet().size()];
				log.info("Map Size --------> {}",map.keySet().size());
				Iterator<String> iterator = map.keySet().iterator();
				int keyIndex = 0;
				while (iterator.hasNext()) {
					String key = (String)iterator.next();
                    params[keyIndex] = map.get(key);
										
					log.info("{}:{}:{} -----> {}",index,keyIndex,key,map.get(key));
					keyIndex++;
				}

				log.info("params -----> {}, length -----> {}",params,params.length);
				log.info("map 스키마?",ps.getConnection().getTypeMap().toString()); ;
				structs[index]  = 	ps.getConnection().createStruct(mapName,params);
			
			}
	
			Array array = ps.getConnection().unwrap(OracleConnection.class).createOracleArray(listName, structs);
			
		
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