using Microsoft.AspNetCore.Mvc;
using TestTask.MongoDB;
using TestTask;

namespace server.Controllers;

[Controller]
[Route("api/Users")]
public class UserController : ControllerBase {

    private readonly UserService _userService;

    public UserController(UserService userService) {
        _userService = userService;
    }
    
    [HttpGet]
    public async Task<ActionResult<List<User>>> GetUsers() {
        return await _userService.GetUserAsync();
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] User user) {
        await _userService.CreateUserAsync(user);
        return CreatedAtAction(nameof(GetUsers), new { id = user.id }, user);
    }

    [HttpPut("id")]
    public async Task<IActionResult> UpdateUser(string id, [FromBody] User user) {
        await _userService.UpdateUserAsync(id, user);
        return NoContent();
    }

    [HttpDelete("id")]
    public async Task<IActionResult> DeleteUser(string id) {
        await _userService.DeleteUserAsync(id);
        return NoContent();
    }
}
