package com.example.demo.common.vo;

public class CustomException extends RuntimeException{
    private String msg;

    public CustomException(String msg){
        super(msg);
    }

    public String getMsg(){
        return msg;
    }
}
