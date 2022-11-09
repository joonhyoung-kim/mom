package com.mom.backend.util.excel;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.hssf.usermodel.HSSFCell;
public class ExcelCellRef {
	/**
     * Cell에 해당하는 Column Name을 가젼온다(A,B,C..)
     * 만약 Cell이 Null이라면 int cellIndex의 값으로
     * Column Name을 가져온다.
     * @param cell
     * @param cellIndex
     * @return
     */
    public static String getName(ExcelReadOption excelReadOption, Cell cell, int cellIndex) {
        int cellNum = 0;
        if(cell != null) {
            cellNum = cell.getColumnIndex();
        }
        else {
            cellNum = cellIndex;
        }
        
        List<String> columns = excelReadOption.getOutputColumns();
        
        return columns.get(cellNum);
        //return CellReference.convertNumToColString(cellNum);
    }
    
    public static Object getValue(Cell cell) {
        if(cell == null) {
            return "";
        } else {
            if(cell.getCellType() == CellType.FORMULA) {
            	return cell.getCellFormula().trim();
            } else if( cell.getCellType() == CellType.NUMERIC ) {
            	if(DateUtil.isCellDateFormatted(cell)) {
    				Date date = cell.getDateCellValue();
    				return new SimpleDateFormat("yyyy-MM-dd").format(date);
    			} else {
    				/*String value = String.valueOf(cell.getNumericCellValue()).trim();
    				if(value.length() > 2 && value.substring(value.length()-2).equals(".0")) {
    					System.out.println("CELL_TYPE_NUMERIC 1 = " + value.substring(0, value.length()-2));
    					return value.substring(0, value.length()-2);
    				}*/
    				/*
    				if(cell.getNumericCellValue() == 0.0) {
    					return "";
    				}*/
    				
//    				String tmp = Double.toString(cell.getNumericCellValue());
//    				if(tmp.length() > 2 && tmp.substring(tmp.length()-2).equals(".0")) {
//    					return tmp.substring(0, tmp.length()-2);
//    				}
    				// 지수형태나 소수점 붙는 부분 제거 변환
    				NumberFormat f = NumberFormat.getInstance();
    				f.setMaximumFractionDigits(10); //소수점 최대 10자리까지 입력 
    				f.setGroupingUsed(false);
//    				System.out.println("f.format(tmp)........" + f.format(cell.getNumericCellValue()));
    				return f.format(cell.getNumericCellValue());
//    				return cell.getNumericCellValue();
    			}
            } else if(cell.getCellType() == CellType.STRING ) {
    			return cell.getStringCellValue().trim();
            } else if(cell.getCellType() == CellType.BOOLEAN ) {
            	return cell.getBooleanCellValue() + "";
            } else if(cell.getCellType() == CellType.ERROR ) {
            	return cell.getErrorCellValue() + "";
            } else if(cell.getCellType() == CellType.BLANK ) {
            	return "";
            } else {
            	return cell.getStringCellValue().trim();
            }
        }
    }
}
