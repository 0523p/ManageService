package com.ManageService.shiro;

import com.ManageService.common.CommonTools;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.servlet.AdviceFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Component
public class AjaxFilter extends AdviceFilter {
    private Logger logger = LoggerFactory.getLogger(AjaxFilter.class);

    @Override
    protected boolean preHandle(ServletRequest req, ServletResponse resp) throws Exception {
        HttpServletRequest request = (HttpServletRequest)req;
        HttpServletResponse response = (HttpServletResponse)resp;
        String url = request.getRequestURI();
        String requestType = request.getHeader("X-Requested-With");
        if("XMLHttpRequest".equals(requestType)){
            if (!url.equals("/doLogin") && !url.equals("/login/login") && !url.startsWith("/interactive")) {
                Subject subject = SecurityUtils.getSubject();
                boolean isAuthc = subject.isAuthenticated();
                if(!isAuthc){
                    logger.info("current user shiro isAuthenticated error!");
                    Map<String, String> map = new HashMap<>();
                    map.put("shiroSessionStatus", "timeout");
                    response.setCharacterEncoding("UTF-8");
                    response.setContentType("application/json");
                    response.getWriter().write(CommonTools.objectToJson(map));;
                    return false;
                }
            }
            return true;
        }
        return super.preHandle(request, response);
    }

    @Override
    protected void postHandle(ServletRequest request, ServletResponse response) throws Exception {
        super.postHandle(request, response);
    }

    @Override
    public void afterCompletion(ServletRequest request, ServletResponse response, Exception exception) throws Exception {
        super.afterCompletion(request, response, exception);
    }

}
