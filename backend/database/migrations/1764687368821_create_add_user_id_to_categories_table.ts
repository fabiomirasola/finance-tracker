import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    // Ajoute la colonne user_id avec la clé étrangère
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('user_id')
           .unsigned()
           .references('id')
           .inTable('users')
           .onDelete('CASCADE')
           .after('name')
    })
  }

  async down() {
    // Supprime la colonne en cas d'annulation de la migration
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('user_id')
    })
  }
}