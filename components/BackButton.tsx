import Link from 'next/link'
import React from 'react'

interface BackButtonProps {
    href: string;
    text?: string;
}

const BackButton = ({ href, text }: BackButtonProps) => {
  return (
    <Link href={href}>
        <a className='backButton'>
          <h4>&larr; {text ?? 'Back'}</h4>
        </a>
    </Link>
  )
}

export default BackButton;
