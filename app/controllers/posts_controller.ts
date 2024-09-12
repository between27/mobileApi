import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  public async index({ response }: HttpContext) {
    const posts = await Post.all()
    return response.ok(posts)
  }
  public async store({ request, auth, response }: HttpContext) {
    const data = request.only(['title', 'content'])
    const post = await auth.user!.related('posts').create(data)
    return response.created(post)
  }
  public async show({ params, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    return response.ok(post)
  }

  public async update({ params, request, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    post.merge(request.only(['title', 'content']))
    await post.save()
    return response.ok(post)
  }

  public async destroy({ params, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    return response.ok({ message: 'Post deleted successfully' })
  }
}
