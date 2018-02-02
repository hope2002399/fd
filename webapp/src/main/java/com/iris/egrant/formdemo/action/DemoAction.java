package com.iris.egrant.formdemo.action;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.math.NumberUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.iris.egrant.core.utils.struts.Struts2Utils;
import com.iris.egrant.formdemo.model.Proposal;
import com.iris.egrant.formdemo.service.ProposalService;

/**
 *   表单 使用demo
 * @author cg
 *
 */

@Results({
	// index
	@Result(name = "to-add", location = "/${jspFilePath}") ,
	@Result(name = "demo-list-all", location = "/WEB-INF/jsp/formdemo/demo-list-all.jsp") ,
	@Result(name = "to-edit", location = "/${jspFilePath}") 
	})
public class DemoAction {
	
	@Autowired
	private ProposalService proposalService ;
	
	private static final String JSP_BASE_PATH = "/WEB-INF/form-auto-gen/";
	
	private String jspFilePath = JSP_BASE_PATH + "proposal-form-64.jsp" ;
	
	
	/**
	 *  新增
	 * @return
	 */
	@Action("/formdemo/to-add")
	public String toAdd(){
		//xmlData
		String xmlData =  "<data><proposal><zh_title></zh_title></proposal><organization><org_name>爱瑞思测试单位</org_name></organization></data>" ; //  "<data></data>" ; //
		Struts2Utils.getRequest().setAttribute("xmlData", xmlData);
		return  "to-add";
	}
	
	/**
	 *   查询所有
	 * @return
	 */
	@Action("/formdemo/demo-list-all")
	public String demoListAll(){
	  Struts2Utils.getRequest().setAttribute("proposalList", proposalService.getProposalAll());
		return  "demo-list-all";
	}
	
	/**
	 *  编辑
	 * @return
	 */
	@Action("/formdemo/to-edit")
	public String toEdit(){
		String keyCodeStr = Struts2Utils.getParameter("keyCode") ; 
		Long keyCodeLong = 	NumberUtils.toLong(keyCodeStr) ;
		Proposal p = proposalService.getProposalById(keyCodeLong) ;
	  Struts2Utils.getRequest().setAttribute("xmlData",  p.getXml());
	  Struts2Utils.getRequest().setAttribute("keyCode",  p.getPrpCode());
		return  "to-edit";
	}
	
	/**
	 *  编辑
	 * @return
	 */
	@Action("/formdemo/to-view")
	public String toView(){
		String keyCodeStr = Struts2Utils.getParameter("keyCode") ; 
		Long keyCodeLong = 	NumberUtils.toLong(keyCodeStr) ;
		Proposal p = proposalService.getProposalById(keyCodeLong) ;
	  Struts2Utils.getRequest().setAttribute("xmlData",  p.getXml());
	  Struts2Utils.getRequest().setAttribute("keyCode",  p.getPrpCode());
	  Struts2Utils.getRequest().setAttribute("formOpFlag",  true );
		return  "to-edit";
	}
	
	/**
	 * ajax 保存
	 * @return
	 */
	@Action("/formdemo/do-save")
	public String doSaveForm(){
		String keyCodeStr = Struts2Utils.getParameter("keyCode") ; 
		String xmlData = Struts2Utils.getParameter("xmlData") ; 
		Long keyCodeLong = 	NumberUtils.toLong(keyCodeStr) ;
		Long KeyCodeReturn = proposalService.saveProposal(keyCodeLong, xmlData) ;
		Map<String, String> map = new HashMap<>();
		map.put("flag", "success") ;
		map.put("keyCode",  KeyCodeReturn.toString()) ;
		Struts2Utils.renderJson(map ,"encoding:UTF-8" );
		return  null ;
	}
	
	public String getJspFilePath() {
		return jspFilePath;
	}

	public void setJspFilePath(String jspFilePath) {
		this.jspFilePath = jspFilePath;
	}
	
}
