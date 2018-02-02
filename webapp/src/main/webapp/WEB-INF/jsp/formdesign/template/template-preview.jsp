<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>预览</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" >
		 <style type="text/css">
		        .wrap{ padding: 5px;font-size: 14px;}
		        .left{ width:58%;float: left;}
		        .right{width:40%;height:auto ;float: right;margin-right: 2px;}
		        .border_style1{  padding:2px;border: 1px solid #ccc;border-radius: 5px;box-shadow:2px 2px 5px #d3d6da;}
		        .js_textarea {padding:2px 2px 2px 2px;width: 100%;margin-top: 2px;}
		</style>
</head>
<body>
	  <div class="wrap">
        <div class="left border_style1">
      			  <% //预览页面  %>
           	<jsp:include page="./template-include-view.jsp" >
							<jsp:param value="true" name="previewFlag"/>
				   </jsp:include>
        </div>
        <div class="right border_style1" > 
          <label style="text-align: center;"><h4>Javascript编辑：</h4></label>
          <form id="hidden_form" method='post'>
          	  <input type="hidden" name="template_id"  value="${formTemplate.id}"  />	 
          	  <input type="hidden" name="script_json_str"  id="script_json_str" value=""  />	 
          </form>
          <div id="op_btn_div" style="margin: 5px 5px 5px 5px;">
          	 <input id="run_script" onclick="javascript:runScript();" type="button"  style="margin-left: 10px;" value="运行" />
          	 <input id="update_script" onclick="javascript:saveScript();" type="button"  style="margin-left: 10px;" value="保存" />
          </div>
          <label><h5>1、初始化调用函数：</h5></label><textarea id="js_init_script_textarea" class="js_textarea" ><c:out value="${formTemplate.initScript }"  escapeXml="true"/></textarea><br/>
          <label><h5>2、填写检查调用函数：</h5></label><textarea id="js_check_script_textarea" class="js_textarea" ><c:out value="${formTemplate.checkScript }"  escapeXml="true"/></textarea><br/>
         	<label><h5>3、自定义函数：</h5></label><textarea id="js_script_textarea" class="js_textarea" ><c:out value="${formTemplate.script }"  escapeXml="true"/></textarea>
        </div> 
    </div>
    <script type="text/javascript">
      var jsInitScriptEditor , jsCheckScriptEditor ,jsScriptEditor;
	    $(document).ready(function(){
	    	//
	     var jsInitScriptTextarea = document.getElementById('js_init_script_textarea');
        jsInitScriptEditor = CodeMirror.fromTextArea(jsInitScriptTextarea, {
	            mode: "text/javascript",
	            smartIndent : true,
	            lineNumbers: true/*,
	             readOnly : true */
	        }); 
       jsInitScriptEditor.setSize(null,150);    //设置宽高
	    	//
	     var jsCheckScriptTextarea = document.getElementById('js_check_script_textarea');
        jsCheckScriptEditor = CodeMirror.fromTextArea(jsCheckScriptTextarea, {
	            mode: "text/javascript",
	            smartIndent : true,
	            lineNumbers: true/*,
	             readOnly : true */
	        }); 
       jsCheckScriptEditor.setSize(null,150);    //设置宽高
	    	//
       var jsScriptTextarea = document.getElementById('js_script_textarea');
         jsScriptEditor = CodeMirror.fromTextArea(jsScriptTextarea, {
	            mode: "text/javascript",
	            smartIndent : true,
	            lineNumbers: true/*,
	             readOnly : true */
	        }); 
	    jsScriptEditor.setSize(null,550);    //设置宽高
	    });
	    
	    //运行脚本
		  function runScript(){
		      var scriptJSONStr = getScriptJSONStr() ;
		    	$('#script_json_str').val(scriptJSONStr);
		    	$('#hidden_form').attr("action" , "/formdesign/formdesign/run-script") ;
		    	$('#hidden_form').submit() ;
		    }
	    
	    // 获取值
	  function getScriptJSONStr(){
			  var jsInitScript = jsInitScriptEditor.getValue()  ;
			  var jsCheckScript = jsCheckScriptEditor.getValue()  ;
			  var jsScript =  jsScriptEditor.getValue()  ;
			  var o = new Object() ;
			  o.init_script = jsInitScript;
			  o.check_script = jsCheckScript ;
		    o.script = jsScript ;
		   return JSON.stringify(o);
	    }
	    
	     //保存
	  function saveScript(){
	    var scriptJSONStr = getScriptJSONStr() ;
	    var options = {
				type : 'POST',
				url : '/formdesign/formdesign/update-script',
				dataType : 'json',
				data : {
					'template_id' : $('#template_id').val(),
					'script_json_str' : scriptJSONStr 
				},
				success : function(data) {
					if ("error" == data.flag) {
						 alert(data.msg);
					} else if ("success" == data.flag) {
						// 重新加载
					 //	window.location.reload();
						 alert("保存成功！");
				    }
				},
				error : function() {
					alert("后台错误！");
				}
			}
	    // 
	    $.ajax(options) ;
	    }
	     
    </script>
    <link type="text/css" rel="stylesheet"  href="${res_fd }/app-js/codemirror/lib/codemirror.css" />
    <script type="text/javascript" src="${res_fd }/app-js/codemirror/lib/codemirror.js" ></script>
    <script src="${res_fd }/app-js/codemirror/mode/javascript/javascript.js" ></script>
</body>