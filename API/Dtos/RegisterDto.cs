using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required] public string DisplayName { get; set; }
        [Required] [EmailAddress] public string Email { get; set; }

        [Required]
        [RegularExpression("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{6,10})$",
            ErrorMessage =
                "Password must have at least an uppercase, a lowercase, a number, a special character and at least 6 characters")]
        public string Password { get; set; }
    }
}