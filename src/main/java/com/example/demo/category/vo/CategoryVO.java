package com.example.demo.category.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryVO {
    @JsonProperty("code_id")
    private String codeId;

    @JsonProperty("parent_id")
    private String parentId;

    @JsonProperty("code_name")
    private String codeName;


    private String depth;

}
