package com.example.demo.product.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

@Controller
@Slf4j
public class BatchController {

    @Scheduled(cron = "0 0 17 * * ?",zone = "Asia/Seoul")
    public void run(){
        RestTemplate rt = new RestTemplate();
        log.info("사용자 추천 상품 train");
        String pythonUrl = "http://localhost:8000/train";
        rt.getForEntity(pythonUrl,Void.class);
    }
}
