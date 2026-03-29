package com.example.demo.product.service;

import com.example.demo.product.entity.OrderProduct;
import com.example.demo.product.entity.Product;
import com.example.demo.product.entity.QOrderProduct;
import com.example.demo.product.repository.OrderProductRepository;
import com.example.demo.product.repository.ProductRepository;
import com.example.demo.product.vo.OrderProductVO;
import com.example.demo.product.vo.ProductVO;
import com.example.demo.user.entity.UserEntity;
import com.example.demo.user.repository.UserRepository;
import com.example.demo.user.service.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class OrderProductService {

    private final QOrderProduct orderProduct = QOrderProduct.orderProduct;

    private final OrderProductRepository orderProductRepository;
    private final ProductRepository productRepository;


    @Transactional
    public void insertOrderProduct(ProductVO vo, String userId){
        Product product = productRepository.getReferenceById(vo.getId());
        String orderNo = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) +String.format("-%03d",vo.getId());
        orderProductRepository.save(OrderProduct.builder().product(product).size(vo.getSize()).orderNo(orderNo).color(vo.getColor()).userId(userId).build());

    }
}
