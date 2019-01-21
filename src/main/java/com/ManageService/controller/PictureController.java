package com.ManageService.controller;

import com.ManageService.common.CommonTools;
import com.ManageService.common.DataTablePager;
import com.ManageService.entity.FileEntity;
import com.ManageService.model.ResultModel;
import com.ManageService.service.PictureService;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/picture")
public class PictureController {

    @Autowired
    private PictureService pictureService;

    /**
     * 图片上传接口
     * @param request
     * @return
     */
    @RequestMapping(value = "/uploadPic")
    public String readExcel(HttpServletRequest request) {
        String formData = request.getParameter("formData");
        Map<String, Object> params = CommonTools.jsonToObject(formData, Map.class);
        ResultModel resultModel = pictureService.insertMenuImage(params);
        return CommonTools.objectToJson(resultModel);
    }

    @RequestMapping("/selectAll")
    public String selectAll(HttpServletRequest request) {
        String formData = request.getParameter("formData");
        Map<String, String> params = CommonTools.jsonToObject(formData, Map.class);

        //分页处理
        int iDisplayStart = CommonTools.stringToNumber(request.getParameter("iDisplayStart"));
        int iDisplayLength = CommonTools.stringToNumber(request.getParameter("iDisplayLength"));
        String sEcho = request.getParameter("sEcho");
        int startNum = iDisplayStart / iDisplayLength + 1;
        PageHelper.startPage(startNum, iDisplayLength);
        List<FileEntity> records = pictureService.selectAll(params);
        DataTablePager pager = new DataTablePager();
        pager.setDataResult(records);
        pager.setiTotalRecords(records.size());
        pager.setiTotalDisplayRecords(records.size());
        pager.setiDisplayLength(iDisplayLength);
        pager.setsEcho(sEcho);
        return CommonTools.objectToJson(pager);
    }

    /**
     * 删除图片接口
     * @param request
     * @return
     */
    @RequestMapping("/deletePicture")
    public String deletePicture(HttpServletRequest request) {
        String fileId = request.getParameter("id");
        ResultModel resultModel = pictureService.deletePic(fileId);
        return CommonTools.objectToJson(resultModel);
    }

}
