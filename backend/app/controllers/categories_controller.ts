
import Category from "#models/category";

export default class CategoriesController {

  public async index() {
    return Category.all();
  }  
}