export const useFormRules = () => {
  return {
    ruleRequired: (v: any) => !!v || 'Required',
    ruleEmail: (value: any) => {
      const pattern
        = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i
      return pattern.test(value) || 'Enter a valid email'
    },
    rulePassLen: (v: string) => (!!v && v.length >= 6) || 'Password must be 6 chars or more',
  }
}
