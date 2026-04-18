package com.example.demo.product.service;

import com.example.demo.common.vo.RecommendResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Service
@FeignClient(name = "service-python-recommend",url = "http://localhost:8000/")
public interface RecommendClientInterface {
    @GetMapping(value = "/recommend/{id}")
    RecommendResponse getRecommend(@PathVariable long id);
}
