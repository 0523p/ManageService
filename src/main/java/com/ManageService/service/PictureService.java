package com.ManageService.service;

import com.ManageService.common.CommonTools;
import com.ManageService.dao.FileEntityMapper;
import com.ManageService.dao.PictureEntityMapper;
import com.ManageService.entity.FileEntity;
import com.ManageService.entity.MenuPictureEntity;
import com.ManageService.model.ResultModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class PictureService {

    @Autowired
    private FileEntityMapper fileEntityMapper;

    @Autowired
    private PictureEntityMapper pictureEntityMapper;

    /**
     * 添加图片
     * @param params
     * @return
     */
    public ResultModel insertMenuImage(Map<String,Object> params) {
        String fileId = params.get("fileId").toString();
        FileEntity fileEntity = fileEntityMapper.selectByPrimaryKey(fileId);
        if (fileEntity == null) {
            return new ResultModel(ResultModel.STATUS.ERROR,"添加图片失败",null);
        }
        MenuPictureEntity menuPictureEntity = new MenuPictureEntity();
        menuPictureEntity.setGuid(CommonTools.getUUID32());
        menuPictureEntity.setMenu(params.get("menu").toString());
        menuPictureEntity.setPictureId(fileId);
        menuPictureEntity.setCreateTime(new Date());
        if (pictureEntityMapper.insert(menuPictureEntity) != 1){
            return new ResultModel(ResultModel.STATUS.ERROR,"添加图片失败",null);
        }
        return new ResultModel(ResultModel.STATUS.OK,"",null);
    }

    /**
     * 删除图片接口
     * @param fileId
     * @return
     */
    @Transactional
    public ResultModel deletePic(String fileId) {
        FileEntity fileEntity = fileEntityMapper.selectByPrimaryKey(fileId);
        File file = new File(fileEntity.getPath());
        //删除存储在服务器上的图片文件
        if (file.delete()) {
            fileEntityMapper.deleteByPrimaryKey(fileId);
            pictureEntityMapper.deleteByPictureId(fileId);
            return new ResultModel(ResultModel.STATUS.OK,"删除成功","");
        }else {
            return new ResultModel(ResultModel.STATUS.ERROR,"删除失败","");
        }
    }

    /**
     * 选出属于该菜单的图片信息
     * @param params
     * @return
     */
    public List<FileEntity> selectAll(Map<String, String> params) {
        return pictureEntityMapper.selectAll(params);
    }

}
