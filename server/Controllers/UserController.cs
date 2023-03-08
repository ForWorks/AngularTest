using Microsoft.AspNetCore.Mvc;
using TestTask.MongoDB;
using TestTask;

namespace server.Controllers;

[Controller]
[Route("api/Roles")]
public class UserController : ControllerBase {

    private readonly UserService _userService;

    public UserController(UserService userService) {
        _userService = userService;
    }
    
    [HttpGet]
    public async Task<ActionResult<List<User>>> GetUsers() {
        return await _userService.GetAsync();
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] User user) {
        await _userService.CreateAsync(user);
        return CreatedAtAction(nameof(GetUsers), new { id = user.id }, user);
    }

    [HttpDelete("id")]
    public async Task<IActionResult> DeleteUser(string id) {
        await _userService.DeleteAsync(id);
        return NoContent();
    }
}
