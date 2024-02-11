package com.apirest.news.controllers;

import com.apirest.news.controllers.datatest.FavoriteDataTest;
import com.apirest.news.dtos.FavoriteCreateDto;
import com.apirest.news.dtos.FavoriteListDto;
import com.apirest.news.dtos.ResponseDto;
import com.apirest.news.services.FavoriteService;
import org.junit.jupiter.api.*;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.assertEquals;

@WebMvcTest(FavoriteController.class)
public class FavoriteControllerTest {

	@MockBean
	private FavoriteService favoriteService;

	private FavoriteCreateDto dataTestDto = FavoriteDataTest.GetDataCreateFavoriteTest();

	private FavoriteListDto dataRespCreate = FavoriteDataTest.GetDataFavoriteListTest(dataTestDto);

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@BeforeEach
	public void setUp() {

		ResponseDto respDto = new ResponseDto<FavoriteListDto>();
		respDto.success = 1;
		respDto.code = HttpStatus.OK.toString();
		respDto.message = null;
		respDto.data = dataRespCreate;

		Mockito.when(favoriteService.CreateFavorite(dataTestDto)).thenReturn(respDto);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@DisplayName("should create favorite successfully")
	@Test
	public void ShouldCreateFavoriteSuccess() throws Exception {
		
		ResponseDto respService = favoriteService.CreateFavorite(dataTestDto);

		ResponseDto expected = new ResponseDto<FavoriteListDto>();
		expected.success = 1;
		expected.code = HttpStatus.OK.toString();
		expected.message = null;
		expected.data = dataRespCreate;

		assertEquals(expected.success, respService.success);
		assertEquals(expected.code, respService.code);
		assertEquals(expected.message, respService.message);
		assertEquals(expected.data, respService.data);
	}
}
