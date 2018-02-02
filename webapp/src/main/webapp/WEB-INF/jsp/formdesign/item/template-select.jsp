<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/common/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>表单模板</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" >
    <script type="text/javascript" src="${res_fd }/js/ueditor/dialogs/internal.js"></script>
    <style type="text/css">
        .wrap{ padding: 5px;font-size: 14px;}
        .left{width:425px;float: left;}
        .right{width:160px;border: 1px solid #ccc;float: right;padding: 5px;margin-right: 5px;}
        .right .pre{height: 332px;overflow-y: auto;}
        .right .preitem{border: white 1px solid;margin: 5px 0;padding: 2px 0;}
        .right .preitem:hover{background-color: lemonChiffon;cursor: pointer;border: #ccc 1px solid;}
        .right .preitem img{display: block;margin: 0 auto;width:100px;}
        .clear{clear: both;}
        .top{height:26px;line-height: 26px;padding: 5px;}
        .bottom{height:320px;width:100%;margin: 0 auto;}
        .transparent{ background: url("template/images/bg.gif") repeat;}
        .bottom table tr td{border:1px dashed #ccc;}
        #colorPicker{width: 17px;height: 17px;border: 1px solid #CCC;display: inline-block;border-radius: 3px;box-shadow: 2px 2px 5px #D3D6DA;}
        .border_style1{padding:2px;border: 1px solid #ccc;border-radius: 5px;box-shadow:2px 2px 5px #d3d6da;}
        p{margin: 5px 0}
        table{clear:both;margin-bottom:10px;border-collapse:collapse;word-break:break-all;}
        li{clear:both}
        ol{padding-left:40px; }
    </style>
</head>
<body>

    <div class="wrap">
        <div class="left">
            <div class="top" style="display: none;">
                <label><var id="lang_template_clear">保留原有内容</var>：<input id="issave" type="checkbox" checked="true" ></label>
            </div>
            <div class="bottom border_style1" id="preview"></div>
        </div>
        <fieldset  class="right border_style1">
            <legend><var id="lang_template_select"></var></legend>
            <div class="pre" id="preitem"></div>
        </fieldset> 
        <div class="clear"></div>
    </div>
    
    <script type="text/javascript">
   	 var templates = new Array() ;
    </script>
   
    <c:forEach items="${templateList }" var="template" varStatus="varStatus" >
	      
				<script type="text/javascript">
					var o  = new Object() ;
					o['id'] =  '${template.id}';
					o['pre'] = "pre" + '${varStatus.count%2}' + ".png" ;  // 右侧预览缩略图
					o['title'] =  '${template.name}';				 // //标题
					o['preHtml'] = '${template.template }' ;  // 预览html
					o['html'] = '${template.template }' ;      // 选中html
					templates.push( o)  ;
				</script>
	 </c:forEach>
	 
    <script type="text/javascript">
    /**
    * Templates.
    * 添加模板，以下面配置即可
    */
    
    
    
  /*   var templates = [
        {
            "pre":"pre0.png",//预览图
            'title':"表单设计器模板",//标题
            //预览html
            'preHtml':'<p style="text-align: center;"><span style="font-size: 24px;">示例</span></p><hr/>表单设计器模板，注意控件：name="leipiNewField"',
            //确认后到编辑器的html
            "html":'<p style="text-align: center;"><span style="font-size: 24px;">示例</span></p><hr/>表单设计器模板，注意控件：name="leipiNewField"'
        },
        {
            "pre":"pre1.png",
            'title':"欢迎使用",
            'preHtml':'<p style="text-align: center;"><br/></p><p style="text-align: center;"><span style="font-size: 24px;">示例表</span></p><table class="table table-bordered"> <tbody> <tr class="firstRow"><td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);">文本框 </td> <td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);" > <input style="text-align: left; width: 150px;" title="文本框" value="雷劈网" name="leipiNewField" orgheight="" orgwidth="150" orgalign="left" orgfontsize="" orghide="0" leipiplugins="text" orgtype="text"/> </td><td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);" >下拉菜单</td> <td valign="top" style="border-color: rgb(221, 221, 221);"> {|-<span leipiplugins="select"><select name="leipiNewField" title="下拉菜单" leipiplugins="select" size="1" orgwidth="150" style="width: 150px;"><option value="下拉">下拉</option> <option value="菜单"> 菜单 </option></select>&nbsp;&nbsp;</span>-|}</td> </tr><tr> <td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);"> 单选</td> <td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);" >              {|-<span leipiplugins="radios" class="radios" orgtimestamp="1407254440134" title="单选"><input name="leipiNewField" value="单选1" title="单选" orgtimestamp="1407254440134" leipiplugins="radio" type="radio"/>单选1&nbsp;<input name="leipiNewField" value="单选2" title="单选" orgtimestamp="1407254440134" leipiplugins="radio" type="radio"/>单选2&nbsp;</span>-|}           </td> <td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);" >              复选           </td> <td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);">                {|-<span class="checkboxs" leipiplugins="checkboxs" orgtimestamp="1407254454990" title="复选"><input name="leipiNewField" value="复选1" title="复选" orgtimestamp="1407254454990" leipiplugins="checkbox" type="checkbox"/>复选1&nbsp;<input name="leipiNewField" value="复选2" title="复选" orgtimestamp="1407254454990" leipiplugins="checkbox" type="checkbox"/>复选2&nbsp;<input name="leipiNewField" value="复选3" title="复选" orgtimestamp="1407254454990" leipiplugins="checkbox" type="checkbox"/>复选3&nbsp;</span>-|}            </td> </tr> <tr><td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);">                宏控件            </td><td valign="top" style="border-color: rgb(221, 221, 221);" >                <input name="leipiNewField" type="text" value="{macros}" title="宏控件" leipiplugins="macros" orgtype="sys_date_cn" orghide="0" orgfontsize="12" orgwidth="150" style="font-size: 12px; width: 150px;"/> </td><td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);" >               二维码</td><td valign="top" style="border-color: rgb(221, 221, 221);" >                <img name="leipiNewField" title="雷劈网" value="http://www.leipi.org" orgtype="url" leipiplugins="qrcode" src="/Public/js/ueditor/formdesign/images/qrcode.gif" orgwidth="40" orgheight="40" style="width: 40px; height: 40px;"/></td></tr></tbody></table>',
            "html":'<p style="text-align: center;"><br/></p><p style="text-align: center;"><span style="font-size: 24px;">示例表</span></p><table class="table table-bordered"><tbody><tr class="firstRow"><td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);">                文本框</td><td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);" width="227"><input style="text-align: left; width: 150px;" title="文本框" value="雷劈网" name="leipiNewField" orgheight="" orgwidth="150" orgalign="left" orgfontsize="" orghide="0" leipiplugins="text" orgtype="text"/></td><td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);" width="85">                下拉菜单</td><td valign="top" style="border-color: rgb(221, 221, 221);" width="312">                {|-<span leipiplugins="select"><select name="leipiNewField" title="下拉菜单" leipiplugins="select" size="1" orgwidth="150" style="width: 150px;"><option value="下拉">                    下拉</option><option value="菜单">                    菜单</option></select>&nbsp;&nbsp;</span>-|}</td></tr><tr><td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);">                单选</td><td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);" width="41">                {|-<span leipiplugins="radios" title="单选" name="leipiNewField"><input value="单选1" type="radio" checked="checked" name=""/>单选1&nbsp;<input value="单选2" type="radio" name=""/>单选2&nbsp;</span>-|}</td><td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);" width="85">                复选</td><td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);" width="312">                {|-<span leipiplugins="checkboxs" title="复选"><input name="leipiNewField" value="复选1" type="checkbox" checked="checked"/>复选1&nbsp;<input name="leipiNewField" value="复选2" type="checkbox" checked="checked"/>复选2&nbsp;<input name="leipiNewField" value="复选3" type="checkbox"/>复选3&nbsp;</span>-|}</td></tr><tr><td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);">                宏控件</td><td valign="top" style="border-color: rgb(221, 221, 221);" width="41"><input name="leipiNewField" type="text" value="{macros}" title="宏控件" leipiplugins="macros" orgtype="sys_date_cn" orghide="0" orgfontsize="12" orgwidth="150" style="font-size: 12px; width: 150px;"/></td><td valign="top" style="word-break: break-all; border-color: rgb(221, 221, 221);" width="85">                二维码</td><td valign="top" style="border-color: rgb(221, 221, 221);" width="312"><img name="leipiNewField" title="雷劈网" value="http://www.leipi.org" orgtype="url" leipiplugins="qrcode" src="/Public/js/ueditor/formdesign/images/qrcode.gif" orgwidth="40" orgheight="40" style="width: 40px; height: 40px;"/></td></tr></tbody></table><p><input name="leipiNewField" leipiplugins="listctrl" type="text" value="{列表控件}" readonly="readonly" title="采购商品列表" orgtitle="商品名称`数量`单价`小计`描述`" orgcoltype="text`int`int`int`text`" orgunit="```元``" orgsum="0`0`0`1`0`" orgcolvalue="`````" orgwidth="100%" style="width: 100%;"/></p><p><textarea title="多行文本" name="leipiNewField" leipiplugins="textarea" value="" orgrich="0" orgfontsize="12" orgwidth="600" orgheight="80" style="font-size:12px;width:600px;height:80px;"></textarea></p><p><img name="leipiNewField" title="进度条" leipiplugins="progressbar" orgvalue="20" orgsigntype="progress-info" src="/Public/js/ueditor/formdesign/images/progressbar.gif"/></p>'

        }
    ]; */

    /**
     *  Templates 
     */
    (function () {
        var me = editor,
                preview = $G( "preview" ),
                preitem = $G( "preitem" ),
                tmps = templates ,
                currentTemplate
               //  currentTemplateHiddenDiv
                     ;
					var initPre = function() {
							var str = "";
							for (var i = 0, tmp; tmp = tmps[i++];) {
								str += '<div class="preitem" onclick="pre('
										+ i
										+ ')"><img src="${res_fd }/js/ueditor/formdesign/'
										+ "images/template/"
										+ tmp.pre
										+ '" '
										+ (tmp.title ? "alt=" + tmp.title
												+ " title=" + tmp.title + ""
												: "") + '></div>';
							}
							preitem.innerHTML = str;
						};
						// 
						var pre = function(n) {
							var tmp = tmps[n - 1];
							currentTemplate =  tmp ;
							clearItem();
							domUtils.setStyles(preitem.childNodes[n - 1], {
								"background-color" : "lemonChiffon",
								"border" : "#ccc 1px solid"
							});
							preview.innerHTML = currentTemplate.preHtml ?  entityToString(currentTemplate.preHtml) : "";
						};
						// 
						var clearItem = function() {
							var items = preitem.children;
							for (var i = 0, item; item = items[i++];) {
								domUtils.setStyles(item, {
									"background-color" : "",
									"border" : "white 1px solid"
								});
							}
						};
						dialog.onok = function() {
							if (!$G("issave").checked) {
								me.execCommand("cleardoc");
							}
							var obj = {
								html : currentTemplate && entityToString(currentTemplate.html)
							};
							me.execCommand("template", obj);
						};
						
						var entityToString = function(entity){
							  var div = document.createElement('div');
							  div.innerHTML = entity;
							  var html = div.innerText||div.textContent;
							  return html;
							};
							
						initPre();
						window.pre = pre;
						pre(1);
					})();
				</script>
</body>
</html>
