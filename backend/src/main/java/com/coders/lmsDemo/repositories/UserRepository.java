package com.coders.lmsDemo.repositories;


import com.coders.lmsDemo.enitities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);


    List<User> getByRole(String faculty);
}
