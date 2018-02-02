<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/common/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 <link href="${res_fd }/css/bootstrap/css/bootstrap.css?2023" rel="stylesheet" type="text/css" />
<title>所有模板</title>
</head>
<body>
	<br/>
	<div class="content">
		<table class="table table-striped table-bordered table-condensed" id="tbl">
			<thead>
				<tr>
					<th><span>序号</span></th>
					<th><span>类型</span></th>
					<th><span>名称</span></th>
					<!-- <th><span>原html</span></th>
					<th><span>解析后html</span></th> -->
					<th><span>自定义脚本</span></th>
					<th><span>初始化函数</span></th>
					<th><span>填写检查函数</span></th>
					<!-- <th><span>创建时间</span></th>
					<th><span>创建人</span></th>
					<th><span>最后更新时间</span></th>
					<th><span>最后更新人</span></th> -->
					<th><span>操作</span></th>
				</tr>
			</thead>
			<tbody id="tbl1">
				<c:forEach items="${templateList }" var="formTemplate" varStatus="varStatus">
	        <tr>
						<td><span class="badge">${varStatus.count }</span></td>
						<td><span class="">${formTemplate.type }</span></td>
						<td><span class=""><c:out value="${formTemplate.name }" /></span></td>
			<%-- 	<td><span class=""><c:out value="${formTemplate.template }" /></span></td>
						<td><span class=""><c:out value="${formTemplate.templateParse }" /></span></td> --%>
						<td><span class=""><c:out value="${formTemplate.script }" /></span></td>
						<td><span class=""><c:out value="${formTemplate.initScript }" /></span></td>
						<td><span class=""><c:out value="${formTemplate.checkScript }" /></span></td>
				<%-- 		<td><span class=""><c:out value="${formTemplate.createDate }" /></span></td>
						<td><span class=""><c:out value="${formTemplate.createPsnCode }" /></span></td>
						<td><span class=""><c:out value="${formTemplate.updateDate }" /></span></td>
						<td><span class=""><c:out value="${formTemplate.updatePsnCode }" /></span></td> --%>
						<td>
							 <a title="修改" onclick="window.location.href='template-edit?type=template&opFlag=edit&templateId=${formTemplate.id}';" class="btn btn-default"><i class="icon-edit"></i></a>
						   <a title="预览" onclick="templatePreview(${formTemplate.id});" class="btn btn-default"><i class="icon-play"></i></a>
							 <a title="拷贝" onclick="javascript:void(0);" class="btn btn-default"><i class="icon-folder-open"></i></a>
							 <a title="删除" onclick="javascript:void(0);" class="btn btn-default"><i class="icon-remove"></i></a>
						</td>
					</tr>
				</c:forEach>
      </tbody>
		</table>
	</div>
</body>
<script type="text/javascript">
	function templatePreview(templateId){
		var url = "/formdesign/formdesign/template-preview?templateId=" +  templateId ;
    window.open(url,'mywin',"menubar=0,toolbar=0,status=0,resizable=1,left=0,top=0,scrollbars=1,width=" +(screen.availWidth-10) + ",height=" + (screen.availHeight-50) + "\"");
			
	}
</script>
</html>