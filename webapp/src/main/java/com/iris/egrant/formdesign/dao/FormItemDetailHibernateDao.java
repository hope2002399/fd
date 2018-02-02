package com.iris.egrant.formdesign.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.iris.egrant.core.dao.hibernate.SimpleHibernateDao;
import com.iris.egrant.formdesign.model.FormItemDetail;

@Repository
public class FormItemDetailHibernateDao extends SimpleHibernateDao<FormItemDetail, Long> {

	/**
	 *    删除模板内的参数项
	 * @param templateId 模板id
	 */
	public void deleteByTemplateId(Long templateId) {
	 super.update("delete from template_item_detail   where  template_id = ? ", new Object[]{templateId}) ; 
	}

	@SuppressWarnings("unchecked")
	public List<FormItemDetail> getItemListByAsc(Long templateId) {
		String queryString = "select t  from FormItemDetail t where t.templateId = :templateId order by t.id asc  ";
		return super.createQuery(queryString).setParameter("templateId", templateId).list() ;
	}
	
}
