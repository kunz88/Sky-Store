
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


// CONTROLLER PER LA GESTIONE DEL CARRELLO
public class BasketController : BaseApiController
{
    // CREO UNA PROPRIETà CONTEXT PER CONNETTERMI AL DATABASE
    // PRIVATA E SOLO LETTURA PERCHè LA UTILIZZERò SOLO ALL'INTERNO DELLA CLASSE
    private readonly StoreContext _context;
    public BasketController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet(Name = "GetBasket")] // nome che ci servirà per il metodo created at nella post
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NotFound();

        // STRUTTURO I DATI PRESI DAL DATABASE COME UN JSON PER INVIARLI TRAMITE HTTP RESPONSE
        return MapBasketToDto(basket);
    }



    [HttpPost]  // api/basket?productId=3&quantity=2 VERRANNO MESSE DI DEFAULT COME QUERY PARAMS PERCHè UTILIZIAMO ControllerBase
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity = 1)
    {
        // CONTROLLO SE GIà ESISTE UN CARRELLO
        var basket = await RetrieveBasket();
        // SE è NULL CREO UN CARRELLO
        if (basket == null) basket = CreateBasket();
        // PRENDO IL MIO PRODOTTO DAL DATABASE
        var product = await _context.Products.FindAsync(productId);

        if (product == null) return NotFound();

        // AGGIUNGO IL PRODOTTO AL CARRELLO
        basket.AddItem(product, quantity);

        // salviamo i cambiamenti nel database, controlliamo in result se abbiamo salvato i cambiamenti
        var result = await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute("GetBasket",MapBasketToDto(basket));// Dovremo inserire il percorso dove trovare il prodotto inserito utilizzando il metodo CreatedAtRoute

        return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity = 1)
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NotFound();

        basket.RemoveItem(productId, quantity);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });
    }

    //METODO PER PRENDERE IL CARRELLO DAL DATABASE
    private async Task<Basket> RetrieveBasket()
    {
  
        // ALTRIMENTI POSSIAMO PRENDERE IL CARRELLO NEL DATABASE
        return await _context.Baskets
            .Include(i => i.Items) // INCLUDO LE ITEM NEL CARRELLO
            .ThenInclude(p => p.Product) // INCLUDO I PRODOTTI NELLE ITEM
            .FirstOrDefaultAsync(basket => basket.BuyerId == Request.Cookies["buyerId"]);
    }


    // METODO PER CREARE UN CARRELLO 
    private Basket CreateBasket()
    {
        // CREO UNA NUOVA GUID PER L'UTENTE
        var buyerId = Guid.NewGuid().ToString();
        //UTILIZZO L'OPZIONE ESSENTIAL PERCHè IL NOSTRO CARRELLO NON PUò FUNZIONARE SENZA
        var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
        // SALVO LA GUID DELL'UTENTE NEL COOKIE
        Response.Cookies.Append("buyerId", buyerId, cookieOptions);

        // ADESSO CREO UN NUOVO CARRELLO, L'UNICO PARAMETRO DA INSERIRE NEL COSTRUTTORE E BUYERID
        var basket = new Basket { BuyerId = buyerId };
        // AGGIUNGO IL CARRELLO NEL DATABASE
        _context.Baskets.Add(basket);
        return basket;
    }

    //METODO PER MAPPARE IL CARRELLO IN UN "JSON"
    private BasketDto MapBasketToDto(Basket basket)
    {
        return new BasketDto
        {
            Id = basket.Id,
            BuyerId = basket.BuyerId,
            Items = basket.Items.Select(item => new BasketItemDto
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                Price = item.Product.Price,
                PictureUrl = item.Product.PictureUrl,
                Type = item.Product.Type,
                Brand = item.Product.Brand,
                Quantity = item.Quantity

            }).ToList()

        };
    }
}