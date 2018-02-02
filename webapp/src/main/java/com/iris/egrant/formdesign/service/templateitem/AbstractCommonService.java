package com.iris.egrant.formdesign.service.templateitem;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.iris.egrant.formdesign.dao.FormItemDetailHibernateDao;
import com.iris.egrant.formdesign.model.FormItemDetail;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;

/**
 *    通用的逻辑抽象
 * @author cg
 *
 */
public abstract class AbstractCommonService implements TemplateItemByTagTypeService {
	
	protected final  Logger log = LoggerFactory.getLogger(this.getClass()) ;
	
	@Autowired
	private Configuration configuration; 

	@Autowired
	protected FormItemDetailHibernateDao formItemDetailHibernateDao ;
	
	private String valueXpath = "<x:out select='$xmlData/data/%s' />" ;

	/**
	 * Text和TextArea处理 
	 */
	@Override
	@Transactional(rollbackFor = Exception.class )
	public void parseAndSave(Long templateId , JSONObject JSONObject) {
		// 关键字段拆分
		FormItemDetail fid = new FormItemDetail() ;
		fid.setTemplateId(templateId);
		fid.setTagType(JSONObject.getString("tagtype"));
		fid.setTagLabel(JSONObject.getString("taglabel"));
		fid.setTagName(JSONObject.getString("tagname"));
		fid.setTagId(JSONObject.getString("tagid"));
		fid.setTagClass(JSONObject.getString("tagclass"));
		// 其他属性合并到 other字段
		String tagstyle = JSONObject.getString("tagstyle") ;
		String tagmaxlength = JSONObject.getString("tagmaxlength") ;
		String  otherAttrJsonStr  =	JSONObject.getString("tagotherattrs") ;
		if (StringUtils.isBlank(otherAttrJsonStr)){
			otherAttrJsonStr = "{}" ;
		}
		JSONObject  o  = JSON.parseObject(otherAttrJsonStr);
		o.put("style", tagstyle) ;
		o.put("maxlength", tagmaxlength) ;
		fid.setTagOtherAttrs(o.toJSONString());
		formItemDetailHibernateDao.save(fid);
	}
	
	protected Configuration getFreemarkerConfiguration(){
		return configuration;
	}
	
	/**
	 * freemarker解析item 得到html字符串
	 * @param ftlName ftl名词
	 * @param map 参数map
	 * @return
	 */
	protected String freemarkerRender(String  ftlName, Map<String, Object> map ){
		Writer writer = new StringWriter() ;
		String errMsg = "" ;
		try {
			Template t = configuration.getTemplate( ftlName ,  "UTF-8" );  // ftl
		  t.process(map, writer);
		} catch (TemplateNotFoundException | MalformedTemplateNameException | ParseException | TemplateException  e) {
			errMsg = e.getMessage() ;
			e.printStackTrace();
		} catch (IOException e) {
			errMsg = e.getMessage() ;
			e.printStackTrace();
		}
		
		if (StringUtils.isNotBlank(errMsg)){
		  log.error(String.format("TemplateItem解析出错，参数：%s",  map ));
			throw new RuntimeException() ;
		}
		return writer.toString();
	}
	
	/**
	 *  默认实现
	 */
	@Override
	public String getTagValueXout(String name){
		return String.format(valueXpath,  name) ;
	}
	
}
