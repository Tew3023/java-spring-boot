package com.example.server.Controller;

import com.example.server.Entity.Message;
import com.example.server.Repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/message")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {
    private final MessageRepository messageRepository;

    @Autowired
    public MessageController(MessageRepository messageRepository){
        this.messageRepository = messageRepository;
    }

    @GetMapping
    public List<Message> getAll(){
        return messageRepository.getAll();
    }

    @PostMapping
    public String saveMessage(@RequestBody Message message){
        messageRepository.save(message);
        return "save data successfully";
    }
}
