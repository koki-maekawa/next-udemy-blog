import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PostCardProps } from "@/types/post"
import Link from "next/link"
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import Image from "next/image"
import { useMemo } from "react"

export default function PostCard({post}: PostCardProps) {
  const formattedDate = useMemo(() => {
    return formatDistanceToNow(new Date(post.createdAt), {
      addSuffix: true,
      locale: ja
    });
  }, [post.createdAt]);

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
        <Link href={`/posts/${post.id}`}>
            {post.topImage && (
                <div className="relative w-full h-48">
                    <Image
                        src={post.topImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        priority
                    />                    
                </div>
            )}
            <CardHeader className="py-6">
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {post.content}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 ">
                    <span>{post.author.name}</span>
                    <time>
                        {formattedDate}
                    </time>
                </div>
            </CardContent>
        </Link>
    </Card>
  )
}
