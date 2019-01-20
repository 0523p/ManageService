package com.ManageService.dao;

import com.ManageService.entity.SystemUser;

public interface SystemUserMapper {
    SystemUser selectByLoginName(String LoginName);

    int updatePassword(SystemUser systemUser);
}
