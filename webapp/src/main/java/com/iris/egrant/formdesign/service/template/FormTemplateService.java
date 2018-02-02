package com.iris.egrant.formdesign.service.template;

import java.util.List;

import com.iris.egrant.formdesign.model.FormItemDetail;
import com.iris.egrant.formdesign.model.FormTemplate;

/**
 *   模板操作service
 * @author iris
 *
 */
public interface FormTemplateService  {
	
	/**
	 *   模板保存
	 * @param templateId 模板id，为null时，新增操作
	 * @param  type,类型template or form 
	 * @param parseFormStr 表单Json字符串{ template : '' , template_parse : '' , attr_obj_arr : '' }
	 * @param templateAttr 模版属性json字符串 { name : '' , init_script : '' , check_script : '' }
	 * @return templateid  templateId
	 */
	Long templateSave(Long templateId ,String type,  String templateAttr, String parseFormStr) ;

	/**
	 *   根据类型 查询所有的模版
	 * @return
	 */
	List<FormTemplate> getTemplateByType(String type);

	/**
	 *   根据id 查询单个模版
	 * @param templateIdLong
	 * @return
	 */
	FormTemplate getTemplateById(Long templateId);

	/**
	 *  得到template解析后完整的html 供客户端渲染
	 * @param templateId 主健
	 * @return 解析后 FormTemplate
	 */
	FormTemplate getRenderFormTemplate(Long templateId);
	
	/**
	 *    获取表单项
	 * @param templateId 模板id
	 * @return
	 */
	List<FormItemDetail> getItemAsc(Long templateId);

	/**
	 *   更新脚本
	 * @param templateIdLong
	 * @param scriptJsonStr
	 */
	int updateScript(Long templateId, String scriptJsonStr);
}
