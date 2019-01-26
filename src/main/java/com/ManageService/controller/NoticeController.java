package com.ManageService.controller;

import com.ManageService.common.CommonTools;
import com.ManageService.common.DataTablePager;
import com.ManageService.entity.VillageNotice;
import com.ManageService.model.ResultModel;
import com.ManageService.service.NoticeService;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notice")
public class NoticeController {
    @Autowired
    private NoticeService noticeService;

    /**
     * 获取信息列表
     * @param request
     * @return
     */
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
        List<VillageNotice> records = noticeService.selectAll(params);
        DataTablePager pager = new DataTablePager();
        pager.setDataResult(records);
        pager.setiTotalRecords(records.size());
        pager.setiTotalDisplayRecords(records.size());
        pager.setiDisplayLength(iDisplayLength);
        pager.setsEcho(sEcho);
        return CommonTools.objectToJson(pager);
    }

    /**
     * 添加公告
     * @param request
     * @return
     */
    @RequestMapping("/addNotice")
    public String addNotice(HttpServletRequest request) {
        String formData = request.getParameter("formData");
        VillageNotice villageNotice = CommonTools.jsonToObject(formData, VillageNotice.class);
        villageNotice.setGuid(CommonTools.getUUID32());
        villageNotice.setCreateTime(new Date());
        if (noticeService.addNotice(villageNotice)){
            return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.OK, "添加成功", ""));
        }
        return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.OK, "添加失败", ""));
    }

    /**
     * 更新公告
     * @param request
     * @return
     */
    @RequestMapping("/updateNotice")
    public String updateNotice(HttpServletRequest request) {
        String formData = request.getParameter("formData");
        VillageNotice villageNotice = CommonTools.jsonToObject(formData, VillageNotice.class);
        villageNotice.setUpdateTime(new Date());
        if (noticeService.updateNotice(villageNotice)){
            return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.OK, "修改成功", ""));
        }
        return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.ERROR, "修改失败", ""));
    }

    /**
     * 删除图片接口
     * @param request
     * @return
     */
    @RequestMapping("/delete")
    public String deletePicture(HttpServletRequest request) {
        String formData = request.getParameter("formData");
        VillageNotice villageNotice = CommonTools.jsonToObject(formData, VillageNotice.class);
        ResultModel resultModel = noticeService.delete(villageNotice);
        return CommonTools.objectToJson(resultModel);
    }

}
