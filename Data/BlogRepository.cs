using Microsoft.EntityFrameworkCore;
using ReactAspNetBlogApp.Models;
using ReactAspNetBlogApp.Utils;

namespace ReactAspNetBlogApp.Data
{
    public class BlogRepository
    {
        private readonly ApplicationDbContext _context; // allow the repository to interact with the database
        public BlogRepository(ApplicationDbContext context) 
        {
            _context = context;
        }
        
        public async Task<IEnumerable<Blog>> GetAllAsync() => await _context.Blogs.ToListAsync();
        public async Task<Blog?> GetByIdAsync(int id)
        {
            return await _context.Blogs.FindAsync(id);
        }

        public async Task AddAsync(Blog blog)
        {
            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();
        }
        public async Task<Blog?> UpdateAsync(int id, Blog blog)
        {
            var blogToUpdate = await GetByIdAsync(id);
            if (blogToUpdate != null) {
                MergeHelper.Merge(blogToUpdate, blog);
                _context.Entry(blogToUpdate).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return blogToUpdate; 
            }
            return null;
        }
        public async Task<Blog?> DeleteAsync(int id)
        {
            var blog = await GetByIdAsync(id);
            if (blog != null)
            {
                _context.Blogs.Remove(blog);
                await _context.SaveChangesAsync();
                return blog;
            }
            return null;
        }
    }
}