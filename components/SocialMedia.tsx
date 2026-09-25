import React, { FC } from 'react'
import { FaFacebookSquare,FaSlack,FaLinkedin,FaGithubSquare } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const socialLink=[
    {
        title:'Facebook',
        href:'https://www.facebook.com/arnob38/',
        icon:<FaFacebookSquare className='w-5 h-5'/>,
    },
    {
        title:'Github',
        href:'https://github.com/mahadihasandev',
        icon:<FaGithubSquare className='w-5 h-5'/>,
    },
    {
        title:'Linkedin',
        href:'https://www.linkedin.com/in/mayhaydi-hasan-b02476259/',
        icon:<FaLinkedin className='w-5 h-5'/>,
    },
    {
        title:'Gmail',
        href:'mailto:mayhaydihasan.com@gmail.com',
        icon:<SiGmail className='w-5 h-5'/>,
    },
    {
        title:'Slack',
        href:'https://webdev-b7t1625.slack.com/team/U0A7KQSG82U',
        icon:<FaSlack className='w-5 h-5'/>,
    },
]

interface Props {
  className?: string;
  iconClassName?: string;
  toolTipClassName?: string;
}

const SocialMedia: FC<Props> = ({
  className,
  iconClassName,
  toolTipClassName,
}) => {

  return (   
        <TooltipProvider>
            <div className={cn('flex items-center mt-3 gap-3.5',className)}>
            {
                socialLink?.map((item)=>(
                    <Tooltip key={item?.title}>
                        <TooltipTrigger asChild>
                            <Link 
                            key={item?.title}
                            href={item?.href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={cn('p-2 border rounded-full hover:text-white hover:border-shop_light_blue hoverEffect',iconClassName)}
                            >
                            {item?.icon}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent 
                        className={cn('bg-white text-shop_dark_blue font-semibold border-red-600',toolTipClassName)}>
                            {item?.title}
                        </TooltipContent>
                    </Tooltip>

                ))
            }
            </div>
        </TooltipProvider>    
  )
}

export default SocialMedia