---
title: 使用JWT和Spring Security结合开发一套认证鉴权系统
date: 2017-11-17 14:10:29
tags:
- Spring
- JWT
- JSON
- OAuth
categories: Back-end
---

为使用前后端分离的后端管理框架做准备，使用JWT目前看来是最佳选择。

## 知其然

- 无状态
- 服务化
- 移动、web统统支持，后端提供相关接口即可

## 知其所以然

1. 认证：通过调用登录接口，服务器颁发一个`JWT`（JSON Web Token）给客户端。
2. 鉴权：客户端每个请求携带`JWT`，后端使用一个请求过滤器，从请求头中解析`JWT`，为本次请求授予相关权限

<!--more-->

## 导入`io.jsonwebtoken:jjwt`

`jjwt`提供了JWT主要功能的Java版本实现，目前版本是0.9.0

```json
dependencies {
    compile 'io.jsonwebtoken:jjwt:0.9.0'
}
```

### 生成token

```java
private String generateToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims) //自定义声明
                .setExpiration(generateExpirationDate()) //过期时间
                .signWith(SignatureAlgorithm.HS512, secret) //加密
                .compact();
    }
```

### 解析token

```java
private Claims getClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }
```


## 鉴权过滤器

```java
package cn.wycode.web.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Value("${jwt.header}")
    private String tokenHeader;

    @Value("${jwt.tokenHead}")
    private String tokenHead;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain) throws ServletException, IOException {

        String authHeader = request.getHeader(this.tokenHeader);
        if (authHeader != null && authHeader.startsWith(tokenHead)) {
            final String authToken = authHeader.substring(tokenHead.length()); // The part after "Bearer "
            String account = jwtTokenUtil.getUsernameFromToken(authToken);

            logger.info("checking authentication " + account);

            if (account != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(account);

                if (jwtTokenUtil.validateToken(authToken, userDetails)) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(
                            request));
                    logger.info("authenticated user " + account + ", setting security context");
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

        chain.doFilter(request, response);
    }
}
```

### 配置Spring security

```java
    httpSecurity.addFilterBefore(authenticationTokenFilterBean(),UsernamePasswordAuthenticationFilter.class);
```
