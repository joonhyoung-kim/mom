package com.mom.util;



import java.io.File;
import java.net.URL;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
@Component
public class ReportUtil {
	  /** The connection. */ 
	//@Autowired
    private static Connection connection = null;  
   
    /** 
     * Connect database. 
     */  
    public void ConnectDatabase() {  
        try {             
            // Load the JDBC driver  
            String driverName = "oracle.jdbc.OracleDriver";  
            Class.forName(driverName);  
   
            // Create a connection to the database  
              
            String url = "jdbc:oracle:thin:@211.192.46.217:1522:ORCL19C";  
            String username = "mom_master";  
            String password = "#mom0909#";  
            connection = DriverManager.getConnection(url, username, password);  
        } catch (ClassNotFoundException e) {  
            System.err.println("Could not find the database driver");  
        } catch (Exception e) {  
            System.err.println("Could not connect to the database");  
        }  
    }   
     
        
    /** 
     * The main method. 
     *  
     * @param args the arguments 
     */  
  public Map<String,Object> createReport(String fileName,String fileType,Map<String,Object> param ){
        JasperReport jasperReport;  
        JasperPrint jasperPrint;  
           
        long start = System.currentTimeMillis();  
           
        try {  
        	String pdfJasperPath = "";
        	String pdfFilePath = "";      	
            // Log log4j configuration  
        	if(fileType.equals("pdf")) {
        	       pdfJasperPath = "\\src\\main\\resources\\static\\report-design\\";
        		   pdfFilePath = "\\src\\main\\resources\\static\\report-pdf\\";
        		   
        	}
        	else {
        		
        	}
            
            System.out.println("Start");  
            System.out.println("--------");  
                           
            System.out.println("Compile Jasper XML Report");  
            //URL resource = getClass().getClassLoader().getResource("report1.jrxml");
           // String filePath = resource.getPath();
            String rootPath = System.getProperty("user.dir");;
            System.out.println("현재 프로젝트의 경로 : "+rootPath );
            
          // jasperReport = JasperCompileManager.compileReport(filePath);  
           // jasperReport = JasperCompileManager.compileReport(rootPath+"\\src\\main\\resources\\static\\report-design\\report1.jrxml");  
           // jasperReport = JasperCompileManager.compileReport("C:\\Users\\LG\\git\\repository\\backend\\src\\main\\resources\\static\\report-design\\report1.jrxml"); 
            System.out.println("time : " + (System.currentTimeMillis() - start)+ " ms.");  
               
            System.out.println("Create Database connection");  
            ConnectDatabase();  
            System.out.println("time : " + (System.currentTimeMillis() - start)+ " ms.");  
               
            System.out.println("Create parameters");  
			
			  Map <String, Object> parameters = new HashMap<String, Object>();			 
			 
            for (Entry<String,Object> entry : param.entrySet()) {
               if(entry.getValue().toString() != null && !entry.getValue().toString().equals("")) {
            	   parameters.put(entry.getKey().toString(), entry.getValue().toString());
               }
            }   
            System.out.println("파라미터?"+parameters);  
            jasperPrint =  JasperFillManager.fillReport(rootPath+pdfJasperPath+fileName+".jasper", parameters, connection);
            //jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, connection);  
            System.out.println("time : " + (System.currentTimeMillis() - start)+ " ms.");  
               
            System.out.println("Generated PDF");  
            JasperExportManager.exportReportToPdfFile(jasperPrint, rootPath+pdfFilePath+fileName+"."+fileType);  
            System.out.println("time : " + (System.currentTimeMillis() - start)+ " ms.");  
               
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        System.out.println("--------");  
        System.out.println("Done");
		return param;  
    }  


}
