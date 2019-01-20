package com.ManageService.controller;

import com.ManageService.common.CommonTools;
import com.ManageService.model.ResultModel;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @RequestMapping("/login")
    public String login(String loginName, String pwd) {
        if (loginName == null) {
            return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.ERROR, "账号错误", ""));
        }

        UsernamePasswordToken token = new UsernamePasswordToken(loginName, pwd,false);
        Subject currentUser = SecurityUtils.getSubject();
        try {
            currentUser.login(token);
        } catch(IncorrectCredentialsException e) {
            //这最好把 所有的 异常类型都背会
            return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.ERROR, "密码错误", ""));
        } catch (AuthenticationException e) {
            return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.ERROR, "账号不存在或密码错误", ""));
        } catch (Exception e) {
            return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.ERROR, "登录失败", ""));
        }

        return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.OK, "", ""));
    }
}
