package org.LaunchCode.IT_Wizards_API.data;

import org.LaunchCode.IT_Wizards_API.models.ItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemCategoryRepository extends CrudRepository<ItemCategory, Long> {
}
