package com.ManageService.dao;

import com.ManageService.entity.VillageNotice;

import java.util.List;
import java.util.Map;

public interface NoticeMapper {

    List<VillageNotice> selectAll(Map<String, String> params);

    VillageNotice selectByKey(String guid);

    int insert(VillageNotice record);

    int update(VillageNotice record);

    int deleteByPrimaryKey(String guid);

}
