import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { ApiError } from '../api/client'
import { store } from './store'
import { logout } from '../features/auth/authSlice'

function handleAuthError(error: unknown) {
    if (error instanceof ApiError && error.status === 401 && error.code !== 'INVALID_CREDENTIALS') {
        store.dispatch(logout())
        queryClient.clear()
    }
}

export const queryClient = new QueryClient({
   queryCache: new QueryCache({ onError: handleAuthError }),
    mutationCache: new MutationCache({ onError: handleAuthError }),
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                if (error instanceof ApiError && error.status < 500)
                    return false
                return failureCount < 1
            }
        }
    }
})