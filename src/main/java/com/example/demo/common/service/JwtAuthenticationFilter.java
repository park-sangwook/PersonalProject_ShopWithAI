package com.example.demo.common.service;

import com.example.demo.user.vo.UserVO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = resolve(response);
        if(Objects.nonNull(token) && tokenService.validateToken(token)){
            UserVO vo = tokenService.getUserFromToken(token);
            Collection<GrantedAuthority> ga = Collections.singletonList(new SimpleGrantedAuthority(getRole(vo.getRole())));
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(vo.getId(),"",ga);
            SecurityContextHolder.getContext().setAuthentication(auth);
            log.info("Auth Success");
        }
        log.info("Auth Filter : {}",request.getRequestURI());
        filterChain.doFilter(request,response);
    }

    private String getRole(String role) {
        return "ROLE_" + (role.equals("1") ? "USER" : "ADMIN");
    }

    private String resolve(HttpServletResponse response){
        String token = response.getHeader("Authorization");
        return (Objects.nonNull(token) && StringUtils.hasText("Bearer "))?token.substring(7):null;

    }
}
