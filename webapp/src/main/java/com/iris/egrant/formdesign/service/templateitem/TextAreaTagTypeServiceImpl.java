package com.iris.egrant.formdesign.service.templateitem;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.iris.egrant.formdesign.model.FormItemDetail;


/**
 *  多行文本框 实现类
 *  tagtype = textarea
 * @author cg
 *
 */
@Service("textareaTagTypeService")
@Transactional(rollbackFor = Exception.class )
public class TextAreaTagTypeServiceImpl extends AbstractCommonService implements TemplateItemByTagTypeService {

	@SuppressWarnings("unchecked")
	@Override
	public String renderItem(FormItemDetail formItem) {

		//拼接 formItem属性
		StringBuilder sb = new StringBuilder() ;
		sb.append("<textarea ") ;
		sb.append(" label=\"" + formItem.getTagLabel() + "\"") ;
		sb.append(" name=\"" + formItem.getTagName() + "\"") ;
		sb.append(" id=\"" + formItem.getTagId() + "\"") ;
		sb.append(" class=\"" + formItem.getTagClass()  + "\"") ;
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
		// text
		sb.append(">") ; 
		// TODO 值读取逻辑
		sb.append(super.getTagValueXout(formItem.getTagName()));
		sb.append("</textarea>") ;
		// textarea的隐藏域
		String hiddenInputName = formItem.getTagName()+ "_hidden";
		String hiddenInputID = formItem.getTagId()+ "_hidden";
		sb.append("<input type=\"hidden\"    ") ;
		sb.append(" name=\"" + hiddenInputName + "\"") ;
		sb.append(" id=\"" + hiddenInputID + "\"") ;
		sb.append(" value=\"" + super.getTagValueXout(hiddenInputName) + "\"") ; 
		sb.append(" />");
		return sb.toString() ; 
	}

}
