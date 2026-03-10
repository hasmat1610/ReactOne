import { Request, Response } from 'express'
import { supabaseAdmin } from '../supabaseClient'

export const getPosts = async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*, profiles(full_name, avatar_url)')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('*, profiles(full_name, avatar_url)')
      .eq('slug', slug)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const createPost = async (req: Request, res: Response) => {
  try {
    const postData = req.body
    const { data, error } = await supabaseAdmin.from('posts').insert([postData]).select()

    if (error) throw error
    res.status(201).json(data)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
