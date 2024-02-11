package com.apirest.news.controllers;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.apirest.news.dtos.FavoriteCreateDto;
import com.apirest.news.dtos.FavoriteEditDto;
import com.apirest.news.dtos.ResponseDto;
import com.apirest.news.services.FavoriteService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/favorite")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200","http://localhost:9876"})
public class FavoriteController {
    private final FavoriteService _favoriteService;

    @SuppressWarnings("rawtypes")
    @GetMapping()    
    public ResponseEntity<ResponseDto> GetAll() 
    {
        ResponseDto resp = _favoriteService.GetAllFavorites();
        return new ResponseEntity<ResponseDto>(resp, HttpStatus.OK);
    }

    @SuppressWarnings("rawtypes")
    @GetMapping(path = "/pageable")  
    public ResponseEntity<ResponseDto> GetAllPageable(Pageable pageable, @RequestParam(required = false) String title)
    {
        ResponseDto resp = _favoriteService.GetAllFavoritesPageable(pageable, title);
        return new ResponseEntity<ResponseDto>(resp, HttpStatus.OK);
    }

    @SuppressWarnings("rawtypes")
    @GetMapping(path = "/{id}")
    public ResponseEntity<ResponseDto> GetById(@PathVariable("id") Long id){
        ResponseDto resp = _favoriteService.GetFavoriteById(id);
        return new ResponseEntity<ResponseDto>(resp, HttpStatus.OK);
    }

    @SuppressWarnings("rawtypes")
    @PostMapping()
    public ResponseEntity<ResponseDto> Create(@RequestBody FavoriteCreateDto modelDto){
        ResponseDto resp = _favoriteService.CreateFavorite(modelDto);
        return new ResponseEntity<ResponseDto>(resp, HttpStatus.OK);
    }

    @SuppressWarnings("rawtypes")
    @PutMapping()
    public ResponseEntity<ResponseDto> Save(@RequestBody FavoriteEditDto modelDto){
        ResponseDto resp = _favoriteService.SaveFavorite(modelDto);
        return new ResponseEntity<ResponseDto>(resp, HttpStatus.OK);
    }

    @SuppressWarnings("rawtypes")
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<ResponseDto> Delete(@PathVariable("id") Long id){
        ResponseDto resp = _favoriteService.DeleteFavorite(id);
        return new ResponseEntity<ResponseDto>(resp, HttpStatus.OK);
    }
}