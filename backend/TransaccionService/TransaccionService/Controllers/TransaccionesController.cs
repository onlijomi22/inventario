using Microsoft.AspNetCore.Mvc;
using TransaccionService.Data;
using TransaccionService.Model;
using Microsoft.EntityFrameworkCore;
using TransaccionService.Dto;

namespace TransaccionService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransaccionesController : ControllerBase
    {
        private readonly TransaccionDbContext _context;
        private readonly HttpClient _httpClient;

        public TransaccionesController(TransaccionDbContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClient = httpClientFactory.CreateClient("ProductoService");
        }

        [HttpPost]
        public async Task<IActionResult> RegistrarTransaccion([FromBody] Transaccion transaccion)
        {

            if (transaccion.Cantidad <= 0 || transaccion.PrecioUnitario <= 0)
                return BadRequest("Cantidad y precio deben ser mayores a cero.");


            if (transaccion.Tipo == "venta")
            {
                // Stock producto
                var response = await _httpClient.GetAsync($"/api/productos/{transaccion.ProductoId}");
                if (!response.IsSuccessStatusCode) return BadRequest("Producto no encontrado");

                var producto = await response.Content.ReadFromJsonAsync<ProductoDto>();
                if (producto.Stock < transaccion.Cantidad)
                    return BadRequest("Stock insuficiente");
            }

            // Guardar 
            _context.Transacciones.Add(transaccion);
            await _context.SaveChangesAsync();

            // actualizar stock
            var operacion = transaccion.Tipo == "venta" ? -transaccion.Cantidad : transaccion.Cantidad;
            var result = await _httpClient.PutAsJsonAsync($"/api/productos/ajustarStock/{transaccion.ProductoId}", operacion);

            return Ok(transaccion);
        }

        [HttpGet]
        public async Task<IActionResult> Historial([FromQuery] int? productoId, [FromQuery] string? tipo, [FromQuery] DateTime? desde, [FromQuery] DateTime? hasta)
        {
            var query = _context.Transacciones.AsQueryable();

            if (productoId.HasValue)
                query = query.Where(t => t.ProductoId == productoId);            
            if (!string.IsNullOrEmpty(tipo) && tipo.ToLower() != "todos")
                query = query.Where(t => t.Tipo == tipo);
            if (desde.HasValue)
                query = query.Where(t => t.Fecha >= desde);
            if (hasta.HasValue)
                query = query.Where(t => t.Fecha <= hasta);

            var resultado = await query.ToListAsync();
            return Ok(resultado);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var transaccion = await _context.Transacciones.FindAsync(id);
            if (transaccion == null)
                return NotFound();

            _context.Transacciones.Remove(transaccion);
            await _context.SaveChangesAsync();
            return NoContent();
        }


    }

}
