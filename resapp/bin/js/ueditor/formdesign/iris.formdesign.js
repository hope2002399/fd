/*
* 设计器私有的配置说明 
* 一
* UE.formDesignUrlNamespace  插件路径
* 
* 二
*UE.getEditor('myFormDesign',{
*          fdtoolshow:true  //是否显示设计器的tool清单
*          });
*/

UE.formDesignUrlNamespace = 'formdesign';

/**
 * 标题
 */
UE.plugins['title'] = function(){
	var me = this ;
	var thePlugins = "title" ;
	me.commands[thePlugins] = {
			execCommand : function(){
				me.execCommand('insertHtml', '<h3>{标题文字在此输入，输入后删除前后大括号}</h3>');
			}
	}
}

/**
 * 必填项提示
 */
UE.plugins['required_note'] = function(){
	var me = this ;
	var thePlugins = "required_note" ;
	me.commands[thePlugins] = {
			execCommand : function(){
				me.execCommand('insertHtml', '<span class="note">*</span>');
			}
	}
}

/**
 * 文本框
 * @command textfield
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'text');
 * ```
 */
UE.plugins['text'] = function () {
	var me = this ;
    var thePlugins = 'text';
	me.commands[thePlugins] = {
		execCommand:function () {
			var dialog = new UE.ui.Dialog({
				iframeUrl:  this.options.fdtoolUrl + "/text"   ,
				name:thePlugins,
				editor:this,
				title: '文本框',
				cssRules:"width:700px;height:500px;",
				buttons:[
				{
					className:'edui-okbutton',
					label:'确定',
					onclick:function () {
						dialog.close(true);
					}
				},
				{
					className:'edui-cancelbutton',
					label:'取消',
					onclick:function () {
						dialog.close(false);
					}
				}]
			});
			dialog.render();
			dialog.open();
		}
	};
    // popup
	var popup = new baidu.editor.ui.Popup( {
		editor:this,
		content: '',
		className: 'edui-bubble',
		_edittext: function () {
			  baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
			  me.execCommand(thePlugins);
			  this.hide();
		},
		_delete:function(){
			if( window.confirm('确认删除该控件吗？') ) {
				baidu.editor.dom.domUtils.remove(this.anchorEl,false);
			}
			this.hide();
		}
	} );
	popup.render();
    //
	me.addListener( 'mouseover', function( t, evt ) {
		evt = evt || window.event;
		var el = evt.target || evt.srcElement;
    var tagType = el.getAttribute('tagType');
		if ( /input/ig.test( el.tagName ) && tagType == thePlugins) {
			var html = popup.formatHtml(
				'<nobr>文本框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>' );
			if ( html ) {
				popup.getDom( 'content' ).innerHTML = html;
				popup.anchorEl = el;
				popup.showAnchor( popup.anchorEl );
			} else {
				popup.hide();
			}
		}
	});
}; 

/**
 *   多行文本框
 *   
 */
UE.plugins['textarea'] = function () {
	var me = this ;
    var thePlugins = 'textarea';
	me.commands[thePlugins] = {
		execCommand:function () {
			var dialog = new UE.ui.Dialog({
				iframeUrl:  this.options.fdtoolUrl + "/textarea"   ,
				name:thePlugins,
				editor:this,
				title: '多行文本框',
				cssRules:"width:700px;height:500px;",
				buttons:[
				{
					className:'edui-okbutton',
					label:'确定',
					onclick:function () {
						dialog.close(true);
					}
				},
				{
					className:'edui-cancelbutton',
					label:'取消',
					onclick:function () {
						dialog.close(false);
					}
				}]
			});
			dialog.render();
			dialog.open();
		}
	};
    // popup
	var popup = new baidu.editor.ui.Popup( {
		editor:this,
		content: '',
		className: 'edui-bubble',
		_edittext: function () {
			  baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
			  me.execCommand(thePlugins);
			  this.hide();
		},
		_delete:function(){
			if( window.confirm('确认删除该控件吗？') ) {
				baidu.editor.dom.domUtils.remove(this.anchorEl,false);
			}
			this.hide();
		}
	} );
	popup.render();
    //
	me.addListener( 'mouseover', function( t, evt ) {
		evt = evt || window.event;
		var el = evt.target || evt.srcElement;
    var tagType = el.getAttribute('tagType');
		if ( /textarea/ig.test( el.tagName ) && tagType == thePlugins) {
			var html = popup.formatHtml(
				'<nobr>多行文本: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>' );
			if ( html ) {
				popup.getDom( 'content' ).innerHTML = html;
				popup.anchorEl = el;
				popup.showAnchor( popup.anchorEl );
			} else {
				popup.hide();
			}
		}
	});
}; 


