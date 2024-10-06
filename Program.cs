using ReactAspNetBlogApp.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Load JWT settings from configuration
var jwtSettings = builder.Configuration.GetSection("Jwt");

// Add Authentication with JWT Bearer
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"], // replace with your issuer
        ValidAudience = jwtSettings["Audience"], // replace with your audience
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"])) // replace with your secret key
    };
});

builder.Services.AddAuthorization();

// Register the repository as a singleton or scoped service
builder.Services.AddScoped<BlogRepository>();

builder.Services.AddDbContext<ApplicationDbContext>(options => 
    options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

// Use CORS
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();
app.UseStaticFiles(); // This will serve static files from the ClientApp build

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    // Map ASP.NET Core controllers or API
    endpoints.MapControllers();
});

// Configure fallback for React routes (SPA)
app.UseEndpoints(endpoints =>
{
    endpoints.MapFallbackToFile("/ClientApp/build/index.html");
});

app.UseAuthorization();

app.MapControllers();

// Catch-all route to serve React's index.html
app.MapFallbackToFile("/index.html");

app.Run();
