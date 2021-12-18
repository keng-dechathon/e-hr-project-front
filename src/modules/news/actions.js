import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'
import { pushSnackbarAction } from '../layout/actions'
import API from '../../utils/api'

export const GET_NEWS_INFORMATION = createRequestTypes(Types.GET_NEWS_INFORMATION)

export const getNewsInformation = (config, data = {}) =>
    createAction(GET_NEWS_INFORMATION.REQUEST, {}, {
        method: 'POST',
        url: apiUrl.eHRService.common.news,
        params: data,
        ...config
    }
    )




export const updateNews = async (values) => {
    console.log(values);
    return API()
        .post(apiUrl.eHRService.common.news, {
            News_id: values.News_id ? values.News_id : '',
            Topic: values.Topic ? values.Topic : '',
            Detail: values.Detail ? values.Detail : '',
            start_at: values.Start ? values.Start : '',
            end_at: values.End ? values.End : '',
            Img: values.Img ? values.Img : '',
            Option: 'Update',
        })
        .then((response) => {
            // console.log(response);
            pushSnackbarAction('success', 'update success')
            return { status: 'success' }
        })
        .catch((error) => {
            pushSnackbarAction('Server Error', 'Server Error.')
            return { status: 'fail' }
        })
}

export const deleteNews = async (values) => {
    console.log('dad');
    return API()
        .post(apiUrl.eHRService.common.news, {
            Value: values,
            Option: 'Delete',
        })
        .then((response) => {
            // console.log(response);
            pushSnackbarAction('success', 'delete success')
            return { status: 'success' }
        })
        .catch((error) => {
            pushSnackbarAction('Server Error', 'Server Error.')
            return { status: 'fail' }
        })
}
