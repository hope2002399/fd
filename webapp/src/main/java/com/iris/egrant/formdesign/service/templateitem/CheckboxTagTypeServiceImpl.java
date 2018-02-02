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
 *   radio 处理类
 *    tagtype = checkbox
 * @author cg
 *
 */
@Service("checkboxTagTypeService")
@Transactional(rollbackFor = Exception.class )
public class CheckboxTagTypeServiceImpl extends AbstractCommonService implements TemplateItemByTagTypeService {
	
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
		String tagkey = JSONObject.getString("tagkey") ;
		String  otherAttrJsonStr  =	JSONObject.getString("tagotherattrs") ;
		if (StringUtils.isBlank(otherAttrJsonStr)){
			otherAttrJsonStr = "{}" ;
		}
		JSONObject o = JSON.parseObject(otherAttrJsonStr);
		o.put("style", tagstyle) ;
	  o.put("key", tagkey) ;
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
		// other 先遍历拼接字符串  值作用于各选项
		StringBuilder otherSb = new StringBuilder() ;
		for (Entry<String, String> entry : m.entrySet()) {
			String k = entry.getKey() ;
			String v = entry.getValue() ; // TODO 字符实体替换
			otherSb.append( k.replace("tag", " ") + "=\"" + v + "\" ") ;
		}
		// key 用于查询数据库配置的可选项
		String tagKey = m.get("key") ; 
		// 模拟数据库查询
		List<Map<String, String>> listMap = getListMap(tagKey);
		// 遍历 //拼接
		StringBuilder sb = new StringBuilder() ;
		String tagId = formItem.getTagId() ;
		String tagName = formItem.getTagName();
		String preSelectValue = "" ; //"01,02" ;
		String preSelectName = "物联网和云计算,节能环保产业" ;
		sb.append("<div style=\"display:inline;\" id=\"dyn_checkbox_div_" + tagKey + "\">");  // 最外层的div
		String labelClick = "javascript: publicjs.checkboxClick(this) ;" ;
		//
		//各选项
		for (Map<String, String> map : listMap) {
			String code = map.get("code") ;
			String name = map.get("name") ;
			sb.append("<label style=\"display:inline;\"   >") ;  // 包裹radio的label
			sb.append("<input type=\"checkbox\" onclick=\"" +  labelClick  + "\" ") ;
			// TODO暂写  默认选中逻辑
			if (("," + preSelectValue + ",").indexOf(code) > -1){  
				sb.append( " checked=\"checked\" ") ;  //
			}
			// id = item.getTagId() + "_" +code 
			sb.append(" id=\"" + tagId + "_" +code + "\"") ;
			// name
			sb.append(" name=\"" + tagName + "\"") ;
			// label
			sb.append(" label=\"" + name + "\"") ;
			// value
			sb.append(" value=\"" + code + "\" ") ;  
			sb.append(otherSb.toString()) ; // 其他属性
			sb.append(" />") ;
			sb.append( "&nbsp;" + name ) ;
			sb.append("</label>&nbsp;&nbsp;&nbsp;") ;
		}
		// value 隐藏域
		String hiddenValueName = tagName  + "_value"  ;
		sb.append("<input type=\"hidden\" ") ;
		sb.append(" id=\"" + tagId  + "_value" + "\"") ;
		sb.append(" name=\"" + hiddenValueName + "\"") ;
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
		m1.put("name", "物联网和云计算");
		listMap.add(m1);
		
		Map<String ,String> m2 = new HashMap<String ,String>() ;
		m2.put("code", "02");
		m2.put("name", "节能环保产业");
		listMap.add(m2);
		
		Map<String ,String> m3 = new HashMap<String ,String>() ;
		m3.put("code", "03");
		m3.put("name", "软件和服务外包");
		listMap.add(m3);
		
		Map<String ,String> m4 = new HashMap<String ,String>() ;
		m4.put("code", "04");
		m4.put("name", "生物产业");
		listMap.add(m4);
		
		Map<String ,String> m5 = new HashMap<String ,String>() ;
		m5.put("code", "05");
		m5.put("name", "新能源和新能源汽车");
		listMap.add(m5);
		
		Map<String ,String> m6 = new HashMap<String ,String>() ;
		m6.put("code", "06");
		m6.put("name", "装备制造业");
		listMap.add(m6);
		
		return listMap ;
	}
}
