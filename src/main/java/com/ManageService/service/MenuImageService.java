package com.ManageService.service;

import com.ManageService.dao.FileEntityMapper;
import com.ManageService.dao.MenuPictureEntityMapper;
import com.ManageService.entity.FileEntity;
import com.ManageService.entity.MenuPictureEntity;
import com.ManageService.model.ResultModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

@Service
public class MenuImageService {

    @Autowired
    private FileEntityMapper fileEntityMapper;
    @Autowired
    private MenuPictureEntityMapper menuPictureEntityMapper;

    public ResultModel insertMenuImage(Map<String,Object> params) {
        String fileId = params.get("fileId").toString();
        FileEntity fileEntity = fileEntityMapper.selectByPrimaryKey(fileId);
        if (fileEntity == null) {
            return new ResultModel(ResultModel.STATUS.ERROR,"添加图片失败","");
        }
        String imagePath = fileEntity.getPath();
        MenuPictureEntity menuPictureEntity = new MenuPictureEntity();
        menuPictureEntity.setMenu(params.get("menu").toString());
        menuPictureEntity.setSequence(Long.valueOf(params.get("sequence").toString()));
        menuPictureEntity.setPicture(imagePath);
        menuPictureEntity.setCreateTime(new Date());
        menuPictureEntity.setUpdateTime(new Date());
        if (menuPictureEntityMapper.insert(menuPictureEntity) != 1){
            return new ResultModel(ResultModel.STATUS.ERROR,"添加图片失败","");
        }
        return new ResultModel(ResultModel.STATUS.OK,"","");
    }
}