/**
 * span
 */
UE.plugins['span'] = function () {
	var me = this ;
    var thePlugins = 'span';
	me.commands[thePlugins] = {
		execCommand:function () {
			var dialog = new UE.ui.Dialog({
				iframeUrl:  this.options.fdtoolUrl + "/span"   ,
				name:thePlugins,
				editor:this,
				title: 'span',
				cssRules:"width:700px;height:500px;",
				buttons:[
				{
					className:'edui-okbutton',
					label:'确定',
					onclick:function () {
						dialog.close(true);
					}
				},
				{
					className:'edui-cancelbutton',
					label:'取消',
					onclick:function () {
						dialog.close(false);
					}
				}]
			});
			dialog.render();
			dialog.open();
		}
	};
    // popup
	var popup = new baidu.editor.ui.Popup( {
		editor:this,
		content: '',
		className: 'edui-bubble',
		_edittext: function () {
			  baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
			  me.execCommand(thePlugins);
			  this.hide();
		},
		_delete:function(){
			if( window.confirm('确认删除该控件吗？') ) {
				baidu.editor.dom.domUtils.remove(this.anchorEl,false);
			}
			this.hide();
		}
	} );
	popup.render();
    //
	me.addListener( 'mouseover', function( t, evt ) {
		evt = evt || window.event;
		var el = evt.target || evt.srcElement;
    var tagType = el.getAttribute('tagType');
		if ( /span/ig.test( el.tagName ) && tagType == thePlugins) {
			var html = popup.formatHtml(
				'<nobr>span: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>' );
			if ( html ) {
				popup.getDom( 'content' ).innerHTML = html;
				popup.anchorEl = el;
				popup.showAnchor( popup.anchorEl );
			} else {
				popup.hide();
			}
		}
	});
}; 

/**
 * radio
 */
UE.plugins['radio'] = function () {
	var me = this ;
    var thePlugins = 'radio';
	me.commands[thePlugins] = {
		execCommand:function () {
			var dialog = new UE.ui.Dialog({
				iframeUrl:  this.options.fdtoolUrl + "/radio"   ,
				name:thePlugins,
				editor:this,
				title: '单选框',
				cssRules:"width:700px;height:500px;",
				buttons:[
				{
					className:'edui-okbutton',
					label:'确定',
					onclick:function () {
						dialog.close(true);
					}
				},
				{
					className:'edui-cancelbutton',
					label:'取消',
					onclick:function () {
						dialog.close(false);
					}
				}]
			});
			dialog.render();
			dialog.open();
		}
	};
    // popup
	var popup = new baidu.editor.ui.Popup( {
		editor:this,
		content: '',
		className: 'edui-bubble',
		_edittext: function () {
			  baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
			  me.execCommand(thePlugins);
			  this.hide();
		},
		_delete:function(){
			if( window.confirm('确认删除该控件吗？') ) {
				baidu.editor.dom.domUtils.remove(this.anchorEl,false);
			}
			this.hide();
		}
	} );
	popup.render();
    //
	me.addListener( 'mouseover', function( t, evt ) {
		evt = evt || window.event;
		var el = evt.target || evt.srcElement;
    var tagType = el.getAttribute('tagType');
		if ( /span/ig.test( el.tagName ) && tagType == thePlugins) {
			var html = popup.formatHtml(
				'<nobr>单选框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>' );
			if ( html ) {
				popup.getDom( 'content' ).innerHTML = html;
				popup.anchorEl = el;
				popup.showAnchor( popup.anchorEl );
			} else {
				popup.hide();
			}
		}
	});
}; 

/**
 * checkbox
 */
