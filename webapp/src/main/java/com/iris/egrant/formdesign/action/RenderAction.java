package com.iris.egrant.formdesign.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import com.iris.egrant.core.utils.struts.Struts2Utils;
import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;

@Results({
	@Result(name = "test1", type="freemarker", location = "/WEB-INF/freemarker/test1.ftl") ,
	@Result(name = "test2", location = "/WEB-INF/freemarker/test2.jsp")  ,
	
	//////////////////////////////
	@Result(name = "render", location = "/WEB-INF/jsp/formdesign/render/render.jsp")  
	
})
public class RenderAction {
	
	private String xmlData = "<data><proposal><zh_title>1205项目名称测试</zh_title></proposal></data>" ;
	
	@Action("/ftl/test1")
	public String test(){
		Struts2Utils.getRequest().setAttribute("xmlData", xmlData);
		return "test1";
	}
	
 	@Autowired
	private Configuration configuration; 
	
	@Action("/ftl/test2")
	public String test2() throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException{
		 // Struts2Utils.getRequest().setAttribute("xmlData", xmlData);
		Template t = configuration.getTemplate("test1.ftl" ,  "utf-8") ;
		PrintWriter out = new PrintWriter(System.out) ;
		Map<String , String> m = new HashMap<String ,String>() ; 
		m.put("html", "<a>链接${str_key}</a>") ;
		m.put("str_key", "str_value") ;
		t.process(m , out); 
		return "test2";
	}

	public String getXmlData() {
		return xmlData;
	}

	public void setXmlData(String xmlData) {
		this.xmlData = xmlData;
	}
	
	
	//**************************预览页面****************************
	
	/*@Autowired
	 private FormTemplateService formTemplateService ;
	
	@Action("/formpreview/preview-template")
	public String render(){
		String templateId = Struts2Utils.getParameter("template_id") ;
		if (StringUtils.isBlank(templateId)  ){
			
			return null ;
		}
		Long templateIdLong = NumberUtils.toLong(templateId) ;
		FormTemplate formTemplate =  formTemplateService.getRenderFormTemplate(templateIdLong) ;
		Struts2Utils.getRequest().setAttribute("formTemplate", formTemplate);
		return "render" ;
	}
	*/
}