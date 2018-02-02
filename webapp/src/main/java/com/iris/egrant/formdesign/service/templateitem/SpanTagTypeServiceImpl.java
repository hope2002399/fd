package com.iris.egrant.formdesign.service.templateitem;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.iris.egrant.formdesign.model.FormItemDetail;
 
/**
 *   span 处理类
 *    tagtype = span
 * @author cg
 *
 */
@Service("spanTagTypeService")
@Transactional(rollbackFor = Exception.class )
public class SpanTagTypeServiceImpl extends AbstractCommonService  implements TemplateItemByTagTypeService {

	@Override
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
/*		String tagmaxlength = JSONObject.getString("tagmaxlength") ;
*/		String  otherAttrJsonStr  =	JSONObject.getString("tagotherattrs") ;
		if (StringUtils.isBlank(otherAttrJsonStr)){
			otherAttrJsonStr = "{}" ;
		}
		JSONObject  o  = JSON.parseObject(otherAttrJsonStr);
		o.put("style", tagstyle) ;
	// o.put("tagmaxlength", tagmaxlength) ;
		fid.setTagOtherAttrs(o.toJSONString());
		formItemDetailHibernateDao.save(fid);
	}

	@SuppressWarnings("unchecked")
	@Override
	public String renderItem(FormItemDetail formItem) { 
				//拼接 formItem属性
				StringBuilder sb = new StringBuilder() ;
				sb.append("<span ") ;
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
				sb.append(super.getTagValueXout(formItem.getTagName()));
				sb.append(" </span>") ;
				return sb.toString() ; 
	}
}
