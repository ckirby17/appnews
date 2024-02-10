package com.apirest.news.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteEditDto {
    private Long id;
    private String title;
    private String description;
    private String summary;
}