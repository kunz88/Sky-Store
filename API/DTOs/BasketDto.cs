
//Creare oggetti di trasferimento dati

/* Al momento, l'API Web espone le entità di database al client. 
Il client riceve i dati mappati direttamente alle tabelle di database. 
Tuttavia, questa non è sempre una buona idea. A volte si vuole modificare la forma dei dati inviati al client. 
Può, ad esempio, essere necessario:

A tale scopo, è possibile definire un oggetto DTO ( Data Transfer Object ). Un DTO è un oggetto che definisce la modalità 
di invio dei dati in rete. Vediamo come funziona con l'entità Book. Nella cartella Models aggiungere due classi DTO: */


namespace API.DTOs
{
    public class BasketDto
    {
        public int Id { get; set; }
        public String BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; }
    }
}