import { STEPS } from './schema.js'

/*
 * Turns intake answers into labelled sections. Used by the review screen and
 * the plain-text copy visitors can download if submission fails.
 */

const list = (values, other) =>
  [...values.filter((v) => v !== 'Other'), ...(values.includes('Other') && other ? [`Other: ${other}`] : [])].join(', ')

const stepIndex = (id) => STEPS.findIndex((s) => s.id === id)

export function buildReviewSections(d) {
  return [
    {
      step: stepIndex('about'),
      title: 'About You',
      items: [
        ['Name', d.name],
        ['Company', d.company],
        ['Email', d.email],
        ['Phone', d.phone],
        ['Website', d.website || '—'],
        ['Industry', d.industry === 'Other' ? `Other: ${d.industryOther}` : d.industry],
      ],
    },
    { step: stepIndex('idea'), title: 'Your Idea', items: [['What would you like Femylabs to build?', d.idea]] },
    { step: stepIndex('problem'), title: 'The Problem', items: [['What problem will this solve?', d.problem]] },
    {
      step: stepIndex('solution'),
      title: 'The Solution',
      items: [['What would you like the application to make possible?', d.solution]],
    },
    { step: stepIndex('users'), title: 'Users', items: [['Who will use it', list(d.users, d.usersOther)]] },
    {
      step: stepIndex('features'),
      title: 'Important Features',
      items: [
        ['Selected features', d.features.join(', ') || '—'],
        ['Other features', d.featuresOther || '—'],
      ],
    },
    {
      step: stepIndex('existing-systems'),
      title: 'Existing Systems',
      items: [
        ['Connects to existing software', d.connectsExisting === 'yes' ? 'Yes' : d.connectsExisting === 'no' ? 'No' : ''],
        ...(d.connectsExisting === 'yes' ? [['Software', d.existingSystems]] : []),
      ],
    },
    { step: stepIndex('existing-project'), title: 'Existing Project', items: [['Project type', d.existingProject]] },
    {
      step: stepIndex('business-model'),
      title: 'Business Model',
      items: [['Business model', list(d.businessModel, d.businessModelOther)]],
    },
    { step: stepIndex('project-stage'), title: 'Project Stage', items: [['Current stage', d.projectStage]] },
    {
      step: stepIndex('priority'),
      title: 'Priority',
      items: [['Top priority', d.priority === 'Other' ? `Other: ${d.priorityOther}` : d.priority]],
    },
    {
      step: stepIndex('success'),
      title: 'Final Question',
      items: [['What does success look like to you?', d.successVision]],
    },
  ]
}

/** Plain-text version of the submission (for download / email fallback). */
export function buildPlainTextSummary(d) {
  const lines = ['FEMYLABS — PROJECT INTAKE', `Prepared ${new Date().toLocaleString()}`, '']
  for (const section of buildReviewSections(d)) {
    lines.push(section.title.toUpperCase(), '-'.repeat(section.title.length))
    for (const [label, value] of section.items) lines.push(`${label}:`, `  ${value || '—'}`, '')
  }
  return lines.join('\n')
}

export function downloadTextFile(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
