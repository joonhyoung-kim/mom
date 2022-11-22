package com.mom.backend.util;



import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
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
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.export.JRXlsExporterParameter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.export.Exporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsExporterConfiguration;
import net.sf.jasperreports.export.SimpleXlsReportConfiguration;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;


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
  @SuppressWarnings("deprecation")
public Map<String,Object> createReport(String fileName,String fileType,Map<String,Object> param ){
        JasperReport jasperReport;  
        JasperPrint jasperPrint;  
           
        long start = System.currentTimeMillis();  
           
        try {  
        	String jasperPath = "";
        	String filePath = "";      	
            // Log log4j configuration  
        	if(fileType.equals("pdf")) {				
				jasperPath = "\\src\\main\\resources\\static\\report-design\\"; 
				filePath = "\\src\\main\\resources\\static\\report-pdf\\";
				        		
        		//jasperPath = "\\report-design\\";
        		//filePath   = "\\report-pdf\\";
        		   
        	}
        	else {
        		jasperPath = "\\src\\main\\resources\\static\\report-design\\";
        		filePath = "\\src\\main\\resources\\static\\report-xlsx\\";
        	}
            
            System.out.println("Start");  
            System.out.println("--------");  
                           
            System.out.println("Compile Jasper XML Report");  
            //URL resource = getClass().getClassLoader().getResource("report1.jrxml");
           // String filePath = resource.getPath();
             String rootPath = System.getProperty("user.dir");
            //String rootPath = "C:\\MOM\\apache-tomcat-8.5.77\\webapps\\MOM\\WEB-INF\\classes\\static";
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
            parameters.put("reportConnection", connection);
            parameters.put("SUBREPORT_DIR", rootPath+jasperPath);
            
            System.out.println("파라미터?"+parameters); 
            System.out.println("풀패스?"+ rootPath+jasperPath+fileName+".jasper");
            jasperPrint =  JasperFillManager.fillReport(rootPath+jasperPath+fileName+".jasper", parameters, connection);
            //jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, connection);  
            System.out.println("time : " + (System.currentTimeMillis() - start)+ " ms.");  
               
            if(fileType.equals("pdf")) {
            	 JasperExportManager.exportReportToPdfFile(jasperPrint, rootPath+filePath+fileName+"."+fileType); 
            	 
            }
            else {
            	SimpleXlsxReportConfiguration configuration = new SimpleXlsxReportConfiguration();
            	configuration.setOnePagePerSheet(true);
            	configuration.setIgnoreGraphics(false);
            	File outputFile = new File(rootPath+filePath+fileName+"."+fileType);
            	ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            	     OutputStream fileOutputStream = new FileOutputStream(outputFile); 
            	    Exporter exporter = new JRXlsxExporter();
            	    exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
            	    exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(byteArrayOutputStream));
            	    exporter.setConfiguration(configuration);
            	    exporter.exportReport();
            	    byteArrayOutputStream.writeTo(fileOutputStream);
            	/*  JasperExportManager.exportReportToXmlFile(jasperPrint, rootPath+filePath+fileName+"."+fileType, true);*/
            	      System.out.println("time : " + (System.currentTimeMillis() - start)+ " ms.");  
            
       
        } 
        System.out.println("--------");  
        System.out.println("Done");
		
    }  
        catch (Exception e) {  
            e.printStackTrace();  
        }  
        return param;  
}
}
