using Microsoft.AspNetCore.Mvc;
using TestTask;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    [HttpGet(Name = "getUserList")]
    public async Task<ActionResult<List<User>>> GetUserList()
    {
        return new List<User> {
            new User { Id = 0, Name = "Влад" },
            new User { Id = 1, Name = "Рома" },
            new User { Id = 2, Name = "Ваня" },
        };
    }
}
