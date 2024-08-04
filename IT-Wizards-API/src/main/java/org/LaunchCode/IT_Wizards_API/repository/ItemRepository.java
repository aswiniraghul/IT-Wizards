package org.LaunchCode.IT_Wizards_API.repository;

import org.LaunchCode.IT_Wizards_API.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Optional<Item> findByName(String name);
}
