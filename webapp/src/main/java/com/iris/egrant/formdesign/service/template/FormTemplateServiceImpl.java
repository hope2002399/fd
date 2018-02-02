package com.iris.egrant.formdesign.service.template;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.iris.egrant.formdesign.dao.FormItemDetailHibernateDao;
import com.iris.egrant.formdesign.dao.FormTemplateHibernateDao;
import com.iris.egrant.formdesign.model.FormItemDetail;
import com.iris.egrant.formdesign.model.FormTemplate;
import com.iris.egrant.formdesign.service.templateitem.TemplateItemByTagTypeService;


@Service("formTemplateService")
public class FormTemplateServiceImpl implements FormTemplateService {
	
	private static final String ITEM_PLACEHOLDER_PREFIX = "{template_item_%s}" ;
	
	@Autowired
	private FormItemDetailHibernateDao formItemDetailHibernateDao ;
	
	@Autowired
	
	private FormTemplateHibernateDao  formTemplateHibernateDao;
	
	@Autowired
	private TagTypeServiceCacheBean tagTypeServiceCacheBean;
	
	@Override
	@Transactional(rollbackFor = Exception.class )
	public Long templateSave(Long templateId, String type,  String templateAttr, String parseFormStr) {
	    	  // 1 解析 属性信息
		    JSONObject  templateAttrObj = JSON.parseObject(templateAttr);
		    String name =  templateAttrObj.getString("name") ;
		    String script =  templateAttrObj.getString("script") ;
		    String initScript =  templateAttrObj.getString("init_script") ;
		    String checkScript =  templateAttrObj.getString("check_script") ;
		    
			 // 2 解析 表单详细信息
			  JSONObject parseFormObj  =  JSON.parseObject(parseFormStr) ;
				// 完整的html
			  String template =  parseFormObj.getString("template") ;
				// 解析后的html 含有占位符
			  String templateParse  = parseFormObj.getString("template_parse") ;
			  // 字段属性数组
			  JSONArray attrObjArr = parseFormObj.getJSONArray("attr_obj_arr") ;
			  
			  // 保存FormTemplate
			  FormTemplate ft ;
			  if (templateId == null || templateId == 0L){
				  ft = new FormTemplate() ;
				  ft.setCreateDate(new Date());
				  ft.setCreatePsnCode(0L);  // TODO 暂写 根据业务具体设置
			  }else{
				  ft = formTemplateHibernateDao.get(templateId) ;
			  	 }
			   ft.setType(type);  
			   ft.setName(name); 
			   ft.setTemplate(template);
			   ft.setTemplateParse(templateParse);
			   ft.setScript(script );  
			   ft.setInitScript(initScript );  
			   ft.setCheckScript(checkScript); 
			   ft.setUpdateDate(new Date());
				 ft.setUpdatePsnCode(0L); // TODO 暂写 根据业务具体设置
			   formTemplateHibernateDao.save(ft);
			   templateId = ft.getId() ;
			   // 
			   if (templateId != null ){
					formItemDetailHibernateDao.deleteByTemplateId(templateId) ; 
				}
			  // 3 遍历数组   保存表单项属性对象
			  int size = attrObjArr.size() ;
			  for(int i = 0 ; i < size ; i++ ){
				   // 每一个字段属性对象
				  JSONObject attrObj = attrObjArr.getJSONObject(i) ;
				  // 获取tagType
				  String tagType =  attrObj.getString("tagtype") ;
				  TemplateItemByTagTypeService s = getServiceBeanByTagType(tagType);
				  // 解析并保存 属性对象
				  s.parseAndSave( templateId , attrObj);
			  	}
			  return  templateId ;
	}

	@Override
	@Transactional(rollbackFor = Exception.class ,readOnly=true )
	public List<FormTemplate> getTemplateByType(String type) {
		return formTemplateHibernateDao.getTemplateByType(type) ;
	}

	@Override
	@Transactional(rollbackFor = Exception.class ,readOnly=true )
	public FormTemplate getTemplateById(Long templateId) {
		return  formTemplateHibernateDao.get(templateId) ;
	}


	
	@Override
	@Transactional(rollbackFor = Exception.class ,readOnly=true )
	public FormTemplate getRenderFormTemplate(Long templateId) {
		// 查询到FormTemplate记录
		FormTemplate ft = getTemplateById(templateId) ;
		//按照主健顺序递增、查询到所有的FormItemDetail 
		List<FormItemDetail> itemList = getItemAsc(templateId);
		// 占位符 数组
		String[] placeHolderArr = new String[itemList.size()] ;
		// 字段  数组
	  String[] itemStringArr = new String[itemList.size()] ;
		 //  遍历 拼凑html、initScript、checkScript 
		for (int i = 0; i < itemList.size(); i++) {
			// placeHolder
			placeHolderArr[i] = String.format(ITEM_PLACEHOLDER_PREFIX ,  i+1 ) ;
	  	// itemString
			FormItemDetail item = itemList.get(i);
			 // 获取tagType
		  String tagType = item.getTagType();
			  //根据对应的tagType 找到处理类
			TemplateItemByTagTypeService s = getServiceBeanByTagType(tagType);
			  // 解析并保存 属性对象
			String itemStr = s.renderItem(item) ;
		  itemStringArr[i] = itemStr ;
		}
		// 替换
		String html = StringUtils.replaceEach(ft.getTemplateParse(), placeHolderArr, itemStringArr) ;
		// set
		ft.setTemplateParse(html);
		return ft;
	}

	@Override
	@Transactional(rollbackFor = Exception.class ,readOnly=true )
	public List<FormItemDetail> getItemAsc(Long templateId) {
		List<FormItemDetail> itemList=  formItemDetailHibernateDao.getItemListByAsc(templateId ) ;
		return itemList;
	}

	private TemplateItemByTagTypeService getServiceBeanByTagType(String tagType) {
		TemplateItemByTagTypeService s = tagTypeServiceCacheBean.getBeanByTagType(tagType) ;
		return s;
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateScript(Long templateId, String scriptJsonStr) {
	 JSONObject o  =  JSON.parseObject(scriptJsonStr) ;
	 String  script =  o.getString("script") ;
	 String  initScript =  o.getString("init_script") ;
	 String  checkScript =  o.getString("check_script") ;
	 return formTemplateHibernateDao.updateScript(templateId ,  script , initScript ,checkScript) ;
	}

}
