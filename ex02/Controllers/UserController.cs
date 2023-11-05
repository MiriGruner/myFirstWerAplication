using Entities;
using Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
//Rename the project name to WebApiShopSite etc...
namespace ex02.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
      private readonly IUserService  userServices; //_userService - convention 

        public UserController(IUserService userServices)
        {
            this.userServices = userServices;
        }


        // GET api/<RegisterAndLogin>/5
        [HttpGet]
        public ActionResult<User> Get([FromQuery]string userName="", [FromQuery] string password="")
        {
            //async await? 
            User user = userServices.GetUserByUserNameAndPassword(userName, password);
            if (user == null)
                return NoContent();
            return Ok(user);
          

        }

        // POST api/<RegisterAndLogin>
        [HttpPost]
        public CreatedAtActionResult Post([FromBody] User user)
        {
            //async await???? the function should return Task<ActionResult<User>>
            //CreatedAtActionResult- is a spesific action, but in some cases you have to return BadRequests()!
            //Change it to ActionResult... (for all actions).
            try
            {
                User newUser = userServices.Post(user);
                //newUser-  in  new { id = newUser.userId }, newUser (you have to return the newUser!)
                return CreatedAtAction(nameof(Get), new { id = user.userId }, user);
                //Check if newUser==null return BadRequest() 
            }
            catch (Exception ex)
            {
                //(An exception return an interanl server error- 500) 
                throw ex;
            }
        }
        // PUT api/<RegisterAndLogin>/5
        [HttpPut("{id}")]
        public User Put(int id, [FromBody] User userToUpdate)
        {
            //Task<ActionResult<User>>?? - 
            //Add async await and ActionResult
            return userServices.UpdateUser(id, userToUpdate);
            //Check if updateUser==null return BadRequest() , if not return Ok(updatedUser)
            //

        }

        //Function for GetUserById is missing!

        //Function for checking password's strength is missing!

        //Clean code -Remove unnecessary lines of code.
        // DELETE api/<RegisterAndLogin>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
