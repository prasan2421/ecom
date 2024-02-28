import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  title: string
  coverImage: {
    node: {
      sourceUrl: string
    }
  }
  slug?: string
}

export default function CoverImage({ title, coverImage, slug }: Props) {
  const myLoader=({src})=>{
    return `coverImage.node.sourceUrl`;
  }
  const image = (
    <div style={{ width: "100%", height: "300px", position: "relative" }}>
    <Image  fill style={{ objectFit: "cover" }} loader={myLoader} src={coverImage?.node.sourceUrl} alt="Cover image" />
    </div>

  )
  return (
    <div className="sm:mx-0">
      {image}
    </div>
  )
}
