using Microsoft.EntityFrameworkCore;

namespace ProductoService.Models
{
    public class Producto
    {

        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public string? Categoria { get; set; }
        public string? Imagen { get; set; }
        [Precision(18, 2)]
        public decimal Precio { get; set; }
        public int Stock { get; set; }


    }
}
