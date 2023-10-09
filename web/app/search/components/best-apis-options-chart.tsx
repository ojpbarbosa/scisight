import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

import type { SearchResult } from '@/library/api'

export default function BestApisOptionsChart({
  colors,
  bestAPIsOptions
}: {
  colors: string[]
  bestAPIsOptions: SearchResult['bestAPIsOptions']
}) {
  function getRandomBetween(minimum: number, maximum: number) {
    return Math.random() * (maximum - minimum) + minimum
  }

  const totalPercentage = 100
  const maximumPercentage = 40 + getRandomBetween(2, 5)
  let remainingPercentage = totalPercentage - maximumPercentage
  let currentPercentage = maximumPercentage

  const data = bestAPIsOptions.map((option, i) => {
    if (i > 0) {
      const maxRandomPercentage = Math.min(remainingPercentage, 10)
      const randomPercentage = getRandomBetween(0, maxRandomPercentage)
      currentPercentage -= randomPercentage
      remainingPercentage -= randomPercentage
    }

    return {
      name: option.api,
      value: parseFloat(currentPercentage.toFixed(2))
    }
  })

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="60%"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
              const radius = 25 + innerRadius + (outerRadius - innerRadius)
              const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
              const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

              return (
                <text
                  x={x}
                  y={y}
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fill={colors[index % colors.length]}
                >
                  {value}% {data[index].name.split(' - ')[0]}
                </text>
              )
            }}
          >
            {data.map((_, i) => (
              <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
