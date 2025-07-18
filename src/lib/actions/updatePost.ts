'use server'

import { saveImage } from "@/utils/image"
import { postSchema } from "@/validations/post"
import { prisma } from "../prisma"
import { redirect } from "next/navigation"

type ActionState = {
    success: boolean;
    errors: Record<string, string[]>
}

export async function updatePost(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState>
{
    // フォームの情報を取得
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const topImage = formData.get('topImage')
    const postId = formData.get('postId') as string
    const published = formData.get('published') === 'true'
    const oldImageUrl = formData.get('oldImageUrl') as string

    // バリデーション
    const validationResult = postSchema.safeParse({title, content, topImage})
    if(!validationResult.success){
        return { success: false, errors: validationResult.error.flatten().fieldErrors}
    }

    // 画像保存
    let imageUrl = oldImageUrl
    if(topImage instanceof File && topImage.size > 0 && topImage.name !== 'undefined'){
        const newimageUrl = await saveImage(topImage)
        if(!newimageUrl){
            return {success: false, errors: { image: ['画像の保存に失敗しました']}}
        }
        imageUrl = newimageUrl
    }

    // DB保存
    await prisma.post.update({
        where: {id: postId},
        data: {
            title,
            content,
            topImage: imageUrl,
            published,
        }
    })

    redirect('/dashboard')
}