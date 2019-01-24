package com.ManageService.service;

import com.ManageService.common.CommonTools;
import com.ManageService.dao.FileEntityMapper;
import com.ManageService.dao.VillageNoticeMapper;
import com.ManageService.entity.FileEntity;
import com.ManageService.entity.VillageNotice;
import com.ManageService.model.ResultModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class VillageNoticeService {
    @Autowired
    private VillageNoticeMapper villageNoticeMapper;
    @Autowired
    private FileEntityMapper fileEntityMapper;
    /**
     * 添加小区信息栏公告
     * @param
     * @return
     */
    public boolean addNotice(Map<String,String> params) {
        VillageNotice notice = new VillageNotice();
        notice.setTitle(params.get("title"));
        notice.setDescription(params.get("description"));
        notice.setOwner(params.get("owner"));
        String fileId = params.get("pdf");
        FileEntity fileEntity = fileEntityMapper.selectByPrimaryKey(fileId);
        notice.setFileid(fileId);
        notice.setPdf(fileEntity.getPath());
        notice.setFile(params.get("file"));
        notice.setGuid(CommonTools.getUUID32());
        notice.setCreateTime(new Date());
        notice.setFlag("0");
        if (villageNoticeMapper.insert(notice) == 1) {
            return true;
        }else {
            return false;
        }
    }

    /**
     * 更新小区信息公告
     * @param params
     * @return
     */
    public boolean updateNotice(Map<String,String> params) {
        VillageNotice notice = new VillageNotice();
        notice.setTitle(params.get("title"));
        notice.setDescription(params.get("description"));
        notice.setOwner(params.get("owner"));
        String fileId = params.get("pdf");
        FileEntity fileEntity = fileEntityMapper.selectByPrimaryKey(fileId);
        notice.setFileid(fileId);
        notice.setPdf(fileEntity.getPath());
        notice.setFile(params.get("file"));
        notice.setGuid(params.get("guid"));
        notice.setFlag("0");
        if (villageNoticeMapper.update(notice) == 1) {
            return true;
        }else {
            return false;
        }
    }

    /**
     * 选出小区信息栏信息
     * @return
     */
    public List<VillageNotice> selectAll() {
        return villageNoticeMapper.selectAll();
    }

    /**
     * 删除小区信息栏信息
     * @param guid
     * @return
     */
    @Transactional
    public ResultModel delete(String guid) {
        VillageNotice notice = villageNoticeMapper.selectByKey(guid);
        File file = new File(notice.getPdf());
        //删除存储在服务器上的pdf文件
        if (file.delete()) {
            fileEntityMapper.deleteByPrimaryKey(notice.getFileid());
            villageNoticeMapper.deleteByPrimaryKey(guid);
            return new ResultModel(ResultModel.STATUS.OK,"删除成功","");
        }else {
            return new ResultModel(ResultModel.STATUS.ERROR,"删除失败","");
        }
    }
}
