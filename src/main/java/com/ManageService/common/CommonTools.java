package com.ManageService.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * 工具类
 */
public class CommonTools {
    private static Logger logger = LoggerFactory.getLogger(CommonTools.class);

    /**
     * 获取返回字符串
     * @param data
     * @return
     */
    public static String getResultJson(Object data) {
        Map<String, Object> result = new HashMap<>();
        result.put("session_ok", true);
        result.put("result_data", data);
        return CommonTools.objectToJson(result);
    }

    /**
     * 对象转JSON字符串
     * @param obj
     * @return
     */
    public static String objectToJson(Object obj) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "";
        }
    }

    /**
     * JSON字符串装对象
     * @param json
     * @return
     */
    public static <T> T jsonToObject(String json, Class<T> tClass) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            //设置时间格式
            mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
            return mapper.readValue(json, tClass);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 字符串转换为整形
     * @param str
     * @return
     */
    public static Integer stringToNumber(String str) {
        if(str != null) {
            try {
                return Integer.valueOf(str.trim());
            } catch (Exception e) {
                return 0;
            }
        } else {
            return 0;
        }
    }

    /**
     * 32位uuid
     * @return
     */
    public static String getUUID32() {
        return UUID.randomUUID().toString().trim().replaceAll("-", "");
    }

    /**
     * 向前端返回数据
     * @param response
     * @param data
     */
    public static void printJSON(HttpServletResponse response, String data) {
        response.setContentType("charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("param", "no-cache");
        response.setHeader("cache-control", "no-cache");
        PrintWriter printWriter = null;
        try {
            printWriter = response.getWriter();
            printWriter.print(data);
            printWriter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (printWriter != null)
                printWriter.close();
        }
    }

    /**
     *
     * @param fileName
     * @param file
     * @param response
     */
    public static void printFile(String fileName, File file, HttpServletResponse response) {
        long fileSize = file.length();
        OutputStream outputStream = null;
        InputStream inputStream = null;
        try {
            response.reset();
            response.setHeader("Content-Disposition", "attachment; filename=\"" + new String(fileName.getBytes("UTF-8")) + "\"");
            response.setHeader("Content-Length", String.valueOf(fileSize));
            response.setContentType("application/octet-stream;charset=UTF-8");
            outputStream = response.getOutputStream();
            OutputStream os = new BufferedOutputStream(response.getOutputStream());
            inputStream = new FileInputStream(file);
            int temp = 0 ;
            byte[] tempbytes = new byte[1024*1024*1024];
            while ((temp = inputStream.read(tempbytes)) != -1) { // 读取内容
                os.write(tempbytes,0,temp);
            }
            outputStream.flush();
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Download file=" + fileName + " Exception:" + e.getMessage());
        } finally {
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * 解析json,转化成List
     * @param json
     * @param cls
     * @param <T>
     * @return
     */
    public static <T> List<T> JsonToList(String json,Class<T> cls){

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        try {
            List<T> stuList2 = mapper.readValue(json, getCollectionType(mapper, List.class, cls));
            return stuList2;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    /**
     * 获取泛型的Collection Type
     * @param collectionClass 泛型的Collection
     * @param elementClasses 元素类
     * @return JavaType Java类型
     * @since 1.0
     */
    public static JavaType getCollectionType(ObjectMapper mapper, Class<?> collectionClass, Class<?>... elementClasses) {
        return mapper.getTypeFactory().constructParametricType(collectionClass, elementClasses);
    }

}
