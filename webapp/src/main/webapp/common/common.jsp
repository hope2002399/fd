<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/WEB-INF/tld/iris-form.tld" prefix="irisform"%>
<c:set var="res_fd" value="/resfd" />
<!-- css -->
 	 <link href="${res_fd }/css/bootstrap/css/bootstrap.css?2023" rel="stylesheet" type="text/css" />
 	 <link href="${res_fd }/app-css/wbox.css" rel="stylesheet" type="text/css" />
	 <link href="${res_fd }/app-css/datepick.css" rel="stylesheet" type="text/css" />
	 <link href="${res_fd }/app-css/datepick.css" rel="stylesheet" type="text/css" />
	 <!--  public -->
	 <link href="${res_fd }/app-css/public/public.css" rel="stylesheet" type="text/css" />
<!-- js -->	 
	<script type="text/javascript" charset="utf-8" src="${res_fd }/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="${res_fd }/app-js/message.tips-zh_CN.js"></script>
	<script type="text/javascript" charset="utf-8" src="${res_fd }/app-js/wbox.js"></script>
	<script type="text/javascript" charset="utf-8" src="${res_fd }/app-js/jquery.validate.js"></script>
	<script type="text/javascript" charset="utf-8" src="${res_fd }/app-js/public.js"></script>
	<script type="text/javascript" charset="utf-8" src="${res_fd }/app-js/irisvalidator.js"></script>
	<script type="text/javascript" charset="utf-8" src="${res_fd }/app-js/irisPrpPrepare.js"></script>
	<script type="text/javascript" charset="utf-8" src="${res_fd }/app-js/jquery.datepick.js"></script>
	<script type="text/javascript" charset="utf-8" src="${res_fd }/app-js/jquery.datepick-zh_CN.js"></script>
	<script type="text/javascript" charset="utf-8" src="${res_fd }/app-js/viewForm.js"></script>