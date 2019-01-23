package com.ManageService.dao;

import com.ManageService.entity.VillageNotice;

import java.util.List;

public interface VillageNoticeMapper {

    List<VillageNotice> selectAll();

    VillageNotice selectByKey(String guid);

    int insert(VillageNotice record);

    int update(VillageNotice record);

    int deleteByPrimaryKey(String guid);

}
