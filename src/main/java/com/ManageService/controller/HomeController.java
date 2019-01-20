package com.ManageService.controller;

import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/")
public class HomeController {

    @RequestMapping("/home")
    public String home() {
        return "home";
    }

    @RequestMapping("/doLogin")
    public String login() {
        return "login";
    }

    @RequestMapping("/change")
    public String changeMenu(HttpServletRequest request) {
        return "menu/" + request.getParameter("page");
    }

    @RequestMapping("/logout")
    public String logout() {
        try {
            SecurityUtils.getSubject().logout();
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return "login";
    }
}
