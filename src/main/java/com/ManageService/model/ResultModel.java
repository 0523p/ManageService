package com.ManageService.model;

import java.io.Serializable;

/**
 * 数据返回时的数据模型
 */
public class ResultModel implements Serializable {
    private static final long serialVersionUID = 1L;

    public enum STATUS {
        OK, ERROR, WARNING, EXCEPTION
    }

    private STATUS status = STATUS.OK;
    private String message = "ok";
    private Object data = null;

    public ResultModel(STATUS status, Object data) {
        this(status, "", data);
    }

    public ResultModel(STATUS status, String message, Object data) {
        this.status = status;
        this.data = data;
        this.message = message;
    }

    public STATUS getStatus() {
        return status;
    }

    public void setStatus(STATUS status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
