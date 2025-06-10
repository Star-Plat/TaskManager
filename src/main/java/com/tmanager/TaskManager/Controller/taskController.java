package com.tmanager.TaskManager.Controller;


import com.tmanager.TaskManager.Model.User;
import com.tmanager.TaskManager.Model.Task;
import com.tmanager.TaskManager.Repository.TaskRepository;
import com.tmanager.TaskManager.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class taskController {
        private  TaskRepository taskRepo;
        private  UserRepository userRepo;

    public taskController(TaskRepository taskRepo, UserRepository userRepo) {
        this.taskRepo = taskRepo;
        this.userRepo = userRepo;
    }

    @GetMapping("/allTasks")
    public List<Task> getMyTasks(Authentication auth) {
        User user = userRepo.findByUsername(auth.getName()).orElseThrow();
        return taskRepo.findByUserId(user.getId());
    }

    @PostMapping("/newTask")
    public Task createMyTask(Authentication auth, @RequestBody Task task) {
        User user = userRepo.findByUsername(auth.getName()).orElseThrow();
        task.setUser(user);
        return taskRepo.save(task);
    }

        @PutMapping("/{taskId}")
        public Task updateTask(@PathVariable Long taskId, @RequestBody Task updatedTask) {
            Task task = taskRepo.findById(taskId).orElseThrow();
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setCompleted(updatedTask.isCompleted());
            return taskRepo.save(task);
        }

        @DeleteMapping("/{taskId}")
        public void deleteTask(@PathVariable Long taskId) {
            taskRepo.deleteById(taskId);
        }
}
