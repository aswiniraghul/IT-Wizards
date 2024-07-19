package org.LaunchCode.IT_Wizards_API.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ItemCategoryNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(ItemCategoryNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> exceptionHandler(ItemNotFoundException exception){
        Map<String, String> errorMap=new HashMap<>();
        errorMap.put("errorMessage", exception.getMessage());

        return errorMap;
    }
}
