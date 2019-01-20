package com.ManageService.service;


import com.ManageService.common.CommonTools;
import com.ManageService.config.SystemConfiguration;
import com.ManageService.dao.FileEntityMapper;
import com.ManageService.model.ResultModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import com.ManageService.entity.FileEntity;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class FileService {
    @Autowired
    private StandardServletMultipartResolver resolver;

    @Autowired
    private SystemConfiguration systemConfiguration;

    @Autowired
    private FileEntityMapper fileEntityMapper;

    /**
     * 生成文件的状态
     */
    public static Map<String, String> fileStatus = new ConcurrentHashMap<String,String>();
    public static String SUCCESS = "success";
    public static String ERROR = "error";
    public static String RUNNING = "running";

    /**
     * 保存上传文件
     *
     * @param request
     * @param response
     */
    public void uploadMultiFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
        BufferedOutputStream outputStream = null;
        Map<String, Object> resultData = new HashMap<>();
        if (!resolver.isMultipart(request)) {
            //异常情况
            throw new Exception();
        }

        try {
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            Iterator<String> fileNames = multipartRequest.getFileNames();
            while (fileNames.hasNext()) {
                String fileName = fileNames.next();
                if (fileName == null || fileName.isEmpty())
                    continue;

                //
                MultipartFile multipartFile = multipartRequest.getFile(fileName);
                String origName = multipartFile.getOriginalFilename();
                String type = multipartFile.getContentType();
                String path = systemConfiguration.getUploadPath();
                Date curDate = new Date();
                String today = new SimpleDateFormat("yyyyMMdd").format(curDate);
                String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(curDate);
                String fileUUID = CommonTools.getUUID32();

                File bufDir = new File(path + File.separator + today);
                if (!bufDir.exists())
                    bufDir.mkdir();
                String tagName = bufDir + File.separator + fileUUID + ".dat";

                //
                outputStream = new BufferedOutputStream(new FileOutputStream(new File(tagName)));
                InputStream inputStream = multipartFile.getInputStream();
                byte[] buf = new byte[1024 * 1024];
                int len = 0;
                long size = 0;
                while ((len = inputStream.read(buf)) != -1) {
                    outputStream.write(buf, 0, len);
                    outputStream.flush();
                    size += len;
                }

                //MD5摘要
                String hexMd5 = DigestUtils.md5DigestAsHex(new FileInputStream(tagName));
                //写入数据库
                FileEntity fileEntity = insertNewFileInfo(fileUUID, origName, type, size, tagName, time, hexMd5);
                fileEntity.setPath("");
                ResultModel resultModel = new ResultModel(ResultModel.STATUS.OK, "文件上传成功", fileEntity);
                CommonTools.printJSON(response, CommonTools.getResultJson(resultModel));
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            try {
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
                throw e;
            }
        }
    }

    /**
     * 将文件信息写入数据库
     *
     * @param name
     * @param type
     * @param size
     * @param path
     * @param time
     * @return
     */
    public FileEntity insertNewFileInfo(String id, String name, String type, long size, String path, String time, String hexMd5) {
        FileEntity fileEntity = new FileEntity();
        fileEntity.setId(id);
        fileEntity.setName(name);
        fileEntity.setType(type);
        fileEntity.setSize((int) size);
        fileEntity.setTime(time);
        fileEntity.setPath(path);
        fileEntity.setUser("admin");
        fileEntity.setChecksum(hexMd5);
        fileEntityMapper.insert(fileEntity);
        return fileEntity;
    }
    public FileEntity selectByPrimaryKey(String id) {
        return fileEntityMapper.selectByPrimaryKey(id);
    }

}
