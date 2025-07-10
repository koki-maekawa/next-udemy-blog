import { prisma } from './prisma';

export async function getPosts() {
    return await prisma.post.findMany({
        where: { published: true},
        include: {
            author: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    
}

export async function getPost(id: string){
    return await prisma.post.findUnique({
        where: {id},
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    })
}

export async function serachPosts(serach: string){
    const decodedSearch = decodeURIComponent(serach)
    const normalizedSearch = decodedSearch.replace(/[\s ]+/g,'').trim()
    const searchWords = normalizedSearch.split('').filter(Boolean)

    const fileters = searchWords.map( word =>({
        OR : [
            { title: {contains: word}},
            { content: {contains: word }},
        ]
    }))

    return await prisma.post.findMany({
        where: {
            AND: fileters
        },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        },
    })
}