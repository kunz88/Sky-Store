using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController : BaseApiController // estendiamo una classe controller base ereditandone il formato e i membri
    {
        private readonly StoreContext _context; // creo una variabile privata di tipo StoreContext(la nostra sessione col  database)
        public ProductsController(StoreContext context) // costruttore
        {
            _context = context;// dopo averla costruita la userò per interrogare il database, essa infatti rappresenta l'istanza del database

        }

        // creo il primo endpoint (Simile al Get / su express , ritorna tutti gli elementi del database)
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {// il tipo di ritorno di questo metodo sarà un task
            // rendiamo la funzione asincrona quando interroghiamo il database
            return await _context.Products.ToListAsync(); // funzione LINQ
                                                          // interrogo il database e mi faccio ritornare un lista di tutti i prodotti

            //return Ok(products); // ok rappresente lo status code 200 
        }
        [HttpGet("{id}")] // endpoint api/product/:id per il singolo prodotto
        public async Task<ActionResult<Product>> GetProduct(int id)
        { // action result di un solo prodotto di dipo product
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

    }
}