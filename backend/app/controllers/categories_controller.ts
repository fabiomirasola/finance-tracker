
import Category from "#models/category";
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {

  public async index() {
    return Category.all();
  }
  
  public async store({ request }: HttpContext) {
    const data = request.only(['name']);
    const category = await Category.create(data);
    return category;
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