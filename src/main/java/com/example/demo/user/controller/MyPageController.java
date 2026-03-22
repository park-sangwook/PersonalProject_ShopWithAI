package com.example.demo.user.controller;

import com.example.demo.user.service.MypageService;
import com.example.demo.user.service.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/api/mypage")
@RequiredArgsConstructor
@Slf4j
public class MyPageController {
    private final MypageService mypageService;

    /**
     * 상품상세보기 > 장바구니 저장
     * @author : 박상욱
     * @since : 2026-03-22
     * @param : productId, userId
     */
    @PostMapping(value = "/cart_item")
    public ResponseEntity<?> selectMypageCartItem(@RequestBody HashMap<String,String> map, @AuthenticationPrincipal PrincipalDetails userPrincipal){
        log.info("마이페이지 > 장바구니 파라미터 : {}",map);
        log.info("mypageService.insertCartItem");
        String userId = userPrincipal.getUsername();
        Long productId = Long.valueOf(map.get("productId"));
        mypageService.insertCartItem(productId,userId);
        return ResponseEntity.status(HttpStatus.OK).body("SUCCESS");
    }

    /**
     * 마이페이지 > 장바구니 목록 조회
     * @author : 박상욱
     * @since : 2026-03-22
     * @param : userId
     * @return
     */
    @GetMapping(value = "/cart_item")
    public ResponseEntity<?> selectMyPageCartItem(@AuthenticationPrincipal PrincipalDetails principalDetails){
        log.info("mypageService.selectCartItem");
        return ResponseEntity.status(HttpStatus.OK).body(mypageService.selectCartItem(principalDetails.getUsername()));
    }

    /**
     * 마이페이지 > 장바구니 목록 제거
     * @author : 박상욱
     * @since : 2026-03-22
     */
    @DeleteMapping(value = "/cart_item/{productId}")
    public ResponseEntity<?> deleteCartItemByIdx(@PathVariable Long productId){
        log.info("mypageService.deleteCartItemByIdx");
        mypageService.deleteCartItemByIdx(productId);
        return ResponseEntity.status(HttpStatus.OK).body("SUCCESS");
    }


}
