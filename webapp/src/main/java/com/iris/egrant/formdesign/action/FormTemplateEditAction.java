package com.iris.egrant.formdesign.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.iris.egrant.core.utils.struts.Struts2Utils;
import com.iris.egrant.formdesign.constant.FormTemplateTypeConstant;
import com.iris.egrant.formdesign.model.FormTemplate;
import com.iris.egrant.formdesign.service.template.FormTemplateService;


@Results({
	// index
	@Result(name = "index", location = "/WEB-INF/jsp/formdesign/index.jsp") ,
	// template
	@Result(name = "template-edit", location = "/WEB-INF/jsp/formdesign/template/template-edit-index.jsp") ,
 	@Result(name = "template-preview", location = "/WEB-INF/jsp/formdesign/template/template-preview.jsp") ,
	@Result(name = "template-list-all", location = "/WEB-INF/jsp/formdesign/template/template-list-all.jsp") ,
	// form 
	@Result(name = "form-edit", location = "/WEB-INF/jsp/formdesign/form/form-edit-index.jsp") ,
	@Result(name = "select-template", location = "/WEB-INF/jsp/formdesign/item/template-select.jsp") ,
	@Result(name = "form-list-all", location = "/WEB-INF/jsp/formdesign/form/form-list-all.jsp") ,
	//item
	@Result(name = "text", location = "/WEB-INF/jsp/formdesign/item/text.jsp"),  // 文本输入框
  @Result(name = "textarea", location = "/WEB-INF/jsp/formdesign/item/textarea.jsp"),  // 多行文本
  @Result(name = "span", location = "/WEB-INF/jsp/formdesign/item/span.jsp") ,
  @Result(name = "radio", location = "/WEB-INF/jsp/formdesign/item/radio.jsp") ,
  @Result(name = "checkbox", location = "/WEB-INF/jsp/formdesign/item/checkbox.jsp") ,
  @Result(name = "datepick", location = "/WEB-INF/jsp/formdesign/item/datepick.jsp") ,
  @Result(name = "select", location = "/WEB-INF/jsp/formdesign/item/select.jsp") ,
  // generate  
	@Result(name = "form-gennerate", location = "/WEB-INF/jsp/formdesign/generator/generator.jsp")
})
public class FormTemplateEditAction {
	
	@Autowired
	 private FormTemplateService  formTemplateService;
	
	/**
	 * 主页面  所有功能菜单展示
	 * @return
	 */
	@Action("/formdesign/index")
	public String index(){
		return "index";
	}
	
	
	//////////////////////模板//////////////////////
	/**
	 * 模板新增/修改页面
	 * @return
	 */
	@Action("/formdesign/template-edit")
	public String templateEdit(){
		// 操作类型
		String opFlag = Struts2Utils.getParameter("opFlag") ;
		// 
		String type = Struts2Utils.getParameter("type") ;
		// 入参检验
		if (!"add".equals(opFlag) && !"edit".equals(opFlag) ){
			Struts2Utils.renderText("参数错误！" , "encoding:UTF-8") ;
			return null;
		}
		// 
		if ("add".equals(opFlag)){ // 新增
			// do nothing
		} else if("edit".equals(opFlag)) {// 编辑
			// 查询某个
			String templateId = Struts2Utils.getParameter("templateId") ;
			Long templateIdLong  = NumberUtils.toLong(templateId) ;
			FormTemplate formTemplate  =  formTemplateService.getTemplateById(templateIdLong) ;
			Struts2Utils.getRequest().setAttribute("formTemplate",  formTemplate);
		} 
		// 返回页面
		if (FormTemplateTypeConstant.TEMPLATE.equals(type)){  // 
			return "template-edit";
		}else if ( FormTemplateTypeConstant.FORM.equals(type)){
			return "form-edit";
		}else{
			return null ;
		}
	}
	
	/**
	 *  查询所有
	 * @return
	 */
	@Action("/formdesign/template-list-all")
	public String templateListAll(){
		List<FormTemplate> allFormTemplateList =  formTemplateService.getTemplateByType(FormTemplateTypeConstant.TEMPLATE) ;
		Struts2Utils.getRequest().setAttribute("templateList",  allFormTemplateList);
		return "template-list-all";
	}
	
	
	/**
	 *  模板保存
	 * @return
	 */
	@Action("/formdesign/template-save")
	public String templateSave(){
		Map<String, String> returnMap = new HashMap<String ,String >() ;
		String templateId = Struts2Utils.getParameter("template_id") ;
		String type = Struts2Utils.getParameter("type") ;
		String templateAttrJsonStr = Struts2Utils.getParameter("template_attr") ;
		String parseTemplateJsonStr = Struts2Utils.getParameter("parse_form") ;
		if (  StringUtils.isEmpty(parseTemplateJsonStr) 
				 && ( FormTemplateTypeConstant.TEMPLATE.equals(type) || FormTemplateTypeConstant.FORM.equals(type) )
				 ){
			returnMap.put("flag", "error") ;
			returnMap.put("msg",  "参数错误！") ;
			Struts2Utils.renderJson( returnMap , "encoding:UTF-8") ;
			return null;
		}
		Long templateIdLong = NumberUtils.toLong(templateId) ;
	  Long returnTemplateIdLong = formTemplateService.templateSave( templateIdLong == 0L ? null : templateIdLong , type , templateAttrJsonStr, parseTemplateJsonStr);
	  returnMap.put("flag", "success") ;
		returnMap.put("template_id",  returnTemplateIdLong.toString()) ;
		Struts2Utils.renderJson( returnMap , "encoding:UTF-8") ;
		return null;
	}
	
