<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/common/common.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>span</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <link rel="stylesheet" href="${res_fd }/js/ueditor/formdesign/bootstrap/css/bootstrap.css">
    <!--[if lte IE 6]>
    <link rel="stylesheet" type="text/css" href="${res_fd }/js/ueditor/formdesign/bootstrap/css/bootstrap-ie6.css">
    <![endif]-->
    <!--[if lte IE 7]>
    <link rel="stylesheet" type="text/css" href="${res_fd }/js/ueditor/formdesign/bootstrap/css/ie.css">
    <![endif]-->
    <link rel="stylesheet" href="${res_fd }/js/ueditor/formdesign/leipi.style.css">
   
    <script type="text/javascript" src="${res_fd }/js/ueditor/dialogs/internal.js"></script>
    <script type="text/javascript">
        /* Thank you by
         http://www.alt-tag.com/blog/2006/02/ie-dom-bugs/ */
					function createElement(type, name) {
						var element = null;
						try {
							element = document.createElement('<' + type + ' name="' + name + '">');
						} catch (e) {

						}
						if (element == null) {
							element = document.createElement(type);
							element.name = name;
						}
						return element;
					}
				</script>
</head>
<body>
<div class="content">
    <table class="table table-bordered table-striped table-hover">
        <tr>
            <th><span>label</span><span class="label label-important">*</span></th>
            <th><span>name（/data之后的xpath）</span><span class="label label-important">*</span></th>
        </tr>
        <tr>
            <td><input type="text" id="taglabel" placeholder="必填项"></td>
            <td><input type="text" id="tagname" placeholder="必填项"></td>
        </tr>
        <tr>
            <th><span>id</span></th>
            <th><span>class（用于样式控制、填写校验，多个以空格分隔）</span></th>
        </tr>
        <tr>
            <td>
                 	<input type="text" id="tagid"  >
            </td>
            <td>
                	<input type="text" id="tagclass"  >
            </td>
        </tr>
        <tr>
            <th><span>style</span></th>
            <th></th>
        </tr>
        <tr>
            <td>
                 <input type="text" id="tagstyle" >
            </td>
            <td>
               
            </td>
        </tr>
        <tr>
            <th colspan="2">
                <span>其他属性（json格式，属性值请用''包括，如{'key_a':'value_a'}）</span>
            </th>
        </tr>
        <tr>
         		<td colspan="2">
         			 <textarea id="tagOtherAttrs" rows="6" cols="" class="span8"></textarea>
         		</td>
        </tr>

    </table>
</div>
<script type="text/javascript">
    var oNode = null;
    var thePlugins = 'span';
    window.onload = function () {
        if (UE.plugins[thePlugins].editdom) {  // 编辑
            oNode = UE.plugins[thePlugins].editdom;
            $G('taglabel').value = oNode.getAttribute('taglabel');
			   		$G('tagname').value =  oNode.getAttribute('tagname'); 
			   		$G('tagid').value = oNode.getAttribute('tagid'); 
			   		$G('tagclass').value  = oNode.getAttribute('tagclass');  
			   		$G('tagstyle').value  = oNode.getAttribute('tagstyle');  
  		   		$G('tagOtherAttrs').value  = oNode.getAttribute('tagOtherAttrs'); 
              }
   	 	}
    
     // 取消 
    dialog.oncancel = function () {
        if (UE.plugins[thePlugins].editdom) {
        	delete  UE.plugins[thePlugins].editdom;
      			 }
    };
    
    // 确定
    dialog.onok = function () {
	if ($G('taglabel').value == '') {
			alert('请输入taglabel！');
			return false;
		}
		if ($G('tagname').value == '') {
			alert('请输入name！');
			return false;
		}
		var taglabel = $G('taglabel').value;
		var tagname = $G('tagname').value;
		var tagid = $G('tagid').value;
		var tagclass = $G('tagclass').value;
		var tagstyle = $G('tagstyle').value;
		var tagOtherAttrs = $G('tagOtherAttrs').value;

		// --------- fd tag属性值处理
		var opFlag; // add edit
		if (!oNode) { // 新增
			opFlag = "add";
			//创建一个textarea，并设置name="fdField"
			oNode = createElement('span', 'fdField');
			// 设置name="fdField"
			oNode.setAttribute('name', 'fdField');
			// tagType
			oNode.setAttribute('tagType', 'span');
			oNode.innerHTML = taglabel + '，span' ;
		} else {
			opFlag = "edit";
		}

		try {
			// 属性保存
			oNode.setAttribute('taglabel', taglabel);
			oNode.setAttribute('tagname', tagname);
			oNode.setAttribute('tagid', tagid);
			oNode.setAttribute('tagclass', tagclass);
			oNode.setAttribute('tagstyle', tagstyle);
			oNode.setAttribute('tagOtherAttrs', tagOtherAttrs);
			// 回写
			if ("add" == opFlag) { // 新增 
				editor.execCommand('insertHtml', oNode.outerHTML);
			} else if ("edit" == opFlag) {  // 编辑
				delete UE.plugins[thePlugins].editdom; 
			}
		} catch (e) {
			try {
				editor.execCommand('error');
			} catch (e) {
				alert('控件异常！');
			}
			return false;
	  }
	};
</script>
</body>
</html>