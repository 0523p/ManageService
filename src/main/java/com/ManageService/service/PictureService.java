package com.ManageService.service;

import com.ManageService.common.CommonTools;
import com.ManageService.dao.FileEntityMapper;
import com.ManageService.dao.MenuPictureEntityMapper;
import com.ManageService.entity.FileEntity;
import com.ManageService.entity.MenuPictureEntity;
import com.ManageService.model.ResultModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class PictureService {

    @Autowired
    private FileEntityMapper fileEntityMapper;

    @Autowired
    private MenuPictureEntityMapper menuPictureEntityMapper;


    public ResultModel insertMenuImage(Map<String,Object> params) {
        String fileId = params.get("fileId").toString();
        FileEntity fileEntity = fileEntityMapper.selectByPrimaryKey(fileId);
        if (fileEntity == null) {
            return new ResultModel(ResultModel.STATUS.ERROR,"添加图片失败",null);
        }
        String imagePath = fileEntity.getPath();
        MenuPictureEntity menuPictureEntity = new MenuPictureEntity();
        menuPictureEntity.setGuid(CommonTools.getUUID32());
        menuPictureEntity.setMenu(params.get("menu").toString());
        menuPictureEntity.setPictureId(fileId);
        menuPictureEntity.setCreateTime(new Date());
        if (menuPictureEntityMapper.insert(menuPictureEntity) != 1){
            return new ResultModel(ResultModel.STATUS.ERROR,"添加图片失败",null);
        }
        return new ResultModel(ResultModel.STATUS.OK,"",null);
    }

    public List<FileEntity> selectAll(Map<String, String> params) {
        return menuPictureEntityMapper.selectAll(params);
    }

}
