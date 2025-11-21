import Transaction from '#models/transaction'
import type { HttpContext } from '@adonisjs/core/http'

export default class TransactionsController {
  public async index({auth}: HttpContext) {
    return Transaction.query().where('user_id', auth.user!.id).preload('category');
  }

  public async store({auth, request}: HttpContext) {
    const data = request.only(['title', 'amount', 'type', 'categoryId', 'createdAt']);
    const transaction = await Transaction.create({...data, userId: auth.user!.id});
    return transaction;
  }

  public async show ({auth, params}: HttpContext) {
    return Transaction.query()
      .where('id', params.id)
      .andWhere('user_id', auth.user!.id)
      .preload('category')
      .firstOrFail();
  }

  public async update({ params, request, auth }: HttpContext) {
    const transaction = await Transaction.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .firstOrFail()
    
    transaction.merge(request.only(['title','amount','type','createdAt','category_id']));
    await transaction.save();
    return transaction;
  }

  public async destroy ({ params, auth }: HttpContext) {
    const transaction = await Transaction.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .firstOrFail()
    
    await transaction.delete();
    return { success: true}
  }
}