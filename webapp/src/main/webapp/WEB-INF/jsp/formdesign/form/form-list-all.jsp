<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/common/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 <link href="${res_fd }/css/bootstrap/css/bootstrap.css?2023" rel="stylesheet" type="text/css" />
<title>所有表单</title>
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
					<th><span>自定义脚本</span></th>
					<th><span>初始化函数</span></th>
					<th><span>填写检查函数</span></th>
					<th><span>操作</span></th>
				</tr>
			</thead>
			<tbody id="tbl1">
				<c:forEach items="${templateList }" var="formTemplate" varStatus="varStatus">
	        <tr>
						<td><span class="badge">${varStatus.count }</span></td>
						<td><span class="">${formTemplate.type }</span></td>
						<td><span class=""><c:out value="${formTemplate.name }" /></span></td>
				 	  <td><span class=""><c:out value="${formTemplate.script }" /></span></td>
						<td><span class=""><c:out value="${formTemplate.initScript }" /></span></td>
						<td><span class=""><c:out value="${formTemplate.checkScript }" /></span></td>
						<td>
							 <a title="修改" onclick="javascript:window.location.href='template-edit?type=form&opFlag=edit&templateId=${formTemplate.id}';" class="btn btn-default"><i class="icon-edit"></i></a>
						   <a title="预览" onclick="javascript:templatePreview(${formTemplate.id});" class="btn btn-default"><i class="icon-play"></i></a>
							 <a title="拷贝" onclick="javascript:void(0);" class="btn btn-default"><i class="icon-folder-open"></i></a>
							 <a title="删除" onclick="javascript:void(0);" class="btn btn-default"><i class="icon-remove"></i></a>
							 <a title="生成表单jsp" onclick="javascript:window.location.href='form-gennerate?templateId=${formTemplate.id}';" class="btn btn-default"><i class="icon-hdd"></i></a>
						</td>
					</tr>
				</c:forEach>
      </tbody>
		</table>
	</div>
</body>
<script type="text/javascript">
	function templatePreview(template_id){
		var url = "/formdesign/formdesign/template-preview?templateId=" +  template_id ;
    window.open(url,'mywin',"menubar=0,toolbar=0,status=0,resizable=1,left=0,top=0,scrollbars=1,width=" +(screen.availWidth-10) + ",height=" + (screen.availHeight-50) + "\"");
			
	}
</script>
</html>