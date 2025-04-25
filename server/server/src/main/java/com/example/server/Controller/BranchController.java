package com.example.server.Controller;


import com.example.server.Entity.Branch;
import com.example.server.Repository.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/branch")
@CrossOrigin(origins = "http://localhost:3000")
public class BranchController {

    private BranchRepository branchRepository;

    @Autowired
    public BranchController(BranchRepository branchRepository){
        this.branchRepository = branchRepository;
    }

    @GetMapping
    public List<Branch> getAll(){
        return branchRepository.getAll();
    }

    @PostMapping
    public String saveData(@RequestBody Branch branch){
        System.out.println(branch);
        branchRepository.save(branch);
        return "created Branch successfully";
    }
}
