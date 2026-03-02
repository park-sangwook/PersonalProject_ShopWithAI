package com.example.demo.common.service;

import com.example.demo.user.vo.UserVO;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.*;
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private TokenService tokenService;

    public JwtAuthenticationFilter(TokenService tokenService){
        this.tokenService = tokenService;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(response);
        if(Objects.nonNull(token) && tokenService.validate(token)){
            UserVO vo = tokenService.getUserFromToken(token);
            List<GrantedAuthority> ga = Collections.singletonList(new SimpleGrantedAuthority(getRole(vo.getRole())));
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(vo.getId(),"", ga);
            SecurityContextHolder.getContext().setAuthentication(auth);
            log.info("auth done");
        }
        log.info("요청 requestUri : {}",request.getRequestURI());
        filterChain.doFilter(request,response);
    }

    private String getRole(String role){
        return "ROLE_"+(role.equals("1")?"USER" : "ADMIN");
    }

    private String resolveToken(HttpServletResponse response){
        String token = response.getHeader("Authorization");
        if(StringUtils.hasText(token) && token.startsWith("Bearer ")){
            return token.substring(7);
        }
        return null;
    }

}
