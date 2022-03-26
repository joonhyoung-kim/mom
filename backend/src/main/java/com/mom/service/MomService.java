package com.mom.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
//@RequiredArgsConstructor
@Service 
public interface MomService {
	public List<Map<String,Object>> getMapList(String query, Map<String,Object> param);
	public List<Map<String,Object>> createMapList(String query, List<Map<String,Object>> param);
	public List<Map<String,Object>> modifyMapList(String query, List<Map<String,Object>> param);
	public List<Map<String,Object>> removeMapList(String query, List<Map<String,Object>> param);
}
