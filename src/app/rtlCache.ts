import createCache from '@emotion/cache'
import {prefixer} from 'stylis'
import rtlPlugin from '@mui/stylis-plugin-rtl'
export const rtlCache = createCache({
    key : 'muirtl',
    stylisPlugins : [prefixer, rtlPlugin]
})