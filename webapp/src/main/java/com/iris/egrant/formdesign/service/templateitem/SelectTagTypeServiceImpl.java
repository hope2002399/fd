package com.iris.egrant.formdesign.service.templateitem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.iris.egrant.formdesign.model.FormItemDetail;
 
/**
 *   select 处理类
 *    tagtype = select
 * @author cg
 *
 */
@Service("selectTagTypeService")
@Transactional(rollbackFor = Exception.class )
public class SelectTagTypeServiceImpl extends AbstractCommonService  implements TemplateItemByTagTypeService {

	@Override
	public void parseAndSave(Long templateId , JSONObject JSONObject) {
		// 关键字段拆分
		FormItemDetail fid = new FormItemDetail() ;
		fid.setTemplateId(templateId);
		fid.setTagType(JSONObject.getString("tagtype"));
		fid.setTagName(JSONObject.getString("tagname"));
		fid.setTagId(JSONObject.getString("tagid"));
		String tagkey = JSONObject.getString("tagkey") ;
		String tagstyle = JSONObject.getString("tagstyle") ;
		String tagonchange = JSONObject.getString("tagonchange") ;
		fid.setTagLabel(JSONObject.getString("taglabel"));
		fid.setTagClass(JSONObject.getString("tagclass"));
		// 其他属性合并到 other字段
		String  otherAttrJsonStr  =	JSONObject.getString("tagotherattrs") ;
		if (StringUtils.isBlank(otherAttrJsonStr)){
			otherAttrJsonStr = "{}" ;
		}
		JSONObject o = JSON.parseObject(otherAttrJsonStr);
		o.put("key", tagkey) ;
		o.put("style", tagstyle) ;
		o.put("onchange", tagonchange) ;
		fid.setTagOtherAttrs(o.toJSONString());
		formItemDetailHibernateDao.save(fid);
	}

	@SuppressWarnings("unchecked")
	@Override
	public String renderItem(FormItemDetail formItem) {
		//other 拿到key
		String tagOtherJsonStr = formItem.getTagOtherAttrs() ;
		Map<String,String> m = new HashMap<String,String>() ;
		if( StringUtils.isNotBlank(tagOtherJsonStr) ) {
			 m = JSON.parseObject(tagOtherJsonStr, Map.class) ;
		 }
		String onchange = "javascript: publicjs.selectChange(this) ;" ;
		// other 先遍历拼接字符串  值作用于各选项
		StringBuilder otherSb = new StringBuilder(" ") ;
		for (Entry<String, String> entry : m.entrySet()) {
			String k = entry.getKey().replace("tag", " ") ;
			String v = entry.getValue() ; // TODO 字符实体替换
			if ("onchange".equals( k )){
				v = v.endsWith(";") ? v  : (v + ";" );
				onchange = onchange + v;
			}else{
				otherSb.append( k + "=\"" + v + "\" ") ;
			}
		}
		
		// key 用于查询数据库配置的可选项
		String tagKey = m.get("key") ; 
		// 模拟数据库查询
		List<Map<String, String>> listMap = getListMap(tagKey);
		// 遍历 //拼接
		StringBuilder sb = new StringBuilder() ;
		String tagId = formItem.getTagId() ;
		String tagName = formItem.getTagName();
		String preSelectValue = "01" ;
		String preSelectName = "人才引育类" ;
		sb.append("<div style=\"display:inline;\" id=\"dyn_select_div_" + tagKey + "\">");  // 最外层的div
	
		//select
		sb.append("<select  ") ;
		sb.append(" id=\"" + tagId + "\"") ;
		sb.append(" name=\"" + tagName + "\"") ;
		sb.append(" onchange=\"" + onchange + "\"") ;
		sb.append(otherSb.toString()) ;
		sb.append(" >") ; 
		//各选项
		for (Map<String, String> map : listMap) {
			String code = map.get("code") ;
			String name = map.get("name") ;
			sb.append("<option  ") ;
			// TODO暂写  默认选中逻辑
			if (code.equals(preSelectValue)){  
				sb.append( " selected = 'selected' ") ;  
			}
			sb.append(" value=\"" + code + "\"") ;
			sb.append(" label=\"" + name + "\"") ;
			sb.append(" >") ; 
			sb.append(name) ; 
			sb.append("</option>") ; 
		}
		sb.append("</select>") ;
		// value 隐藏域
		String hiddenValueName = tagName  + "_value"  ;
		sb.append("<input type=\"hidden\" ") ;
		sb.append(" id=\"" + tagId  + "_value" + "\"") ;
		sb.append(" name=\"" +  hiddenValueName + "\"") ;
		sb.append(" class=\"" + formItem.getTagClass()  + "\"") ;
		sb.append(" label=\"" + formItem.getTagLabel() + "\"");
		sb.append(" value=\"" + super.getTagValueXout(hiddenValueName)  + "\"") ;
		sb.append(" />");
		// name 隐藏域
		String hiddenNameName = tagName  + "_name"  ;
		sb.append("<input type=\"hidden\" ") ;
		sb.append(" id=\"" + tagId  + "_name" + "\"") ;
		sb.append(" name=\"" + hiddenNameName + "\"") ;
		/*sb.append(" class=\"" + item.getTagClass()  + "\"") ;*/
		sb.append(" value=\"" + super.getTagValueXout(hiddenNameName)  + "\"") ;
		sb.append(" />");
		sb.append("</div>");
		return sb.toString() ; 
	}
	
	private List<Map<String, String>> getListMap(String key){
		List<Map<String, String>> listMap = new ArrayList<Map<String ,String>>();
		
		Map<String ,String> m1 = new HashMap<String ,String>() ;
		m1.put("code", "01");
		m1.put("name", "人才引育类");
		listMap.add(m1);
		
		Map<String ,String> m2 = new HashMap<String ,String>() ;
		m2.put("code", "02");
		m2.put("name", "科技创新类");
		listMap.add(m2);
		
		Map<String ,String> m3 = new HashMap<String ,String>() ;
		m3.put("code", "03");
		m3.put("name", "产业投资类");
		listMap.add(m3);
		
		return listMap ;
	}
}