UE.plugins['checkbox'] = function () {
	var me = this ;
    var thePlugins = 'checkbox';
	me.commands[thePlugins] = {
		execCommand:function () {
			var dialog = new UE.ui.Dialog({
				iframeUrl:  this.options.fdtoolUrl + "/checkbox"   ,
				name:thePlugins,
				editor:this,
				title: '复选框',
				cssRules:"width:700px;height:500px;",
				buttons:[
				{
					className:'edui-okbutton',
					label:'确定',
					onclick:function () {
						dialog.close(true);
					}
				},
				{
					className:'edui-cancelbutton',
					label:'取消',
					onclick:function () {
						dialog.close(false);
					}
				}]
			});
			dialog.render();
			dialog.open();
		}
	};
    // popup
	var popup = new baidu.editor.ui.Popup( {
		editor:this,
		content: '',
		className: 'edui-bubble',
		_edittext: function () {
			  baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
			  me.execCommand(thePlugins);
			  this.hide();
		},
		_delete:function(){
			if( window.confirm('确认删除该控件吗？') ) {
				baidu.editor.dom.domUtils.remove(this.anchorEl,false);
			}
			this.hide();
		}
	} );
	popup.render();
    //
	me.addListener( 'mouseover', function( t, evt ) {
		evt = evt || window.event;
		var el = evt.target || evt.srcElement;
    var tagType = el.getAttribute('tagType');
		if ( /span/ig.test( el.tagName ) && tagType == thePlugins) {
			var html = popup.formatHtml(
				'<nobr>复选框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>' );
			if ( html ) {
				popup.getDom( 'content' ).innerHTML = html;
				popup.anchorEl = el;
				popup.showAnchor( popup.anchorEl );
			} else {
				popup.hide();
			}
		}
	});
}; 

/**
 * datepick
 */
UE.plugins['datepick'] = function () {
	var me = this ;
    var thePlugins = 'datepick';
	me.commands[thePlugins] = {
		execCommand:function () {
			var dialog = new UE.ui.Dialog({
				iframeUrl:  this.options.fdtoolUrl + "/datepick"   ,
				name:thePlugins,
				editor:this,
				title: '日期控件',
				cssRules:"width:700px;height:500px;",
				buttons:[
				{
					className:'edui-okbutton',
					label:'确定',
					onclick:function () {
						dialog.close(true);
					}
				},
				{
					className:'edui-cancelbutton',
					label:'取消',
					onclick:function () {
						dialog.close(false);
					}
				}]
			});
			dialog.render();
			dialog.open();
		}
	};
    // popup
	var popup = new baidu.editor.ui.Popup( {
		editor:this,
		content: '',
		className: 'edui-bubble',
		_edittext: function () {
			  baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
			  me.execCommand(thePlugins);
			  this.hide();
		},
		_delete:function(){
			if( window.confirm('确认删除该控件吗？') ) {
				baidu.editor.dom.domUtils.remove(this.anchorEl,false);
			}
			this.hide();
		}
	} );
	popup.render();
    //
	me.addListener( 'mouseover', function( t, evt ) {
		evt = evt || window.event;
		var el = evt.target || evt.srcElement;
    var tagType = el.getAttribute('tagType');
		if ( /input/ig.test( el.tagName ) && tagType == thePlugins) {
			var html = popup.formatHtml(
				'<nobr>日期控件: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>' );
			if ( html ) {
				popup.getDom( 'content' ).innerHTML = html;
				popup.anchorEl = el;
				popup.showAnchor( popup.anchorEl );
			} else {
				popup.hide();
			}
		}
	});
}; 

/**
 * select
 */
UE.plugins['select'] = function () {
	var me = this ;
    var thePlugins = 'select';
	me.commands[thePlugins] = {
		execCommand:function () {
			var dialog = new UE.ui.Dialog({
				iframeUrl:  this.options.fdtoolUrl + "/select"   ,
				name:thePlugins,
				editor:this,
				title: '下拉框控件',
				cssRules:"width:700px;height:500px;",
				buttons:[
				{
					className:'edui-okbutton',
					label:'确定',
					onclick:function () {
						dialog.close(true);
					}
				},
				{
					className:'edui-cancelbutton',
					label:'取消',
					onclick:function () {
						dialog.close(false);
					}
				}]
			});
			dialog.render();
			dialog.open();
		}
	};
    // popup
	var popup = new baidu.editor.ui.Popup( {
		editor:this,
		content: '',
		className: 'edui-bubble',
		_edittext: function () {
			  baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
			  me.execCommand(thePlugins);
			  this.hide();
		},
		_delete:function(){
			if( window.confirm('确认删除该控件吗？') ) {
				baidu.editor.dom.domUtils.remove(this.anchorEl,false);
			}
			this.hide();
		}
	} );
	popup.render();
    //
	me.addListener( 'mouseover', function( t, evt ) {
		evt = evt || window.event;
		var el = evt.target || evt.srcElement;
    var tagType = el.getAttribute('tagType');
		if ( /span/ig.test( el.tagName ) && tagType == thePlugins) {
			var html = popup.formatHtml(
				'<nobr>下拉框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>' );
			if ( html ) {
				popup.getDom( 'content' ).innerHTML = html;
				popup.anchorEl = el;
				popup.showAnchor( popup.anchorEl );
			} else {
				popup.hide();
			}
		}
	});
}; 

