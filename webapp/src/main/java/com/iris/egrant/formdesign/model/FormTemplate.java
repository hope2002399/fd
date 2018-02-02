package com.iris.egrant.formdesign.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *   模板
 * @author cg
 *
 */
@Entity
@Table(name="FORM_TEMPLATE")
public class FormTemplate implements Serializable {
 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1987109710457701766L;

	/**
	 * 自增主键，PK
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id ;
	
	/**
	 * 模板类型，见const_dictionary.category=‘form_template_type’
	 */
	@Column(name = "TYPE")
	private String type ;
	
	/**
	 * 名称
	 */
	@Column(name = "NAME")
	private String name	 ;
	
	/**
	 * 原html
	 */
	@Column(name = "TEMPLATE")
	private String template ;
	
	/**
	 * 解析后的表单模板，含占位符
	 */
	@Column(name = "TEMPLATE_PARSE")
	private String templateParse ;
	
	/**
	 * 页面javascript脚本
	 */
	@Column(name = "SCRIPT")
	private String script ;
	
	/**
	 * 页面初始化javascript脚本
	 */
	@Column(name = "INIT_SCRIPT")
	private String initScript ;
	
	/**
	 * 填写检查javascript脚本
	 */
	@Column(name = "CHECK_SCRIPT")
	private String checkScript ;
	
	/**
	 * 创建日期
	 */
	@Column(name = "CREATE_DATE")
	private Date createDate ;
	
	/**
	 * 创建人
	 */
	@Column(name = "CREATE_PSN_CODE")
	private Long createPsnCode ;
	
	/**
	 * 最后更新日期
	 */
	@Column(name = "UPDATE_DATE")
	private Date updateDate ;
	
	/**
	 * 最后更新人
	 */
	@Column(name = "UPDATE_PSN_CODE")
	private Long updatePsnCode ;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}

	public String getTemplateParse() {
		return templateParse;
	}

	public void setTemplateParse(String templateParse) {
		this.templateParse = templateParse;
	}

	public String getScript() {
		return script;
	}

	public void setScript(String script) {
		this.script = script;
	}

	public String getInitScript() {
		return initScript;
	}

	public void setInitScript(String initScript) {
		this.initScript = initScript;
	}

	public String getCheckScript() {
		return checkScript;
	}

	public void setCheckScript(String checkScript) {
		this.checkScript = checkScript;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Long getCreatePsnCode() {
		return createPsnCode;
	}

	public void setCreatePsnCode(Long createPsnCode) {
		this.createPsnCode = createPsnCode;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public Long getUpdatePsnCode() {
		return updatePsnCode;
	}

	public void setUpdatePsnCode(Long updatePsnCode) {
		this.updatePsnCode = updatePsnCode;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
