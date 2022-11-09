package com.mom.backend.util;

import java.lang.management.ManagementFactory;
import java.lang.management.OperatingSystemMXBean;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

public class Monitor {
	public static String getCPUTime() {
		OperatingSystemMXBean operatingSystemMXBean = ManagementFactory.getOperatingSystemMXBean();
		for (Method method : operatingSystemMXBean.getClass().getDeclaredMethods()) {
			method.setAccessible(true);
			if (method.getName().startsWith("get") && Modifier.isPublic(method.getModifiers())) {
	            Object value;
		        try {
		            value = method.invoke(operatingSystemMXBean);
		        } catch (Exception e) {
		            value = e;
		        }
	    
		        if(method.getName().equals("getProcessCpuTime")) {
		        	try {
		        		if(value.toString().length() > 9) {
		        			return (Integer.parseInt(value.toString().substring(0, value.toString().length() - 9)) / 10.0) + " G";
		        		} else {
		        			return "0 G";
		        		}
		        	} catch (Exception e) {
		        		return "0 G";
		        	}
		        }
			}
		} 
	  
		return "0 G";
	}
}
