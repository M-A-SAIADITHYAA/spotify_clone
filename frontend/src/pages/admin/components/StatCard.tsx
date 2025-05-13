import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

type StatsCardProps = {
  icon: React.ElementType,
  label:string,
  value:string,
  bgColor:string,
  iconColor:string
}

const StatCard = ({icon:Icon,bgColor,label,value,iconColor}:StatsCardProps) => {

  return (
    <Card className='bg-zinc-800/50 border-zinc-900 hover:bg-zinc-800/80 '>
     <CardContent className='p-6'>
      <div className='flex items-center gap-4 '>
        <div>
         <Icon className={`size-10 ${iconColor} ${bgColor} p-2`}/>
        </div>
        <div>
          <p className='text-md text-white'>{label}</p>
          <p className='text-2xl font-extrabold '>{value}</p>
        </div>
      </div>
     </CardContent>

    </Card>
  )
}

export default StatCard