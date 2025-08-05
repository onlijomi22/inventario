

using System.ComponentModel.DataAnnotations.Schema;

namespace TransaccionService.Model
{
    public class Transaccion
    {

        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public string Tipo { get; set; } 
        public int ProductoId { get; set; } 
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }

        [NotMapped]
        public decimal PrecioTotal => Cantidad * PrecioUnitario;

        public string Detalle { get; set; }

    }
}
