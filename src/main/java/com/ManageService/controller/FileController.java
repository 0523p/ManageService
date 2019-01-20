package com.ManageService.controller;

import com.ManageService.config.SystemConfiguration;
import com.ManageService.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 文件上传管理类
 */
@RestController
@RequestMapping(value = "/file")
public class FileController {
    @Autowired
    private FileService fileService;
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

}
