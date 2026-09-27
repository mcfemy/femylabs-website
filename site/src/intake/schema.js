import AboutYouStep from './steps/AboutYouStep.jsx'
import { IdeaStep, ProblemStep, SolutionStep, SuccessStep } from './steps/FreeTextSteps.jsx'
import {
  BusinessModelStep,
  ExistingProjectStep,
  ExistingSystemsStep,
  FeaturesStep,
  PriorityStep,
  ProjectStageStep,
  UsersStep,
} from './steps/ChoiceSteps.jsx'

/** Blank intake answers. */
export const INITIAL_DATA = {
  // About You
  name: '',
  company: '',
  email: '',
  phone: '',
  website: '',
  industry: '',
  industryOther: '',
  // Idea / Problem / Solution
  idea: '',
  problem: '',
  solution: '',
  // Users & Features
  users: [],
  usersOther: '',
  features: [],
  featuresOther: '',
  // Existing systems & project
  connectsExisting: '',
  existingSystems: '',
  existingProject: '',
  // Business
  businessModel: [],
  businessModelOther: '',
  projectStage: '',
  priority: '',
  priorityOther: '',
  // Final question
  successVision: '',
}

// ---------------------------------------------------------------------------
// Validation helpers. Each returns an error message or undefined.
// ---------------------------------------------------------------------------
const MIN_TEXT = 20
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const required = (value, message) => (!value || !String(value).trim() ? message : undefined)
const longText = (value, message) => {
  const v = (value ?? '').trim()
  if (!v) return message
  if (v.length < MIN_TEXT) return `Please add a little more detail (at least ${MIN_TEXT} characters).`
  return undefined
}
const pickOne = (list, message) => (!list || list.length === 0 ? message : undefined)

/** Remove undefined entries so an empty object means "valid". */
const clean = (errors) => Object.fromEntries(Object.entries(errors).filter(([, v]) => v))

/**
 * The intake steps, in order. Each step declares:
 *   id        – stable key (used in drafts and analytics)
 *   nav       – short label for the progress list
 *   title     – the step heading
 *   intro     – one supportive sentence under the heading
 *   Component – renders the fields
 *   validate  – (data) => { fieldId: message }
 */
export const STEPS = [
  {
    id: 'about',
    nav: 'About You',
    title: 'About You',
    intro: 'Let’s start with the basics, so we know who we’re talking to.',
    Component: AboutYouStep,
    validate: (d) =>
      clean({
        name: required(d.name, 'Please enter your name.'),
        company: required(d.company, 'Please enter your company name.'),
        email: !d.email.trim()
          ? 'Please enter your email address.'
          : !EMAIL_RE.test(d.email.trim())
            ? 'Please enter a valid email address, like name@company.com.'
            : undefined,
        phone: !d.phone.trim()
          ? 'Please enter a phone number.'
          : d.phone.replace(/\D/g, '').length < 7
            ? 'Please enter a complete phone number.'
            : undefined,
        website:
          d.website.trim() && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(d.website.trim())
            ? 'Please enter a valid website address, like example.com.'
            : undefined,
        industry: required(d.industry, 'Please choose your industry.'),
        industryOther: d.industry === 'Other' ? required(d.industryOther, 'Please tell us your industry.') : undefined,
      }),
  },
  {
    id: 'idea',
    nav: 'Your Idea',
    title: 'Tell Us About Your Idea',
    intro: 'No technical terms needed. Just describe what you have in mind.',
    Component: IdeaStep,
    validate: (d) => clean({ idea: longText(d.idea, 'Please describe what you’d like Femylabs to build.') }),
  },
  {
    id: 'problem',
    nav: 'The Problem',
    title: 'The Problem',
    intro: 'The clearer the problem, the better the solution.',
    Component: ProblemStep,
    validate: (d) => clean({ problem: longText(d.problem, 'Please describe the problem this will solve.') }),
  },
  {
    id: 'solution',
    nav: 'The Solution',
    title: 'The Solution',
    intro: 'Picture the finished application working exactly as you hoped.',
    Component: SolutionStep,
    validate: (d) => clean({ solution: longText(d.solution, 'Please describe what the application should make possible.') }),
  },
  {
    id: 'users',
    nav: 'Users',
    title: 'Users',
    intro: 'Knowing who uses it shapes almost every decision that follows.',
    Component: UsersStep,
    validate: (d) =>
      clean({
        users: pickOne(d.users, 'Please select at least one type of user.'),
        usersOther: d.users.includes('Other') ? required(d.usersOther, 'Please tell us who else will use it.') : undefined,
      }),
  },
  {
    id: 'features',
    nav: 'Features',
    title: 'Important Features',
    intro: 'What should people be able to do? Pick what feels right — this isn’t final.',
    Component: FeaturesStep,
    validate: (d) =>
      clean({
        features:
          d.features.length === 0 && !d.featuresOther.trim()
            ? 'Please choose at least one feature, or describe what you need under “Other features.”'
            : undefined,
      }),
  },
  {
    id: 'existing-systems',
    nav: 'Existing Systems',
    title: 'Existing Systems',
    intro: 'Many applications work alongside tools you already rely on.',
    Component: ExistingSystemsStep,
    validate: (d) =>
      clean({
        connectsExisting: required(d.connectsExisting, 'Please choose yes or no.'),
        existingSystems:
          d.connectsExisting === 'yes' ? required(d.existingSystems, 'Please list the software it should connect to.') : undefined,
      }),
  },
  {
    id: 'existing-project',
    nav: 'Existing Project',
    title: 'Is This a New Project?',
    intro: 'Tell us whether anything has already been built.',
    Component: ExistingProjectStep,
    validate: (d) => clean({ existingProject: required(d.existingProject, 'Please choose the option that fits best.') }),
  },
  {
    id: 'business-model',
    nav: 'Business Model',
    title: 'Business Model',
    intro: 'How the application creates value helps us plan the right features.',
    Component: BusinessModelStep,
    validate: (d) =>
      clean({
        businessModel: pickOne(d.businessModel, 'Please select at least one option — “Not determined yet” is fine.'),
        businessModelOther: d.businessModel.includes('Other')
          ? required(d.businessModelOther, 'Please describe your business model.')
          : undefined,
      }),
  },
  {
    id: 'project-stage',
    nav: 'Project Stage',
    title: 'Project Stage',
    intro: 'Every stage is a good place to start.',
    Component: ProjectStageStep,
    validate: (d) => clean({ projectStage: required(d.projectStage, 'Please choose the stage that fits best.') }),
  },
  {
    id: 'priority',
    nav: 'Priority',
    title: 'Priority',
    intro: 'This helps us recommend the right approach and phasing.',
    Component: PriorityStep,
    validate: (d) =>
      clean({
        priority: required(d.priority, 'Please choose your top priority.'),
        priorityOther: d.priority === 'Other' ? required(d.priorityOther, 'Please tell us your top priority.') : undefined,
      }),
  },
  {
    id: 'success',
    nav: 'Final Question',
    title: 'Final Question',
    intro: 'The most important answer of all.',
    Component: SuccessStep,
    validate: (d) => clean({ successVision: longText(d.successVision, 'Please tell us what success looks like to you.') }),
  },
]

/** Index of the first step with errors, or -1 if everything is valid. */
export function firstInvalidStep(data) {
  return STEPS.findIndex((step) => Object.keys(step.validate(data)).length > 0)
}
