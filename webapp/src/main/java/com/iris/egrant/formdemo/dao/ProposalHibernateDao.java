package com.iris.egrant.formdemo.dao;

import org.springframework.stereotype.Repository;

import com.iris.egrant.core.dao.hibernate.SimpleHibernateDao;
import com.iris.egrant.formdemo.model.Proposal;

@Repository
public class ProposalHibernateDao  extends SimpleHibernateDao<Proposal, Long>{

}
