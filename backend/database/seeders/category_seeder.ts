import Category from "#models/category";
import { BaseSeeder } from "@adonisjs/lucid/seeders";


export default class CategorySeeder extends BaseSeeder {
  public async run () {
    await Category.createMany([
      { name: 'Alimentaire' },
      { name: 'Transport' },
      { name: 'Logement' },
      { name: 'Abonnements' },
      { name: 'Santé' },
      { name: 'Autres' }
    ])
  }
}