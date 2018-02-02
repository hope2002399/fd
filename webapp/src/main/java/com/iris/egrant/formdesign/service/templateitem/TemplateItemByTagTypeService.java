package com.iris.egrant.formdesign.service.templateitem;

import com.alibaba.fastjson.JSONObject;
import com.iris.egrant.formdesign.model.FormItemDetail;

/**
 *   表单项业务处理类接口  
 *    各tagType各自实现
 * @author cg
 *
 */
public interface TemplateItemByTagTypeService {
	
	/**
	 *   解析属性JSON对象，并持久化
	 * @param templateId 模板ID
	 * @param JSONObject 属性对象 JSON
	 * @param jObj
	 */
	void parseAndSave(Long templateId ,JSONObject JSONObject) ;
	
	/**
	 * DB查询并展示
	 * @param templateId 模板ID
	 * @return 
	 */
	String renderItem(FormItemDetail item) ;
	
	/**
	 *  值读取时，xout
	 * @param name
	 * @return String
	 */
	String getTagValueXout(String name) ;
	
}