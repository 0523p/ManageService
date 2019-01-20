package com.ManageService.service;

import com.ManageService.dao.CompanyInfoMapper;
import com.ManageService.entity.CompanyInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyInfoService {

    @Autowired
    private CompanyInfoMapper companyInfoMapper;

    public List<CompanyInfo> selectAll() {
        return companyInfoMapper.selectAll();
    }

    public boolean addCompany(CompanyInfo companyInfo) {
        if (companyInfoMapper.insert(companyInfo) != 1)
            return false;
        return true;
    }

    public boolean update(CompanyInfo companyInfo) {
        if (companyInfoMapper.update(companyInfo) != 1)
            return false;
        return true;
    }

    public boolean deleteByPrimaryKey(String guid) {
        if (companyInfoMapper.deleteByPrimaryKey(guid) != 1)
            return false;
        return true;
    }

}
