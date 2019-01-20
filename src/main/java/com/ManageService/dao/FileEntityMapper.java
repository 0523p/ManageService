package com.ManageService.dao;


import com.ManageService.entity.FileEntity;

import java.util.List;

public interface FileEntityMapper {
    int deleteByPrimaryKey(String id);

    int insert(FileEntity record);

    FileEntity selectByPrimaryKey(String id);

    List<FileEntity> selectAll();

    int updateByPrimaryKey(FileEntity record);
}