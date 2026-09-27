import TextField from '../fields/TextField.jsx'
import SelectField from '../fields/SelectField.jsx'
import { INDUSTRIES } from '../options.js'

export default function AboutYouStep({ data, update, errors }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <TextField id="name" label="Your name" value={data.name} onChange={update('name')} error={errors.name} required autoComplete="name" />
      <TextField
        id="company"
        label="Company"
        value={data.company}
        onChange={update('company')}
        error={errors.company}
        required
        autoComplete="organization"
        hint="If your business isn’t formed yet, enter your working name."
      />
      <TextField id="email" label="Email" type="email" value={data.email} onChange={update('email')} error={errors.email} required autoComplete="email" />
      <TextField id="phone" label="Phone" type="tel" value={data.phone} onChange={update('phone')} error={errors.phone} required autoComplete="tel" inputMode="tel" />
      <TextField
        id="website"
        label="Website"
        type="url"
        value={data.website}
        onChange={update('website')}
        error={errors.website}
        optional
        autoComplete="url"
        inputMode="url"
        placeholder="example.com"
      />
      <SelectField id="industry" label="Industry" value={data.industry} onChange={update('industry')} options={INDUSTRIES} error={errors.industry} required />
      {data.industry === 'Other' && (
        <div className="sm:col-start-2">
          <TextField id="industryOther" label="Your industry" value={data.industryOther} onChange={update('industryOther')} error={errors.industryOther} required />
        </div>
      )}
    </div>
  )
}
