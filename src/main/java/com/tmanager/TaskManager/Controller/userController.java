package com.tmanager.TaskManager.Controller;

import com.tmanager.TaskManager.Model.User;
import com.tmanager.TaskManager.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

public class userController {

    @RestController
    @RequestMapping("/users")

    public class UserController {
        @Autowired
        private UserRepository repo;

        @GetMapping("/all")
        public List<User> getAllUsers() {
            return repo.findAll();
        }

        @GetMapping("/{id}")
        public ResponseEntity<User> getUserById(@PathVariable Long id) {
            return repo.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }

        @PostMapping("/")
        public User createUser(@RequestBody User user) {
            return repo.save(user);
        }

        @PutMapping("/{id}")
        public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
            return repo.findById(id).map(user -> {
                user.setUsername(userDetails.getUsername());
                user.setPassword(userDetails.getPassword());
                user.setRole(userDetails.getRole());
                return ResponseEntity.ok(repo.save(user));
            }).orElse(ResponseEntity.notFound().build());
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
            return repo.findById(id).map(user -> {
                repo.delete(user);
                return ResponseEntity.ok().<Void>build();
            }).orElse(ResponseEntity.notFound().build());
        }
    }

}
