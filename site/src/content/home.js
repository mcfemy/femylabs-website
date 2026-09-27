// Copy for the Home page.

export const HERO = {
  eyebrow: 'Custom web applications for business owners',
  headline: 'You Bring the Idea. We Build the Technology.',
  body:
    'Femylabs turns ideas, operational challenges, and growth opportunities into custom web applications. You know your business, your customers, and what needs to change. We take it from there — planning, building, and launching software designed around how you actually work.',
}

// "You Don't Need to Be Technical" — the five prompts.
export const NON_TECHNICAL = {
  title: 'You Don’t Need to Be Technical',
  line: 'You don’t need to know how to build it. You need to know what you want it to accomplish.',
  intro:
    'Most great software starts with a business owner who sees a better way to do something. If you can answer these five questions — even roughly — you already have what you need to start.',
  prompts: [
    {
      icon: 'alert',
      question: 'What is the problem?',
      hint: 'What isn’t working, takes too long, costs too much, or holds your business back?',
    },
    {
      icon: 'lightbulb',
      question: 'What is your proposed solution?',
      hint: 'In plain words, what would you like to exist that doesn’t today?',
    },
    {
      icon: 'users',
      question: 'Who will use it?',
      hint: 'Your customers, your team, your vendors, the public — or a mix.',
    },
    {
      icon: 'list',
      question: 'What should users be able to do?',
      hint: 'Book, pay, track, request, approve, report — describe the actions.',
    },
    {
      icon: 'flag',
      question: 'What does success look like?',
      hint: 'Hours saved, revenue gained, fewer mistakes, happier customers.',
    },
  ],
}

// Idea → Problem → Solution → Features → Project Intake.
export const JOURNEY = [
  { label: 'Idea', text: 'Something you’d like to build, fix, or make possible.' },
  { label: 'Problem', text: 'What that idea solves — and what it costs you today.' },
  { label: 'Solution', text: 'What the finished application should make possible.' },
  { label: 'Features', text: 'The specific things people need to be able to do.' },
  { label: 'Project Intake', text: 'A clear, scoped project we can review and propose on.' },
]

// "Sound familiar?" — business situations that often lead to a project.
export const SITUATIONS = [
  'Your team re-enters the same information in three different spreadsheets.',
  'Customers call or email to book, order, or check on something they could do themselves.',
  'You have a service people would pay for online, but no platform to offer it.',
  'Growth is limited by manual work that doesn’t scale with you.',
  'You need one place to see what’s actually happening across the business.',
  'The software you use almost fits — and the gap costs you every week.',
]
