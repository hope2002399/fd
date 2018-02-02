<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	 <title>表单</title>
</head>
<body  class="bdbg"> 
	<%  // 公用界面 ，预览效果与生成jsp都引入了此页面
	   // template-preview.jsp（携带参数previewFlag=true）、generator.jsp使用<jsp:include>引入了此页面
	%>
	<div align="center" style="margin-top: 20px;">
		<input type="button" class="btn btn-navbar" onclick="check();" id="check-btn" value="填写检查" />
		<c:if test="${param.previewFlag ne true}">   <%  // 预览页面无需展示保存按钮 	%>
			<input type="button"  class="btn btn-navbar" onclick="demoSave();" value="保存" />
		</c:if>
	</div>
	<% // 隐藏域 记录template_id %>
	<input type="hidden" name="template_id" id="template_id" value="${formTemplate.id }" />
	 
	  <div  id="content" class="w990">	 
	  	<div class="w990 po_r"> 
				<div class="report_tx txt" style="border: 1px #e4e4e4 solid;background: #fff;padding: 0px 30px 30px 30px;margin-top: 5px;">	
			 	  <% // c:out展示字段解析后的内容 %>
		  	  <c:out value="${formTemplate.templateParse }" escapeXml="false"/>
				</div>
			</div>
		</div>
	
	<script id="script" type="text/javascript" type="text/javascript" >
	 var locale = "zh_CN" ;
		// 脚本定义
    ${formTemplate.script }
	</script>
	<script id="initScript" type="text/javascript">
			$(document).ready(function(){
			  ${formTemplate.initScript }   
			});
	</script>
	<script id="checkScript" type="text/javascript">
		function check(){
	   ${formTemplate.checkScript }  
	    // 
	   if(!valResult()){
			irisValShowMsg($("#wbox1"));
			return false;
		  }
		 showBox($("#wbox1"), "300px", "200px", "检查通过","1:所有检查全部合格");
		 return true;
		}
	</script>
</body>
</html>