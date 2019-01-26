package com.ManageService.service;

import com.ManageService.dao.FileEntityMapper;
import com.ManageService.dao.NoticeMapper;
import com.ManageService.entity.FileEntity;
import com.ManageService.entity.VillageNotice;
import com.ManageService.model.ResultModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.List;
import java.util.Map;

@Service
public class NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

    @Autowired
    private FileEntityMapper fileEntityMapper;

    /**
     * 选出小区信息栏信息
     * @return
     */
    public List<VillageNotice> selectAll(Map<String, String> params) {
        return noticeMapper.selectAll(params);
    }


    /**
     * 添加小区信息栏公告
     * @param
     * @return
     */
    public boolean addNotice(VillageNotice villageNotice) {
        if (noticeMapper.insert(villageNotice) == 1) {
            return true;
        }else {
            return false;
        }
    }

    /**
     * 更新小区信息公告
     * @param villageNotice
     * @return
     */
    public boolean updateNotice(VillageNotice villageNotice) {
        if (noticeMapper.update(villageNotice) == 1)
            return true;
        return false;
    }

    /**
     * 删除信息
     * @param villageNotice
     * @return
     */
    @Transactional
    public ResultModel delete(VillageNotice villageNotice) {
        FileEntity fileEntity = fileEntityMapper.selectByPrimaryKey(villageNotice.getFileId());

        File file = new File(fileEntity.getPath());
        if (file.exists())
            file.delete();

        if (fileEntityMapper.deleteByPrimaryKey(fileEntity.getId()) == 1 && noticeMapper.deleteByPrimaryKey(villageNotice.getGuid()) == 1)
            return new ResultModel(ResultModel.STATUS.OK,"删除成功","");
        return new ResultModel(ResultModel.STATUS.ERROR,"删除失败","");
    }

}
