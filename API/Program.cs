using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// servizio per la connessione al database per più informazioni visita framework Entity
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// pre permetterci di inviare richieste dal nostro client
builder.Services.AddCors();

// costruttore applicazione
var app = builder.Build();

// Configure the HTTP request pipeline. cosa accade fra la richiesta http e la risposta,utile per aggiungere middleware
// vi troviamo tutti i nostri middleware: importante ricordare che qui è molto importante l'ordine in cui viene inserito ogni singolo mid
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//settiamo il middleware per ricevere chiamate dal nostro client 
// react in strict mode ha bisogno di due chiamate per sicurezza e senza questo mid non potremmo effettuare chiamate dal client
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"); // autorizziamo gli headers e i verbi che provengono dal nostro client
    // senza questo non riusciremo a fetchare dal client
});

//app.UseHttpsRedirection(); da utilizzare solo in produzione, al momento non utilizziamo https
app.UseAuthorization();

// simile al dispensatore in express , da rivedere con più attenzione
app.MapControllers();


// migrare il database ogni volta che avvio l'app solo se non esistente
var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    context.Database.Migrate();
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "A problem occurred during migration");// logghiamo l'errore in caso di problemi nella creazione del database per il testing
}

// avvio l'app
app.Run();
