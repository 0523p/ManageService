package com.ManageService.common;

import com.ManageService.entity.SystemUser;
import org.apache.shiro.SecurityUtils;

public class SingletonBean {

    public static SystemUser getSystemUser() {
        SystemUser systemUser = (SystemUser) SecurityUtils.getSubject().getSession().getAttribute("session_user");
        return systemUser;
    }

}
