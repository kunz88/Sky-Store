namespace API.Entities
{
    public class Product
    {// propietà devono essere settate come publiche perché il framework entity dovrà cercarlo all'interno della classe

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        public int QuantityInStock { get; set; }

    }
}