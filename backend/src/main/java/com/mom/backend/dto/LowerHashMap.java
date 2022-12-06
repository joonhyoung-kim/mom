package com.mom.backend.dto;

import java.util.HashMap;

import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.stereotype.Component;
@Component
public class LowerHashMap extends HashMap {
    private static final long serialVersionUID = -7700790403928325865L;

    @SuppressWarnings("unchecked")
    @Override
    public Object put(Object key, Object value) {
        return super.put(JdbcUtils.convertUnderscoreNameToPropertyName((String) key), value);
    }
}