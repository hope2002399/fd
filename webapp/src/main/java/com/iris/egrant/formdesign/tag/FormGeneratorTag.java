package com.iris.egrant.formdesign.tag;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.JspFragment;
import javax.servlet.jsp.tagext.SimpleTagSupport;

/**
 *   表单jsp 生成类
 * @author cg
 *
 */
public class FormGeneratorTag extends SimpleTagSupport {
	
	private String outPutDir ;
	
	private String jspFileName ;
	
	private static final String JSP_FILE_PAGE_INCLUDE = "<%@ page language=\"java\" contentType=\"text/html; charset=UTF-8\" pageEncoding=\"UTF-8\"%>\n<%@ include file=\"/common/common.jsp\" %>\n" ;
	
	private static final String JSP_X_PARSE = "<c:set var='xml'  value='${xmlData }' />\n<x:parse var='xmlData' xml='${xml }' scope='request' />\n";
	
	private static final String JSP_FILE_NAME_SUBFIX = ".jsp" ;
	
	private static final String MESSAGE_SCRIPT = "<script type=\"text/javascript\" type=\"text/javascript\" >alert(\"已生成%s\"); </script>";
	
	@Override
	public void doTag() throws JspException, IOException {
		JspFragment jf = this.getJspBody() ;
		StringWriter sw = new StringWriter() ;
		jf.invoke(sw);
		String str = sw.getBuffer().toString() ;
		// 
		outPutDir = outPutDir.endsWith(File.separator) ? outPutDir :  outPutDir + File.separator ;
		jspFileName = jspFileName.endsWith( JSP_FILE_NAME_SUBFIX) ? jspFileName : jspFileName + JSP_FILE_NAME_SUBFIX ;
		String tempFilePath = outPutDir + jspFileName ;
		BufferedWriter bw = new BufferedWriter(new FileWriter(tempFilePath));
		bw.write(JSP_FILE_PAGE_INCLUDE);
		bw.write(JSP_X_PARSE);
		bw.write(str.trim());
		bw.write("<script type=\"text/javascript\"> $(document).ready(function(){var formOpFlag = '${formOpFlag}' ; if (formOpFlag){ viewFormObj.processAllObj() ; } }); </script>");
		bw.flush();
		bw.close();
		//
		JspContext jc = this.getJspContext() ;
		jc.getOut().write(String.format(MESSAGE_SCRIPT ,tempFilePath));
	}

	public String getOutPutDir() {
		return outPutDir;
	}

	public void setOutPutDir(String outPutDir) {
		this.outPutDir = outPutDir;
	}

	public String getJspFileName() {
		return jspFileName;
	}

	public void setJspFileName(String jspFileName) {
		this.jspFileName = jspFileName;
	}
	
}
