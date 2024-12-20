import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

interface PollResultsProps {
  title: string
  description: string
  options: { name: string; votes: number }[]
  totalVotes: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export function PollResults({ title, description, options, totalVotes }: PollResultsProps) {
  const pieData = options.map((option) => ({
    name: option.name,
    value: option.votes,
  }))

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="pie">Pie Chart</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="bar">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={options}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="votes" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="pie">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="list">
            <div className="space-y-4">
              {options.map((option, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{option.name}</span>
                    <span>{((option.votes / totalVotes) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(option.votes / totalVotes) * 100} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        <p className="text-center mt-4 text-sm text-gray-500">Total votes: {totalVotes}</p>
      </CardContent>
    </Card>
  )
}