	/**
	 *  模版预览
	 * @return
	 */
	@Action("/formdesign/template-preview") 
	public String templatePreview(){
		String templateId = Struts2Utils.getParameter("templateId") ;
		if (StringUtils.isBlank(templateId)  ){
			return null ;
		}
		Long templateIdLong = NumberUtils.toLong(templateId) ;
		FormTemplate formTemplate =  formTemplateService.getRenderFormTemplate(templateIdLong) ;
		Struts2Utils.getRequest().setAttribute("formTemplate", formTemplate);
		return "template-preview" ;
	}
	
	
	/**
	 *  脚本更新 
	 * @return
	 */
	@Action("/formdesign/update-script") 
	public String updateTemplateScript(){
		Map<String, String> returnMap = new HashMap<String ,String >() ;
		String templateIdStr = Struts2Utils.getParameter("template_id") ;
		String scriptJsonStr = Struts2Utils.getParameter("script_json_str") ;
		if (StringUtils.isBlank(templateIdStr) ||  StringUtils.isBlank(scriptJsonStr)){
			returnMap.put("flag", "error") ;
			returnMap.put("msg",  "参数错误！") ;
			Struts2Utils.renderJson( returnMap , "encoding:UTF-8") ;
			return null ;
		}
		Long templateIdLong =  Long.valueOf(templateIdStr) ;
    int c =  formTemplateService.updateScript(templateIdLong , scriptJsonStr);
		returnMap.put("flag", "success") ; 
		Struts2Utils.renderJson( returnMap , "encoding:UTF-8") ;
		return null;
	}
	

	/**
	 *  脚本运行 
	 * @return
	 */
	@Action("/formdesign/run-script") 
	public String runScript(){
		String templateIdStr = Struts2Utils.getParameter("template_id") ;
		String scriptJsonStr = Struts2Utils.getParameter("script_json_str") ;
		if (StringUtils.isBlank(templateIdStr) ||  StringUtils.isBlank(scriptJsonStr)){
			Struts2Utils.renderText("参数错误" , "encoding:UTF-8") ;
			return null ;
		}
		Long templateIdLong =  Long.valueOf(templateIdStr) ;
		FormTemplate formTemplate =  formTemplateService.getRenderFormTemplate(templateIdLong) ;
		 // 用前台传过来的 更新
		JSONObject o = JSON.parseObject(scriptJsonStr) ;
		formTemplate.setScript(o.getString("script")) ;
		formTemplate.setInitScript(o.getString("init_script")) ;
		formTemplate.setCheckScript(o.getString("check_script") );
		// 
		Struts2Utils.getRequest().setAttribute("formTemplate", formTemplate);		 
		return "template-preview" ;
	}
	
	
	
	
	////////////////////////////////////form  //////////////////////////////////////////////////
	
	/**
	 *  模板选择 弹窗
	 * @return
	 */
	@Action("/formdesign/select-template")
	public String selectTemplate(){ 
		List<FormTemplate> allFormTemplateList =  formTemplateService.getTemplateByType(FormTemplateTypeConstant.TEMPLATE) ;
		Struts2Utils.getRequest().setAttribute("templateList",  allFormTemplateList);
		for (FormTemplate formTemplate : allFormTemplateList) {
		//	System.out.println(formTemplate.getTemplate());
		//	System.out.println(StringEscapeUtils.escapeHtml4( formTemplate.getTemplate()));
			formTemplate.setTemplate(StringEscapeUtils.escapeHtml4( formTemplate.getTemplate())) ;
		}
		return "select-template"; 
	}
	
	
	/**
	 *  查询所有
	 * @return
	 */
	@Action("/formdesign/form-list-all")
	public String formListAll(){
		List<FormTemplate> templateList =  formTemplateService.getTemplateByType(FormTemplateTypeConstant.FORM) ;
		Struts2Utils.getRequest().setAttribute("templateList",  templateList);
		return "form-list-all";
	}
	
	///////////////////////////////gennerate//////////////////////
	
	/**
	 * jsp 生成
	 * @return
	 */
	@Action("/formdesign/form-gennerate")
	public String formGennerate(){
		String templateId = Struts2Utils.getParameter("templateId") ;
		if (StringUtils.isBlank(templateId)  ){
			Struts2Utils.renderText("参数错误！" , "encoding:UTF-8") ;
			return null ;
		}
	  Long templateIdLong = NumberUtils.toLong(templateId) ;
		FormTemplate formTemplate  =  formTemplateService.getRenderFormTemplate( templateIdLong) ; 
		Struts2Utils.getRequest().setAttribute("formTemplate", formTemplate); 
		return "form-gennerate";
	}
	
	////////////////////////////////////template item//////////////////////////////////////////////////
		@Action("/formdesign/text")
		public String textDialog(){
			return "text";
		}
		
		@Action("/formdesign/textarea")
		public String textareaDialog(){
			return "textarea";
		}
		
		@Action("/formdesign/span")
		public String spanDialog(){
			return "span";
		}
		
		@Action("/formdesign/radio")
		public String radioDialog(){
			return "radio";
		}
		
		@Action("/formdesign/checkbox")
		public String checkboxDialog(){
			return "checkbox";
		}
		
		@Action("/formdesign/datepick")
		public String datepick(){
			return "datepick";
		}
		
		@Action("/formdesign/select")
		public String select(){
			return "select";
		}
	
}
