'use client'
 
import { useFormStatus } from 'react-dom'
 
export default function SubmitButton({displayText = "Submit"}) {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" disabled={pending}>
      {displayText}
    </button>
  )
}