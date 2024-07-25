package org.LaunchCode.IT_Wizards_API.repository;


import jakarta.transaction.Transactional;
import org.LaunchCode.IT_Wizards_API.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Transactional
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserName(String userName);

    User findByUserNameAndUserPassword(String userName, String password);

    void deleteByUserName(String userName);
}
