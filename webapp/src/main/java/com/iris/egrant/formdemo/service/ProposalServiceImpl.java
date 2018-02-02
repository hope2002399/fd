package com.iris.egrant.formdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iris.egrant.core.utils.xml.XMLHelper;
import com.iris.egrant.formdemo.dao.ProposalHibernateDao;
import com.iris.egrant.formdemo.model.Proposal;

@Service("proposalService")
public class ProposalServiceImpl implements ProposalService {
	
	@Autowired
	private ProposalHibernateDao proposalHibernateDao ;

	@Override
	@Transactional(readOnly=true)
	public Proposal getProposalById(Long prpCode) {
		return proposalHibernateDao.get(prpCode) ;
	}

	@Override
	@Transactional(readOnly=true)
	public List<Proposal> getProposalAll() {
		return proposalHibernateDao.getAll();
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public Long saveProposal(Long prpCode, String xmlData) {
	  Proposal p = 	proposalHibernateDao.get(prpCode) ;
	  if (p == null){
		  p = new Proposal() ;
	    }
	  p.setZhTitle(XMLHelper.getNodeValueFromXML(xmlData, "/data/proposal/zh_title"));  // 项目名称
	  p.setXml(xmlData);
	  proposalHibernateDao.save(p);
		return p.getPrpCode();
	}
}