/**
 * 列表控件
 * @command listctrl
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'qrcode');
 * ```
 */
UE.plugins['listctrl'] = function () {
    var me = this,thePlugins = 'listctrl';
    me.commands[thePlugins] = {
        execCommand:function () {
            var dialog = new UE.ui.Dialog({
                iframeUrl:this.options.UEDITOR_HOME_URL + UE.formDesignUrlNamespace +'/listctrl.html',
                name:thePlugins,
                editor:this,
                title: '列表控件',
                cssRules:"width:800px;height:400px;",
                buttons:[
                {
                    className:'edui-okbutton',
                    label:'确定',
                    onclick:function () {
                        dialog.close(true);
                    }
                },
                {
                    className:'edui-cancelbutton',
                    label:'取消',
                    onclick:function () {
                        dialog.close(false);
                    }
                }]
            });
            dialog.render();
            dialog.open();
        }
    };
    var popup = new baidu.editor.ui.Popup( {
        editor:this,
        content: '',
        className: 'edui-bubble',
        _edittext: function () {
              baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
              me.execCommand(thePlugins);
              this.hide();
        },
        _delete:function(){
            if( window.confirm('确认删除该控件吗？') ) {
                baidu.editor.dom.domUtils.remove(this.anchorEl,false);
            }
            this.hide();
        }
    } );
    popup.render();
    me.addListener( 'mouseover', function( t, evt ) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        var leipiPlugins = el.getAttribute('leipiplugins');
        if ( /input/ig.test( el.tagName ) && leipiPlugins==thePlugins) {
            var html = popup.formatHtml(
                '<nobr>列表控件: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>' );
            if ( html ) {
                popup.getDom( 'content' ).innerHTML = html;
                popup.anchorEl = el;
                popup.showAnchor( popup.anchorEl );
            } else {
                popup.hide();
            }
        }
    });
};

UE.plugins['error'] = function () {
    var me = this,thePlugins = 'error';
    me.commands[thePlugins] = {
        execCommand:function () {
            var dialog = new UE.ui.Dialog({
                iframeUrl:this.options.UEDITOR_HOME_URL + UE.formDesignUrlNamespace +'/error.html',
                name:thePlugins,
                editor:this,
                title: '异常提示',
                cssRules:"width:400px;height:130px;",
                buttons:[
                {
                    className:'edui-okbutton',
                    label:'确定',
                    onclick:function () {
                        dialog.close(true);
                    }
                }]
            });
            dialog.render();
            dialog.open();
        }
    };
};

UE.plugins['select_template'] = function () {
    var me = this,thePlugins = 'select_template';
    me.commands[thePlugins] = {
        execCommand:function () {
            var dialog = new UE.ui.Dialog({
                iframeUrl:  this.options.fdtoolUrl   + "/select-template"  ,
                name:thePlugins,
                editor:this,
                title: '表单模板',
                cssRules:"width:640px;height:380px;",
                buttons:[
                {
                    className:'edui-okbutton',
                    label:'确定',
                    onclick:function () {
                        dialog.close(true);
                    }
                }]
            });
            dialog.render();
            dialog.open();
        }
    };
};

///////////////////////////////////registerUI//////////////////////////////////////


UE.registerUI('button_select_template',function(editor,uiName){
	return ;
    if(!this.options.fdtoolshow)
    {
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            try {
                formDesign.exec('select_template');
            } catch ( e ) {
                alert('打开模板异常');
            		}
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"表单模板",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -339px -40px;',
        //点击时执行的命令
        onclick:function () {
            //这里可以不用执行命令,做你自己的操作也可
           editor.execCommand(uiName);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
});

UE.registerUI('button_preview',function(editor,uiName){
    if(!this.options.fdtoolshow)
    {
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            try {
                formDesign.fnReview();
            } catch ( e ) {
                alert('formDesign.fnReview 预览异常');
            }
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"预览",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -420px -19px;',
        //点击时执行的命令
        onclick:function () {
            //这里可以不用执行命令,做你自己的操作也可
           editor.execCommand(uiName);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
});

UE.registerUI('button_save',function(editor,uiName){
    if(!this.options.fdtoolshow)
    {
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            try {
                formDesign.fnCheckForm('save');
            } catch ( e ) {
               // alert('formDesign.fnCheckForm("save") 保存异常');
            }
            
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"保存表单",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -481px -20px;',
        //点击时执行的命令
        onclick:function () {
            //这里可以不用执行命令,做你自己的操作也可
           editor.execCommand(uiName);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
});
