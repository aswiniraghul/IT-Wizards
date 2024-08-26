package org.LaunchCode.IT_Wizards_API.repository;

import org.LaunchCode.IT_Wizards_API.models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
