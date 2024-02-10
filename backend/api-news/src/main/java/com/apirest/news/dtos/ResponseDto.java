package com.apirest.news.dtos;

import org.springframework.http.HttpStatus;

public class ResponseDto<T> {
    public Integer success;
    public String code;
    public String message;
    public T data;

    public ResponseDto(){
        success = 0;
        data = null;
        code = HttpStatus.BAD_REQUEST.toString();
    }
}