

namespace API.Entities
{
    // RELAZIONE CON LA SINGOLA ITEM ONE TO MANY
    public class Basket
    {
        // L'ID VERRà GENERATA AUTOMATICAMENTE DA ENTITY F
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        //METODO PER AGGIUNGERE UN PRODOTTO NEL CARRELLO TENENDO CONTO ANCHE DELLA QUANTITà
        public void AddItem(Product product, int quantity)
        {
            // se tutti i membri della lista hanno un id diversa da ProductId
            if (Items.All(item => item.ProductId != product.Id))
            { // metodo All simile a every in JS

            //METODO ADD AGGIUNGE UN ELEMENTO NELLA LIST
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }
            // METODO FirstOrDefault Restituisce il primo elemento di una sequenza o un valore predefinito se non viene trovato alcun elemento.
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        // METODO PER ELIMINARE UN PRODOTTO DAL CARRELLO
        public void RemoveItem(int productId,int quantity){
            var item = Items.FirstOrDefault(item => item.ProductId == productId); // TROVO L'ELEMENTO
            if (item == null) return; // SE NON LO TROVO ESCO DAL METODO
            item.Quantity -= quantity; // SE LO TROVO SOTTRAGGO LA QUANTITà
            if (item.Quantity == 0) Items.Remove(item); // SE ARRIVA A 0 ELIMINO L'ELEMENTO
        }
    }


}