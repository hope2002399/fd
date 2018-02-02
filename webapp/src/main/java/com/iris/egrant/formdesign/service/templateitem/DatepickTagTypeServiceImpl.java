package com.iris.egrant.formdesign.service.templateitem;
 
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.iris.egrant.formdesign.model.FormItemDetail;
 
/**
 *  日期选择  处理类
 *    tagtype = datepick
 * @author cg
 *
 */
@Service("datepickTagTypeService")
public class DatepickTagTypeServiceImpl  extends AbstractCommonService implements TemplateItemByTagTypeService {
	
	@Override
	@Transactional(rollbackFor = Exception.class )
	public void parseAndSave(Long templateId , JSONObject JSONObject) {
		// 关键字段拆分
		FormItemDetail fid = new FormItemDetail() ;
		fid.setTemplateId(templateId);
		fid.setTagType(JSONObject.getString("tagtype"));
		fid.setTagLabel(JSONObject.getString("taglabel"));
		fid.setTagName(JSONObject.getString("tagname"));
		fid.setTagId(JSONObject.getString("tagid"));
		fid.setTagClass(JSONObject.getString("tagclass"));
		// 其他属性合并到 other字段
		String tagstyle = JSONObject.getString("tagstyle") ;
		String tagonselected = JSONObject.getString("tagonselected") ;
		String tagonchange = JSONObject.getString("tagonchange") ;
		/*String  otherAttrJsonStr  =	JSONObject.getString("tagotherattrs") ;
		if (StringUtils.isBlank(otherAttrJsonStr)){
			otherAttrJsonStr = "{}" ;
		}*/
		String  otherAttrJsonStr  = "{}" ;
		JSONObject  o  = JSON.parseObject(otherAttrJsonStr);
		o.put("style", tagstyle) ;
		o.put("onselected", tagonselected) ;
		o.put("onchange", tagonchange) ;
		fid.setTagOtherAttrs(o.toJSONString());
	 formItemDetailHibernateDao.save(fid);
	}

	@SuppressWarnings("unchecked")
	@Override
	public String renderItem(FormItemDetail formItem)  { 
		 // ftl
		String ftlName = "datepick.ftl" ; 
		 // 所需参数map
		Map<String, Object> map =  new HashMap<>();
		// bean属性map 弃用BeanUtils.describe(Object)
	  map.put("id", formItem.getTagId()) ;
	  map.put("type", formItem.getTagType()) ;
	  map.put("label", formItem.getTagLabel()) ; 
	  map.put("name", formItem.getTagName()) ; 
	  map.put("value", super.getTagValueXout(formItem.getTagName())) ; 
	  // null 防守
	  map.put("class", formItem.getTagClass() == null ? "" :  formItem.getTagClass()  ) ;  
		//tagOtherJsonStr
		String tagOtherJsonStr = formItem.getTagOtherAttrs() ;
	  if( StringUtils.isNotBlank(tagOtherJsonStr) ) {
		  map.putAll(JSON.parseObject(tagOtherJsonStr, Map.class)) ;
	  	}
	  // null 防守
	  if(!map.containsKey("style")){
		  map.put("style", null) ;
	  }   
	 if(!map.containsKey("onselected") || "".equals(ObjectUtils.toString( map.get("onselected")))){
		  map.put("onselected", "null") ;
	  } 
	 if(!map.containsKey("onchange")){
		  map.put("onchange", null) ;
	  } 
	 return	super.freemarkerRender( ftlName , map ) ;
	}
}
