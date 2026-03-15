package com.example.demo.common.service;

import org.springframework.beans.factory.config.YamlPropertiesFactoryBean;
import org.springframework.core.io.ClassPathResource;

import java.util.Properties;

public class EnviromentService {

    public static String get(String name){
        YamlPropertiesFactoryBean bean = new YamlPropertiesFactoryBean();
        bean.setResources(new ClassPathResource("application.yml"));

        Properties prop = bean.getObject();
        return prop.getProperty("shop."+name,"do not have "+name);
    }
}
