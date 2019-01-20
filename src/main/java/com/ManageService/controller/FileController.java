package com.ManageService.controller;

import com.ManageService.common.CommonTools;
import com.ManageService.config.SystemConfiguration;
import com.ManageService.model.ResultModel;
import com.ManageService.service.FileService;
import com.ManageService.service.MenuImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * 文件上传管理类
 */
@RestController
@RequestMapping(value = "/file")
public class FileController {
    @Autowired
    private FileService fileService;
    @Autowired
    private MenuImageService menuImageService;
    @Autowired
    private SystemConfiguration systemConfiguration;

    /**
     * 文件上传
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/upload")
    public void uploadFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
        fileService.uploadMultiFile(request, response);
    }

    /**
     * 图片上传接口
     * @param request
     * @return
     */
    @RequestMapping(value = "/uploadPic")
    public String readExcel(HttpServletRequest request) {
        String formData = request.getParameter("formData");
        Map<String, Object> params = CommonTools.jsonToObject(formData, Map.class);
        ResultModel resultModel = menuImageService.insertMenuImage(params);
        return CommonTools.getResultJson(resultModel);
    }

}
