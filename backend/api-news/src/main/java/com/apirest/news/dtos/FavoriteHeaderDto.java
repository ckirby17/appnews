package com.apirest.news.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteHeaderDto {
    private Integer count;
    private String next;
    private String previous;
    private List<FavoriteListDto> listFavorites;
}