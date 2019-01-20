package com.ManageService.dao;

import com.ManageService.entity.CompanyInfo;

import java.util.List;

public interface CompanyInfoMapper {

    List<CompanyInfo> selectAll();

    int insert(CompanyInfo companyInfo);

    int update(CompanyInfo companyInfo);

    int deleteByPrimaryKey(String guid);

}
