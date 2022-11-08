package com.mom.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mom.service.MomService;

public class InterfaceUtil {
	public static Map<String, String> driver = null;

	/* modify_hists
	 * 20191105_001 / 20191105 / gyp / IF 정보 조회 시 queryId 넘겨서 조회 하도록 변경
	 * 
	 * 
	 * */
	public static boolean writeOut(MomService momService, String queryId, List<Map<String, Object>> paramList, String tableId) {
		if(paramList == null || paramList.size() == 0) {
			return false;
		}
		/* start 20191105_001 */
		Map<String, Object> ifMap = paramList.get(0);
		ifMap.put("queryId", queryId.substring("com.thirautech.mom.".length()));
		ifMap.put("tableId", tableId);
		
		List<Map<String, Object>> result = momService.getMapList("com.thirautech.mom.common.get_ifDbInfo_list", ifMap);
		/* end 20191105_001 */
		
		if(result == null || result.size() == 0) {
			return false;
		}
		
		if(result.get(0).get("tableId") == null) {
			return false;
		} 
		
		if(InterfaceUtil.driver == null) {
			InterfaceUtil.driver = new HashMap<String, String>();
			InterfaceUtil.driver.put("ORACLE", "oracle.jdbc.OracleDriver");
			InterfaceUtil.driver.put("MS-SQL", "com.microsoft.sqlserver.jdbc.SQLServerDriver");
			InterfaceUtil.driver.put("TIBERO", "com.tmax.tibero.jdbc.TbDriver");
			
		}
		
		String connectionString = "";
		if(result.get(0).get("dbType").toString().equals("ORACLE")) {
			connectionString = "jdbc:oracle:thin:@" + result.get(0).get("dbHost").toString() + ":" + result.get(0).get("dbPort").toString() + ":" + result.get(0).get("dbName").toString();
		} else if(result.get(0).get("dbType").toString().equals("MS-SQL")) {
			connectionString = "jdbc:sqlserver://" + result.get(0).get("dbHost").toString() + ":" + result.get(0).get("dbPort").toString() + ";databaseName=" + result.get(0).get("dbName").toString() + ";user=" + result.get(0).get("userId1").toString() + ";password=" + result.get(0).get("password").toString();
//			System.out.println("@@@ connectionString @@@ : " + connectionString);
		} else if(result.get(0).get("dbType").toString().equals("TIBERO")) {
			connectionString = "jdbc:tibero:thin:@" + result.get(0).get("dbHost").toString() + ":" + result.get(0).get("dbPort").toString() + ":" + result.get(0).get("dbName").toString();
		}
		
		Connection connection = null;
        PreparedStatement preparedStatement = null;
		try {
			if(result.get(0).get("dbType").toString().equals("ORACLE") || result.get(0).get("dbType").toString().equals("TIBERO")) {
				connection = DriverManager.getConnection(connectionString, result.get(0).get("userId1").toString(), result.get(0).get("password").toString());
			} else if(result.get(0).get("dbType").toString().equals("MS-SQL")) {
				connection = DriverManager.getConnection(connectionString);
//				System.out.println("@@@ connection @@@ : " + connection);
			} 
			
			connection.setAutoCommit(false);
        } catch(Exception e) {
        	try {
    			Class.forName(InterfaceUtil.driver.get(result.get(0).get("dbType").toString()));
    			
    			if(result.get(0).get("dbType").toString().equals("ORACLE") || result.get(0).get("dbType").toString().equals("TIBERO")) {
    				connection = DriverManager.getConnection(connectionString, result.get(0).get("userId1").toString(), result.get(0).get("password").toString());
    			} else if(result.get(0).get("dbType").toString().equals("MS-SQL")) {
    				connection = DriverManager.getConnection(connectionString);
    			}
    			
    			connection.setAutoCommit(false);
    		} catch (Exception e1) {
    			// TODO Auto-generated catch block
    			e1.printStackTrace();
    		}
        } 
		
		for(int i = 0; i < result.size(); i++) {
			if(queryId.indexOf(result.get(i).get("queryId").toString()) >= 0 && result.get(i).get("tableId").toString().indexOf("IF_MOM_ITEM_DEFINITION") >= 0 
					&& result.get(i).get("ifFlag").toString().equals("Y")) {
				String sql = "INSERT INTO IF_MOM_ITEM_DEFINITION_R("
						+ " TRANS_SEQ"
						+ ", DIVISION_CD"
						+ ", COMPANY_CD"
						+ ", ITEM_ID"
						+ ", ITEM_NAME"
						+ ", ITEM_GROUP_CODE"
						+ ", ITEM_TYPE"
						+ ", SPECIFICATION"
						+ ", VENDOR_CD"
						+ ", DEPARTURE_VENDOR_CD"
						+ ", UNIT_PRICE"
						+ ", UNIT"
						+ ", PURCHASE_UNIT"
						+ ", UNIT_QTY"
						+ ", CONVERSION_UNIT_QTY"
						+ ", MOQ"
						+ ", MOM"
						+ ", SAFETY_STOCK_QTY"
						+ ", SAFETY_STOCK_DAY"
						+ ", SAFETY_STOCK_DAY_UOM"
						+ ", PROD_MIN_LOT_SIZE"
						+ ", PROD_MAX_LOT_SIZE"
						+ ", PROD_INCREMENT_LOT_SIZE"
						+ ", DEMAND_LOT_SIZE"
						+ ", IS_PHANTOM"
						+ ", ACTIVATION_FLAG"
						+ ", IS_FINITE_FLAG"
						+ ", FINITE_TERM"
						+ ", FINITE_TERM_UOM"
						+ ", IN_LOCATION_ID"
						+ ", OUT_LOCATION_ID"
						+ ", TEST_REPORT_FLAG"
						+ ", IQC_FLAG"
						+ ", PQC_FLAG"
						+ ", OQC_FLAG"
						+ ", RP_ITEM_ID"
						+ ", VENDOR_ITEM_ID"
						+ ", ALT_ITEM_ID"
						+ ", ITEM_CATEGORY"
						+ ", PURCHASE_TYPE"
						+ ", ITEM_USER_ID"
						+ ", PACKING_SIZE_WIDTH"
						+ ", PACKING_SIZE_HEIGHT"
						+ ", MATERIAL_WEIGHT"
						+ ", PALLET_WEIGHT"
						+ ", UNIT_WEIGHT"
						+ ", BOX_WEIGHT"
						+ ", ITEM_GROUP_LARGE"
						+ ", ITEM_GROUP_MEDIUM"
						+ ", ITEM_GROUP_SMALL"
						+ ", PRE_BUILD_TERM"
						+ ", LEAD_TIME"
						+ ", TRACKING_FLAG"
						+ ", ORDER_METHOD"
						+ ", ITEM_GRADE"
						+ ", BAD_LEVEL"
						+ ", STANDARD_OUT_QTY"
						+ ", DEFECT_RATE"
						+ ", BY_PRODUCT_ITEM_ID"
						+ ", USE_YN"
						+ ", DESCRIPTION"
						+ ", ATTRIBUTE1"
						+ ", ATTRIBUTE2"
						+ ", ATTRIBUTE3"
						+ ", ATTRIBUTE4"
						+ ", ATTRIBUTE5"
						+ ", ATTRIBUTE6"
						+ ", ATTRIBUTE7"
						+ ", ATTRIBUTE8"
						+ ", ATTRIBUTE9"
						+ ", ATTRIBUTE10"
						+ ", ATTRIBUTE11"
						+ ", ATTRIBUTE12"
						+ ", ATTRIBUTE13"
						+ ", ATTRIBUTE14"
						+ ", ATTRIBUTE15"
						+ ", FREE_OFFER_FLAG"
						+ ", CONVERSION_UNIT"
						+ ", TOOL"
						+ ", PRESS_LINE"
						+ ", SALES_FREE_FLAG"
						+ ", POP_MAKE_LOT_QTY"
						+ ", POP_INPUT_TYPE"
						+ ", POP_CT_QTY"
						+ ", POP_GT_LABELID"
						+ ", POP_CT_LABELID"
						+ ", POP_PALLET_LABELID"
						+ ", POP_EAN"
						+ ", POP_UPC"
						+ ", POP_DESTINATION"
						+ ", POP_MADEBY"
						+ ", POP_GANBAN_LABELID"
						+ ", LABELDESC"
						+ ", LABELSPEC"
						+ ", BIN_USE_FLAG"
						+ ", CT_OUT_QTY"
						+ ", CREATE_ITEM_FLAG"
						+ ", TRANSFER_DATE"
						+ ", TRANSFER_FLAG"
						+ ", CRUD_FLAG"
						+ ", WORK_DATE"
						+ ")"
						+ " VALUES("
						+ " S_IF_SEQ.NEXTVAL"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",'N'"
						+ ",?"
						+ ",?"
						+ ")";
				
				try {
					java.util.Date today = new java.util.Date();
				    
		        	preparedStatement = connection.prepareStatement(sql);
		        	
		        	for(int j = 0; j < paramList.size(); j++) {
		    			Map<String, Object> param = paramList.get(j);
		    			
		    			preparedStatement.setString( 1, param.get("divisionCd").toString());
		    			preparedStatement.setString( 2, param.get("companyCd").toString());
		    			preparedStatement.setString( 3, param.get("itemId") == null ? null : param.get("itemId").toString());     
		    			preparedStatement.setString( 4, param.get("itemName") == null ? null : param.get("itemName").toString());     
		    			preparedStatement.setString( 5, param.get("itemGroupCode") == null ? null : param.get("itemGroupCode").toString());     
		    			preparedStatement.setString( 6, param.get("itemType") == null ? null : param.get("itemType").toString());    
		    			preparedStatement.setString( 7, param.get("specification") == null ? null : param.get("specification").toString());     
		    			preparedStatement.setString( 8, param.get("vendorCd") == null ? null : param.get("vendorCd").toString());    
		    			preparedStatement.setString( 9, param.get("departureVendorCd") == null ? null : param.get("departureVendorCd").toString());    
		    			if(param.get("unitPrice") != null && !param.get("unitPrice").toString().equals("")) {
		    				preparedStatement.setFloat(10, Float.parseFloat(param.get("unitPrice").toString()));
		    			} else {
		    				preparedStatement.setObject(10, null);
		    			}
		    			preparedStatement.setString(11, param.get("unit") == null ? null : param.get("unit").toString());     
		    			preparedStatement.setString(12, param.get("purchaseUnit") == null ? null : param.get("purchaseUnit").toString());     
		    			if(param.get("unitQty") != null && !param.get("unitQty").toString().equals("")) {
		    				preparedStatement.setFloat(13, Float.parseFloat(param.get("unitQty").toString()));
		    			} else {
		    				preparedStatement.setObject(13, null);
		    			}   
		    			if(param.get("conversionUnitQty") != null && !param.get("conversionUnitQty").toString().equals("")) {
		    				preparedStatement.setFloat(14, Float.parseFloat(param.get("conversionUnitQty").toString()));
		    			} else {
		    				preparedStatement.setObject(14, 1);
		    			}
		    			if(param.get("moq") != null && !param.get("moq").toString().equals("")) {
		    				preparedStatement.setFloat(15, Float.parseFloat(param.get("moq").toString()));
		    			} else {
		    				preparedStatement.setObject(15, null);
		    			}
		    			if(param.get("mom") != null && !param.get("mom").toString().equals("")) {
		    				preparedStatement.setFloat(16, Float.parseFloat(param.get("mom").toString()));
		    			} else {
		    				preparedStatement.setObject(16, null);
		    			}
		    			if(param.get("safetyStockQty") != null && !param.get("safetyStockQty").toString().equals("")) {
		    				preparedStatement.setFloat(17, Float.parseFloat(param.get("safetyStockQty").toString()));
		    			} else {
		    				preparedStatement.setObject(17, null);
		    			}
		    			if(param.get("safetyStockDay") != null && !param.get("safetyStockDay").toString().equals("")) {
		    				preparedStatement.setFloat(18, Float.parseFloat(param.get("safetyStockDay").toString()));
		    			} else {
		    				preparedStatement.setObject(18, null);
		    			}
		    			if(param.get("safetyStockDayUom") != null && !param.get("safetyStockDayUom").toString().equals("")) {
		    				preparedStatement.setFloat(19, Float.parseFloat(param.get("safetyStockDayUom").toString()));
		    			} else {
		    				preparedStatement.setObject(19, null);
		    			}
		    			if(param.get("prodMinLotSize") != null && !param.get("prodMinLotSize").toString().equals("")) {
		    				preparedStatement.setFloat(20, Float.parseFloat(param.get("prodMinLotSize").toString()));
		    			} else {
		    				preparedStatement.setObject(20, null);
		    			}
		    			if(param.get("prodMaxLotSize") != null && !param.get("prodMaxLotSize").toString().equals("")) {
		    				preparedStatement.setFloat(21, Float.parseFloat(param.get("prodMaxLotSize").toString()));
		    			} else {
		    				preparedStatement.setObject(21, null);
		    			}
		    			if(param.get("prodIncrementLotSize") != null && !param.get("prodIncrementLotSize").toString().equals("")) {
		    				preparedStatement.setFloat(22, Float.parseFloat(param.get("prodIncrementLotSize").toString()));
		    			} else {
		    				preparedStatement.setObject(22, null);
		    			}
		    			if(param.get("demandLotSize") != null && !param.get("demandLotSize").toString().equals("")) {
		    				preparedStatement.setFloat(23, Float.parseFloat(param.get("demandLotSize").toString()));
		    			} else {
		    				preparedStatement.setObject(23, null);
		    			}
		    			preparedStatement.setString(24, param.get("isPhantom") == null ? null : param.get("isPhantom").toString());   
		    			preparedStatement.setString(25, param.get("activationFlag") == null ? null : param.get("activationFlag").toString());    
		    			preparedStatement.setString(26, param.get("isFiniteFlag") == null ? null : param.get("isFiniteFlag").toString());     
		    			if(param.get("finiteTerm") != null && !param.get("finiteTerm").toString().equals("")) {
		    				preparedStatement.setInt(27, Integer.parseInt(param.get("finiteTerm").toString()));
		    			} else {
		    				preparedStatement.setObject(27, null);
		    			}
		    			preparedStatement.setString(28, param.get("finiteTermUom") == null ? null : param.get("finiteTermUom").toString());     
		    			preparedStatement.setString(29, param.get("inLocationId") == null ? null : param.get("inLocationId").toString());     
		    			preparedStatement.setString(30, param.get("outLocationId") == null ? null : param.get("outLocationId").toString());     
		    			preparedStatement.setString(31, param.get("testReportFlag") == null ? "N" : param.get("testReportFlag").toString());     
		    			preparedStatement.setString(32, param.get("iqcFlag") == null ? "N" : param.get("iqcFlag").toString());     
		    			preparedStatement.setString(33, param.get("pqcFlag") == null ? "N" : param.get("pqcFlag").toString());     
		    			preparedStatement.setString(34, param.get("oqcFlag") == null ? "N" : param.get("oqcFlag").toString());     
		    			preparedStatement.setString(35, param.get("rpItemId") == null ? null : param.get("rpItemId").toString());     
		    			preparedStatement.setString(36, param.get("vendorItemId") == null ? null : param.get("vendorItemId").toString());     
		    			preparedStatement.setString(37, param.get("altItemId") == null ? null : param.get("altItemId").toString());     
		    			preparedStatement.setString(38, param.get("itemCategory") == null ? null : param.get("itemCategory").toString());     
		    			preparedStatement.setString(39, param.get("purchaseType") == null ? null : param.get("purchaseType").toString());     
		    			preparedStatement.setString(40, param.get("itemUserId") == null ? null : param.get("itemUserId").toString());     
		    			if(param.get("packingSizeWidth") != null && !param.get("packingSizeWidth").toString().equals("")) {
		    				preparedStatement.setFloat(41, Float.parseFloat(param.get("packingSizeWidth").toString()));
		    			} else {
		    				preparedStatement.setObject(41, null);
		    			}
		    			if(param.get("packingSizeHeight") != null && !param.get("packingSizeHeight").toString().equals("")) {
		    				preparedStatement.setFloat(42, Float.parseFloat(param.get("packingSizeHeight").toString()));
		    			} else {
		    				preparedStatement.setObject(42, null);
		    			}
		    			if(param.get("materialWeight") != null && !param.get("materialWeight").toString().equals("")) {
		    				preparedStatement.setFloat(43, Float.parseFloat(param.get("materialWeight").toString()));
		    			} else {
		    				preparedStatement.setObject(43, null);
		    			}
		    			if(param.get("palletWeight") != null && !param.get("palletWeight").toString().equals("")) {
		    				preparedStatement.setFloat(44, Float.parseFloat(param.get("palletWeight").toString()));
		    			} else {
		    				preparedStatement.setObject(44, null);
		    			}
		    			if(param.get("unitWeight") != null && !param.get("unitWeight").toString().equals("")) {
		    				preparedStatement.setFloat(45, Float.parseFloat(param.get("unitWeight").toString()));
		    			} else {
		    				preparedStatement.setObject(45, null);
		    			}
		    			if(param.get("boxWeight") != null && !param.get("boxWeight").toString().equals("")) {
		    				preparedStatement.setFloat(46, Float.parseFloat(param.get("boxWeight").toString()));
		    			} else {
		    				preparedStatement.setObject(46, null);
		    			}
		    			preparedStatement.setString(47, param.get("itemGroupLarge") == null ? null : param.get("itemGroupLarge").toString());     
		    			preparedStatement.setString(48, param.get("itemGroupMedium") == null ? null : param.get("itemGroupMedium").toString());     
		    			preparedStatement.setString(49, param.get("itemGroupSmall") == null ? null : param.get("itemGroupSmall").toString());     
		    			if(param.get("preBuildTerm") != null && !param.get("preBuildTerm").toString().equals("")) {
		    				preparedStatement.setInt(50, Integer.parseInt(param.get("preBuildTerm").toString()));
		    			} else {
		    				preparedStatement.setObject(50, null);
		    			}
		    			if(param.get("leadTime") != null && !param.get("leadTime").toString().equals("")) {
		    				preparedStatement.setFloat(51, Float.parseFloat(param.get("leadTime").toString()));
		    			} else {
		    				preparedStatement.setObject(51, null);
		    			}
		    			preparedStatement.setString(52, param.get("trackingFlag") == null ? null : param.get("trackingFlag").toString());     
		    			preparedStatement.setString(53, param.get("orderMethod") == null ? null : param.get("orderMethod").toString());     
		    			preparedStatement.setString(54, param.get("itemGrade") == null ? null : param.get("itemGrade").toString());     
		    			preparedStatement.setString(55, param.get("badLevel") == null ? null : param.get("badLevel").toString());     
		    			if(param.get("standardOutQty") != null && !param.get("standardOutQty").toString().equals("")) {
		    				preparedStatement.setFloat(56, Float.parseFloat(param.get("standardOutQty").toString()));
		    			} else {
		    				preparedStatement.setObject(56, null);
		    			}
		    			if(param.get("defectRate") != null && !param.get("defectRate").toString().equals("")) {
		    				preparedStatement.setFloat(57, Float.parseFloat(param.get("defectRate").toString()));
		    			} else {
		    				preparedStatement.setObject(57, null);
		    			}
		    			preparedStatement.setString(58, param.get("byProductItemId") == null ? null : param.get("byProductItemId").toString());     
		    			preparedStatement.setString(59, param.get("useYn") == null ? null : param.get("useYn").toString());    
		    			preparedStatement.setString(60, param.get("description") == null ? null : param.get("description").toString());    
		    		  
		    			preparedStatement.setString(61, param.get("attribute1") == null ? null : param.get("attribute1").toString());     
		    			preparedStatement.setString(62, param.get("attribute2") == null ? null : param.get("attribute2").toString());     
		    			preparedStatement.setString(63, param.get("attribute3") == null ? null : param.get("attribute3").toString());     
		    			preparedStatement.setString(64, param.get("attribute4") == null ? null : param.get("attribute4").toString());     
		    			preparedStatement.setString(65, param.get("attribute5") == null ? null : param.get("attribute5").toString());     
		    			preparedStatement.setString(66, param.get("attribute6") == null ? null : param.get("attribute6").toString());     
		    			preparedStatement.setString(67, param.get("attribute7") == null ? null : param.get("attribute7").toString());     
		    			preparedStatement.setString(68, param.get("attribute8") == null ? null : param.get("attribute8").toString());     
		    			preparedStatement.setString(69, param.get("attribute9") == null ? null : param.get("attribute9").toString());     
		    			preparedStatement.setString(70, param.get("attribute10") == null ? null : param.get("attribute10").toString());   
		    			preparedStatement.setString(71, param.get("attribute11") == null ? null : param.get("attribute11").toString());   
		    			preparedStatement.setString(72, param.get("attribute12") == null ? null : param.get("attribute12").toString());   
		    			preparedStatement.setString(73, param.get("attribute13") == null ? null : param.get("attribute13").toString());   
		    			preparedStatement.setString(74, param.get("attribute14") == null ? null : param.get("attribute14").toString());   
		    			preparedStatement.setString(75, param.get("attribute15") == null ? null : param.get("attribute15").toString());   
		    			preparedStatement.setString(76, param.get("freeOfferFlag") == null ? null : param.get("freeOfferFlag").toString());    
		    			preparedStatement.setString(77, param.get("conversionUnit") == null ? null : param.get("conversionUnit").toString()); 
		    			preparedStatement.setString(78, param.get("tool") == null ? null : param.get("tool").toString());     
		    			preparedStatement.setString(79, param.get("pressLine") == null ? null : param.get("pressLine").toString());    
		    			preparedStatement.setString(80, param.get("salesFreeFlag") == null ? null : param.get("salesFreeFlag").toString());     
		    			if(param.get("popMakeLotQty") != null && !param.get("popMakeLotQty").toString().equals("")) {
		    				preparedStatement.setFloat(81, Float.parseFloat(param.get("popMakeLotQty").toString()));
		    			} else {
		    				preparedStatement.setObject(81, null);
		    			}
		    			preparedStatement.setString(82, param.get("popInputType") == null ? null : param.get("popInputType").toString());  
		    			if(param.get("popCtQty") != null && !param.get("popCtQty").toString().equals("")) {
		    				preparedStatement.setFloat(83, Float.parseFloat(param.get("popCtQty").toString()));
		    			} else {
		    				preparedStatement.setObject(83, null);
		    			}
		    			preparedStatement.setString(84, param.get("popGtLabelid") == null ? null : param.get("popGtLabelid").toString());    
		    			preparedStatement.setString(85, param.get("popCtLabelid") == null ? null : param.get("popCtLabelid").toString());     
		    			preparedStatement.setString(86, param.get("popPalletLabelid") == null ? null : param.get("popPalletLabelid").toString());     
		    			preparedStatement.setString(87, param.get("popEan") == null ? null : param.get("popEan").toString());     
		    			preparedStatement.setString(88, param.get("popUpc") == null ? null : param.get("popUpc").toString());    
		    			preparedStatement.setString(89, param.get("popDestination") == null ? null : param.get("popDestination").toString());    
		    			preparedStatement.setString(90, param.get("popMadeby") == null ? null : param.get("popMadeby").toString());     
		    			preparedStatement.setString(91, param.get("popGanbanLabelid") == null ? null : param.get("popGanbanLabelid").toString());     
		    			preparedStatement.setString(92, param.get("labeldesc") == null ? null : param.get("labeldesc").toString());     
		    			preparedStatement.setString(93, param.get("labelspec") == null ? null : param.get("labelspec").toString());	
		    			preparedStatement.setString(94, param.get("binUseFlag") == null ? null : param.get("binUseFlag").toString());	
		    			if(param.get("ctOutQty") != null && !param.get("ctOutQty").toString().equals("")) {
		    				preparedStatement.setFloat(95, Float.parseFloat(param.get("ctOutQty").toString()));
		    			} else {
		    				preparedStatement.setObject(95, null);
		    			}
		    			preparedStatement.setString(96, param.get("createItemFlag") == null ? "N" : param.get("createItemFlag").toString());	
		    			if(result.get(i).get("dbType").toString().equals("ORACLE") || result.get(i).get("dbType").toString().equals("TIBERO")) {
	    				   preparedStatement.setDate(97, new java.sql.Date(today.getTime()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(97, new Timestamp(today.getTime()));
	    				}
		    			preparedStatement.setString(98, param.get("crudFlag") == null ? null : param.get("crudFlag").toString());
//		    			SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
//		                Date date = format1.parse(format1.format(new java.sql.Date(today.getTime())));
		    			preparedStatement.setString(99, new java.sql.Date(today.getTime()).toString().replaceAll("-","").substring(0, 8));
		    			preparedStatement.executeUpdate();
		    		}
		    		
		    		connection.commit();
		    	} catch(Exception e){
		    		e.printStackTrace();
		    		try {
		    			connection.rollback();
		    		} catch(Exception e1) {
		    		}
		    	} finally {
		    		try {
		    			preparedStatement.close();
		    		} catch(Exception e) {
		    		}
		    		
		    		try {
		    			connection.close();
		    		} catch(Exception e) {
		    		}
		    	}
			 
			}
			else if(queryId.indexOf(result.get(i).get("queryId").toString()) >= 0 && result.get(i).get("tableId").toString().indexOf("IF_MOM_BOR") >= 0
					&& result.get(i).get("ifFlag").toString().equals("Y")) {
				String sql = "INSERT INTO IF_MOM_BOR_R("
						+ " TRANS_SEQ"
						+ ", DIVISION_CD"
						+ ", COMPANY_CD"
						+ ", ITEM_ID"
						+ ", ROUTE_CD"
						+ ", RESOURCE_CD"
						+ ", TACT_TIME"
						+ ", EARLY_PRODUCING_TERM"
						+ ", EARLY_PRODUCING_TERM_UOM"
						+ ", PROD_LOT_SIZE"
						+ ", ALT_PRIORITY"
						+ ", TAT"
						+ ", YIELD"
						+ ", CYCLE_TIME"
						+ ", USE_YN"
						+ ", DESCRIPTION"
						+ ", TRANSFER_DATE"
						+ ", TRANSFER_FLAG"
						+ ", CRUD_FLAG"
						+ ", WORK_DATE"
						+ ")"
						+ " VALUES("
						+ " S_IF_SEQ.NEXTVAL"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",'N'"
						+ ",?"
						+ ",?"
						+ ")";
				try {
					java.util.Date today = new java.util.Date();
				    
		        	preparedStatement = connection.prepareStatement(sql);
		        	
		        	for(int j = 0; j < paramList.size(); j++) {
		    			Map<String, Object> param = paramList.get(j);
		    			
		    			preparedStatement.setString( 1, param.get("divisionCd").toString());
		    			preparedStatement.setString( 2, param.get("companyCd").toString());
		    			preparedStatement.setString( 3, param.get("itemId") == null ? null : param.get("itemId").toString());     
		    			preparedStatement.setString( 4, param.get("routeCd") == null ? null : param.get("routeCd").toString());     
		    			preparedStatement.setString( 5, param.get("resourceCd") == null ? null : param.get("resourceCd").toString());     
		    			if(param.get("tactTime") != null && !param.get("tactTime").toString().equals("")) {
		    				preparedStatement.setFloat(6, Float.parseFloat(param.get("tactTime").toString()));
		    			} else {
		    				preparedStatement.setObject(6, null);
		    			}
		    			if(param.get("earlyProducingTerm") != null && !param.get("earlyProducingTerm").toString().equals("")) {
		    				preparedStatement.setInt(7, Integer.parseInt(param.get("earlyProducingTerm").toString()));
		    			} else {
		    				preparedStatement.setObject(7, null);
		    			}
		    			preparedStatement.setString(8, param.get("earlyProducingTermUom") == null ? "DAY" : param.get("earlyProducingTermUom").toString());    
		    			if(param.get("prodLotSize") != null && !param.get("prodLotSize").toString().equals("")) {
		    				preparedStatement.setFloat(9, Float.parseFloat(param.get("prodLotSize").toString()));
		    			} else {
		    				preparedStatement.setObject(9, null);
		    			}
		    			if(param.get("altPriority") != null && !param.get("altPriority").toString().equals("")) {
		    				preparedStatement.setInt(10, Integer.parseInt(param.get("altPriority").toString()));
		    			} else {
		    				preparedStatement.setObject(10, null);
		    			}  
		    			if(param.get("tat") != null && !param.get("tat").toString().equals("")) {
		    				preparedStatement.setFloat(11, Float.parseFloat(param.get("tat").toString()));
		    			} else {
		    				preparedStatement.setObject(11, null);
		    			}  
		    			if(param.get("yield") != null && !param.get("yield").toString().equals("")) {
		    				preparedStatement.setFloat(12, Float.parseFloat(param.get("yield").toString()));
		    			} else {
		    				preparedStatement.setObject(12, null);
		    			} 
		    			if(param.get("cycleTime") != null && !param.get("cycleTime").toString().equals("")) {
		    				preparedStatement.setFloat(13, Float.parseFloat(param.get("cycleTime").toString()));
		    			} else {
		    				preparedStatement.setObject(13, null);
		    			} 	
		    			preparedStatement.setString(14, param.get("useYn") == null ? null : param.get("useYn").toString());   
		    			preparedStatement.setString(15, param.get("description") == null ? null : param.get("description").toString());
		    			if(result.get(i).get("dbType").toString().equals("ORACLE") || result.get(i).get("dbType").toString().equals("TIBERO")) {
	    				   preparedStatement.setDate(16, new java.sql.Date(today.getTime()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(16, new Timestamp(today.getTime()));
	    				}
		    			preparedStatement.setString(17, param.get("crudFlag") == null ? null : param.get("crudFlag").toString());
		    			preparedStatement.setString(18, new java.sql.Date(today.getTime()).toString().replaceAll("-","").substring(0, 8));
		    			preparedStatement.executeUpdate();
		    		}
		    		
		    		connection.commit();
		    	} catch(Exception e){
		    		e.printStackTrace();
		    		try {
		    			connection.rollback();
		    		} catch(Exception e1) {
		    		}
		    	} finally {
		    		try {
		    			preparedStatement.close();
		    		} catch(Exception e) {
		    		}
		    		
		    		try {
		    			connection.close();
		    		} catch(Exception e) {
		    		}
		    	}
			}
			else if(queryId.indexOf(result.get(i).get("queryId").toString()) >= 0 && result.get(i).get("tableId").toString().indexOf("IF_MOM_RESOURCE") >= 0
					&& result.get(i).get("ifFlag").toString().equals("Y")) {
				String sql = "INSERT INTO IF_MOM_RESOURCE_R("
						+ " TRANS_SEQ"
						+ " ,DIVISION_CD"
	 					+ " ,COMPANY_CD"
						+ " ,RESOURCE_CD"
						+ " ,RESOURCE_NAME"
						+ " ,RESOURCE_GROUP_CD"
						+ " ,LOCATION_CD"
						+ " ,GOOD_LOCATION_CD"
						+ " ,BAD_LOCATION_CD"
						+ " ,OUTSOURCING_FLAG"
						+ " ,USE_YN"
						+ " ,UNUSUAL_DATA"
						+ " ,DESCRIPTION"
						+ " ,TRANSFER_DATE"
						+ " ,TRANSFER_FLAG"
						+ " ,CRUD_FLAG"
						+ " ,WORK_DATE"
						+ ")"
						+ " VALUES("
						+ " S_IF_SEQ.NEXTVAL"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",'N'"
						+ ",?"
						+ ",?"
						+ ")";
				try {
					java.util.Date today = new java.util.Date();
		        	preparedStatement = connection.prepareStatement(sql);
		        	for(int j = 0; j < paramList.size(); j++) {
		    			Map<String, Object> param = paramList.get(j);
//	    			for(int i = 0; i < paramList.size(); i++) {
//		    			Map<String, Object> param = paramList.get(i);
		    			preparedStatement.setString( 1, param.get("divisionCd").toString());
		    			preparedStatement.setString( 2, param.get("companyCd").toString());
		    			preparedStatement.setString( 3, param.get("resourceCd") == null ? null : param.get("resourceCd").toString());     
		    			preparedStatement.setString( 4, param.get("resourceName") == null ? null : param.get("resourceName").toString());     
		    			preparedStatement.setString( 5, param.get("resourceGroupCd") == null ? null : param.get("resourceGroupCd").toString());  
		    			preparedStatement.setString(6, param.get("locationCd") == null ? null : param.get("locationCd").toString());
		    			preparedStatement.setString(7, param.get("goodLocationCd") == null ? null : param.get("goodLocationCd").toString());
		    			preparedStatement.setString(8, param.get("badLocationCd") == null ? null : param.get("badLocationCd").toString());
		    			preparedStatement.setString(9, param.get("outsourcingFlag") == null ? null : param.get("outsourcingFlag").toString());
		    			preparedStatement.setString(10, param.get("useYn") == null ? null : param.get("useYn").toString());   
		    			preparedStatement.setString(11, param.get("unusualData") == null ? null : param.get("unusualData").toString());
		    			preparedStatement.setString(12, param.get("description") == null ? null : param.get("description").toString());
		    			if(result.get(i).get("dbType").toString().equals("ORACLE") || result.get(i).get("dbType").toString().equals("TIBERO")) {
	    				   preparedStatement.setDate(13, new java.sql.Date(today.getTime()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(13, new Timestamp(today.getTime()));
	    				}
		    			preparedStatement.setString(14, param.get("crudFlag") == null ? null : param.get("crudFlag").toString());
		    			preparedStatement.setString(15, new java.sql.Date(today.getTime()).toString().replaceAll("-","").substring(0, 8));
		    			preparedStatement.executeUpdate();
		    		}
		    		
		    		connection.commit();
		    	} catch(Exception e){
		    		e.printStackTrace();
		    		try {
		    			connection.rollback();
		    		} catch(Exception e1) {
		    		}
		    	} finally {
		    		try {
		    			preparedStatement.close();
		    		} catch(Exception e) {
		    		}
		    		
		    		try {
		    			connection.close();
		    		} catch(Exception e) {
		    		}
		    	}
			} 
			else if(queryId.indexOf(result.get(i).get("queryId").toString()) >= 0 && result.get(i).get("tableId").toString().indexOf("IF_MOM_SHIFT_SCHEDULE") >= 0
					&& result.get(i).get("ifFlag").toString().equals("Y")) {
				String sql = "INSERT INTO IF_MOM_SHIFT_SCHEDULE_R("
						+ " TRANS_SEQ"
						+ ",WORK_DATE"
						+ ",DIVISION_CD"
						+ ",COMPANY_CD"
	 					+ ",SHIFT_CD"
						+ ",RESOURCE_CD"
						+ ",SHIFT_TYPE"
						+ ",START_TIME"
						+ ",END_TIME"
						+ ",APPLY_DATE"
						+ ",ACT_START_TIME"
						+ ",ACT_END_TIME"
						+ ",WORK_PERSON_CNT"
						+ ",WORK_TIME"
						+ ",OFF_TIME"
						+ ",ACT_TIME"
						+ ",TRANSFER_DATE"
						+ ",TRANSFER_FLAG"
						+ ",CRUD_FLAG"
						+ ")"
						+ " VALUES("
						+ " S_IF_SEQ.NEXTVAL"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",'N'"
						+ ",?"
						+ ")";
				try {
					java.util.Date today = new java.util.Date();
		        	preparedStatement = connection.prepareStatement(sql);
		        	for(int j = 0; j < paramList.size(); j++) {
		    			Map<String, Object> param = paramList.get(j);
		    			preparedStatement.setString( 1, new java.sql.Date(today.getTime()).toString().replaceAll("-","").substring(0, 8));
		    			preparedStatement.setString( 2, param.get("divisionCd").toString());
		    			preparedStatement.setString( 3, param.get("companyCd").toString());
		    			preparedStatement.setString( 4, param.get("shiftCd").toString() == null ? null : param.get("shiftCd").toString());
		    			preparedStatement.setString( 5, param.get("resourceCd") == null ? null : param.get("resourceCd").toString());         
		    			preparedStatement.setString( 6, param.get("shiftType") == null ? null : param.get("shiftType").toString());  
		    			preparedStatement.setString( 7, param.get("startTime") == null ? null : param.get("startTime").toString()); 
		    			preparedStatement.setString( 8, param.get("endTime") == null ? null : param.get("endTime").toString()); 
		    			if(result.get(i).get("dbType").toString().equals("ORACLE") || result.get(i).get("dbType").toString().equals("TIBERO")) {
	    				   preparedStatement.setDate(9, param.get("applyDate") == null ? null : java.sql.Date.valueOf(param.get("applyDate").toString()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(9, param.get("applyDate") == null ? null : Timestamp.valueOf(param.get("applyDate").toString()));
	    				}   
		    			preparedStatement.setString( 10, param.get("actStartTime") == null ? null : param.get("actStartTime").toString());  
		    			preparedStatement.setString( 11, param.get("actEndTime") == null ? null : param.get("actEndTime").toString());  
		    			if(param.get("workPersonCnt") != null && !param.get("workPersonCnt").toString().equals("")) {
		    				preparedStatement.setInt(12, Integer.parseInt(param.get("workPersonCnt").toString()));
		    			} else {
		    				preparedStatement.setObject(12, null);
		    			}
		    			if(param.get("workTime") != null && !param.get("workTime").toString().equals("")) {
		    				preparedStatement.setFloat(13, Float.parseFloat(param.get("workTime").toString()));
		    			} else {
		    				preparedStatement.setObject(13, null);
		    			}
		    			if(param.get("offTime") != null && !param.get("offTime").toString().equals("")) {
		    				preparedStatement.setFloat(14, Float.parseFloat(param.get("offTime").toString()));
		    			} else {
		    				preparedStatement.setObject(14, null);
		    			}
		    			if(param.get("actTime") != null && !param.get("actTime").toString().equals("")) {
		    				preparedStatement.setFloat(15, Float.parseFloat(param.get("actTime").toString()));
		    			} else {
		    				preparedStatement.setObject(15, null);
		    			}
		    			if(result.get(i).get("dbType").toString().equals("ORACLE") || result.get(i).get("dbType").toString().equals("TIBERO")) {
	    				   preparedStatement.setDate(16, new java.sql.Date(today.getTime()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(16, new Timestamp(today.getTime()));
	    				}
		    			preparedStatement.setString(17, param.get("crudFlag") == null ? null : param.get("crudFlag").toString());
		    			
		    			preparedStatement.executeUpdate();
		    		}
		    		
		    		connection.commit();
		    	} catch(Exception e){
		    		e.printStackTrace();
		    		try {
		    			connection.rollback();
		    		} catch(Exception e1) {
		    		}
		    	} finally {
		    		try {
		    			preparedStatement.close();
		    		} catch(Exception e) {
		    		}
		    		
		    		try {
		    			connection.close();
		    		} catch(Exception e) {
		    		}
		    	}
			} else if (queryId.indexOf(result.get(i).get("queryId").toString()) >= 0 && result.get(i).get("tableId").toString().indexOf("If_Erp_R_MaterialShippedSlip") >= 0 && result.get(i).get("ifFlag").toString().equals("Y")) {
				String sql = "INSERT INTO If_Erp_R_MaterialShippedSlip("
						+ " DIVISION_CD"
						+ ",MATERIAL_REQUEST_ID"
						+ ",BARCODE_ID"
	 					+ ",REQUEST_DATE"
						+ ",WORK_ORDER_ID"
						+ ",WO_QTY"
						+ ",ITEM_ID"
						+ ",SPECIFICATION"
						+ ",PARENT_ITEM_ID"
						+ ",QTY"
						+ ",FROM_LOCATRION_CD"
						+ ",TO_LOCATRION_CD"
						+ ",JOB_CODE"
						+ ",ATTRIBUTE1"
						+ ",ATTRIBUTE2"
						+ ",ATTRIBUTE3"
						+ ",ATTRIBUTE4"
						+ ",ATTRIBUTE5"
						+ ",ATTRIBUTE6"
						+ ",ATTRIBUTE7"
						+ ",ATTRIBUTE8"
						+ ",ATTRIBUTE9"
						+ ",ATTRIBUTE10"
						+ ",TRANSFER_FLAG"
						+ ",TRANSFER_DATE"
						+ ")"
						+ " VALUES("
						+ "?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",'N'"
						+ ",?"
						+ ")";
				try {
		        	preparedStatement = connection.prepareStatement(sql);
		        	for(int j = 0; j < paramList.size(); j++) {
		    			Map<String, Object> param = paramList.get(j);
		    			preparedStatement.setString( 1, param.get("divisionCd").toString());
		    			preparedStatement.setString( 2, param.get("materialRequestId") == null ? null : param.get("materialRequestId").toString());
		    			preparedStatement.setString( 3, param.get("barcodeId") == null ? null : param.get("barcodeId").toString());
	    				preparedStatement.setDate(4, param.get("requestDate") == null ? null : java.sql.Date.valueOf(param.get("requestDate").toString()));
		    			preparedStatement.setString( 5, param.get("workOrderId") == null ? null : param.get("workOrderId").toString());  
		    			preparedStatement.setFloat( 6, param.get("woQty") == null ? null : Float.parseFloat(param.get("woQty").toString())); 
		    			preparedStatement.setString( 7, param.get("itemId") == null ? null : param.get("itemId").toString());
		    			preparedStatement.setString( 8, param.get("specification") == null ? null : param.get("specification").toString());
		    			preparedStatement.setString( 9, param.get("parentItemId") == null ? null : param.get("parentItemId").toString());
		    			preparedStatement.setFloat( 10, param.get("qty") == null ? null : Float.parseFloat(param.get("qty").toString()));
		    			preparedStatement.setString( 11, param.get("fromLocationCd") == null ? null : param.get("fromLocationCd").toString());
		    			preparedStatement.setString( 12, param.get("toLocationCd") == null ? null : param.get("toLocationCd").toString());
		    			preparedStatement.setString( 13, param.get("jobCode") == null ? null : param.get("jobCode").toString());
		    			preparedStatement.setString( 14, param.get("attribute1") == null ? null : param.get("attribute1").toString());
		    			preparedStatement.setString( 15, param.get("attribute2") == null ? null : param.get("attribute2").toString());
		    			preparedStatement.setString( 16, param.get("attribute3") == null ? null : param.get("attribute3").toString());
		    			preparedStatement.setString( 17, param.get("attribute4") == null ? null : param.get("attribute4").toString());
		    			preparedStatement.setString( 18, param.get("attribute5") == null ? null : param.get("attribute5").toString());
		    			preparedStatement.setString( 19, param.get("attribute6") == null ? null : param.get("attribute6").toString());
		    			preparedStatement.setString( 20, param.get("attribute7") == null ? null : param.get("attribute7").toString());
		    			preparedStatement.setString( 21, param.get("attribute8") == null ? null : param.get("attribute8").toString());
		    			preparedStatement.setString( 22, param.get("attribute9") == null ? null : param.get("attribute9").toString());
		    			preparedStatement.setString( 23, param.get("attribute10") == null ? null : param.get("attribute10").toString());
	    				preparedStatement.setTimestamp( 24, param.get("transferDate") == null ? null : Timestamp.valueOf(param.get("transferDate").toString()));
		    			
		    			preparedStatement.executeUpdate();
		    		}
		    		
		    		connection.commit();
		    	} catch(Exception e){
		    		e.printStackTrace();
		    		try {
		    			throw new Exception("Interface Transmission Error");
					} catch (Exception e1) {
						e1.printStackTrace();
					}
		    	} finally {
		    		try {
		    			preparedStatement.close();
		    		} catch(Exception e) {
		    			e.printStackTrace();
		    		}
		    		
		    		try {
		    			connection.close();
		    		} catch(Exception e) {
		    			e.printStackTrace();
		    		}
		    	}
			} else if (queryId.indexOf(result.get(i).get("queryId").toString()) >= 0 && result.get(i).get("tableId").toString().indexOf("If_Erp_R_WorkOrder") >= 0 && result.get(i).get("ifFlag").toString().equals("Y")) {
				String sql = "INSERT INTO If_Erp_R_WorkOrder("
		        		+ "WOID"
		        		+ ",WONAME"
		        		+ ",PRODID"
		        		+ ",BOMREV"
		        		+ ",PLANQTY"
		        		+ ",UNIT"
		        		+ ",PLANSTDTTM"
		        		+ ",PLANEDDTTM"
		        		+ ",AREAID"
		        		+ ",PCSGID"
		        		+ ",CUSTPRODID"
		        		+ ",WOTYPE"
		        		+ ",PRIORITY"
		        		+ ",DELFLAG"
		        		+ ",ATTRIBUTE1"
		        		+ ",ATTRIBUTE2"
		        		+ ",IFFLAG)"
		        		+ "VALUES("
		        		+ "?"
		        		+ ",?"
		        		+ ",?"
		        		+ ",?"
		        		+ ",?"
		        		+ ",?"
		        		+ ",?"
		        		+ ",?"
		        		+ ",?"
		        		+ ",?"
		        		+ ",?"
		        		+ ",?"
		        		+ ",?"
		        		+ ",?"
		        		+ ",?"
		        		+ ",?"
		        		+ ",?"
		        		+ ")";
		        
		        try {
		        	preparedStatement = connection.prepareStatement(sql);
		        	
		    		for(int j = 0; j < paramList.size(); j++) {
		    			Map<String, Object> workOrder = paramList.get(j);
		    			
		    			preparedStatement.setString		(1,  workOrder.get("woid").toString());
		    			preparedStatement.setString		(2,  workOrder.get("woname").toString());
		    			preparedStatement.setString		(3,  workOrder.get("prodid").toString());
		    			preparedStatement.setString		(4,  workOrder.get("bomrev").toString());
		    			preparedStatement.setFloat		(5,  Float.parseFloat(workOrder.get("planqty").toString()));
		    			preparedStatement.setString		(6,  workOrder.get("unit") == null ? null : workOrder.get("unit").toString());
		    			preparedStatement.setTimestamp	(7,  java.sql.Timestamp.valueOf(workOrder.get("planstdttm").toString().substring(0, 19)));
		    			preparedStatement.setTimestamp	(8,  workOrder.get("planeddttm") == null ? null : java.sql.Timestamp.valueOf(workOrder.get("planstdttm").toString().substring(0, 19)));
		    			preparedStatement.setString		(9,  workOrder.get("areaid") == null ? null : workOrder.get("areaid").toString());
		    			preparedStatement.setString		(10, workOrder.get("pcsgid") == null ? null : workOrder.get("pcsgid").toString());
		    			preparedStatement.setString		(11, workOrder.get("custprodid") == null ? null : workOrder.get("custprodid").toString());
		    			preparedStatement.setString		(12, workOrder.get("wotype").toString());
		    			try {
		    				int priority = 9999;
		    				priority = Integer.parseInt(workOrder.get("priority").toString().trim());
		    				preparedStatement.setInt	(13, priority);
		    			} catch(Exception e1) {
		    				preparedStatement.setInt(13, 9999);
		    			}
		    			preparedStatement.setString		(14, workOrder.get("delflag").toString());
		    			preparedStatement.setString		(15, workOrder.get("divisionCd").toString());
		    			preparedStatement.setString		(16, workOrder.get("attribute2") == null ? null : workOrder.get("attribute2").toString());
		    			preparedStatement.setString		(17, workOrder.get("ifflag").toString());
		    			
		    			preparedStatement.executeUpdate();
		    		}
		    		
		    		connection.commit();
		    		
//		    		System.out.println("commit()");
		    	} catch(Exception e){
		    		e.printStackTrace();
		    		try {
		    			connection.rollback();
		    		} catch(Exception e1) {
		    		}
		    	} finally {
		    		try {
		    			preparedStatement.close();
		    		} catch(Exception e) {
		    		}
		    		
		    		try {
		    			connection.close();
		    		} catch(Exception e) {
		    		}
		    	}
			}
			
			
		}
		
		return true;
	}
}
