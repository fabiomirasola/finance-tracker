
import Category from "#models/category";
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {

  public async index({ auth }: HttpContext) {
    const user = auth.user! 

    const categories = await Category.query()
      .where('user_id', user.id)
      .orWhereNull('user_id')    
      .select('*') 
      .orderBy('name', 'asc') 

    return categories;
  }
  
  public async store({ request, auth }: HttpContext) {
    const user = auth.user!
    const name = request.input("name")

    const category = await Category.create({
      name,
      userId: user.id
    })

    return category
  }

  public async delete({ params }: HttpContext) {
    const category = await Category.find(params.id);
    if (category) {
      await category.delete();
      return { message: "Category deleted successfully." };
    } else {
      return { message: "Category not found." };
    }
  }
}