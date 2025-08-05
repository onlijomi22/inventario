using Microsoft.EntityFrameworkCore;
using TransaccionService.Model;

namespace TransaccionService.Data
{
    public class TransaccionDbContext : DbContext
    {

        public TransaccionDbContext(DbContextOptions<TransaccionDbContext> options) : base(options) { }

        public DbSet<Transaccion> Transacciones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Transaccion>()
                .Property(t => t.PrecioUnitario)
                .HasPrecision(18, 2);

            base.OnModelCreating(modelBuilder);
        }

    }
}
