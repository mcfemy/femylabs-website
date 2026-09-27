import ChoiceGroup from '../fields/ChoiceGroup.jsx'
import TextField from '../fields/TextField.jsx'
import TextArea from '../fields/TextArea.jsx'
import {
  BUSINESS_MODELS,
  EXISTING_PROJECT,
  FEATURES,
  PRIORITIES,
  PROJECT_STAGES,
  USER_TYPES,
  YES_NO,
} from '../options.js'

/*
 * Steps built from choice groups. Where a list includes "Other", selecting it
 * reveals a short text field so the answer isn't lost.
 */

export function UsersStep({ data, update, errors }) {
  return (
    <div className="space-y-6">
      <ChoiceGroup
        id="users"
        legend="Who will use it?"
        hint="Select everyone who will use the application."
        options={USER_TYPES}
        value={data.users}
        onChange={update('users')}
        error={errors.users}
        multiple
        required
        columns={3}
      />
      {data.users.includes('Other') && (
        <TextField id="usersOther" label="Who else will use it?" value={data.usersOther} onChange={update('usersOther')} error={errors.usersOther} required />
      )}
    </div>
  )
}

export function FeaturesStep({ data, update, errors }) {
  return (
    <div className="space-y-8">
      <ChoiceGroup
        id="features"
        legend="Which features might your application need?"
        hint="Choose anything that sounds close — it doesn’t need to be exact. We’ll refine the list together during review."
        options={FEATURES}
        value={data.features}
        onChange={update('features')}
        error={errors.features}
        multiple
        columns={3}
      />
      <TextArea
        id="featuresOther"
        label="Other features"
        hint="Anything else it should do that isn’t listed above?"
        value={data.featuresOther}
        onChange={update('featuresOther')}
        error={errors.featuresOther}
        optional
        rows={4}
        maxLength={2000}
      />
    </div>
  )
}

export function ExistingSystemsStep({ data, update, errors }) {
  return (
    <div className="space-y-6">
      <ChoiceGroup
        id="connectsExisting"
        legend="Does it need to connect to software you already use?"
        hint="For example: accounting software, a CRM, email marketing, payment processor, calendar, or spreadsheets."
        options={YES_NO}
        value={data.connectsExisting}
        onChange={update('connectsExisting')}
        error={errors.connectsExisting}
        required
      />
      {data.connectsExisting === 'yes' && (
        <TextArea
          id="existingSystems"
          label="Which software?"
          hint="List the names of the tools you use today, if you know them."
          value={data.existingSystems}
          onChange={update('existingSystems')}
          error={errors.existingSystems}
          required
          rows={4}
          maxLength={2000}
        />
      )}
    </div>
  )
}

export function ExistingProjectStep({ data, update, errors }) {
  return (
    <ChoiceGroup
      id="existingProject"
      legend="Is this a new project, or does something already exist?"
      legendAsHeading
      options={EXISTING_PROJECT}
      value={data.existingProject}
      onChange={update('existingProject')}
      error={errors.existingProject}
      required
    />
  )
}

export function BusinessModelStep({ data, update, errors }) {
  return (
    <div className="space-y-6">
      <ChoiceGroup
        id="businessModel"
        legend="How will this application create value for your business?"
        hint="Select all that apply. If it’s for internal use only, choose “Internal business application.”"
        options={BUSINESS_MODELS}
        value={data.businessModel}
        onChange={update('businessModel')}
        error={errors.businessModel}
        multiple
        required
        columns={3}
      />
      {data.businessModel.includes('Other') && (
        <TextField
          id="businessModelOther"
          label="Describe your business model"
          value={data.businessModelOther}
          onChange={update('businessModelOther')}
          error={errors.businessModelOther}
          required
        />
      )}
    </div>
  )
}

export function ProjectStageStep({ data, update, errors }) {
  return (
    <ChoiceGroup
      id="projectStage"
      legend="Where is your project today?"
      legendAsHeading
      options={PROJECT_STAGES}
      value={data.projectStage}
      onChange={update('projectStage')}
      error={errors.projectStage}
      required
    />
  )
}

export function PriorityStep({ data, update, errors }) {
  return (
    <div className="space-y-6">
      <ChoiceGroup
        id="priority"
        legend="What matters most for this project?"
        hint="Every project balances several goals. Choose the one that matters most to you right now."
        options={PRIORITIES}
        value={data.priority}
        onChange={update('priority')}
        error={errors.priority}
        required
        columns={3}
      />
      {data.priority === 'Other' && (
        <TextField id="priorityOther" label="Your top priority" value={data.priorityOther} onChange={update('priorityOther')} error={errors.priorityOther} required />
      )}
    </div>
  )
}
