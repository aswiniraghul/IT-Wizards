package org.LaunchCode.IT_Wizards_API.repository;

import org.LaunchCode.IT_Wizards_API.models.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavouriteRepository extends JpaRepository<Favourite, Long> {
//    Custom query method to find a favorite by itemId and userId
    @Query("SELECT f FROM Favourite f JOIN f.items i JOIN f.users u WHERE i.id = :itemId AND u.id = :userId")
    Favourite findByItemIdAndUserId(@Param("itemId") Long itemId, @Param("userId") Long userId);
//    Favourite findByItemIdAndUserId(Long itemId, Long userId);
}
