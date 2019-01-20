package com.ManageService.controller;

import com.ManageService.common.CommonTools;
import com.ManageService.common.DataTablePager;
import com.ManageService.entity.CompanyInfo;
import com.ManageService.model.ResultModel;
import com.ManageService.service.CompanyInfoService;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/company")
public class CompanyInfoController {

    @Autowired
    private CompanyInfoService companyInfoService;

    @RequestMapping("/selectAll")
    public String selectAll(HttpServletRequest request) {
        //分页处理
        int iDisplayStart = CommonTools.stringToNumber(request.getParameter("iDisplayStart"));
        int iDisplayLength = CommonTools.stringToNumber(request.getParameter("iDisplayLength"));
        String sEcho = request.getParameter("sEcho");
        int startNum = iDisplayStart / iDisplayLength + 1;
        PageHelper.startPage(startNum, iDisplayLength);
        List<CompanyInfo> records = companyInfoService.selectAll();
        DataTablePager pager = new DataTablePager();
        pager.setDataResult(records);
        pager.setiTotalRecords(records.size());
        pager.setiTotalDisplayRecords(records.size());
        pager.setiDisplayLength(iDisplayLength);
        pager.setsEcho(sEcho);
        return CommonTools.objectToJson(pager);
    }

    @RequestMapping("/addCompany")
    public String addCompany(HttpServletRequest request) {
        String formData = request.getParameter("formData");
        CompanyInfo companyInfo = CommonTools.jsonToObject(formData, CompanyInfo.class);
        companyInfo.setGuid(CommonTools.getUUID32());
        companyInfo.setCreateTime(new Date());
        if (companyInfoService.addCompany(companyInfo)) {
            return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.OK, "添加成功", ""));
        }
        return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.OK, "添加失败", ""));
    }

    @RequestMapping("/update")
    public String update(HttpServletRequest request) {
        String formData = request.getParameter("formData");
        CompanyInfo companyInfo = CommonTools.jsonToObject(formData, CompanyInfo.class);
        if (companyInfoService.update(companyInfo)) {
            return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.OK, "修改成功", ""));
        }
        return CommonTools.objectToJson(new ResultModel(ResultModel.STATUS.OK, "修改失败", ""));
    }

    @RequestMapping("/delete")
    public String delete(HttpServletRequest request) {
        String guid = request.getParameter("guid");
        ResultModel resultModel ;
        if (companyInfoService.deleteByPrimaryKey(guid)) {
            resultModel = new ResultModel(ResultModel.STATUS.OK, "删除成功", null);
        } else {
            resultModel = new ResultModel(ResultModel.STATUS.ERROR, "删除失败", null);
        }
        return CommonTools.objectToJson(resultModel);
    }
}
