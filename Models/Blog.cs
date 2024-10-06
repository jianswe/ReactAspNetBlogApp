namespace ReactAspNetBlogApp.Models
{
    public class Blog 
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public string Author { get; set; }
    }
}