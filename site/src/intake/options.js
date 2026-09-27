// Choice lists for the project intake. `value` is what gets submitted;
// `label` is what visitors see.

const toOptions = (labels) => labels.map((label) => ({ value: label, label }))

export const INDUSTRIES = toOptions([
  'Construction & Trades',
  'Education & Training',
  'Finance & Insurance',
  'Food & Hospitality',
  'Healthcare & Wellness',
  'Home Services',
  'Legal & Professional Services',
  'Logistics & Transportation',
  'Manufacturing',
  'Nonprofit & Community',
  'Real Estate & Property Management',
  'Retail & E-commerce',
  'Staffing & HR',
  'Travel & Events',
  'Other',
])

export const USER_TYPES = toOptions([
  'Customers',
  'Employees',
  'Administrators',
  'Vendors',
  'Members',
  'Contractors',
  'Public Users',
  'Other',
])

export const FEATURES = [
  { value: 'Payments', label: 'Payments', hint: 'Accept card or online payments' },
  { value: 'Subscriptions', label: 'Subscriptions', hint: 'Recurring billing or memberships' },
  { value: 'User accounts', label: 'User accounts', hint: 'People sign up and sign in' },
  { value: 'Dashboards', label: 'Dashboards', hint: 'See key information at a glance' },
  { value: 'Scheduling', label: 'Scheduling', hint: 'Bookings, appointments, calendars' },
  { value: 'Messaging', label: 'Messaging', hint: 'People message each other or you' },
  { value: 'Notifications', label: 'Notifications', hint: 'Email, text, or in-app alerts' },
  { value: 'AI', label: 'AI', hint: 'Smart suggestions, summaries, or assistants' },
  { value: 'Document uploads', label: 'Document uploads', hint: 'Upload and store files' },
  { value: 'E-commerce', label: 'E-commerce', hint: 'Sell products online' },
  { value: 'Reporting', label: 'Reporting', hint: 'Reports and exports' },
  { value: 'CRM', label: 'CRM', hint: 'Track customers, leads, and follow-ups' },
  { value: 'GPS/location', label: 'GPS / location', hint: 'Maps, tracking, or check-ins' },
  { value: 'Automation', label: 'Automation', hint: 'Routine tasks happen on their own' },
  { value: 'Marketplace', label: 'Marketplace', hint: 'Buyers and sellers in one place' },
  { value: 'Integrations', label: 'Integrations', hint: 'Connect to other software you use' },
  { value: 'Mobile', label: 'Mobile', hint: 'Works great on phones' },
  { value: 'Admin portal', label: 'Admin portal', hint: 'Manage users, content, settings' },
]

export const YES_NO = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

export const EXISTING_PROJECT = [
  { value: 'New project', label: 'New project', hint: 'Starting from scratch' },
  { value: 'Existing application', label: 'Existing application', hint: 'Improve or extend software already in use' },
  { value: 'Prototype', label: 'Prototype', hint: 'An early version or mock-up exists' },
  { value: 'Existing codebase', label: 'Existing codebase', hint: 'Someone has already started building it' },
  { value: 'Not sure', label: 'Not sure', hint: 'We’ll help figure it out' },
]

export const BUSINESS_MODELS = toOptions([
  'Subscription',
  'One-time purchases',
  'Transaction fees',
  'Advertising',
  'Internal business application',
  'Lead generation',
  'Marketplace',
  'Other',
  'Not determined yet',
])

export const PROJECT_STAGES = [
  { value: 'Idea only', label: 'Idea only' },
  { value: 'Requirements developed', label: 'Requirements developed', hint: 'You’ve written down what it should do' },
  { value: 'Designs available', label: 'Designs available', hint: 'Sketches, wireframes, or mock-ups' },
  { value: 'Prototype exists', label: 'Prototype exists' },
  { value: 'Existing application', label: 'Existing application' },
  { value: 'Already generating revenue', label: 'Already generating revenue' },
]

export const PRIORITIES = toOptions([
  'Speed',
  'Cost',
  'Scalability',
  'User experience',
  'Automation',
  'Revenue generation',
  'Internal efficiency',
  'Other',
])
