using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactAspNetBlogApp.Migrations
{
    /// <inheritdoc />
    public partial class BlogDateUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateUpated",
                table: "Blogs",
                newName: "DateUpdated");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateUpdated",
                table: "Blogs",
                newName: "DateUpated");
        }
    }
}
