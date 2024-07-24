package diversolab.backend.controller;
import diversolab.backend.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import diversolab.backend.service.PostService;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    PostService service;

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        Post createdPost = service.savePost(post);
        return ResponseEntity.ok(createdPost);
    }

    @GetMapping
    public List<Post> getAllPosts()
    {
        return service.getAllPosts();
    }
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id)
    {
        return service.getPostById(id).get();
    }
}