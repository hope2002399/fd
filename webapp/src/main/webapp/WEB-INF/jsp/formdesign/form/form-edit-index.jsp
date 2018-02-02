<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/common/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 	<head>
    <title>表单设计</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link href="${res_fd }/css/bootstrap/css/bootstrap.css?2023" rel="stylesheet" type="text/css" />
    <!--[if lte IE 6]>
    <link rel="stylesheet" type="text/css" href="${res_fd }/css/bootstrap/css/bootstrap-ie6.css?2023">
    <![endif]-->
    <!--[if lte IE 7]>
    <link rel="stylesheet" type="text/css" href="${res_fd }/css/bootstrap/css/ie.css?2023">
    <![endif]-->
    <link href="${res_fd }/css/site.css?2023" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
       //   var _root='http://form/index.php?s=/',_controller = 'index';
    </script>
    <!--style>
        .list-group-item{padding:0px;}
    </style-->
 </head>
 	<body>
 		<br />
    <div class="container" style="width: 70%;">
    <form method="post" id="saveform" name="saveform" >
    <input type="hidden" name="template_id" id="template_id" value="${formTemplate.id}">
    <input type="hidden" name="type" id="type" value="form">
    <div class="row">
    </div>
		    <div class="span2">
		         <jsp:include page="../template/conponent-select-template.jsp"></jsp:include>
		         <jsp:include page="../template/conponent-select-basic.jsp"></jsp:include>
		 	 </div>
        <div class="span10">
	      <script id="myFormDesign" type="text/plain" style="width:100%;">${formTemplate.template}</script>
        </div>
         <div class="span4">
     			<div style="font-size: 11px;font-weight: bold;font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">表单属性</div>
     			<br/>
     			<label><span class="label label-important">*</span>表单名称：</label>
     			<input type="text" id="name" placeholder="必填项" style="width: 90%;" value="${formTemplate.name }" />
        	<label>自定义函数：</label><textarea id="script" rows="20"  style="width: 90%;" >${formTemplate.script }</textarea>
     		 	<label>初始化调用函数：<br/>（多个以;分隔，如init1();init2();）</label><textarea id="initScript" rows="2"  style="width: 90%;" >${formTemplate.initScript }</textarea>
     			<label>填写检查调用函数：<br/>（多个以;分隔，如check1();check2();）</label><textarea id="checkScript" rows="2"  style="width: 90%;" >${formTemplate.checkScript }</textarea>
        </div>
    </div> 
    </form>
    </div><!--end container-->
    <script type="text/javascript" charset="utf-8" src="${res_fd }/js/jquery-1.7.2.min.js?2023"></script>
    <script type="text/javascript" charset="utf-8" src="${res_fd }/js/ueditor/ueditor.config.js?2023"></script>
    <script type="text/javascript" charset="utf-8" src="${res_fd }/js/ueditor/ueditor.all.js?2023"> </script>
    <script type="text/javascript" charset="utf-8" src="${res_fd }/js/ueditor/lang/zh-cn/zh-cn.js?2023"></script>
    <script type="text/javascript" charset="utf-8" src="${res_fd }/js/ueditor/formdesign/iris.formdesign.js?2023"></script>
    <!-- script start-->
    <script type="text/javascript">
        var formEditor = UE.getEditor('myFormDesign',{
            //allowDivTransToP: false,//阻止转换div 为p
            fdtoolshow : true,//是否显示表单设计器的toolbars
            fdtoolUrl : "/formdesign/formdesign" ,  // 各组件url namespace // 应用名 + 命名空间
            textarea: 'design_content',   
           toolbars:[[  'fullscreen','source','|','undo', 'redo'   ]],
           /*  readonly : true , */
            //focus时自动清空初始化时的内容
            //autoClearinitialContent:true,
            //关闭字数统计
            wordCount:false,
            //关闭elementPath
            elementPathEnabled:false,
            //默认的编辑区域高度
         initialFrameHeight:600
        ///,iframeCssUrl:"css/bootstrap/css/bootstrap.css" //引入自身css 使编辑器兼容你网站css
            //更多其他参数，请参考ueditor.config.js中的配置项
        });

    var formDesign = {
    		
	    /*执行控件*/
	    exec : function (method) {
	    	formEditor.execCommand(method);
	    },
	    /*
	        Javascript 解析表单
	        template 表单设计器里的Html内容
	    */
   parse_form : function(formeditorHtml){  
	   var sHtml = formeditorHtml || formEditor.getContent() ; //  formEditor.getContent(); // String
	   var oHtml = $(sHtml);  //  String => jq
	   var aFields = oHtml.find('[name="fdField"]'); // fdFields array

	   var aAttrObjsArray = new Array() ; 
	   var pregAttr = /(\w+)=\"((.|\n)*?)\"/gi ;   //   正则 属性查找 
	   aFields.each(function (index, element) {   // 编历
	    $(element).replaceWith('{template_item_' + (index + 1) + '}'); // 替换为占位符 
	     //
    	var elementHtml =  element.outerHTML  ; 
      var oAttrObj = new Object() ;
      elementHtml.replace(pregAttr , function(str,attr,val){
         oAttrObj[attr] = val ; 
    	 	}) ;
	    aAttrObjsArray.push(oAttrObj) ;
	   });
	   // 替换之后的html
	   var sReplacedHtml = '' ;
	   oHtml.each(function(){
		   sReplacedHtml += this.outerHTML ;
	      }) ;
	    // console.info(sReplacedHtml); 
	    // console.info(aAttrObjsArray); 
	   
	    var oReturn = new Object({
	    	'template': sHtml ,  // 
	    	'template_parse': sReplacedHtml ,
	    	'attr_obj_arr' : aAttrObjsArray
	    }) ;
	    return JSON.stringify(oReturn) ;
 	  },
 	  
 	 fnGetAttr : function(){
		  // 表单属性
		    if($('#name').val() == ''){
		    	alert('请输入模板名称！');
					return false;	
		        } ;
		  // new attr Object
		   var attrObj = new Object() ; 
		   attrObj.name = $('#name').val();
		   attrObj.script = $('#script').val();
		   attrObj.init_script = $('#initScript').val();
		   attrObj.check_script = $('#checkScript').val();
		   return JSON.stringify(attrObj) ;
	  }  ,
 	  
 	  
    /*type  =  save 保存设计 versions 保存版本  close关闭 */
    fnCheckForm : function ( type ) {
        if(formEditor.queryCommandState( 'source' )){
        	formEditor.execCommand('source');//切换到编辑模式才提交，否则有bug
       			 }
        if(formEditor.hasContents()){
        	 formEditor.sync();/*同步内容*/ 
		            //获取表单设计器里的内容
		       var  sFormeditorHtml = formEditor.getContent();
		            //解析表单设计器控件
		       var parse_form = this.parse_form(sFormeditorHtml );
		      //alert(parse_form);
		       //
		      var attrStr = this.fnGetAttr();
		      if (!attrStr){ 
		    	  return ;
		    	   }
		             //异步提交数据
		             $.ajax({
		                type: 'POST',
		                url : '/formdesign/formdesign/template-save',
		                dataType : 'json',
		                data : 
											 {
												'template_id' : $('#template_id').val(),
												'type' : $('#type').val(),
												'template_attr' : attrStr,
												'parse_form' : parse_form
											},
											success : function(data) {
												if ("error" == data.flag){
													alert(data.msg) ;
												}else if ("success" == data.flag){
													$('#template_id').val(data.template_id) ;
													// 判断下 是保存 还是预览
													if("save" == type){  // 保存
														alert("操作成功！") ;
													}else if ("preview" == type){  // 预览
														var url = "/formdesign/formdesign/template-preview?templateId=" + data.template_id ;
										        window.open(url,'mywin',"menubar=0,toolbar=0,status=0,resizable=1,left=0,top=0,scrollbars=1,width=" +(screen.availWidth-10) + ",height=" + (screen.availHeight-50) + "\"");
													}
												}
											},
											error :function(){
												alert("后台错误！") ;
											}
										});

							} else {
								alert('表单内容不能为空！')
							 // 	$('#submitbtn').button('reset');
								return false;
							}
						},

						/*预览表单*/
						fnReview : function() { 
						  this.fnCheckForm("preview");
						}
					};
				</script>
    <!-- script end -->
      <div style="width:1px;height:1px">
        <script type="text/javascript">
          var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
          document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F1e6fd3a46a5046661159c6bf55aad1cf' type='text/javascript'%3E%3C/script%3E"));
       </script>
    </div>
</body>
</html>