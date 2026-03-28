package com.example.demo.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
       registry.addMapping("/**")
               .allowCredentials(true)
               .allowedOrigins("http://localhost:5173","http://localhost:8000")
               .allowedHeaders("Authorization","Content-Type")
               .allowedMethods("*")
               ;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 브라우저에서 /images/** 로 접근하면
        registry.addResourceHandler("/images/**")
                // 실제 서버의 아래 경로에서 파일을 찾아라
                .addResourceLocations("file:///D:/upload/");
    }
}
