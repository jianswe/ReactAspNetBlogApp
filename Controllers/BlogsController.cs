using Microsoft.AspNetCore.Mvc;
using ReactAspNetBlogApp.Data;
using ReactAspNetBlogApp.Models;

namespace ReactAspNetBlogApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogsController : ControllerBase
{
    private readonly BlogRepository _repository;
    public BlogsController(BlogRepository repository)
    {
        _repository = repository;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Blog>>> GetBlogs()
    {
        try {
            var blogs = await _repository.GetAllAsync();
            return Ok(blogs);
        } catch(Exception ex) {
            return BadRequest(ex.Message);
        }
        
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Blog>> GetBlog(int id)
    {
        var blog = await _repository.GetByIdAsync(id);
        if (blog == null) return NotFound();
        return Ok(blog);
    }
    [HttpPost]
    public async Task<ActionResult<Blog>> CreateBlog([FromBody] Blog blog) 
    {
        await _repository.AddAsync(blog);
        return CreatedAtAction(nameof(GetBlog), new { id = blog.Id }, blog);
    }  
    [HttpPut("{id}")]
    public async Task<ActionResult<Blog>> UpdateBlog(int id, [FromBody] Blog blog)
    {
        var updatedBlog = await _repository.UpdateAsync(id, blog);
        if (updatedBlog == null) return NotFound();
        return Ok(updatedBlog);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<Blog>> DeleteBlog(int id)
    {
        var deletedBlog = await _repository.DeleteAsync(id);
        if (deletedBlog == null) return NotFound();
        return Ok(deletedBlog);
    }
}