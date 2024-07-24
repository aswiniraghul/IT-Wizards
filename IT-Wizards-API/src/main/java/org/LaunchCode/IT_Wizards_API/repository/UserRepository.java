package org.LaunchCode.IT_Wizards_API.data;

import org.LaunchCode.IT_Wizards_API.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
