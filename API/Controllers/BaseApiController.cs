using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

    [ApiController] // attributo per rendere una classe un controller
    [Route("api/[controller]")] // route dell'API , INFATTI LA PAROLA CONTROLLER VIENE SOSTITUITA DALLA RISORSA
public class BaseApiController : ControllerBase
{

}