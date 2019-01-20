package com.ManageService.dao;

import com.ManageService.entity.MenuPictureEntity;

import java.util.List;

public interface MenuPictureEntityMapper {
    int deleteByPrimaryKey(Long id);

    int insert(MenuPictureEntity record);

    MenuPictureEntity selectByPrimaryKey(Long id);

}