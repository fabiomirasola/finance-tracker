import User from "#models/user"
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

  public async register ({request, auth, response}: HttpContext) {
    const data = request.only(['email', 'password', 'fullName']);
    const user = await User.create(data);
    const token = await auth.use('api').createToken(user);

    return response.created({
      user: {id: user.id, email: user.email, fullName: user.fullName},
      token: token
    });
  }
  
  public async login ({request, auth, response}: HttpContext) {
    const {email, password} = request.only(['email', 'password']);
    const user = await User.findBy('email', email);

    if(!user){
      return response.unauthorized({message: 'Invalid credentials'});
    }

    const isPasswordValid = await user.verifyPassword(password);

    if(!isPasswordValid){
      return response.unauthorized({message: 'Invalid credentials'});
    }

    const token = await auth.use('api').createToken(user);

    return response.ok({
      user: {id: user.id, email: user.email, fullName: user.fullName},
      token: token
    });
  }

  public async logout ({auth, response}: HttpContext) {
    const user = await auth.use('api').authenticate();
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return response.ok({message: 'Logged out successfully'});
  }
}