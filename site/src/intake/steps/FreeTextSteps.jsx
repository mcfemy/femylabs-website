import TextArea from '../fields/TextArea.jsx'

/*
 * The four open-ended steps: Idea, Problem, Solution, and the Final Question.
 * Each is a single large text area; wording is from the site spec.
 */

export function IdeaStep({ data, update, errors }) {
  return (
    <TextArea
      id="idea"
      label="What would you like Femylabs to build?"
      hint="Describe it the way you’d explain it to a colleague. Plain language is perfect."
      value={data.idea}
      onChange={update('idea')}
      error={errors.idea}
      required
      placeholder="For example: an online portal where our clients can book appointments, pay deposits, and get reminders…"
    />
  )
}

export function ProblemStep({ data, update, errors }) {
  return (
    <TextArea
      id="problem"
      label="What problem will this solve?"
      hint="Describe what currently isn’t working, takes too much time, costs too much, creates frustration, or represents an opportunity your business cannot currently capture."
      value={data.problem}
      onChange={update('problem')}
      error={errors.problem}
      required
    />
  )
}

export function SolutionStep({ data, update, errors }) {
  return (
    <TextArea
      id="solution"
      label="What would you like the application to make possible?"
      hint="Imagine it’s finished and working. What can you, your team, or your customers now do that they couldn’t before?"
      value={data.solution}
      onChange={update('solution')}
      error={errors.solution}
      required
    />
  )
}

export function SuccessStep({ data, update, errors }) {
  return (
    <TextArea
      id="successVision"
      label="If Femylabs successfully builds this project, what does success look like to you?"
      hint="Hours saved, revenue gained, customers served, mistakes avoided — whatever matters most to you."
      value={data.successVision}
      onChange={update('successVision')}
      error={errors.successVision}
      required
    />
  )
}
