package com.ManageService.controller;

import com.ManageService.common.CommonTools;
import com.ManageService.common.DataTablePager;
import com.ManageService.entity.CompanyInfo;
import com.ManageService.entity.VillageNotice;
import com.ManageService.model.ResultModel;
import com.ManageService.service.VillageNoticeService;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notice")
public class VillageNoticeController {
    @Autowired
    private VillageNoticeService noticeService;

    /**
     * 添加小区信息公告
     * @param request
     * @return
     */
    @RequestMapping("/addNotice")
    public String addNotice(HttpServletRequest request) {
        String formData = request.getParameter("formData");
        Map<String,String> params = CommonTools.jsonToObject(formData,Map.class);
        if (noticeService.addNotice(params)){
            return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.OK, "添加成功", ""));
        }
        return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.OK, "添加失败", ""));
    }

    /**
     * 更新小区信息公告
     * @param request
     * @return
     */
    @RequestMapping("/updateNotice")
    public String updateNotice(HttpServletRequest request) {
        String formData = request.getParameter("formData");
        Map<String,String> params = CommonTools.jsonToObject(formData,Map.class);
        if (noticeService.updateNotice(params)){
            return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.OK, "添加成功", ""));
        }
        return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.OK, "添加失败", ""));
    }
    /**
     * 删除小区信息栏信息
     * @param request
     * @return
     */
    @RequestMapping("/selectAll")
    public String selectAll(HttpServletRequest request) {
        //分页处理
        int iDisplayStart = CommonTools.stringToNumber(request.getParameter("iDisplayStart"));
        int iDisplayLength = CommonTools.stringToNumber(request.getParameter("iDisplayLength"));
        String sEcho = request.getParameter("sEcho");
        int startNum = iDisplayStart / iDisplayLength + 1;
        PageHelper.startPage(startNum, iDisplayLength);
        List<VillageNotice> records = noticeService.selectAll();
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
    @RequestMapping("/delete")
    public String deletePicture(HttpServletRequest request) {
        String guid = request.getParameter("guid");
        ResultModel resultModel = noticeService.delete(guid);
        return CommonTools.objectToJson(resultModel);
    }

}
