package com.iris.egrant.formdemo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 *   申报书 demo
 * @author cg
 *
 */
@Entity
@Table(name="PROPOSAL")
public class Proposal {

	@Id
	@GeneratedValue
	@Column(name="PRP_CODE")
	private Long prpCode ;
	
	@Column(name="ZH_TITLE")
	private String zhTitle ;
	
	@Column(name="XML")
	private String xml ;

	public Long getPrpCode() {
		return prpCode;
	}

	public void setPrpCode(Long prpCode) {
		this.prpCode = prpCode;
	}

	public String getXml() {
		return xml;
	}

	public void setXml(String xml) {
		this.xml = xml;
	}

	public String getZhTitle() {
		return zhTitle;
	}

	public void setZhTitle(String zhTitle) {
		this.zhTitle = zhTitle;
	}
	
}
