"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { X, ChevronRight } from 'lucide-react'

interface PollOption {
  id: string
  text: string
  votes: number
}

interface PollQuestion {
  id: string
  title: string
  description: string
  options: PollOption[]
}

interface PollProps {
  questions: PollQuestion[]
  onClose?: () => void
  allowOther?: boolean
}

export function Poll({ questions, onClose, allowOther = true }: PollProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string | null }>({})
  const [hasVoted, setHasVoted] = useState<{ [key: string]: boolean }>({})
  const [showThankYou, setShowThankYou] = useState(false)

  // Check if questions exist and have at least one item
  if (!questions || questions.length === 0) {
    return null
  }

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  const handleVote = () => {
    if (selectedOptions[currentQuestion.id]) {
      setHasVoted({ ...hasVoted, [currentQuestion.id]: true })
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowThankYou(true)
    }
  }

  const totalVotes = currentQuestion.options.reduce((sum, option) => sum + option.votes, 0)

  if (showThankYou) {
    return (
      <Card className="w-full max-w-xs mx-auto">
        <CardHeader className="pb-2 relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <CardTitle className="text-base sm:text-lg">Thank You!</CardTitle>
          <CardDescription className="text-xs">Your feedback is greatly appreciated.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-[250px] mx-auto shadow-lg">
      <CardHeader className="pb-2 relative pt-4">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <CardTitle className="text-sm sm:text-base">{currentQuestion.title}</CardTitle>
        <CardDescription className="text-xs">{currentQuestion.description}</CardDescription>
        <div className="text-xs text-muted-foreground mt-1">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
      </CardHeader>
      <CardContent className="space-y-2 py-2 px-4">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOptions[currentQuestion.id] === option.id
          const hasVotedForQuestion = hasVoted[currentQuestion.id]
          const percentage = hasVotedForQuestion && totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0

          return (
            <div
              key={option.id}
              className={`relative h-8 sm:h-10 rounded-md border-2 transition-all cursor-pointer overflow-hidden
                ${isSelected ? 'border-primary shadow-sm' : 'border-muted'}
                ${hasVotedForQuestion ? 'cursor-default' : 'hover:border-primary/50'}`}
              onClick={() => !hasVotedForQuestion && setSelectedOptions({ ...selectedOptions, [currentQuestion.id]: option.id })}
            >
              {hasVotedForQuestion && (
                <motion.div
                  className="absolute top-0 left-0 h-full bg-primary/10"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-between px-3 z-10">
                <span className="text-xs font-medium">{option.text}</span>
                {hasVotedForQuestion && (
                  <span className="text-xs font-semibold">{percentage.toFixed(1)}%</span>
                )}
              </div>
            </div>
          )
        })}
        {allowOther && !hasVoted[currentQuestion.id] && (
          <div
            className={`relative h-8 sm:h-10 rounded-md border-2 transition-all cursor-pointer overflow-hidden
              ${selectedOptions[currentQuestion.id] === 'other' ? 'border-primary shadow-sm' : 'border-muted'}
              hover:border-primary/50`}
            onClick={() => setSelectedOptions({ ...selectedOptions, [currentQuestion.id]: 'other' })}
          >
            <div className="absolute inset-0 flex items-center px-3 z-10">
              <span className="text-xs font-medium">Other</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 pb-4 px-4">
        {!hasVoted[currentQuestion.id] && (
          <Button 
            onClick={handleVote} 
            disabled={!selectedOptions[currentQuestion.id]} 
            className="w-full text-xs"
          >
            Vote
          </Button>
        )}
        {hasVoted[currentQuestion.id] && (
          <Button 
            onClick={handleNext} 
            className="w-full text-xs"
          >
            {currentQuestionIndex < totalQuestions - 1 ? (
              <>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              'Finish'
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

