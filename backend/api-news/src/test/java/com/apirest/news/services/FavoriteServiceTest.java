package com.apirest.news.services;

import com.apirest.news.dtos.FavoriteCreateDto;
import com.apirest.news.dtos.FavoriteListDto;
import com.apirest.news.models.FavoriteModel;
import com.apirest.news.repositories.FavoriteRepository;
import org.junit.jupiter.api.*;
import org.modelmapper.ModelMapper;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class FavoriteServiceTest {

	@Autowired
	private ModelMapper modelMapper;

	@MockBean
	private FavoriteRepository favoriteRepository;

	@DisplayName("should create favorite successfully")
	@Test
	public void ShouldCreateFavoriteSuccess() {
		FavoriteCreateDto modelDto = new FavoriteCreateDto();
		modelDto.setTitle("Titulo 01");
		modelDto.setDescription("Descripcion 01");
		modelDto.setSummary("Resumen 01");
		modelDto.setPublishedAtText("2024-02-11 21:00:00");

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");		
		LocalDateTime publishAt = LocalDateTime.parse(modelDto.getPublishedAtText(), formatter);		

		FavoriteModel modelDb = modelMapper.map(modelDto, FavoriteModel.class);
		modelDb.setPublishedAt(publishAt);
		modelDb = favoriteRepository.save(modelDb);		

		FavoriteListDto respDto = new FavoriteListDto();
		respDto.setId(Long.valueOf(1));
		respDto.setDescription(modelDto.getDescription());
		respDto.setPublishedAt(publishAt);
		respDto.setTitle(modelDto.getTitle());
		respDto.setSummary(modelDto.getSummary());
		
		FavoriteListDto expected = new FavoriteListDto();
		expected.setId(Long.valueOf(1));
		expected.setTitle(modelDto.getTitle());
		expected.setDescription(modelDto.getDescription());
		expected.setSummary(modelDto.getSummary());
		expected.setPublishedAt(publishAt);

		assertEquals(expected, respDto);
	}
}
