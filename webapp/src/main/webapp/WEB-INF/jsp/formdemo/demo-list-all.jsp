<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/common/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 <link href="${res_fd }/css/bootstrap/css/bootstrap.css?2023" rel="stylesheet" type="text/css" />
<title>所有申报书</title>
</head>
<body>
	<br/>
	<div class="content">
		<table class="table table-striped table-bordered table-condensed" id="tbl">
			<thead>
				<tr>
					<th><span>序号</span></th>
				  <th><span>项目名称</span></th>
					<th><span>操作</span></th>
				</tr>
			</thead>
			<tbody id="tbl1">
				<c:forEach items="${proposalList }" var="vo" varStatus="varStatus">
	        <tr>
						<td><span class="badge">${varStatus.count }</span></td>
							<td><span >${vo.zhTitle }</span></td>
						<td>
							 <a title="修改" onclick="javascript:window.location.href='to-edit?keyCode=${vo.prpCode}';" class="btn btn-default"><i class="icon-edit"></i></a>
						   <a title="查看" onclick="javascript:demoView(${vo.prpCode});" class="btn btn-default"><i class="icon-play"></i></a>
						</td>
					</tr>
				</c:forEach>
      </tbody>
		</table>
	</div>
</body>
<script type="text/javascript">
	function demoView(keyCode){
		var url = "/formdesign/formdemo/to-view?keyCode=" +  keyCode ;
    window.open(url,'mywin',"menubar=0,toolbar=0,status=0,resizable=1,left=0,top=0,scrollbars=1,width=" +(screen.availWidth-10) + ",height=" + (screen.availHeight-50) + "\"");
	}
</script>
</html>