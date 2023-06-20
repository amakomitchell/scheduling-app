import { useMutation } from 'react-query'
import { createActivity, deleteActivity, editActivity } from './apis'
import { queryClient } from '../App'
import { Activity } from '../types/activity'

export const useCreateActivity = () => {
    return useMutation(createActivity, {
      onSuccess: (activity) => {
        queryClient.setQueryData<Activity[]>(['ACTIVITIES'], (oldActivities) => ([
          ...(oldActivities || []),
          activity,
        ]))
      }
    })
}

export const useUpdateActivity = () => {
    return useMutation(editActivity, {
        onSuccess: (activity) => {
            queryClient.setQueryData<Activity[]>(['ACTIVITIES'], (oldActivities) => {
                if (!oldActivities) return []
                return oldActivities.map((oldActivity) => {
                    if (oldActivity.id === activity.id) {
                        return activity
                    }
                    return oldActivity
                })
            })
        }
    })
}

export const useDeleteActivity = () => {
    return useMutation(deleteActivity, {
        onSuccess: (activity) => {
            queryClient.setQueryData<Activity[]>(['ACTIVITIES'], (oldActivities) => {
                if (!oldActivities) return []
                return oldActivities.filter((oldActivity) => oldActivity.id !== activity.id)
            })
        }
    })
}