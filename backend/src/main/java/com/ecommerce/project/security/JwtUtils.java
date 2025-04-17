package com.ecommerce.project.security;

import com.ecommerce.project.security.services.UserDetailsImp;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);


    @Value("${spring.security.secretKey}")
    private String secretKey;

    @Value("${spring.security.expirationMs}")
    private int jwtExpirationMs;

    @Value("${spring.security.cookieName}")
    private String cookieName;

    public String getJwtFromCookies(HttpServletRequest request){
        Cookie cookie = WebUtils.getCookie(request,cookieName);
        if(cookie == null){
            return "";
        }
        return cookie.getValue();
    }

    public ResponseCookie generateJwtCookies(Authentication authentication){
        String token = generateTokenFromUsername(authentication.getName());
        ResponseCookie cookie = ResponseCookie.from(cookieName,token)
                                .path("/api")
                                .maxAge(50* 60)
                                .httpOnly(false)
                                .secure(false)
                                .build();
        return cookie;
    }

    public ResponseCookie deleteJwtCookies(){
        ResponseCookie deletedCookie = ResponseCookie.from(cookieName,"")
                .path("/api")
                .maxAge(0)
                .httpOnly(false)
                .secure(false)
                .build();
        return deletedCookie;
    }


    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    public String generateTokenFromUsername(String username){
        return Jwts.builder().signWith((SecretKey) key())
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime()+jwtExpirationMs))
                .compact();
    }

    public String getUsernameFromToken(String token){
        return Jwts.parser().verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateJwtToken(String token){
        try{
            Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(token);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
