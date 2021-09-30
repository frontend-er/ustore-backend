module.exports = class UserDto {
   email;
   id;
   isActivated;
   role;

   constructor(model) {
      this.role = model.role
      this.email = model.email;
      this.id = model._id;
      this.isActivated = model.isActivated;
   }

}