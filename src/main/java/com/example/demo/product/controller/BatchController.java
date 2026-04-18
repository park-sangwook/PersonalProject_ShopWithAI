package com.example.demo.product.controller;

import com.example.demo.product.service.ReviewService;
import com.example.demo.product.vo.ProductStatsVO;
import com.google.common.collect.Lists;
import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

@Controller
@Slf4j
@RequiredArgsConstructor
public class BatchController {
//    private final RedisTemplate<String,Object> redisTemplate;
    private final StringRedisTemplate redisTemplate;
    private final ReviewService reviewService;


    @Scheduled(cron = "0 0 17 * * ?",zone = "Asia/Seoul")
    public void run(){
        RestTemplate rt = new RestTemplate();
        log.info("사용자 추천 상품 train");
        String pythonUrl = "http://localhost:8000/train";
        rt.getForEntity(pythonUrl,Void.class);
    }

    @Scheduled(cron = "0 0 17 * * ?",zone = "Asia/Seoul")
    public void reviewBulkUpdate(){
        ScanOptions options = ScanOptions.scanOptions().match("prod:stats:*").count(100).build();
        List<ProductStatsVO> pstvo = new ArrayList<>();
        try(Cursor<String> cursor = redisTemplate.scan(options)){
            while(cursor.hasNext()){
                String key = cursor.next();
                Long productId = Long.parseLong(key.split(":")[2]);

                Map<Object,Object> map = redisTemplate.opsForHash().entries(key);
                long reviewCount = (Long)map.get("reviewCount");
                double rating = (Double)map.get("rating");
                pstvo.add(new ProductStatsVO(productId,reviewCount,rating));
                redisTemplate.delete(key);
            }
            if(!Collections.isEmpty(pstvo)){
                List<List<ProductStatsVO>> pstvos = Lists.partition(pstvo,1000);
                for(List<ProductStatsVO> p : pstvos){
                    reviewService.bulkUpdate(p);
                }
            }
        }
    }





















    @Scheduled(cron = "0 0 17 * * ?",zone = "Asia/Seoul")
    public void run2(){
        ScanOptions options = ScanOptions.scanOptions().match("prod:stats:").count(100).build();
        try(Cursor<String> cursor = redisTemplate.scan(options)){

        }
    }
}
