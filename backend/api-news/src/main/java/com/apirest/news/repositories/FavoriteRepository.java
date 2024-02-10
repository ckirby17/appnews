package com.apirest.news.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.apirest.news.models.FavoriteModel;

public interface FavoriteRepository extends JpaRepository<FavoriteModel, Long> {
    Page<FavoriteModel> findByTitleContaining(String title, Pageable pageable);
}