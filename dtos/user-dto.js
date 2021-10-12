module.exports = class UserDto {
   email;
   id;
   isActivated;
   role;

   constructor(model) {
      this.role = model.role
      this.email = model.email;
      this.id = model.id;
      this.isActivated = model.isActivated;
   }

}