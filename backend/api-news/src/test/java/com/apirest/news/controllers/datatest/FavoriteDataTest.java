package com.apirest.news.controllers.datatest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.apirest.news.dtos.FavoriteCreateDto;
import com.apirest.news.dtos.FavoriteListDto;

public class FavoriteDataTest {
    
    private static String publishedAtText = "2024-02-11 21:00:00";

    public static FavoriteCreateDto GetDataCreateFavoriteTest() {
        FavoriteCreateDto modelDto = new FavoriteCreateDto();
		modelDto.setTitle("Titulo 01");
		modelDto.setDescription("Descripcion 01");
		modelDto.setSummary("Resumen 01");
		modelDto.setPublishedAtText(publishedAtText);

        return modelDto;
    }

    public static FavoriteListDto GetDataFavoriteListTest(FavoriteCreateDto modelCreateDto) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");		
		LocalDateTime publishAt = LocalDateTime.parse(publishedAtText, formatter);

        FavoriteListDto modelDto = new FavoriteListDto();
		modelDto.setTitle(modelCreateDto.getTitle());
		modelDto.setDescription(modelCreateDto.getDescription());
		modelDto.setSummary(modelCreateDto.getSummary());
		modelDto.setPublishedAt(publishAt);

        return modelDto;
    }

}