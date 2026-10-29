import createCache from '@emotion/cache'
import {prefixer} from 'stylis'
import rtlPlugin from '@mui/stylis-plugin-rtl'
export const rtlCache = createCache({
    key : 'muirtl',
    // prepend: סגנונות MUI נטענים ראשונים, כך שקובצי ה-CSS של העיצוב (src/styles) גוברים עליהם
    prepend: true,
    stylisPlugins : [prefixer, rtlPlugin]
})
