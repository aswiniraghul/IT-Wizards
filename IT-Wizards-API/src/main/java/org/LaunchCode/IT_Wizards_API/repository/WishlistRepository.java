package org.LaunchCode.IT_Wizards_API.repository;

import org.LaunchCode.IT_Wizards_API.models.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long>{
    List<Wishlist> findByUserId(Long userId);
    Optional<Wishlist> findByUserIdAndItemId(Long userId, Long itemId);
    void deleteByItemId(Long itemId);
}
