<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- <%@ include file="/common/common.jsp" %> --%>
<%@ taglib uri="/WEB-INF/tld/iris-form.tld" prefix="irisform"%>
<irisform:generator outPutDir='/iriswork/egrant-form-design/webapp/src/main/webapp/WEB-INF/form-auto-gen'  jspFileName="proposal-form-${formTemplate.id }.jsp" >
	 <jsp:include page="../template/template-include-view.jsp"  /> 
</irisform:generator>