<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <link href="${res_fd }/css/bootstrap/css/bootstrap.css?2023" rel="stylesheet" type="text/css" />
 <title>表单设计</title>
</head>
<body>
			<br />
			<br />
			<ul>
				<li class="nav-header">模版设计</li>
				<li><a href="javascript:window.location.href='template-edit?type=template&opFlag=add';"  class="btn btn-link">新增</a></li>
				<li><a href="javascript:window.location.href='template-list-all';"  class="btn btn-link">查询/修改</a></li>
			</ul>
			<br />
			<br />
			<ul>
				<li class="nav-header">表单设计</li>
				<li><a href="javascript:window.location.href='template-edit?type=form&opFlag=add';"  class="btn btn-link">新增</a></li>
				<li><a href="javascript:window.location.href='form-list-all';"  class="btn btn-link">查询/修改</a></li>
			</ul>
			<br />
			<br />
			<ul>
				<li class="nav-header">申报书填写</li>
				<li><a href="javascript:window.location.href='/formdesign/formdemo/to-add';"  class="btn btn-link">新增</a></li>
				<li><a href="javascript:window.location.href='/formdesign/formdemo/demo-list-all';"  class="btn btn-link">查询/修改</a></li>
			</ul>
</body>
</html>