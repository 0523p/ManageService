CREATE TABLE `system_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(45) NOT NULL,
  `pwd` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`login_name`),
  UNIQUE KEY `login_name_UNIQUE` (`login_name`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='系統管理员';

INSERT INTO `system_user` (id, login_name, pwd) VALUES (1, 'admin', '0192023a7bbd73250516f069df18b500');

CREATE TABLE `company_info` (
  `guid` varchar(32) NOT NULL COMMENT '唯一索引',
  `name` varchar(32) NOT NULL COMMENT '公司名称',
  `address` text NOT NULL COMMENT '地址',
  `phone` varchar(32) NOT NULL COMMENT '联系电话',
  `show_order` int(4) NOT NULL COMMENT '展示顺序',
  `create_time` datetime NOT NULL COMMENT '激活时间',
  PRIMARY KEY (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公司信息，在联系我们页面展示';

CREATE TABLE IF NOT EXISTS `menu_picture` (
  `guid` varchar(32) NOT NULL COMMENT '唯一索引',
  `menu` varchar(32) NOT NULL COMMENT '菜单名称',
  `picture_id` varchar(32) NOT NULL COMMENT '图片ID',
  `create_time` datetime NOT NULL COMMENT '激活时间',
  PRIMARY KEY (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单对应的图片表';

CREATE TABLE IF NOT EXISTS `t_file` (
  `id` varchar(36) NOT NULL COMMENT 'id',
  `name` varchar(45) NOT NULL COMMENT '文件名',
  `type` varchar(128) NOT NULL COMMENT '文件后缀',
  `size` int(11) NOT NULL COMMENT '文件大小',
  `time` varchar(19) NOT NULL COMMENT '上传时间',
  `user` varchar(45) NOT NULL COMMENT '上传人',
  `path` varchar(128) NOT NULL COMMENT '文件保存路径',
  `checksum` varchar(128) DEFAULT NULL COMMENT '校验值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='上传文件管理';

CREATE TABLE IF NOT EXISTS `village_notice` (
  `guid` varchar(32) NOT NULL COMMENT '唯一索引',
  `title` varchar(50) NOT NULL COMMENT '公告标题',
  `description` text NOT NULL COMMENT '公告简介',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `owner` varchar(32) NOT NULL COMMENT '创建人',
  `pdf` text COMMENT '公告文件存储路径',
  `fileid` varchar(32) DEFAULT NULL COMMENT 'pdf文件ID',
  `flag` varchar(2) NOT NULL COMMENT '删除标识(0 - 未删除， 1-删除)',
  PRIMARY KEY (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='小区公告信息表';