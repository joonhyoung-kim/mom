package com.mom.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mom.service.MomService;

public class InterfaceUtilAdv {
	/*
	 * public static Map<String, String> driver = null;
	 * 
	 * private static String ORCALE = "ORACLE"; private static String MSSQL =
	 * "MS-SQL"; private static String TIBERO = "TIBERO"; private static String
	 * MARIADB = "MARIADB"; private static String dbName = ""; modify_hists
	 * 20200708_001 / gyp / Init. 20200717 / gyp / MS-SQL 과 오라클/티베로 sql 구분 적용 및 에러
	 * 코드, 메시지 넘기도록 수정
	 * 
	 * 
	 * public static Map<String,Object> writeOut(MomService momService,
	 * List<Map<String,Object>> paramList ) { if(paramList == null ||
	 * paramList.size() == 0) { return null; } int cnt = 0; Map<String, Object>
	 * rtnMap = null; for(int z=0; z<paramList.size(); z++) { Map<String, Object>
	 * param = paramList.get(z); param.put("transType", "S"); List<Map<String,
	 * Object>> result =
	 * momService.getMapList("com.thirautech.mom.common.get_ifDetailInfo_list",
	 * param); if(result == null || result.size() == 0) { return null; }
	 * 
	 * // if(result.get(0).get("tableId") == null) { // return false; // }
	 * 
	 * if(InterfaceUtilAdv.driver == null) { InterfaceUtilAdv.driver = new
	 * HashMap<String, String>(); InterfaceUtilAdv.driver.put(ORCALE,
	 * "oracle.jdbc.OracleDriver"); InterfaceUtilAdv.driver.put(MSSQL,
	 * "com.microsoft.sqlserver.jdbc.SQLServerDriver");
	 * InterfaceUtilAdv.driver.put(TIBERO, "com.tmax.tibero.jdbc.TbDriver");
	 * InterfaceUtilAdv.driver.put(MARIADB, "org.mariadb.jdbc.Driver"); }
	 * 
	 * String connectionString = ""; String pwd = ""; String dbType = "";
	 * 
	 * for(int i = 0; i < result.size(); i++) { if(result.get(i).get("password") !=
	 * null) { pwd = result.get(i).get("password").toString(); }
	 * 
	 * if(result.get(i).get("encPassword") != null) { pwd =
	 * PropertyEncryptConfiguration.decryptPBE(result.get(i).get("encPassword").
	 * toString()); }
	 * 
	 * if(result.get(i).get("dbName") != null) { dbName =
	 * result.get(i).get("dbName").toString(); }
	 * 
	 * if(result.get(i).get("dbType") != null) { dbType =
	 * result.get(i).get("dbType").toString(); } else { return null; }
	 * 
	 * // System.out.println("result....." + result.get(i)); //
	 * System.out.println("pwd....." + pwd);
	 * 
	 * if(dbType.equals(ORCALE)) { connectionString = "jdbc:oracle:thin:@" +
	 * result.get(i).get("dbHost").toString() + ":" +
	 * result.get(i).get("dbPort").toString() + ":" + dbName; } else
	 * if(dbType.equals(MSSQL)) { connectionString = "jdbc:sqlserver://" +
	 * result.get(i).get("dbHost").toString() + ":" +
	 * result.get(i).get("dbPort").toString() + ";databaseName=" + dbName + ";user="
	 * + result.get(i).get("userId1").toString() + ";password=" + pwd; //
	 * System.out.println("@@@ connectionString @@@ : " + connectionString); } else
	 * if(dbType.equals(TIBERO)) { connectionString = "jdbc:tibero:thin:@" +
	 * result.get(i).get("dbHost").toString() + ":" +
	 * result.get(i).get("dbPort").toString() + ":" + dbName; } else
	 * if(dbType.equals(MARIADB)) { connectionString = "jdbc:mariadb://" +
	 * result.get(i).get("dbHost").toString() + ":" +
	 * result.get(i).get("dbPort").toString() + ":" + dbName; }
	 * 
	 * Connection connection = null; PreparedStatement preparedStatement = null; try
	 * { if(dbType.equals(MSSQL)) { connection =
	 * DriverManager.getConnection(connectionString); } else { connection =
	 * DriverManager.getConnection(connectionString,
	 * result.get(i).get("userId1").toString(), pwd); }
	 * connection.setAutoCommit(false); } catch(Exception e) { try {
	 * Class.forName(InterfaceUtilAdv.driver.get(result.get(i).get("dbType").
	 * toString()));
	 * 
	 * if(dbType.equals(MSSQL)) { connection =
	 * DriverManager.getConnection(connectionString); } else { connection =
	 * DriverManager.getConnection(connectionString,
	 * result.get(i).get("userId1").toString(), pwd); }
	 * 
	 * connection.setAutoCommit(false); } catch (Exception e1) { // TODO
	 * Auto-generated catch block e1.printStackTrace(); rtnMap.put("p_err_code",
	 * "E"); rtnMap.put("p_err_msg", e1.toString()); } }
	 * 
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_LGE_SITE_S") >= 0)
	 * { // 사이트 정보 송신 rtnMap = fnSetIf_Erp_R_Site(connection, preparedStatement,
	 * momService, param,paramList, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_LGE_SHOP_S") >= 0)
	 * { // 공장 정보 송신 rtnMap = fnSetIf_Erp_R_Shop(connection, preparedStatement,
	 * momService, param,paramList, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_LGE_AREA_S") >= 0)
	 * { // 설비군 정보 송신 rtnMap = fnSetIf_Erp_R_Area(connection, preparedStatement,
	 * momService, param,paramList, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_LGE_PCSG_S") >= 0)
	 * { // 설비 정보 송신 rtnMap = fnSetIf_Erp_R_Pcsg(connection, preparedStatement,
	 * momService, param,paramList, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_LGE_PRODMTRL_S")
	 * >= 0) { // 품목 정보 송신 rtnMap = fnSetIf_Erp_R_Prodmtrl(connection,
	 * preparedStatement, momService, param,paramList, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_LGE_BOR_S") >= 0)
	 * { // BOR 정보 송신 rtnMap = fnSetIf_Erp_R_Bor(connection, preparedStatement,
	 * momService, param,paramList, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_LGE_CUSTOMER_S")
	 * >= 0) { // 고객사 정보 송신 rtnMap = fnSetIf_Erp_R_Customer(connection,
	 * preparedStatement, momService, param,paramList, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_LGE_SUPPLIER_S")
	 * >= 0) { // 공급업체 정보 송신 rtnMap = fnSetIf_Erp_R_Supplier(connection,
	 * preparedStatement, momService, param,paramList, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_LGE_SHIFT_S") >=
	 * 0) { // 근무유형 정보 송신 rtnMap = fnSetIf_Erp_R_Shift(connection,
	 * preparedStatement, momService, param,paramList, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_LGE_CMCD_S") >= 0)
	 * { // 검사수준 정보 송신 rtnMap = fnSetIf_Erp_R_Cmcd(connection, preparedStatement,
	 * momService, param, paramList,dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_LGE_MBOM_S") >= 0)
	 * { // MBOM 정보 송신 rtnMap = fnSetIf_Erp_R_Mbom(connection, preparedStatement,
	 * momService, param,paramList, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_LGE_ITEMTYPE_S")
	 * >= 0) { // 품목유형 정보 송신 rtnMap = fnSetIf_Erp_R_Itemtype(connection,
	 * preparedStatement, momService, param,paramList, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_LGE_WORKORDER_S")
	 * >= 0) { // 작업지시 정보 송신 rtnMap = fnSetIf_Erp_R_WorkOrder(connection,
	 * preparedStatement, momService, param,paramList, dbType);
	 * 
	 * // 작업지시 송신 성공 후 자재불출요청 정보 체크 if(rtnMap.get("result") != null &&
	 * "success".equals(rtnMap.get("result").toString())) { List<Map<String,
	 * Object>> resultList = new ArrayList<Map<String, Object>>();
	 * paramList.get(z).put("tableId", "IF_MOM_LGE_MATERIALREQ_S");
	 * resultList.add(paramList.get(z)); writeOut(momService, resultList); } } else
	 * if(result.get(i).get("tableId").toString().indexOf(
	 * "IF_MOM_LGE_MATERIALREQ_S") >= 0) { // 자재불출요청 정보 송신 rtnMap =
	 * fnSetIf_Erp_R_Materialreq(connection, preparedStatement, momService,
	 * param,paramList, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf(
	 * "IF_MOM_ITEM_DEFINITION_S") >= 0) { // 품목관리 정보 송신 rtnMap =
	 * fnSetIf_Mom_Item_Def(connection, preparedStatement, momService,
	 * param,paramList, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_BOR_S") >= 0) { //
	 * BOR 정보 송신 rtnMap = fnSetIf_Mom_Bor(connection, preparedStatement, momService,
	 * param, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_RESOURCE_S") >= 0)
	 * { // 설비 정보 송신 rtnMap = fnSetIf_Mom_Resource(connection, preparedStatement,
	 * momService, param, dbType); } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_SHIFT_SCHEDULE_S")
	 * >= 0) { // SHIFT 정보 송신 rtnMap = fnSetIf_Mom_ShiftSchedule(connection,
	 * preparedStatement, momService, param,paramList, dbType); cnt++; } else
	 * if(result.get(i).get("tableId").toString().indexOf("IF_MOM_BOM_S") >= 0) { //
	 * BOM 정보 송신 rtnMap = fnSetIf_Mom_Bom(connection, preparedStatement, momService,
	 * param, dbType); }
	 * 
	 * } } // System.out.println("rtnMap.........." + rtnMap);
	 * 
	 * return rtnMap; }
	 * 
	 * static Map<String,Object> fnSetIf_Erp_R_Site(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService,
	 * Map<String,Object> paramMap,List<Map<String, Object>> paramMapList, String
	 * dbType) { // 전송 데이터 조회 List<Map<String, Object>> resultList =
	 * momService.getMapList("com.thirautech.mom.common.get_ifMomLgeSiteS_list",
	 * paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * Map<String, Object> rtnMap = null; int reInt = 0; String rtnMsg = "";
	 * java.util.Date today = new java.util.Date(); String sql = "";
	 * if(dbType.equals(MSSQL)) { sql = "INSERT INTO IF_ERP_R_SITE(" + " SITEID" +
	 * ", SITENAME" + ", SITEDESC" + ", SITEIUSE" + ", IFFLAG" + ", INSDTTM" + ")" +
	 * " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; } else
	 * if(dbType.equals(MARIADB)){ sql = "INSERT INTO "+ dbName +".IF_ERP_R_SITE(" +
	 * " IFSEQ" + ", SITEID" + ", SITENAME" + ", SITEDESC" + ", SITEIUSE" +
	 * ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" +
	 * ",?" + ",'N'" + ",?" + ")"; } else { sql = "INSERT INTO IF_ERP_R_SITE(" +
	 * " IFSEQ" + ", SITEID" + ", SITENAME" + ", SITEDESC" + ", SITEIUSE" +
	 * ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" +
	 * ",?" + ",'N'" + ",?" + ")"; }
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql);
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j);
	 * 
	 * if(dbType.equals(MSSQL)) { preparedStatement.setString( 1,
	 * param.get("siteId").toString()); preparedStatement.setString( 2,
	 * param.get("siteName").toString()); preparedStatement.setString( 3,
	 * param.get("siteDesc") == null ? null : param.get("siteDesc").toString());
	 * preparedStatement.setString( 4, param.get("useYn").toString());
	 * preparedStatement.setTimestamp(5, new Timestamp(today.getTime())); } else {
	 * preparedStatement.setLong ( 1,
	 * Long.parseLong(param.get("transSeq").toString()));
	 * preparedStatement.setString( 2, param.get("siteId").toString());
	 * preparedStatement.setString( 3, param.get("siteName").toString());
	 * preparedStatement.setString( 4, param.get("siteDesc") == null ? null :
	 * param.get("siteDesc").toString()); preparedStatement.setString( 5,
	 * param.get("useYn").toString()); preparedStatement.setTimestamp(6, new
	 * Timestamp(today.getTime())); }
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 성공 시 전송시간, 전송여부 업데이트 if(reInt > 0 && rtnMsg.equals("")) { rtnMap =
	 * momService.modifyMapList("com.thirautech.mom.common.modify_ifMomLgeSiteS",
	 * paramMapList); return FrameworkUtil.createResponseMap(rtnMap, true, rtnMsg);
	 * } else { return FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Erp_R_Shop(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap,List<Map<String, Object>> paramMapList, String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList =
	 * momService.getMapList("com.thirautech.mom.common.get_ifMomLgeShopS_list",
	 * paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * Map<String, Object> rtnMap = null; int reInt = 0; String rtnMsg = "";
	 * java.util.Date today = new java.util.Date(); String sql = "";
	 * if(dbType.equals(MSSQL)) { sql = "INSERT INTO IF_ERP_R_SHOP(" + " SHOPID" +
	 * ", SHOPNAME" + ", SHOPDESC" + ", SHOPIUSE" + ", SITEID" + ", IFFLAG" +
	 * ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",?" + ",'N'" +
	 * ",?" + ")"; } else if(dbType.equals(MARIADB)){ sql = "INSERT INTO "+ dbName +
	 * ".IF_ERP_R_SHOP(" + " IFSEQ" + ", SHOPID" + ", SHOPNAME" + ", SHOPDESC" +
	 * ", SHOPIUSE" + ", SITEID" + ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" +
	 * " ?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")";
	 * 
	 * } else { sql = "INSERT INTO IF_ERP_R_SHOP(" + " IFSEQ" + ", SHOPID" +
	 * ", SHOPNAME" + ", SHOPDESC" + ", SHOPIUSE" + ", SITEID" + ", IFFLAG" +
	 * ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",'N'" + ",?" + ")"; }
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql);
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); if(dbType.equals(MSSQL)) { preparedStatement.setString( 1,
	 * param.get("shopId").toString()); preparedStatement.setString( 2,
	 * param.get("shopName").toString()); preparedStatement.setString( 3,
	 * param.get("shopDesc") == null ? null : param.get("shopDesc").toString());
	 * preparedStatement.setString( 4, param.get("useYn").toString());
	 * preparedStatement.setString( 5, param.get("siteId").toString());
	 * preparedStatement.setTimestamp(6, new Timestamp(today.getTime())); } else {
	 * preparedStatement.setLong ( 1,
	 * Long.parseLong(param.get("transSeq").toString()));
	 * preparedStatement.setString( 2, param.get("shopId").toString());
	 * preparedStatement.setString( 3, param.get("shopName").toString());
	 * preparedStatement.setString( 4, param.get("shopDesc") == null ? null :
	 * param.get("shopDesc").toString()); preparedStatement.setString( 5,
	 * param.get("useYn").toString()); preparedStatement.setString( 6,
	 * param.get("siteId").toString()); preparedStatement.setTimestamp(7, new
	 * Timestamp(today.getTime())); }
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 성공 시 전송시간, 전송여부 업데이트 if(reInt > 0 && rtnMsg.equals("")) { rtnMap =
	 * momService.modifyMapList("com.thirautech.mom.common.modify_ifMomLgeShopS",
	 * paramMapList); return FrameworkUtil.createResponseMap(rtnMap, true, rtnMsg);
	 * } else { return FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Erp_R_Area(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap,List<Map<String, Object>> paramMapList, String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList =
	 * momService.getMapList("com.thirautech.mom.common.get_ifMomLgeAreaS_list",
	 * paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * Map<String, Object> rtnMap = null; int reInt = 0; String rtnMsg = "";
	 * java.util.Date today = new java.util.Date(); String sql = "";
	 * if(dbType.equals(MSSQL)) { sql = "INSERT INTO IF_ERP_R_AREA(" + " AREAID" +
	 * ", AREANAME" + ", AREADESC" + ", AREAIUSE" + ", SHOPID" + ", IFFLAG" +
	 * ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",?" + ",'N'" +
	 * ",?" + ")"; } else if(dbType.equals(MARIADB)){ sql = "INSERT INTO " + dbName
	 * + ".IF_ERP_R_AREA(" + " IFSEQ" + ", AREAID" + ", AREANAME" + ", AREADESC" +
	 * ", AREAIUSE" + ", SHOPID" + ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" +
	 * " ?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; } else { sql =
	 * "INSERT INTO IF_ERP_R_AREA(" + " IFSEQ" + ", AREAID" + ", AREANAME" +
	 * ", AREADESC" + ", AREAIUSE" + ", SHOPID" + ", IFFLAG" + ", INSDTTM" + ")" +
	 * " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; }
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql);
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); if(dbType.equals(MSSQL)) { preparedStatement.setString( 1,
	 * param.get("areaId").toString()); preparedStatement.setString( 2,
	 * param.get("areaName").toString()); preparedStatement.setString( 3,
	 * param.get("areaDesc") == null ? null : param.get("areaDesc").toString());
	 * preparedStatement.setString( 4, param.get("useYn").toString());
	 * preparedStatement.setString( 5, param.get("shopId").toString());
	 * preparedStatement.setTimestamp(6, new Timestamp(today.getTime())); } else {
	 * preparedStatement.setLong ( 1,
	 * Long.parseLong(param.get("transSeq").toString()));
	 * preparedStatement.setString( 2, param.get("areaId").toString());
	 * preparedStatement.setString( 3, param.get("areaName").toString());
	 * preparedStatement.setString( 4, param.get("areaDesc") == null ? null :
	 * param.get("areaDesc").toString()); preparedStatement.setString( 5,
	 * param.get("useYn").toString()); preparedStatement.setString( 6,
	 * param.get("shopId").toString()); preparedStatement.setTimestamp(7, new
	 * Timestamp(today.getTime())); }
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 성공 시 전송시간, 전송여부 업데이트 if(reInt > 0 && rtnMsg.equals("")) { rtnMap =
	 * momService.modifyMapList("com.thirautech.mom.common.modify_ifMomLgeAreaS",
	 * paramMapList); return FrameworkUtil.createResponseMap(rtnMap, true, rtnMsg);
	 * } else { return FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Erp_R_Pcsg(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap, List<Map<String, Object>> paramMapList,String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList =
	 * momService.getMapList("com.thirautech.mom.common.get_ifMomLgePcsgS_list",
	 * paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * Map<String, Object> rtnMap = null; int reInt = 0; String rtnMsg = "";
	 * java.util.Date today = new java.util.Date(); String sql = "";
	 * if(dbType.equals(MSSQL)) { sql = "INSERT INTO IF_ERP_R_PROCESSSEGMENT(" +
	 * " PCSGID" + ", PCSGNAME" + ", PCSGDESC" + ", PCSGIUSE" + ", AREAID" +
	 * ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" +
	 * ",?" + ",'N'" + ",?" + ")"; } else if(dbType.equals(MARIADB)){ sql =
	 * "INSERT INTO " + dbName + ".IF_ERP_R_PROCESSSEGMENT(" + " IFSEQ" + ", PCSGID"
	 * + ", PCSGNAME" + ", PCSGDESC" + ", PCSGIUSE" + ", AREAID" + ", IFFLAG" +
	 * ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",'N'" + ",?" + ")"; } else { sql = "INSERT INTO IF_ERP_R_PROCESSSEGMENT(" +
	 * " IFSEQ" + ", PCSGID" + ", PCSGNAME" + ", PCSGDESC" + ", PCSGIUSE" +
	 * ", AREAID" + ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?"
	 * + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; }
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql);
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); if(dbType.equals(MSSQL)) { preparedStatement.setString( 1,
	 * param.get("pcsgId").toString()); preparedStatement.setString( 2,
	 * param.get("pcsgName").toString()); preparedStatement.setString( 3,
	 * param.get("pcsgDesc") == null ? null : param.get("pcsgDesc").toString());
	 * preparedStatement.setString( 4, param.get("useYn").toString());
	 * preparedStatement.setString( 5, param.get("areaId").toString());
	 * preparedStatement.setTimestamp(6, new Timestamp(today.getTime())); } else {
	 * preparedStatement.setLong ( 1,
	 * Long.parseLong(param.get("transSeq").toString()));
	 * preparedStatement.setString( 2, param.get("pcsgId").toString());
	 * preparedStatement.setString( 3, param.get("pcsgName").toString());
	 * preparedStatement.setString( 4, param.get("pcsgDesc") == null ? null :
	 * param.get("pcsgDesc").toString()); preparedStatement.setString( 5,
	 * param.get("useYn").toString()); preparedStatement.setString( 6,
	 * param.get("areaId").toString()); preparedStatement.setTimestamp(7, new
	 * Timestamp(today.getTime())); }
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 성공 시 전송시간, 전송여부 업데이트 if(reInt > 0 && rtnMsg.equals("")) { rtnMap =
	 * momService.modifyMapList("com.thirautech.mom.common.modify_ifMomLgePcsgS",
	 * paramMapList); return FrameworkUtil.createResponseMap(rtnMap, true, rtnMsg);
	 * } else { return FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Erp_R_Prodmtrl(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap,List<Map<String, Object>> paramMapList, String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList =
	 * momService.getMapList("com.thirautech.mom.common.get_ifMomLgeProdmtrlS_list",
	 * paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * Map<String, Object> rtnMap = null; int reInt = 0; String rtnMsg = "";
	 * java.util.Date today = new java.util.Date(); String sql = "";
	 * if(dbType.equals(MSSQL)) { sql = "INSERT INTO IF_ERP_R_PRODUCTMATERIAL(" +
	 * " PRODID" + ", PRODNAME" + ", PRODDESC" + ", MODLID" + ", MODLNAME" +
	 * ", PRODTYPE" + ", PRODIUSE" + ", PCSGID" + ", MTRLUNIT" + ", SUPPLIERID" +
	 * ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; } else
	 * if(dbType.equals(MARIADB)){ sql = "INSERT INTO " + dbName +
	 * ".IF_ERP_R_PRODUCTMATERIAL(" + " IFSEQ" + ", PRODID" + ", PRODNAME" +
	 * ", PRODDESC" + ", MODLID" + ", MODLNAME" + ", PRODTYPE" + ", PRODIUSE" +
	 * ", PCSGID" + ", MTRLUNIT" + ", SUPPLIERID" + ", IFFLAG" + ", INSDTTM" + ")" +
	 * " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",'N'" + ",?" + ")"; } else { sql =
	 * "INSERT INTO IF_ERP_R_PRODUCTMATERIAL(" + " IFSEQ" + ", PRODID" +
	 * ", PRODNAME" + ", PRODDESC" + ", MODLID" + ", MODLNAME" + ", PRODTYPE" +
	 * ", PRODIUSE" + ", PCSGID" + ", MTRLUNIT" + ", SUPPLIERID" + ", IFFLAG" +
	 * ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; }
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql);
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); if(dbType.equals(MSSQL)) { preparedStatement.setString( 1,
	 * param.get("prodId").toString()); preparedStatement.setString( 2,
	 * param.get("prodName").toString()); preparedStatement.setString( 3,
	 * param.get("prodDesc").toString()); preparedStatement.setString( 4,
	 * param.get("modlId") == null ? null : param.get("modlId").toString());
	 * preparedStatement.setString( 5, param.get("modlName") == null ? null :
	 * param.get("modlName").toString()); preparedStatement.setString( 6,
	 * param.get("prodType").toString()); preparedStatement.setString( 7,
	 * param.get("useYn").toString()); preparedStatement.setString( 8,
	 * param.get("pcsgId").toString()); preparedStatement.setString( 9,
	 * param.get("mtrlUnit") == null ? null : param.get("mtrlUnit").toString());
	 * preparedStatement.setString(10, param.get("supplierId") == null ? null :
	 * param.get("supplierId").toString()); preparedStatement.setTimestamp(11, new
	 * Timestamp(today.getTime())); } else { preparedStatement.setLong ( 1,
	 * Long.parseLong(param.get("transSeq").toString()));
	 * preparedStatement.setString( 2, param.get("prodId").toString());
	 * preparedStatement.setString( 3, param.get("prodName").toString());
	 * preparedStatement.setString( 4, param.get("prodDesc").toString());
	 * preparedStatement.setString( 5, param.get("modlId") == null ? null :
	 * param.get("modlId").toString()); preparedStatement.setString( 6,
	 * param.get("modlName") == null ? null : param.get("modlName").toString());
	 * preparedStatement.setString( 7, param.get("prodType").toString());
	 * preparedStatement.setString( 8, param.get("useYn").toString());
	 * preparedStatement.setString( 9, param.get("pcsgId").toString());
	 * preparedStatement.setString(10, param.get("mtrlUnit") == null ? null :
	 * param.get("mtrlUnit").toString()); preparedStatement.setString(11,
	 * param.get("supplierId") == null ? null : param.get("supplierId").toString());
	 * preparedStatement.setTimestamp(12, new Timestamp(today.getTime())); }
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 성공 시 전송시간, 전송여부 업데이트 if(reInt > 0 && rtnMsg.equals("")) { rtnMap =
	 * momService.modifyMapList("com.thirautech.mom.common.modify_ifMomLgeProdmtrlS"
	 * ,paramMapList); return FrameworkUtil.createResponseMap(rtnMap, true, rtnMsg);
	 * } else { return FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Erp_R_Bor(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap, List<Map<String, Object>> paramMapList, String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList =
	 * momService.getMapList("com.thirautech.mom.common.get_ifMomLgeBorS_list",
	 * paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * Map<String, Object> rtnMap = null; int reInt = 0; String rtnMsg = "";
	 * java.util.Date today = new java.util.Date(); String sql = "";
	 * if(dbType.equals(MSSQL)) { sql = "INSERT INTO IF_ERP_R_BOR(" + " PRODID" +
	 * ", PRODNAME" + ", MODLID" + ", MODLNAME" + ", PRODTYPE" + ", BORIUSE" +
	 * ", PCSGID" + ", TACTTIME" + ", PRIORITY" + ", IFFLAG" + ", INSDTTM" + ")" +
	 * " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",'N'" + ",?" + ")"; } else if(dbType.equals(MARIADB)){ sql = "INSERT INTO "
	 * + dbName + ".IF_ERP_R_BOR(" + " IFSEQ" + ", PRODID" + ", PRODNAME" +
	 * ", MODLID" + ", MODLNAME" + ", PRODTYPE" + ", BORIUSE" + ", PCSGID" +
	 * ", TACTTIME" + ", PRIORITY" + ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" +
	 * " ?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'N'"
	 * + ",?" + ")"; } else { sql = "INSERT INTO IF_ERP_R_BOR(" + " IFSEQ" +
	 * ", PRODID" + ", PRODNAME" + ", MODLID" + ", MODLNAME" + ", PRODTYPE" +
	 * ", BORIUSE" + ", PCSGID" + ", TACTTIME" + ", PRIORITY" + ", IFFLAG" +
	 * ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; }
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql);
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); if(dbType.equals(MSSQL)) { preparedStatement.setString( 1,
	 * param.get("prodId").toString()); preparedStatement.setString( 2,
	 * param.get("prodName").toString()); preparedStatement.setString( 3,
	 * param.get("modlId") == null ? null : param.get("modlId").toString());
	 * preparedStatement.setString( 4, param.get("modlName") == null ? null :
	 * param.get("modlName").toString()); preparedStatement.setString( 5,
	 * param.get("prodType").toString()); preparedStatement.setString( 6,
	 * param.get("useYn").toString()); preparedStatement.setString( 7,
	 * param.get("pcsgId").toString()); if(param.get("tactTime") != null &&
	 * !param.get("tactTime").toString().equals("")) { preparedStatement.setFloat(
	 * 8, Float.parseFloat(param.get("tactTime").toString())); } else {
	 * preparedStatement.setObject( 8, null); } if(param.get("priority") != null &&
	 * !param.get("priority").toString().equals("")) { preparedStatement.setInt( 9,
	 * Integer.parseInt(param.get("priority").toString())); } else {
	 * preparedStatement.setObject( 9, null); } preparedStatement.setTimestamp(10,
	 * new Timestamp(today.getTime())); } else { preparedStatement.setLong ( 1,
	 * Long.parseLong(param.get("transSeq").toString()));
	 * preparedStatement.setString( 2, param.get("prodId").toString());
	 * preparedStatement.setString( 3, param.get("prodName").toString());
	 * preparedStatement.setString( 4, param.get("modlId") == null ? null :
	 * param.get("modlId").toString()); preparedStatement.setString( 5,
	 * param.get("modlName") == null ? null : param.get("modlName").toString());
	 * preparedStatement.setString( 6, param.get("prodType").toString());
	 * preparedStatement.setString( 7, param.get("useYn").toString());
	 * preparedStatement.setString( 8, param.get("pcsgId").toString());
	 * if(param.get("tactTime") != null &&
	 * !param.get("tactTime").toString().equals("")) { preparedStatement.setFloat(
	 * 9, Float.parseFloat(param.get("tactTime").toString())); } else {
	 * preparedStatement.setObject( 9, null); } if(param.get("priority") != null &&
	 * !param.get("priority").toString().equals("")) { preparedStatement.setInt(10,
	 * Integer.parseInt(param.get("priority").toString())); } else {
	 * preparedStatement.setObject(10, null); } preparedStatement.setTimestamp(11,
	 * new Timestamp(today.getTime())); }
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 성공 시 전송시간, 전송여부 업데이트 if(reInt > 0 && rtnMsg.equals("")) { rtnMap =
	 * momService.modifyMapList("com.thirautech.mom.common.modify_ifMomLgeBorS",
	 * paramMapList); return FrameworkUtil.createResponseMap(rtnMap, true, rtnMsg);
	 * } else { return FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Erp_R_Customer(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap,List<Map<String, Object>> paramMapList, String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList =
	 * momService.getMapList("com.thirautech.mom.common.get_ifMomLgeCustomerS_list",
	 * paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * Map<String, Object> rtnMap = null; int reInt = 0; String rtnMsg = "";
	 * java.util.Date today = new java.util.Date(); String sql = "";
	 * if(dbType.equals(MSSQL)) { sql = "INSERT INTO IF_ERP_R_CUSTOMER(" +
	 * " CUSTOMERID" + ", CUSTOMERNAME" + ", CUSTOMERIUSE" + ", IFFLAG" +
	 * ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",'N'" + ",?" + ")"; }
	 * else if(dbType.equals(MARIADB)){ sql = "INSERT INTO " + dbName +
	 * ".IF_ERP_R_CUSTOMER(" + " IFSEQ" + ", CUSTOMERID" + ", CUSTOMERNAME" +
	 * ", CUSTOMERIUSE" + ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?"
	 * + ",?" + ",?" + ",'N'" + ",?" + ")"; } else { sql =
	 * "INSERT INTO IF_ERP_R_CUSTOMER(" + " IFSEQ" + ", CUSTOMERID" +
	 * ", CUSTOMERNAME" + ", CUSTOMERIUSE" + ", IFFLAG" + ", INSDTTM" + ")" +
	 * " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; }
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql);
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); if(dbType.equals(MSSQL)) { preparedStatement.setString( 1,
	 * param.get("customerId").toString()); preparedStatement.setString( 2,
	 * param.get("customerName").toString()); preparedStatement.setString( 3,
	 * param.get("useYn").toString()); preparedStatement.setTimestamp(4, new
	 * Timestamp(today.getTime())); } else { preparedStatement.setLong ( 1,
	 * Long.parseLong(param.get("transSeq").toString()));
	 * preparedStatement.setString( 2, param.get("customerId").toString());
	 * preparedStatement.setString( 3, param.get("customerName").toString());
	 * preparedStatement.setString( 4, param.get("useYn").toString());
	 * preparedStatement.setTimestamp(5, new Timestamp(today.getTime())); }
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 성공 시 전송시간, 전송여부 업데이트 if(reInt > 0 && rtnMsg.equals("")) { rtnMap =
	 * momService.modifyMapList("com.thirautech.mom.common.modify_ifMomLgeCustomerS"
	 * ,paramMapList); return FrameworkUtil.createResponseMap(rtnMap, true, rtnMsg);
	 * } else { return FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Erp_R_Supplier(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap,List<Map<String, Object>> paramMapList, String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList =
	 * momService.getMapList("com.thirautech.mom.common.get_ifMomLgeSupplierS_list",
	 * paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * Map<String, Object> rtnMap = null; int reInt = 0; String rtnMsg = "";
	 * java.util.Date today = new java.util.Date(); String sql = "";
	 * if(dbType.equals(MSSQL)) { sql = "INSERT INTO IF_ERP_R_SUPPLIER(" +
	 * " SUPPLIERID" + ", SUPPLIERNAME" + ", SUPPLIERIUSE" + ", IFFLAG" +
	 * ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",'N'" + ",?" + ")"; }
	 * else if(dbType.equals(MARIADB)){ sql = "INSERT INTO " + dbName +
	 * ".IF_ERP_R_SUPPLIER(" + " IFSEQ" + ", SUPPLIERID" + ", SUPPLIERNAME" +
	 * ", SUPPLIERIUSE" + ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?"
	 * + ",?" + ",?" + ",'N'" + ",?" + ")"; } else { sql =
	 * "INSERT INTO IF_ERP_R_SUPPLIER(" + " IFSEQ" + ", SUPPLIERID" +
	 * ", SUPPLIERNAME" + ", SUPPLIERIUSE" + ", IFFLAG" + ", INSDTTM" + ")" +
	 * " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; }
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql);
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); if(dbType.equals(MSSQL)) { preparedStatement.setString( 1,
	 * param.get("supplierId").toString()); preparedStatement.setString( 2,
	 * param.get("supplierName").toString()); preparedStatement.setString( 3,
	 * param.get("useYn").toString()); preparedStatement.setTimestamp(4, new
	 * Timestamp(today.getTime())); } else { preparedStatement.setLong ( 1,
	 * Long.parseLong(param.get("transSeq").toString()));
	 * preparedStatement.setString( 2, param.get("supplierId").toString());
	 * preparedStatement.setString( 3, param.get("supplierName").toString());
	 * preparedStatement.setString( 4, param.get("useYn").toString());
	 * preparedStatement.setTimestamp(5, new Timestamp(today.getTime())); }
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 성공 시 전송시간, 전송여부 업데이트 if(reInt > 0 && rtnMsg.equals("")) { rtnMap =
	 * momService.modifyMapList("com.thirautech.mom.common.modify_ifMomLgeSupplierS"
	 * ,paramMapList); return FrameworkUtil.createResponseMap(rtnMap, true, rtnMsg);
	 * } else { return FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Erp_R_Shift(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap,List<Map<String, Object>> paramMapList, String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList =
	 * momService.getMapList("com.thirautech.mom.common.get_ifMomLgeShiftS_list",
	 * paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * Map<String, Object> rtnMap = null; int reInt = 0; String rtnMsg = "";
	 * java.util.Date today = new java.util.Date(); String sql = "";
	 * if(dbType.equals(MSSQL)) { sql = "INSERT INTO IF_ERP_R_SHIFTSEGMENT(" +
	 * " PCSGID" + ", SHIFT" + ", SHFTNAME" + ", SHFTSTTM" + ", SHFTEDTM" +
	 * ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" +
	 * ",?" + ",'N'" + ",?" + ")"; } else if(dbType.equals(MARIADB)){ sql =
	 * "INSERT INTO " + dbName + ".IF_ERP_R_SHIFTSEGMENT(" + " IFSEQ" + ", PCSGID" +
	 * ", SHIFT" + ", SHFTNAME" + ", SHFTSTTM" + ", SHFTEDTM" + ", IFFLAG" +
	 * ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",'N'" + ",?" + ")"; } else { sql = "INSERT INTO IF_ERP_R_SHIFTSEGMENT(" +
	 * " IFSEQ" + ", PCSGID" + ", SHIFT" + ", SHFTNAME" + ", SHFTSTTM" +
	 * ", SHFTEDTM" + ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; }
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql);
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); if(dbType.equals(MSSQL)) { preparedStatement.setString( 1,
	 * param.get("pcsgId").toString()); preparedStatement.setString( 2,
	 * param.get("shift").toString()); preparedStatement.setString( 3,
	 * param.get("shiftName") == null ? "-" : param.get("shiftName").toString());
	 * preparedStatement.setString( 4, param.get("shiftSttm").toString());
	 * preparedStatement.setString( 5, param.get("shiftEdtm").toString());
	 * preparedStatement.setTimestamp(6, new Timestamp(today.getTime())); } else {
	 * preparedStatement.setLong ( 1,
	 * Long.parseLong(param.get("transSeq").toString()));
	 * preparedStatement.setString( 2, param.get("pcsgId").toString());
	 * preparedStatement.setString( 3, param.get("shift").toString());
	 * preparedStatement.setString( 4, param.get("shiftName") == null ? "-" :
	 * param.get("shiftName").toString()); preparedStatement.setString( 5,
	 * param.get("shiftSttm").toString()); preparedStatement.setString( 6,
	 * param.get("shiftEdtm").toString()); preparedStatement.setTimestamp(7, new
	 * Timestamp(today.getTime())); }
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 성공 시 전송시간, 전송여부 업데이트 if(reInt > 0 && rtnMsg.equals("")) { rtnMap =
	 * momService.modifyMapList("com.thirautech.mom.common.modify_ifMomLgeShiftS",
	 * paramMapList); return FrameworkUtil.createResponseMap(rtnMap, true, rtnMsg);
	 * } else { return FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Erp_R_Cmcd(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap,List<Map<String, Object>> paramMapList, String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList =
	 * momService.getMapList("com.thirautech.mom.common.get_ifMomLgeCmcdS_list",
	 * paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * Map<String, Object> rtnMap = null; int reInt = 0; String rtnMsg = "";
	 * java.util.Date today = new java.util.Date(); String sql = "";
	 * if(dbType.equals(MSSQL)) { sql = "INSERT INTO IF_ERP_R_COMMON(" + " CMCDTYPE"
	 * + ", CMCODE" + ", CMCDNAME" + ", CMCDSEQ" + ", CMCDIUSE" + ", IFFLAG" +
	 * ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",?" + ",'N'" +
	 * ",?" + ")"; } else if(dbType.equals(MARIADB)){ sql = "INSERT INTO " + dbName
	 * + ".IF_ERP_R_COMMON(" + " IFSEQ" + ", CMCDTYPE" + ", CMCODE" + ", CMCDNAME" +
	 * ", CMCDSEQ" + ", CMCDIUSE" + ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" +
	 * " ?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; } else { sql =
	 * "INSERT INTO IF_ERP_R_COMMON(" + " IFSEQ" + ", CMCDTYPE" + ", CMCODE" +
	 * ", CMCDNAME" + ", CMCDSEQ" + ", CMCDIUSE" + ", IFFLAG" + ", INSDTTM" + ")" +
	 * " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; }
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql);
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); if(dbType.equals(MSSQL)) { preparedStatement.setString( 1,
	 * param.get("cmcdType").toString()); preparedStatement.setString( 2,
	 * param.get("cmCode").toString()); preparedStatement.setString( 3,
	 * param.get("cmcdName").toString()); preparedStatement.setInt ( 4,
	 * Integer.parseInt(param.get("cmcdSeq").toString()));
	 * preparedStatement.setString( 5, param.get("useYn").toString());
	 * preparedStatement.setTimestamp(6, new Timestamp(today.getTime())); } else {
	 * preparedStatement.setLong ( 1,
	 * Long.parseLong(param.get("transSeq").toString()));
	 * preparedStatement.setString( 2, param.get("cmcdType").toString());
	 * preparedStatement.setString( 3, param.get("cmCode").toString());
	 * preparedStatement.setString( 4, param.get("cmcdName").toString());
	 * preparedStatement.setInt ( 5,
	 * Integer.parseInt(param.get("cmcdSeq").toString()));
	 * preparedStatement.setString( 6, param.get("useYn").toString());
	 * preparedStatement.setTimestamp(7, new Timestamp(today.getTime())); }
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 성공 시 전송시간, 전송여부 업데이트 if(reInt > 0 && rtnMsg.equals("")) { rtnMap =
	 * momService.modifyMapList("com.thirautech.mom.common.modify_ifMomLgeCmcdS",
	 * paramMapList); return FrameworkUtil.createResponseMap(rtnMap, true, rtnMsg);
	 * } else { return FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Erp_R_Mbom(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap,List<Map<String, Object>> paramMapList, String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList =
	 * momService.getMapList("com.thirautech.mom.common.get_ifMomLgeMbomS_list",
	 * paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * Map<String, Object> rtnMap = null; int reInt = 0; String rtnMsg = "";
	 * java.util.Date today = new java.util.Date(); String sql = "";
	 * if(dbType.equals(MSSQL)) { sql = "INSERT INTO IF_ERP_R_MBOM(" +
	 * " PRODUCED_MTRLID" + ", PRODUCED_BOMREV" + ", CONSUMED_MTRLID" +
	 * ", CONSUMED_BOMREV" + ", UNITQTY" + ", UNIT" + ", MBIUSE" + ", INPROCID" +
	 * ", OUTPROCID" + ", REMARK" + ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" +
	 * " ?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'N'"
	 * + ",?" + ")"; } else if(dbType.equals(MARIADB)){ sql = "INSERT INTO " +
	 * dbName + ".IF_ERP_R_MBOM(" + " IFSEQ" + ", PRODUCED_MTRLID" +
	 * ", PRODUCED_BOMREV" + ", CONSUMED_MTRLID" + ", CONSUMED_BOMREV" + ", UNITQTY"
	 * + ", UNIT" + ", MBIUSE" + ", INPROCID" + ", OUTPROCID" + ", REMARK" +
	 * ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; } else
	 * { sql = "INSERT INTO IF_ERP_R_MBOM(" + " IFSEQ" + ", PRODUCED_MTRLID" +
	 * ", PRODUCED_BOMREV" + ", CONSUMED_MTRLID" + ", CONSUMED_BOMREV" + ", UNITQTY"
	 * + ", UNIT" + ", MBIUSE" + ", INPROCID" + ", OUTPROCID" + ", REMARK" +
	 * ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; }
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql);
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); if(dbType.equals(MSSQL)) { preparedStatement.setString( 1,
	 * param.get("producedMtrlid").toString()); preparedStatement.setString( 2,
	 * param.get("producedBomrev").toString()); preparedStatement.setString( 3,
	 * param.get("consumedMtrlid").toString()); preparedStatement.setString( 4,
	 * param.get("consumedBomrev").toString()); preparedStatement.setFloat ( 5,
	 * Float.parseFloat(param.get("unitQty").toString()));
	 * preparedStatement.setString( 6, param.get("unit").toString());
	 * preparedStatement.setString( 7, param.get("useYn").toString());
	 * preparedStatement.setString( 8, param.get("inProcId") == null ? null :
	 * param.get("inProcId").toString()); preparedStatement.setString( 9,
	 * param.get("outProcId") == null ? null : param.get("outProcId").toString());
	 * preparedStatement.setString(10, param.get("remark") == null ? null :
	 * param.get("remark").toString()); preparedStatement.setTimestamp(11, new
	 * Timestamp(today.getTime())); } else { preparedStatement.setLong ( 1,
	 * Long.parseLong(param.get("transSeq").toString()));
	 * preparedStatement.setString( 2, param.get("producedMtrlid").toString());
	 * preparedStatement.setString( 3, param.get("producedBomrev").toString());
	 * preparedStatement.setString( 4, param.get("consumedMtrlid").toString());
	 * preparedStatement.setString( 5, param.get("consumedBomrev").toString());
	 * preparedStatement.setFloat ( 6,
	 * Float.parseFloat(param.get("unitQty").toString()));
	 * preparedStatement.setString( 7, param.get("unit").toString());
	 * preparedStatement.setString( 8, param.get("useYn").toString());
	 * preparedStatement.setString( 9, param.get("inProcId") == null ? null :
	 * param.get("inProcId").toString()); preparedStatement.setString(10,
	 * param.get("outProcId") == null ? null : param.get("outProcId").toString());
	 * preparedStatement.setString(11, param.get("remark") == null ? null :
	 * param.get("remark").toString()); preparedStatement.setTimestamp(12, new
	 * Timestamp(today.getTime())); }
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 성공 시 전송시간, 전송여부 업데이트 if(reInt > 0 && rtnMsg.equals("")) { rtnMap =
	 * momService.modifyMapList("com.thirautech.mom.common.modify_ifMomLgeMbomS",
	 * paramMapList); return FrameworkUtil.createResponseMap(rtnMap, true, rtnMsg);
	 * } else { return FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Erp_R_Itemtype(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap, List<Map<String, Object>> paramMapList,String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList =
	 * momService.getMapList("com.thirautech.mom.common.get_ifMomLgeItemtypeS_list",
	 * paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * Map<String, Object> rtnMap = null; int reInt = 0; String rtnMsg = "";
	 * java.util.Date today = new java.util.Date(); String sql = "";
	 * if(dbType.equals(MSSQL)) { sql = "INSERT INTO IF_ERP_R_PRODUCTMATERIALTYPE("
	 * + " PRODTYPE" + ", PDTYNAME" + ", PDTYDESC" + ", PDTYIUSE" + ", IFFLAG" +
	 * ", INSDTTM" + ")" + " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",'N'" + ",?" +
	 * ")"; } else if(dbType.equals(MARIADB)){ sql = "INSERT INTO " + dbName +
	 * ".IF_ERP_R_PRODUCTMATERIALTYPE(" + " IFSEQ" + ", PRODTYPE" + ", PDTYNAME" +
	 * ", PDTYDESC" + ", PDTYIUSE" + ", IFFLAG" + ", INSDTTM" + ")" + " VALUES(" +
	 * " ?" + ",?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; } else { sql =
	 * "INSERT INTO IF_ERP_R_PRODUCTMATERIALTYPE(" + " IFSEQ" + ", PRODTYPE" +
	 * ", PDTYNAME" + ", PDTYDESC" + ", PDTYIUSE" + ", IFFLAG" + ", INSDTTM" + ")" +
	 * " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")"; }
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql);
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); if(dbType.equals(MSSQL)) { preparedStatement.setString( 1,
	 * param.get("prodType").toString()); preparedStatement.setString( 2,
	 * param.get("pdtyName").toString()); preparedStatement.setString( 3,
	 * param.get("pdtyDesc") == null ? null : param.get("pdtyDesc").toString());
	 * preparedStatement.setString( 4, param.get("useYn").toString());
	 * preparedStatement.setTimestamp(5, new Timestamp(today.getTime())); } else {
	 * preparedStatement.setLong ( 1,
	 * Long.parseLong(param.get("transSeq").toString()));
	 * preparedStatement.setString( 2, param.get("prodType").toString());
	 * preparedStatement.setString( 3, param.get("pdtyName").toString());
	 * preparedStatement.setString( 4, param.get("pdtyDesc") == null ? null :
	 * param.get("pdtyDesc").toString()); preparedStatement.setString( 5,
	 * param.get("useYn").toString()); preparedStatement.setTimestamp(6, new
	 * Timestamp(today.getTime())); }
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 성공 시 전송시간, 전송여부 업데이트 if(reInt > 0 && rtnMsg.equals("")) { rtnMap =
	 * momService.modifyMapList("com.thirautech.mom.common.modify_ifMomLgeItemtypeS"
	 * ,paramMapList); return FrameworkUtil.createResponseMap(rtnMap, true, rtnMsg);
	 * } else { return FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Erp_R_WorkOrder(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap,List<Map<String, Object>> paramMapList, String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList = new ArrayList<Map<String,
	 * Object>>();
	 * 
	 * // 작업지시 취소인지 확정인지 구분하여 별도의 로직 실행 if(paramMap.get("v_del_flag") != null &&
	 * paramMap.get("v_del_flag").toString().equals("Y")) { Map<String, Object>
	 * resultMap = momService.getMapList(
	 * "com.thirautech.mom.workOrder.workOrderCreate.get_ezMesConfirmWorkOrder",
	 * paramMap).get(0); resultMap.put("planqty", paramMap.get("cancelQty"));
	 * resultMap.put("delflag", "Y"); resultList.add(resultMap); } else { resultList
	 * = momService.getMapList(
	 * "com.thirautech.mom.workOrder.workOrderCreate.get_ezMesConfirmWorkOrderList_list",
	 * paramMap); }
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * int reInt = 0; String rtnMsg = ""; String sql = ""; if(dbType.equals(MSSQL))
	 * { sql = "INSERT INTO IF_ERP_R_WORKORDER(" + " WOID" + ",WONAME" + ",PRODID" +
	 * ",BOMREV" + ",PLANQTY" + ",UNIT" + ",PLANSTDTTM" + ",PLANEDDTTM" + ",AREAID"
	 * + ",PCSGID" + ",CUSTPRODID" + ",WOTYPE" + ",PRIORITY" + ",DELFLAG" +
	 * ",ATTRIBUTE1" + ",ATTRIBUTE2" + ",ATTRIBUTE3" + ",IFFLAG" + ",IFMSG)" +
	 * "VALUES(" + "?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'-'" + ")";
	 * } else if(dbType.equals(MARIADB)){ sql = "INSERT INTO " + dbName +
	 * ".IF_ERP_R_WORKORDER(" + " IFSEQ" + ",WOID" + ",WONAME" + ",PRODID" +
	 * ",BOMREV" + ",PLANQTY" + ",UNIT" + ",PLANSTDTTM" + ",PLANEDDTTM" + ",AREAID"
	 * + ",PCSGID" + ",CUSTPRODID" + ",WOTYPE" + ",PRIORITY" + ",DELFLAG" +
	 * ",ATTRIBUTE1" + ",ATTRIBUTE2" + ",ATTRIBUTE3" + ",IFFLAG" + ",IFMSG)" +
	 * "VALUES(" + "?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'-'"
	 * + ")"; } else { sql = "INSERT INTO IF_ERP_R_WORKORDER(" + " IFSEQ" + ",WOID"
	 * + ",WONAME" + ",PRODID" + ",BOMREV" + ",PLANQTY" + ",UNIT" + ",PLANSTDTTM" +
	 * ",PLANEDDTTM" + ",AREAID" + ",PCSGID" + ",CUSTPRODID" + ",WOTYPE" +
	 * ",PRIORITY" + ",DELFLAG" + ",ATTRIBUTE1" + ",ATTRIBUTE2" + ",ATTRIBUTE3" +
	 * ",IFFLAG" + ",IFMSG)" + "VALUES(" + "?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",'-'" + ")"; }
	 * 
	 * try { preparedStatement = connection.prepareStatement(sql);
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); if(dbType.equals(MSSQL)) { preparedStatement.setString (1,
	 * param.get("woid").toString()); preparedStatement.setString (2,
	 * param.get("woname").toString()); preparedStatement.setString (3,
	 * param.get("prodid").toString()); preparedStatement.setString (4,
	 * param.get("bomrev").toString()); preparedStatement.setFloat (5,
	 * Float.parseFloat(param.get("planqty").toString()));
	 * preparedStatement.setString (6, param.get("unit") == null ? null :
	 * param.get("unit").toString()); preparedStatement.setTimestamp (7,
	 * java.sql.Timestamp.valueOf(param.get("planstdttm").toString().substring(0,
	 * 19))); preparedStatement.setTimestamp (8, param.get("planeddttm") == null ?
	 * null :
	 * java.sql.Timestamp.valueOf(param.get("planstdttm").toString().substring(0,
	 * 19))); preparedStatement.setString (9, param.get("areaid") == null ? null :
	 * param.get("areaid").toString()); preparedStatement.setString (10,
	 * param.get("pcsgid") == null ? null : param.get("pcsgid").toString());
	 * preparedStatement.setString (11, param.get("custprodid") == null ? null :
	 * param.get("custprodid").toString()); preparedStatement.setString (12,
	 * param.get("wotype").toString()); preparedStatement.setInt (13,
	 * param.get("priority") == null ? 9999 :
	 * Integer.parseInt(param.get("priority").toString().trim()));
	 * preparedStatement.setString (14, param.get("delflag").toString());
	 * preparedStatement.setString (15, paramMap.get("divisionCd").toString());
	 * preparedStatement.setString (16, param.get("attribute2") == null ? null :
	 * param.get("attribute2").toString()); preparedStatement.setString (17,
	 * param.get("attribute3") == null ? null : param.get("attribute3").toString());
	 * preparedStatement.setString (18, param.get("ifflag").toString()); } else {
	 * preparedStatement.setLong (1,
	 * Long.parseLong(param.get("transSeq").toString()));
	 * preparedStatement.setString (2, param.get("woid").toString());
	 * preparedStatement.setString (3, param.get("woname").toString());
	 * preparedStatement.setString (4, param.get("prodid").toString());
	 * preparedStatement.setString (5, param.get("bomrev").toString());
	 * preparedStatement.setFloat (6,
	 * Float.parseFloat(param.get("planqty").toString()));
	 * preparedStatement.setString (7, param.get("unit") == null ? null :
	 * param.get("unit").toString()); preparedStatement.setTimestamp (8,
	 * java.sql.Timestamp.valueOf(param.get("planstdttm").toString().substring(0,
	 * 19))); preparedStatement.setTimestamp (9, param.get("planeddttm") == null ?
	 * null :
	 * java.sql.Timestamp.valueOf(param.get("planstdttm").toString().substring(0,
	 * 19))); preparedStatement.setString (10, param.get("areaid") == null ? null :
	 * param.get("areaid").toString()); preparedStatement.setString (11,
	 * param.get("pcsgid") == null ? null : param.get("pcsgid").toString());
	 * preparedStatement.setString (12, param.get("custprodid") == null ? null :
	 * param.get("custprodid").toString()); preparedStatement.setString (13,
	 * param.get("wotype").toString()); preparedStatement.setInt (14,
	 * param.get("priority") == null ? 9999 :
	 * Integer.parseInt(param.get("priority").toString().trim()));
	 * preparedStatement.setString (15, param.get("delflag").toString());
	 * preparedStatement.setString (16, paramMap.get("divisionCd").toString());
	 * preparedStatement.setString (17, param.get("attribute2") == null ? null :
	 * param.get("attribute2").toString()); preparedStatement.setString (18,
	 * param.get("attribute3") == null ? null : param.get("attribute3").toString());
	 * preparedStatement.setString (19, param.get("ifflag").toString()); }
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 결과에 따라 메시지 처리 if(reInt > 0 && rtnMsg.equals("")) { return
	 * FrameworkUtil.createResponseMap(paramMap, true, rtnMsg); } else { return
	 * FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Erp_R_Materialreq(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap,List<Map<String, Object>> paramMapList, String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList = momService.getMapList(
	 * "com.thirautech.mom.common.get_ifMomLgeMaterialreqS_list", paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * Map<String, Object> rtnMap = null; int reInt = 0; String rtnMsg = ""; String
	 * sql = ""; if(dbType.equals(MSSQL)) { sql =
	 * "INSERT INTO IF_ERP_R_MATERIALSHIPPEDSLIP(" + " DIVISION_CD" +
	 * ", MATERIAL_REQUEST_ID" + ", BARCODE_ID" + ", REQUEST_DATE" +
	 * ", WORK_ORDER_ID" + ", WO_QTY" + ", ITEM_ID" + ", SPECIFICATION" +
	 * ", PARENT_ITEM_ID" + ", QTY" + ", FROM_LOCATRION_CD" + ", TO_LOCATRION_CD" +
	 * ", JOB_CODE" + ", TRANSFER_FLAG" + ")" + " VALUES(" + "?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'N'"
	 * + ")"; } else if(dbType.equals(MARIADB)){ sql = "INSERT INTO " + dbName +
	 * ".IF_ERP_R_MATERIALSHIPPEDSLIP(" + " INTERFACE_ID" + ", DIVISION_CD" +
	 * ", MATERIAL_REQUEST_ID" + ", BARCODE_ID" + ", REQUEST_DATE" +
	 * ", WORK_ORDER_ID" + ", WO_QTY" + ", ITEM_ID" + ", SPECIFICATION" +
	 * ", PARENT_ITEM_ID" + ", QTY" + ", FROM_LOCATRION_CD" + ", TO_LOCATRION_CD" +
	 * ", JOB_CODE" + ", TRANSFER_FLAG" + ")" + " VALUES(" + "?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",'N'" + ")"; } else { sql = "INSERT INTO IF_ERP_R_MATERIALSHIPPEDSLIP(" +
	 * " INTERFACE_ID" + ", DIVISION_CD" + ", MATERIAL_REQUEST_ID" + ", BARCODE_ID"
	 * + ", REQUEST_DATE" + ", WORK_ORDER_ID" + ", WO_QTY" + ", ITEM_ID" +
	 * ", SPECIFICATION" + ", PARENT_ITEM_ID" + ", QTY" + ", FROM_LOCATRION_CD" +
	 * ", TO_LOCATRION_CD" + ", JOB_CODE" + ", TRANSFER_FLAG" + ")" + " VALUES(" +
	 * "?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",'N'" + ")"; }
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql);
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); if(dbType.equals(MSSQL)) { preparedStatement.setString( 1,
	 * param.get("divisionCd").toString()); preparedStatement.setString( 2,
	 * param.get("materialRequestId").toString()); preparedStatement.setString( 3,
	 * param.get("barcodeId").toString()); preparedStatement.setDate ( 4,
	 * java.sql.Date.valueOf(param.get("requestDate").toString()));
	 * preparedStatement.setString( 5, param.get("workOrderId").toString());
	 * preparedStatement.setFloat ( 6,
	 * Float.parseFloat(param.get("woQty").toString()));
	 * preparedStatement.setString( 7, param.get("itemId").toString());
	 * preparedStatement.setString( 8, param.get("specification") == null ? null :
	 * param.get("specification").toString()); preparedStatement.setString( 9,
	 * param.get("parentItemId").toString()); preparedStatement.setFloat ( 10,
	 * Float.parseFloat(param.get("qty").toString())); preparedStatement.setString(
	 * 11, param.get("fromLocationCd") == null ? null :
	 * param.get("fromLocationCd").toString()); preparedStatement.setString( 12,
	 * param.get("toLocationCd") == null ? null :
	 * param.get("toLocationCd").toString()); preparedStatement.setString( 13,
	 * param.get("jobCode") == null ? null : param.get("jobCode").toString()); }
	 * else { preparedStatement.setLong ( 1,
	 * Long.parseLong(param.get("transSeq").toString()));
	 * preparedStatement.setString( 2, param.get("divisionCd").toString());
	 * preparedStatement.setString( 3, param.get("materialRequestId").toString());
	 * preparedStatement.setString( 4, param.get("barcodeId").toString());
	 * preparedStatement.setDate ( 5,
	 * java.sql.Date.valueOf(param.get("requestDate").toString()));
	 * preparedStatement.setString( 6, param.get("workOrderId").toString());
	 * preparedStatement.setFloat ( 7,
	 * Float.parseFloat(param.get("woQty").toString()));
	 * preparedStatement.setString( 8, param.get("itemId").toString());
	 * preparedStatement.setString( 9, param.get("specification") == null ? null :
	 * param.get("specification").toString()); preparedStatement.setString(
	 * 10,param.get("parentItemId").toString()); preparedStatement.setFloat ( 11,
	 * Float.parseFloat(param.get("qty").toString())); preparedStatement.setString(
	 * 12, param.get("fromLocationCd") == null ? null :
	 * param.get("fromLocationCd").toString()); preparedStatement.setString( 13,
	 * param.get("toLocationCd") == null ? null :
	 * param.get("toLocationCd").toString()); preparedStatement.setString( 14,
	 * param.get("jobCode") == null ? null : param.get("jobCode").toString()); }
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 성공 시 전송시간, 전송여부 업데이트 if(reInt > 0 && rtnMsg.equals("")) { rtnMap =
	 * momService.modifyMapList(
	 * "com.thirautech.mom.common.modify_ifMomLgeMaterialreqS",paramMapList); return
	 * FrameworkUtil.createResponseMap(rtnMap, true, rtnMsg); } else { return
	 * FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Mom_Item_Def(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap,List<Map<String, Object>> paramMapList, String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList = new ArrayList<Map<String,
	 * Object>>(); // System.out.println("paramMap........." + paramMap);
	 * resultList.add(paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * int reInt = 0; String rtnMsg = ""; String sql =
	 * "INSERT INTO IF_MOM_ITEM_DEFINITION_R(" + " TRANS_SEQ" + ", DIVISION_CD" +
	 * ", COMPANY_CD" + ", ITEM_ID" + ", ITEM_NAME" + ", ITEM_GROUP_CODE" +
	 * ", ITEM_TYPE" + ", SPECIFICATION" + ", VENDOR_CD" + ", DEPARTURE_VENDOR_CD" +
	 * ", UNIT_PRICE" + ", UNIT" + ", PURCHASE_UNIT" + ", UNIT_QTY" +
	 * ", CONVERSION_UNIT_QTY" + ", MOQ" + ", MOM" + ", SAFETY_STOCK_QTY" +
	 * ", SAFETY_STOCK_DAY" + ", SAFETY_STOCK_DAY_UOM" + ", PROD_MIN_LOT_SIZE" +
	 * ", PROD_MAX_LOT_SIZE" + ", PROD_INCREMENT_LOT_SIZE" + ", DEMAND_LOT_SIZE" +
	 * ", IS_PHANTOM" + ", ACTIVATION_FLAG" + ", IS_FINITE_FLAG" + ", FINITE_TERM" +
	 * ", FINITE_TERM_UOM" + ", IN_LOCATION_ID" + ", OUT_LOCATION_ID" +
	 * ", TEST_REPORT_FLAG" + ", IQC_FLAG" + ", PQC_FLAG" + ", OQC_FLAG" +
	 * ", RP_ITEM_ID" + ", VENDOR_ITEM_ID" + ", ALT_ITEM_ID" + ", ITEM_CATEGORY" +
	 * ", PURCHASE_TYPE" + ", ITEM_USER_ID" + ", PACKING_SIZE_WIDTH" +
	 * ", PACKING_SIZE_HEIGHT" + ", MATERIAL_WEIGHT" + ", PALLET_WEIGHT" +
	 * ", UNIT_WEIGHT" + ", BOX_WEIGHT" + ", ITEM_GROUP_LARGE" +
	 * ", ITEM_GROUP_MEDIUM" + ", ITEM_GROUP_SMALL" + ", PRE_BUILD_TERM" +
	 * ", LEAD_TIME" + ", TRACKING_FLAG" + ", ORDER_METHOD" + ", ITEM_GRADE" +
	 * ", BAD_LEVEL" + ", STANDARD_OUT_QTY" + ", DEFECT_RATE" +
	 * ", BY_PRODUCT_ITEM_ID" + ", USE_YN" + ", DESCRIPTION" + ", ATTRIBUTE1" +
	 * ", ATTRIBUTE2" + ", ATTRIBUTE3" + ", ATTRIBUTE4" + ", ATTRIBUTE5" +
	 * ", ATTRIBUTE6" + ", ATTRIBUTE7" + ", ATTRIBUTE8" + ", ATTRIBUTE9" +
	 * ", ATTRIBUTE10" + ", ATTRIBUTE11" + ", ATTRIBUTE12" + ", ATTRIBUTE13" +
	 * ", ATTRIBUTE14" + ", ATTRIBUTE15" + ", FREE_OFFER_FLAG" + ", CONVERSION_UNIT"
	 * + ", TOOL" + ", PRESS_LINE" + ", SALES_FREE_FLAG" + ", POP_MAKE_LOT_QTY" +
	 * ", POP_INPUT_TYPE" + ", POP_CT_QTY" + ", POP_GT_LABELID" + ", POP_CT_LABELID"
	 * + ", POP_PALLET_LABELID" + ", POP_EAN" + ", POP_UPC" + ", POP_DESTINATION" +
	 * ", POP_MADEBY" + ", POP_GANBAN_LABELID" + ", LABELDESC" + ", LABELSPEC" +
	 * ", BIN_USE_FLAG" + ", CT_OUT_QTY" + ", CREATE_ITEM_FLAG" + ", TRANSFER_DATE"
	 * + ", TRANSFER_FLAG" + ", CRUD_FLAG" + ", WORK_DATE" + ", TRANS_TYPE" + ")" +
	 * " VALUES(" + " S_IF_SEQ.NEXTVAL" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",'N'" + ",?" + ",?" + ",?" + ")";
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql); java.util.Date today =
	 * new java.util.Date();
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); preparedStatement.setString( 1,
	 * param.get("divisionCd").toString()); preparedStatement.setString( 2,
	 * param.get("companyCd").toString()); preparedStatement.setString( 3,
	 * param.get("itemId") == null ? null : param.get("itemId").toString());
	 * preparedStatement.setString( 4, param.get("itemName") == null ? null :
	 * param.get("itemName").toString()); preparedStatement.setString( 5,
	 * param.get("itemGroupCode") == null ? null :
	 * param.get("itemGroupCode").toString()); preparedStatement.setString( 6,
	 * param.get("itemType") == null ? null : param.get("itemType").toString());
	 * preparedStatement.setString( 7, param.get("specification") == null ? null :
	 * param.get("specification").toString()); preparedStatement.setString( 8,
	 * param.get("vendorCd") == null ? null : param.get("vendorCd").toString());
	 * preparedStatement.setString( 9, param.get("departureVendorCd") == null ? null
	 * : param.get("departureVendorCd").toString()); if(param.get("unitPrice") !=
	 * null && !param.get("unitPrice").toString().equals("")) {
	 * preparedStatement.setFloat(10,
	 * Float.parseFloat(param.get("unitPrice").toString())); } else {
	 * preparedStatement.setObject(10, null); } preparedStatement.setString(11,
	 * param.get("unit") == null ? null : param.get("unit").toString());
	 * preparedStatement.setString(12, param.get("purchaseUnit") == null ? null :
	 * param.get("purchaseUnit").toString()); if(param.get("unitQty") != null &&
	 * !param.get("unitQty").toString().equals("")) { preparedStatement.setFloat(13,
	 * Float.parseFloat(param.get("unitQty").toString())); } else {
	 * preparedStatement.setObject(13, null); } if(param.get("conversionUnitQty") !=
	 * null && !param.get("conversionUnitQty").toString().equals("")) {
	 * preparedStatement.setFloat(14,
	 * Float.parseFloat(param.get("conversionUnitQty").toString())); } else {
	 * preparedStatement.setObject(14, 1); } if(param.get("moq") != null &&
	 * !param.get("moq").toString().equals("")) { preparedStatement.setFloat(15,
	 * Float.parseFloat(param.get("moq").toString())); } else {
	 * preparedStatement.setObject(15, null); } if(param.get("mom") != null &&
	 * !param.get("mom").toString().equals("")) { preparedStatement.setFloat(16,
	 * Float.parseFloat(param.get("mom").toString())); } else {
	 * preparedStatement.setObject(16, null); } if(param.get("safetyStockQty") !=
	 * null && !param.get("safetyStockQty").toString().equals("")) {
	 * preparedStatement.setFloat(17,
	 * Float.parseFloat(param.get("safetyStockQty").toString())); } else {
	 * preparedStatement.setObject(17, null); } if(param.get("safetyStockDay") !=
	 * null && !param.get("safetyStockDay").toString().equals("")) {
	 * preparedStatement.setFloat(18,
	 * Float.parseFloat(param.get("safetyStockDay").toString())); } else {
	 * preparedStatement.setObject(18, null); } if(param.get("safetyStockDayUom") !=
	 * null && !param.get("safetyStockDayUom").toString().equals("")) {
	 * preparedStatement.setFloat(19,
	 * Float.parseFloat(param.get("safetyStockDayUom").toString())); } else {
	 * preparedStatement.setObject(19, null); } if(param.get("prodMinLotSize") !=
	 * null && !param.get("prodMinLotSize").toString().equals("")) {
	 * preparedStatement.setFloat(20,
	 * Float.parseFloat(param.get("prodMinLotSize").toString())); } else {
	 * preparedStatement.setObject(20, null); } if(param.get("prodMaxLotSize") !=
	 * null && !param.get("prodMaxLotSize").toString().equals("")) {
	 * preparedStatement.setFloat(21,
	 * Float.parseFloat(param.get("prodMaxLotSize").toString())); } else {
	 * preparedStatement.setObject(21, null); } if(param.get("prodIncrementLotSize")
	 * != null && !param.get("prodIncrementLotSize").toString().equals("")) {
	 * preparedStatement.setFloat(22,
	 * Float.parseFloat(param.get("prodIncrementLotSize").toString())); } else {
	 * preparedStatement.setObject(22, null); } if(param.get("demandLotSize") !=
	 * null && !param.get("demandLotSize").toString().equals("")) {
	 * preparedStatement.setFloat(23,
	 * Float.parseFloat(param.get("demandLotSize").toString())); } else {
	 * preparedStatement.setObject(23, null); } preparedStatement.setString(24,
	 * param.get("isPhantom") == null ? null : param.get("isPhantom").toString());
	 * preparedStatement.setString(25, param.get("activationFlag") == null ? null :
	 * param.get("activationFlag").toString()); preparedStatement.setString(26,
	 * param.get("isFiniteFlag") == null ? null :
	 * param.get("isFiniteFlag").toString()); if(param.get("finiteTerm") != null &&
	 * !param.get("finiteTerm").toString().equals("")) {
	 * preparedStatement.setInt(27,
	 * Integer.parseInt(param.get("finiteTerm").toString())); } else {
	 * preparedStatement.setObject(27, null); } preparedStatement.setString(28,
	 * param.get("finiteTermUom") == null ? null :
	 * param.get("finiteTermUom").toString()); preparedStatement.setString(29,
	 * param.get("inLocationId") == null ? null :
	 * param.get("inLocationId").toString()); preparedStatement.setString(30,
	 * param.get("outLocationId") == null ? null :
	 * param.get("outLocationId").toString()); preparedStatement.setString(31,
	 * param.get("testReportFlag") == null ? "N" :
	 * param.get("testReportFlag").toString()); preparedStatement.setString(32,
	 * param.get("iqcFlag") == null ? "N" : param.get("iqcFlag").toString());
	 * preparedStatement.setString(33, param.get("pqcFlag") == null ? "N" :
	 * param.get("pqcFlag").toString()); preparedStatement.setString(34,
	 * param.get("oqcFlag") == null ? "N" : param.get("oqcFlag").toString());
	 * preparedStatement.setString(35, param.get("rpItemId") == null ? null :
	 * param.get("rpItemId").toString()); preparedStatement.setString(36,
	 * param.get("vendorItemId") == null ? null :
	 * param.get("vendorItemId").toString()); preparedStatement.setString(37,
	 * param.get("altItemId") == null ? null : param.get("altItemId").toString());
	 * preparedStatement.setString(38, param.get("itemCategory") == null ? null :
	 * param.get("itemCategory").toString()); preparedStatement.setString(39,
	 * param.get("purchaseType") == null ? null :
	 * param.get("purchaseType").toString()); preparedStatement.setString(40,
	 * param.get("itemUserId") == null ? null : param.get("itemUserId").toString());
	 * if(param.get("packingSizeWidth") != null &&
	 * !param.get("packingSizeWidth").toString().equals("")) {
	 * preparedStatement.setFloat(41,
	 * Float.parseFloat(param.get("packingSizeWidth").toString())); } else {
	 * preparedStatement.setObject(41, null); } if(param.get("packingSizeHeight") !=
	 * null && !param.get("packingSizeHeight").toString().equals("")) {
	 * preparedStatement.setFloat(42,
	 * Float.parseFloat(param.get("packingSizeHeight").toString())); } else {
	 * preparedStatement.setObject(42, null); } if(param.get("materialWeight") !=
	 * null && !param.get("materialWeight").toString().equals("")) {
	 * preparedStatement.setFloat(43,
	 * Float.parseFloat(param.get("materialWeight").toString())); } else {
	 * preparedStatement.setObject(43, null); } if(param.get("palletWeight") != null
	 * && !param.get("palletWeight").toString().equals("")) {
	 * preparedStatement.setFloat(44,
	 * Float.parseFloat(param.get("palletWeight").toString())); } else {
	 * preparedStatement.setObject(44, null); } if(param.get("unitWeight") != null
	 * && !param.get("unitWeight").toString().equals("")) {
	 * preparedStatement.setFloat(45,
	 * Float.parseFloat(param.get("unitWeight").toString())); } else {
	 * preparedStatement.setObject(45, null); } if(param.get("boxWeight") != null &&
	 * !param.get("boxWeight").toString().equals("")) {
	 * preparedStatement.setFloat(46,
	 * Float.parseFloat(param.get("boxWeight").toString())); } else {
	 * preparedStatement.setObject(46, null); } preparedStatement.setString(47,
	 * param.get("itemGroupLarge") == null ? null :
	 * param.get("itemGroupLarge").toString()); preparedStatement.setString(48,
	 * param.get("itemGroupMedium") == null ? null :
	 * param.get("itemGroupMedium").toString()); preparedStatement.setString(49,
	 * param.get("itemGroupSmall") == null ? null :
	 * param.get("itemGroupSmall").toString()); if(param.get("preBuildTerm") != null
	 * && !param.get("preBuildTerm").toString().equals("")) {
	 * preparedStatement.setInt(50,
	 * Integer.parseInt(param.get("preBuildTerm").toString())); } else {
	 * preparedStatement.setObject(50, null); } if(param.get("leadTime") != null &&
	 * !param.get("leadTime").toString().equals("")) {
	 * preparedStatement.setFloat(51,
	 * Float.parseFloat(param.get("leadTime").toString())); } else {
	 * preparedStatement.setObject(51, null); } preparedStatement.setString(52,
	 * param.get("trackingFlag") == null ? null :
	 * param.get("trackingFlag").toString()); preparedStatement.setString(53,
	 * param.get("orderMethod") == null ? null :
	 * param.get("orderMethod").toString()); preparedStatement.setString(54,
	 * param.get("itemGrade") == null ? null : param.get("itemGrade").toString());
	 * preparedStatement.setString(55, param.get("badLevel") == null ? null :
	 * param.get("badLevel").toString()); if(param.get("standardOutQty") != null &&
	 * !param.get("standardOutQty").toString().equals("")) {
	 * preparedStatement.setFloat(56,
	 * Float.parseFloat(param.get("standardOutQty").toString())); } else {
	 * preparedStatement.setObject(56, null); } if(param.get("defectRate") != null
	 * && !param.get("defectRate").toString().equals("")) {
	 * preparedStatement.setFloat(57,
	 * Float.parseFloat(param.get("defectRate").toString())); } else {
	 * preparedStatement.setObject(57, null); } preparedStatement.setString(58,
	 * param.get("byProductItemId") == null ? null :
	 * param.get("byProductItemId").toString()); preparedStatement.setString(59,
	 * param.get("useYn") == null ? null : param.get("useYn").toString());
	 * preparedStatement.setString(60, param.get("description") == null ? null :
	 * param.get("description").toString()); preparedStatement.setString(61,
	 * param.get("attribute1") == null ? null : param.get("attribute1").toString());
	 * preparedStatement.setString(62, param.get("attribute2") == null ? null :
	 * param.get("attribute2").toString()); preparedStatement.setString(63,
	 * param.get("attribute3") == null ? null : param.get("attribute3").toString());
	 * preparedStatement.setString(64, param.get("attribute4") == null ? null :
	 * param.get("attribute4").toString()); preparedStatement.setString(65,
	 * param.get("attribute5") == null ? null : param.get("attribute5").toString());
	 * preparedStatement.setString(66, param.get("attribute6") == null ? null :
	 * param.get("attribute6").toString()); preparedStatement.setString(67,
	 * param.get("attribute7") == null ? null : param.get("attribute7").toString());
	 * preparedStatement.setString(68, param.get("attribute8") == null ? null :
	 * param.get("attribute8").toString()); preparedStatement.setString(69,
	 * param.get("attribute9") == null ? null : param.get("attribute9").toString());
	 * preparedStatement.setString(70, param.get("attribute10") == null ? null :
	 * param.get("attribute10").toString()); preparedStatement.setString(71,
	 * param.get("attribute11") == null ? null :
	 * param.get("attribute11").toString()); preparedStatement.setString(72,
	 * param.get("attribute12") == null ? null :
	 * param.get("attribute12").toString()); preparedStatement.setString(73,
	 * param.get("attribute13") == null ? null :
	 * param.get("attribute13").toString()); preparedStatement.setString(74,
	 * param.get("attribute14") == null ? null :
	 * param.get("attribute14").toString()); preparedStatement.setString(75,
	 * param.get("attribute15") == null ? null :
	 * param.get("attribute15").toString()); preparedStatement.setString(76,
	 * param.get("freeOfferFlag") == null ? null :
	 * param.get("freeOfferFlag").toString()); preparedStatement.setString(77,
	 * param.get("conversionUnit") == null ? null :
	 * param.get("conversionUnit").toString()); preparedStatement.setString(78,
	 * param.get("tool") == null ? null : param.get("tool").toString());
	 * preparedStatement.setString(79, param.get("pressLine") == null ? null :
	 * param.get("pressLine").toString()); preparedStatement.setString(80,
	 * param.get("salesFreeFlag") == null ? null :
	 * param.get("salesFreeFlag").toString()); if(param.get("popMakeLotQty") != null
	 * && !param.get("popMakeLotQty").toString().equals("")) {
	 * preparedStatement.setFloat(81,
	 * Float.parseFloat(param.get("popMakeLotQty").toString())); } else {
	 * preparedStatement.setObject(81, null); } preparedStatement.setString(82,
	 * param.get("popInputType") == null ? null :
	 * param.get("popInputType").toString()); if(param.get("popCtQty") != null &&
	 * !param.get("popCtQty").toString().equals("")) {
	 * preparedStatement.setFloat(83,
	 * Float.parseFloat(param.get("popCtQty").toString())); } else {
	 * preparedStatement.setObject(83, null); } preparedStatement.setString(84,
	 * param.get("popGtLabelid") == null ? null :
	 * param.get("popGtLabelid").toString()); preparedStatement.setString(85,
	 * param.get("popCtLabelid") == null ? null :
	 * param.get("popCtLabelid").toString()); preparedStatement.setString(86,
	 * param.get("popPalletLabelid") == null ? null :
	 * param.get("popPalletLabelid").toString()); preparedStatement.setString(87,
	 * param.get("popEan") == null ? null : param.get("popEan").toString());
	 * preparedStatement.setString(88, param.get("popUpc") == null ? null :
	 * param.get("popUpc").toString()); preparedStatement.setString(89,
	 * param.get("popDestination") == null ? null :
	 * param.get("popDestination").toString()); preparedStatement.setString(90,
	 * param.get("popMadeby") == null ? null : param.get("popMadeby").toString());
	 * preparedStatement.setString(91, param.get("popGanbanLabelid") == null ? null
	 * : param.get("popGanbanLabelid").toString()); preparedStatement.setString(92,
	 * param.get("labeldesc") == null ? null : param.get("labeldesc").toString());
	 * preparedStatement.setString(93, param.get("labelspec") == null ? null :
	 * param.get("labelspec").toString()); preparedStatement.setString(94,
	 * param.get("binUseFlag") == null ? null : param.get("binUseFlag").toString());
	 * if(param.get("ctOutQty") != null &&
	 * !param.get("ctOutQty").toString().equals("")) {
	 * preparedStatement.setFloat(95,
	 * Float.parseFloat(param.get("ctOutQty").toString())); } else {
	 * preparedStatement.setObject(95, null); } preparedStatement.setString(96,
	 * param.get("createItemFlag") == null ? "N" :
	 * param.get("createItemFlag").toString()); preparedStatement.setTimestamp(97,
	 * new Timestamp(today.getTime())); preparedStatement.setString(98,
	 * param.get("crudFlag") == null ? null : param.get("crudFlag").toString());
	 * preparedStatement.setString(99, new
	 * java.sql.Date(today.getTime()).toString().replaceAll("-","").substring(0,
	 * 8)); preparedStatement.setString(100, "S");
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 결과에 따라 메시지 처리 if(reInt > 0 && rtnMsg.equals("")) { return
	 * FrameworkUtil.createResponseMap(paramMap, true, rtnMsg); } else { return
	 * FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Mom_Bor(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap, String dbType) { // 전송 데이터 조회 List<Map<String, Object>>
	 * resultList = new ArrayList<Map<String, Object>>(); resultList.add(paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * int reInt = 0; String rtnMsg = ""; String sql = "INSERT INTO IF_MOM_BOR_R(" +
	 * " TRANS_SEQ" + ", DIVISION_CD" + ", COMPANY_CD" + ", ITEM_ID" + ", ROUTE_CD"
	 * + ", RESOURCE_CD" + ", TACT_TIME" + ", EARLY_PRODUCING_TERM" +
	 * ", EARLY_PRODUCING_TERM_UOM" + ", PROD_LOT_SIZE" + ", ALT_PRIORITY" + ", TAT"
	 * + ", YIELD" + ", CYCLE_TIME" + ", USE_YN" + ", DESCRIPTION" +
	 * ", TRANSFER_DATE" + ", TRANSFER_FLAG" + ", CRUD_FLAG" + ", WORK_DATE" + ")" +
	 * " VALUES(" + " S_IF_SEQ.NEXTVAL" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'N'"
	 * + ",?" + ",?" + ")";
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql); java.util.Date today =
	 * new java.util.Date();
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); preparedStatement.setString( 1,
	 * param.get("divisionCd").toString()); preparedStatement.setString( 2,
	 * param.get("companyCd").toString()); preparedStatement.setString( 3,
	 * param.get("itemId") == null ? null : param.get("itemId").toString());
	 * preparedStatement.setString( 4, param.get("routeCd") == null ? null :
	 * param.get("routeCd").toString()); preparedStatement.setString( 5,
	 * param.get("resourceCd") == null ? null : param.get("resourceCd").toString());
	 * if(param.get("tactTime") != null &&
	 * !param.get("tactTime").toString().equals("")) { preparedStatement.setFloat(6,
	 * Float.parseFloat(param.get("tactTime").toString())); } else {
	 * preparedStatement.setObject(6, null); } if(param.get("earlyProducingTerm") !=
	 * null && !param.get("earlyProducingTerm").toString().equals("")) {
	 * preparedStatement.setInt(7,
	 * Integer.parseInt(param.get("earlyProducingTerm").toString())); } else {
	 * preparedStatement.setObject(7, null); } preparedStatement.setString(8,
	 * param.get("earlyProducingTermUom") == null ? "DAY" :
	 * param.get("earlyProducingTermUom").toString()); if(param.get("prodLotSize")
	 * != null && !param.get("prodLotSize").toString().equals("")) {
	 * preparedStatement.setFloat(9,
	 * Float.parseFloat(param.get("prodLotSize").toString())); } else {
	 * preparedStatement.setObject(9, null); } if(param.get("altPriority") != null
	 * && !param.get("altPriority").toString().equals("")) {
	 * preparedStatement.setInt(10,
	 * Integer.parseInt(param.get("altPriority").toString())); } else {
	 * preparedStatement.setObject(10, null); } if(param.get("tat") != null &&
	 * !param.get("tat").toString().equals("")) { preparedStatement.setFloat(11,
	 * Float.parseFloat(param.get("tat").toString())); } else {
	 * preparedStatement.setObject(11, null); } if(param.get("yield") != null &&
	 * !param.get("yield").toString().equals("")) { preparedStatement.setFloat(12,
	 * Float.parseFloat(param.get("yield").toString())); } else {
	 * preparedStatement.setObject(12, null); } if(param.get("cycleTime") != null &&
	 * !param.get("cycleTime").toString().equals("")) {
	 * preparedStatement.setFloat(13,
	 * Float.parseFloat(param.get("cycleTime").toString())); } else {
	 * preparedStatement.setObject(13, null); } preparedStatement.setString(14,
	 * param.get("useYn") == null ? null : param.get("useYn").toString());
	 * preparedStatement.setString(15, param.get("description") == null ? null :
	 * param.get("description").toString()); preparedStatement.setTimestamp(16, new
	 * Timestamp(today.getTime())); preparedStatement.setString(17,
	 * param.get("crudFlag") == null ? null : param.get("crudFlag").toString());
	 * preparedStatement.setString(18, new
	 * java.sql.Date(today.getTime()).toString().replaceAll("-","").substring(0,
	 * 8));
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 결과에 따라 메시지 처리 if(reInt > 0 && rtnMsg.equals("")) { return
	 * FrameworkUtil.createResponseMap(paramMap, true, rtnMsg); } else { return
	 * FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Mom_Resource(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap, String dbType) { // 전송 데이터 조회 List<Map<String, Object>>
	 * resultList = new ArrayList<Map<String, Object>>(); resultList.add(paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * int reInt = 0; String rtnMsg = ""; String sql =
	 * "INSERT INTO IF_MOM_RESOURCE_R(" + " TRANS_SEQ" + " ,DIVISION_CD" +
	 * " ,COMPANY_CD" + " ,RESOURCE_CD" + " ,RESOURCE_NAME" + " ,RESOURCE_GROUP_CD"
	 * + " ,LOCATION_CD" + " ,GOOD_LOCATION_CD" + " ,BAD_LOCATION_CD" +
	 * " ,OUTSOURCING_FLAG" + " ,USE_YN" + " ,UNUSUAL_DATA" + " ,DESCRIPTION" +
	 * " ,TRANSFER_DATE" + " ,TRANSFER_FLAG" + " ,CRUD_FLAG" + " ,WORK_DATE" +
	 * " ,TRANS_TYPE" + ")" + " VALUES(" + " S_IF_SEQ.NEXTVAL" + ",?" + ",?" + ",?"
	 * + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",'N'" + ",?" + ",?" + ",?" + ")";
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql); java.util.Date today =
	 * new java.util.Date();
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); preparedStatement.setString( 1,
	 * param.get("divisionCd").toString()); preparedStatement.setString( 2,
	 * param.get("companyCd").toString()); preparedStatement.setString( 3,
	 * param.get("resourceCd").toString()); preparedStatement.setString( 4,
	 * param.get("resourceName").toString()); preparedStatement.setString( 5,
	 * param.get("resourceGroupCd").toString()); preparedStatement.setString( 6,
	 * param.get("locationCd").toString()); preparedStatement.setString( 7,
	 * param.get("goodLocationCd").toString()); preparedStatement.setString( 8,
	 * param.get("badLocationCd") == null ? null :
	 * param.get("badLocationCd").toString()); preparedStatement.setString( 9,
	 * param.get("outsourcingFlag") == null ? null :
	 * param.get("outsourcingFlag").toString()); preparedStatement.setString(10,
	 * param.get("useYn") == null ? "Y" : param.get("useYn").toString());
	 * preparedStatement.setString(11, param.get("unusualData") == null ? null :
	 * param.get("unusualData").toString()); preparedStatement.setString(12,
	 * param.get("description") == null ? null :
	 * param.get("description").toString()); preparedStatement.setTimestamp(13, new
	 * Timestamp(today.getTime())); preparedStatement.setString(14,
	 * param.get("crudFlag") == null ? null : param.get("crudFlag").toString());
	 * preparedStatement.setString(15, new
	 * java.sql.Date(today.getTime()).toString().replaceAll("-","").substring(0,
	 * 8)); preparedStatement.setString(16, param.get("transType") == null ? null :
	 * param.get("transType").toString());
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 결과에 따라 메시지 처리 if(reInt > 0 && rtnMsg.equals("")) { return
	 * FrameworkUtil.createResponseMap(paramMap, true, rtnMsg); } else { return
	 * FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * static Map<String,Object> fnSetIf_Mom_ShiftSchedule(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap,List<Map<String, Object>> paramMapList, String dbType) { //
	 * 전송 데이터 조회 List<Map<String, Object>> resultList = momService.getMapList(
	 * "com.thirautech.mom.common.get_ifMomShiftScheduleS_list", paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * Map<String, Object> rtnMap = null; int reInt = 0; String rtnMsg = ""; String
	 * sql = "INSERT INTO IF_MOM_SHIFT_SCHEDULE_R(" + " TRANS_SEQ" + ",WORK_DATE" +
	 * ",DIVISION_CD" + ",COMPANY_CD" + ",SHIFT_CD" + ",RESOURCE_CD" + ",SHIFT_TYPE"
	 * + ",START_TIME" + ",END_TIME" + ",APPLY_DATE" + ",ACT_START_TIME" +
	 * ",ACT_END_TIME" + ",WORK_PERSON_CNT" + ",WORK_TIME" + ",OFF_TIME" +
	 * ",ACT_TIME" + ",TRANSFER_DATE" + ",TRANSFER_FLAG" + ",CRUD_FLAG" + ")" +
	 * " VALUES(" + " ?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",'N'" + ",?" + ")";
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql); java.util.Date today =
	 * new java.util.Date();
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); preparedStatement.setString( 1,
	 * param.get("transSeq").toString()); preparedStatement.setString( 2,
	 * param.get("workDate").toString()); preparedStatement.setString( 3,
	 * param.get("divisionCd").toString()); preparedStatement.setString( 4,
	 * param.get("companyCd").toString()); preparedStatement.setString( 5,
	 * param.get("shiftCd").toString()); preparedStatement.setString( 6,
	 * param.get("resourceCd").toString()); preparedStatement.setString( 7,
	 * param.get("shiftType").toString()); preparedStatement.setString( 8,
	 * param.get("startTime").toString()); preparedStatement.setString( 9,
	 * param.get("endTime").toString()); preparedStatement.setTimestamp(10,
	 * Timestamp.valueOf(param.get("applyDate").toString()));
	 * preparedStatement.setString( 11, param.get("actStartTime").toString());
	 * preparedStatement.setString( 12, param.get("actEndTime").toString());
	 * if(param.get("workPersonCnt") != null &&
	 * !param.get("workPersonCnt").toString().equals("")) {
	 * preparedStatement.setInt(13,
	 * Integer.parseInt(param.get("workPersonCnt").toString())); } else {
	 * preparedStatement.setObject(13, null); } if(param.get("workTime") != null &&
	 * !param.get("workTime").toString().equals("")) {
	 * preparedStatement.setFloat(14,
	 * Float.parseFloat(param.get("workTime").toString())); } else {
	 * preparedStatement.setObject(14, null); } if(param.get("offTime") != null &&
	 * !param.get("offTime").toString().equals("")) { preparedStatement.setFloat(15,
	 * Float.parseFloat(param.get("offTime").toString())); } else {
	 * preparedStatement.setObject(15, null); } if(param.get("actTime") != null &&
	 * !param.get("actTime").toString().equals("")) { preparedStatement.setFloat(16,
	 * Float.parseFloat(param.get("actTime").toString())); } else {
	 * preparedStatement.setObject(16, null); } preparedStatement.setTimestamp(17,
	 * new Timestamp(today.getTime())); preparedStatement.setString( 18,
	 * param.get("crudFlag") == null ? null : param.get("crudFlag").toString());
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 결과에 따라 메시지 처리 if(reInt > 0 && rtnMsg.equals("")) { rtnMap =
	 * momService.modifyMapList(
	 * "com.thirautech.mom.common.modify_ifMomShiftScheduleS",paramMapList); return
	 * FrameworkUtil.createResponseMap(rtnMap, true, rtnMsg); } else { return
	 * FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 * 
	 * 
	 * static Map<String,Object> fnSetIf_Mom_Bom(Connection connection,
	 * PreparedStatement preparedStatement, MomService momService, Map<String,
	 * Object> paramMap, String dbType) { // 전송 데이터 조회 List<Map<String, Object>>
	 * resultList = new ArrayList<Map<String, Object>>(); resultList.add(paramMap);
	 * 
	 * // 전송 데이터 없으면 return if(resultList.size() == 0) return
	 * FrameworkUtil.createResponseMap(paramMap, true);
	 * 
	 * int reInt = 0; String rtnMsg = ""; String sql = "INSERT INTO IF_MOM_BOM_R(" +
	 * " TRANS_SEQ" + ", WORK_DATE" + ", DIVISION_CD" + ", COMPANY_CD" +
	 * ", PARENT_ITEM_ID" + ", CHILD_ITEM_ID" + ", QTY" + ", START_TIME" +
	 * ", END_TIME" + ", DESCRIPTION" + ", TRANSFER_DATE" + ", TRANSFER_FLAG" +
	 * ", CRUD_FLAG" + ", TRANS_TYPE" + ")" + " VALUES(" + " S_IF_SEQ.NEXTVAL" +
	 * ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" + ",?" +
	 * ",?" + ",?" + ")";
	 * 
	 * try {
	 * 
	 * preparedStatement = connection.prepareStatement(sql); java.util.Date today =
	 * new java.util.Date();
	 * 
	 * for(int j = 0; j < resultList.size(); j++) { Map<String, Object> param =
	 * resultList.get(j); preparedStatement.setString( 1, new
	 * java.sql.Date(today.getTime()).toString().replaceAll("-","").substring(0,
	 * 8)); preparedStatement.setString( 2, param.get("divisionCd").toString());
	 * preparedStatement.setString( 3, param.get("companyCd").toString());
	 * preparedStatement.setString( 4, param.get("parentItemId").toString());
	 * preparedStatement.setString( 5, param.get("childItemId").toString());
	 * if(param.get("qty") != null && !param.get("qty").toString().equals("")) {
	 * preparedStatement.setFloat(6, Float.parseFloat(param.get("qty").toString()));
	 * } else { preparedStatement.setObject(6, null); }
	 * preparedStatement.setString(7, param.get("startTime").toString());
	 * preparedStatement.setString(8, param.get("endTime").toString());
	 * preparedStatement.setString(9, param.get("description") == null ? null :
	 * param.get("description").toString()); preparedStatement.setTimestamp(10, new
	 * Timestamp(today.getTime())); preparedStatement.setString(11, "N");
	 * preparedStatement.setString(12, param.get("crudFlag") == null ? null :
	 * param.get("crudFlag").toString()); preparedStatement.setString(13,
	 * param.get("transType") == null ? null : param.get("transType").toString());
	 * 
	 * reInt = preparedStatement.executeUpdate(); }
	 * 
	 * connection.commit(); } catch(Exception e){ e.printStackTrace(); rtnMsg =
	 * e.toString(); try { connection.rollback(); } catch(Exception e1) { } }
	 * finally { try { preparedStatement.close(); } catch(Exception e) { }
	 * 
	 * try { connection.close(); } catch(Exception e) { } }
	 * 
	 * // 전송 결과에 따라 메시지 처리 if(reInt > 0 && rtnMsg.equals("")) { return
	 * FrameworkUtil.createResponseMap(paramMap, true, rtnMsg); } else { return
	 * FrameworkUtil.createResponseMap(paramMap, false, rtnMsg); } }
	 */

}
