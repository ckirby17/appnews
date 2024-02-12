package com.apirest.news.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.apirest.news.dtos.FavoriteCreateDto;
import com.apirest.news.dtos.FavoriteEditDto;
import com.apirest.news.dtos.FavoriteHeaderDto;
import com.apirest.news.dtos.FavoriteListDto;
import com.apirest.news.dtos.ResponseDto;
import com.apirest.news.models.FavoriteModel;
import com.apirest.news.repositories.FavoriteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository _favoriteRepository;

    private final ModelMapper _modelMapper;

    /**
     * @return
     */

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public ResponseDto GetAllFavorites() {
        ResponseDto resp = new ResponseDto<List<FavoriteListDto>>();

        try {            
            List<FavoriteModel> listModel = _favoriteRepository.findAll(Sort.by(Sort.Direction.DESC, "publishedAt"));

            if(listModel.isEmpty()){
                resp.code = HttpStatus.NOT_FOUND.toString();
                resp.message = "Datos no encontrados";
            }
            else{                
                final List<FavoriteListDto> listModelDto = listModel
                .stream()
                .map(favorite -> _modelMapper.map(favorite, FavoriteListDto.class))
                .collect(Collectors.toList());

                resp.data = listModelDto;
                resp.success = 1;
                resp.code = HttpStatus.OK.toString();
            }
            
        } 
        catch (Exception e) 
        {
            resp.message = e.getMessage();
        }

        return resp;
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    public ResponseDto GetAllFavoritesPageable(@PageableDefault(size = 10, page = 0, sort = "publishedAt") Pageable pageable, String title) {
        ResponseDto resp = new ResponseDto<List<FavoriteHeaderDto>>();

        try {
            Page<FavoriteModel> pageModelDb = null;

            if(title == null){
                pageModelDb = _favoriteRepository.findAll(PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort()));
            }
            else{
                pageModelDb = _favoriteRepository.findByTitleContainingIgnoreCase(title.trim().toLowerCase(), PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort()));
            }
            

            if(pageModelDb.isEmpty()){
                resp.code = HttpStatus.NOT_FOUND.toString();
                resp.message = "Datos no encontrados";
            }
            else{
                final List<FavoriteListDto> listModelDto = pageModelDb
                .stream()
                .map(favorite -> _modelMapper.map(favorite, FavoriteListDto.class))
                .collect(Collectors.toList());

                FavoriteHeaderDto modelHeaderDto = new FavoriteHeaderDto();                
                modelHeaderDto.setListFavorites(listModelDto);
                modelHeaderDto.setCount(pageModelDb.getTotalPages());

                resp.data = modelHeaderDto;
                resp.success = 1;
                resp.code = HttpStatus.OK.toString();
            }
        } catch (Exception e) {
            resp.message = e.getMessage();
        }

        return resp;
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public ResponseDto GetFavoriteById(Long id) {
        ResponseDto resp = new ResponseDto<FavoriteListDto>();
        
        try {
            Optional<FavoriteModel> modelDb = _favoriteRepository.findById(id);
            
            if(modelDb.isEmpty()){
                resp.code = HttpStatus.NOT_FOUND.toString();
                resp.message = "Dato no encontrado";
            }
            else{
                FavoriteListDto modelDto = _modelMapper.map(modelDb, FavoriteListDto.class);

                resp.success = 1;
                resp.code = HttpStatus.OK.toString();
                resp.data = modelDto;
            }
        } catch (Exception e) {
            resp.message = e.getMessage();
        }

        return resp;
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public ResponseDto CreateFavorite(FavoriteCreateDto model){
        
        ResponseDto resp = new ResponseDto<FavoriteListDto>();

        try {
            if(model.getTitle().isEmpty()){
                resp.message = "Título es requerido";
                resp.code = HttpStatus.NOT_ACCEPTABLE.toString();
                return resp;
            }

            if(model.getDescription().isEmpty()){
                resp.message = "Descripción es requerido";
                resp.code = HttpStatus.NOT_ACCEPTABLE.toString();
                return resp;
            }

            if(model.getSummary().isEmpty()){
                resp.message = "Resumen es requerido";
                resp.code = HttpStatus.NOT_ACCEPTABLE.toString();
                return resp;
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime publishAt;
            if(model.getPublishedAtText().isEmpty()){
                publishAt = LocalDateTime.now();
            }
            else{
                publishAt = LocalDateTime.parse(model.getPublishedAtText(), formatter);
            }

            FavoriteModel modelDb = _modelMapper.map(model, FavoriteModel.class);
            modelDb.setPublishedAt(publishAt);
            modelDb = _favoriteRepository.save(modelDb);

            resp.success = 1;
            resp.code = HttpStatus.OK.toString();
            resp.data = _modelMapper.map(modelDb, FavoriteListDto.class);

        } catch (Exception e) {
            resp.message = e.getMessage();
        }       

        return resp;
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public ResponseDto SaveFavorite(FavoriteEditDto modelDto){
        
        ResponseDto resp = new ResponseDto<FavoriteListDto>();

        try 
        {
            if(modelDto.getId() == null || modelDto.getId() == 0){
                resp.message = "Identificador es requerido";
                resp.code = HttpStatus.NOT_ACCEPTABLE.toString();
                return resp;
            }

            if(modelDto.getTitle().isEmpty()){
                resp.message = "Título es requerido";
                resp.code = HttpStatus.NOT_ACCEPTABLE.toString();
                return resp;
            }

            if(modelDto.getDescription().isEmpty()){
                resp.message = "Descripción es requerido";
                resp.code = HttpStatus.NOT_ACCEPTABLE.toString();
                return resp;
            }

            if(modelDto.getSummary().isEmpty()){
                resp.message = "Resumen es requerido";
                resp.code = HttpStatus.NOT_ACCEPTABLE.toString();
                return resp;
            }

            if(modelDto.getPublishedAtText().isEmpty()){
                resp.message = "Fecha publicación es requerido";
                resp.code = HttpStatus.NOT_ACCEPTABLE.toString();
                return resp;
            }

            Optional<FavoriteModel> modelDb = _favoriteRepository.findById(modelDto.getId());

            if(modelDb.isEmpty()){
                resp.message = "Dato no encontrado";
                resp.code = HttpStatus.NOT_FOUND.toString();
                return resp;
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime publishAt = LocalDateTime.parse(modelDto.getPublishedAtText(), formatter);

            FavoriteModel modelEndDb = _modelMapper.map(modelDto, FavoriteModel.class);
            modelEndDb.setPublishedAt(publishAt);

            resp.success = 1;
            resp.code = HttpStatus.OK.toString();
            resp.data = _modelMapper.map(_favoriteRepository.save(modelEndDb), FavoriteListDto.class);

        } catch (Exception e) {
            resp.message = e.getMessage();
        }       

        return resp;
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    public ResponseDto DeleteFavorite(Long id){   
        ResponseDto resp = new ResponseDto<Integer>();
        
        try {
            Optional<FavoriteModel> modelDb = _favoriteRepository.findById(id);

            if(modelDb.isEmpty()){
                resp.code = HttpStatus.NOT_FOUND.toString();
                resp.message = "Dato no encontrado";
                return resp;
            }

            _favoriteRepository.deleteById(id);
            resp.success = 1;
            resp.code = HttpStatus.OK.toString();
            resp.data = 1;
        } catch (Exception e) {
            resp.message = e.getMessage();
        }

        return resp;       
    }
}