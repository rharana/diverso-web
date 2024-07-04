package diversolab.backend.controller;
import diversolab.backend.model.Post;
import diversolab.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    PostRepository repository;

    @GetMapping
    public List<Post> getAllPosts()
    {
        return repository.findAll();
    }
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Integer id)
    {
        return repository.findById(id).get();
    }
}