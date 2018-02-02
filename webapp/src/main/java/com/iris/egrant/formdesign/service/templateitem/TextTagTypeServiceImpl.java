package com.iris.egrant.formdesign.service.templateitem;
 
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import com.alibaba.fastjson.JSON;
import com.iris.egrant.formdesign.model.FormItemDetail;
 
/**
 *   文本输入框 处理类
 *    tagtype = text
 * @author cg
 *
 */
@Service("textTagTypeService")
public class TextTagTypeServiceImpl  extends AbstractCommonService implements TemplateItemByTagTypeService {

	@SuppressWarnings("unchecked")
	@Override
	public String renderItem(FormItemDetail formItem)  { 
		/* // ftl
		String ftlName = "text.ftl" ; 
		 // 所需参数map
		Map<String, Object> map;
		// bean属性map
		try {
			map = BeanUtils.describe(item);
		} catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} 
		//tagOtherJsonStr
		String tagOtherJsonStr = item.getTagOtherAttrs() ;
	  if( StringUtils.isNotBlank(tagOtherJsonStr) ) {
		  map.putAll(JSON.parseObject(tagOtherJsonStr, Map.class)) ;
	  	}
		// 其他业务参数 可调用对应service类返回结果   再map.put(k,v) ;
		// TODO
		return	super.freemarkerRender( ftlName , map ) ;*/

		//拼接
		StringBuilder sb = new StringBuilder() ;
		sb.append("<input type=\"text\"   ") ;
		sb.append(" label=\"" + formItem.getTagLabel() + "\"") ;
		sb.append(" name=\"" + formItem.getTagName() + "\"") ;
		sb.append(" id=\"" + formItem.getTagId() + "\"") ;
		sb.append(" class=\"" + formItem.getTagClass()  + "\"") ;
		// value
		sb.append(" value=\"" +  super.getTagValueXout(formItem.getTagName()) + "\" ") ; 
		// other
		Map<String,String> m = new HashMap<String,String>() ;
		String tagOtherJsonStr = formItem.getTagOtherAttrs() ;
		if( StringUtils.isNotBlank(tagOtherJsonStr) ) {
			 m = JSON.parseObject(tagOtherJsonStr, Map.class) ;
		 }
		// 遍历
		for (Entry<String, String> entry : m.entrySet()) {
			String k =  entry.getKey() ;
			String v = entry.getValue() ; // TODO 字符实体替换
			sb.append( k.replace("tag", "") + "=\"" + v + "\" ") ;
		}
		sb.append(" />") ;
		return sb.toString() ; 
	}
}
