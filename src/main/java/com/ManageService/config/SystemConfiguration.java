package com.ManageService.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
@ConfigurationProperties(value = "info.manage")
public class SystemConfiguration {
    private Logger logger = LoggerFactory.getLogger(SystemConfiguration.class);

    private String uploadPath;

    public String getUploadPath() {
        return uploadPath;
    }

    public void setUploadPath(String uploadPath) {
        this.uploadPath = uploadPath;
    }

    @PostConstruct
    public void postConstruct() {
        logger.info("System Configuration:");
        logger.info("uploadPath=[" + this.uploadPath + "]");
    }
}
