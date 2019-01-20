package com.ManageService.service;

import com.ManageService.dao.SystemUserMapper;
import com.ManageService.entity.SystemUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private SystemUserMapper systemUserMapper;

    public SystemUser selectByLoginName(String loginName) {
        return systemUserMapper.selectByLoginName(loginName);
    }

    public boolean updatePassword(SystemUser systemUser) {
        if(systemUserMapper.updatePassword(systemUser) == 1)
            return true;
        return false;
    }
}
