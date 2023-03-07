using Microsoft.AspNetCore.Mvc;
using TestTask.MongoDB;
using TestTask;

namespace server.Controllers;

[Controller]
[Route("api/[controller]")]
public class UsersController : ControllerBase {

    private readonly UsersService _usersService;

    public UsersController(UsersService usersService) {
        _usersService = usersService;
    }
    
    [HttpGet]
    public async Task<List<User>> Get() {
        return await _usersService.GetAsyns();
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] User user) {
        await _usersService.CreateAsync(user);
        return CreatedAtAction(nameof(Get), new { id = user.id }, user);
    }
}
