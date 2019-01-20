package com.ManageService.controller;

import com.ManageService.common.CommonTools;
import com.ManageService.common.SingletonBean;
import com.ManageService.entity.SystemUser;
import com.ManageService.model.ResultModel;
import com.ManageService.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private LoginService loginService;

    @RequestMapping("/getSystemUser")
    public String getSystemUser() {
        return CommonTools.objectToJson(SingletonBean.getSystemUser());
    }

    @RequestMapping("/updatePassword")
    public String updatePassword(HttpServletRequest request) {
        String formData = request.getParameter("formData");
        SystemUser systemUser = CommonTools.jsonToObject(formData, SystemUser.class);
        ResultModel resultModel = null;
        if (loginService.updatePassword(systemUser)) {
            resultModel = new ResultModel(ResultModel.STATUS.OK, "密码修改成功", "");
        } else {
            resultModel = new ResultModel(ResultModel.STATUS.ERROR, "密码修改失败", "");
        }
        return CommonTools.objectToJson(resultModel);
    }
}
