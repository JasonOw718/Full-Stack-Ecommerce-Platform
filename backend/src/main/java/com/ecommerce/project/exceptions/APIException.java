package com.ecommerce.project.exceptions;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class APIException extends RuntimeException{
    private String reason;
    private HttpStatus code;
    public APIException(HttpStatus code, String reason){
        super(reason);
        this.reason = reason;
        this.code = code;
    }
}
