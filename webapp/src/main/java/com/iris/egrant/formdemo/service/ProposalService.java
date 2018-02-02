package com.iris.egrant.formdemo.service;

import java.util.List;

import com.iris.egrant.formdemo.model.Proposal;

public interface ProposalService {
	
	/**
	 * id 查找
	 * @param prpCode
	 * @return
	 */
	Proposal	getProposalById(Long prpCode) ;
	
	/**
	 * 查询所有
	 * @return
	 */
	List<Proposal>	getProposalAll() ;
	
	/**
	 *   保存 
	 * @param prpCode 主健 新增时为null
	 * @param xmlData  xml数据
	 * @return  prpCode 主健 
	 */
	Long saveProposal(Long prpCode ,String xmlData) ;
}
