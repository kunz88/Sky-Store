

using API.Entities; // importa il modello dal file Entitites
using Microsoft.EntityFrameworkCore; // importa il framework Entity core

namespace API.Data
{
    public class StoreContext : DbContext // la classe deriva da una classe che si trova nel framework Entity chiamata DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; } // rappresenta la nostra tabella nel database con lo schema della nostra classe Product
    }
}