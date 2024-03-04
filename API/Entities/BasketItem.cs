

using System.ComponentModel.DataAnnotations.Schema;



//RELAZIONE CON IL PRODOTTO ONE TO ONE
// RELAZIONE CON IL CARRELLO ONE TO MANY
namespace API.Entities
{
    [Table("BasketItems")] // ANNOTATIONS PER RENDERE PLURALE IL NOME DELLA TABELLA
    public class BasketItem
    {
        public int Id { get; set; }

        public int Quantity { get; set; }
        
        // navigation properties

        // LE NAVIGATION PROPERTY PERMETTONO LA RELIZZAZIONE DELLE RELAZIONI
        // ENTITY F CAPIRà DA SOLO LE RELAZIONI E CREA LE FOREIN KEY SEMPLICEMENTE UTILIZZANDO LE NAVIGATION PROPERTY

        // PRIMA RELAZIONE ONO TO ONE CON IL PRODOTTO
        public int ProductId { get; set; }

        public Product Product { get; set; }

        // SECONDA RELAZIONE MANY TO ONE CON IL CARRELLO

        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}