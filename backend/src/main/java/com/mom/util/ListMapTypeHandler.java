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



import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import oracle.jdbc.OracleConnection;
public class ListMapTypeHandler implements TypeHandler<Object> {

	//private static final Logger log = LoggerFactory.getLogger(ListMapTypeHandler.class);

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public void setParameter(PreparedStatement ps, int i, Object parameter,JdbcType jdbcType) throws SQLException {
		   System.out.println("JDBC타입="+jdbcType.toString());
		   System.out.println("진입1");
			List<Map> objects = (List<Map>) parameter;
			Struct [] structs = new Struct[objects.size()];
		
			//log.debug("List Size --------> {}",objects.size());

			for (int index = 0; index < objects.size(); index++) {
				  System.out.println("진입2");
				Map map = objects.get(index);

				Object[] params = new Object[map.keySet().size()];
				Iterator<String> iterator = map.keySet().iterator();
				int keyIndex = 0;
				while (iterator.hasNext()) {
					String key = (String)iterator.next();
					params[keyIndex] = map.get(key);
					//log.debug("{}:{}:{} -----> {}",index,keyIndex,key,map.get(key));
					keyIndex++;
				}

				//log.debug("params -----> {}, length -----> {}",params,params.length);

				structs[index]  = 	ps.getConnection().createStruct("WG_COPY_PROC_MAP",params);
			
			}
			 System.out.println("진입3");
			//ArrayDescriptor desc = ArrayDescriptor.createDescriptor("WC_COPY_PROC_LIST",ps.getConnection());
			//Array array = new ARRAY(desc, ps.getConnection(),structs);
		
			Array array = ps.getConnection().unwrap(OracleConnection.class).createOracleArray("WG_COPY_PROC_LIST", structs);
			System.out.println("진입4");
			System.out.println("최종파람="+array);
			ps.setArray(i, array);
			System.out.println("진입5");
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