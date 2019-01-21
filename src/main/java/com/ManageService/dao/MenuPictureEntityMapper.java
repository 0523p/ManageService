package com.ManageService.dao;

import com.ManageService.entity.FileEntity;
import com.ManageService.entity.MenuPictureEntity;

import java.util.List;
import java.util.Map;

public interface MenuPictureEntityMapper {

    int insert(MenuPictureEntity record);

    List<FileEntity> selectAll(Map<String, String> params);
}