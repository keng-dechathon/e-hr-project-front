import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'
import { pushSnackbarAction } from '../layout/actions'
import API from '../../utils/api'

export const GET_NEWS_INFORMATION = createRequestTypes(Types.GET_NEWS_INFORMATION)

export const GET_ALLNEWS_INFORMATION = createRequestTypes(Types.GET_ALLNEWS_INFORMATION)

export const getNewsInformation = (config, data = {}) =>
    createAction(GET_NEWS_INFORMATION.REQUEST, {}, {
        method: 'POST',
        url: apiUrl.eHRService.common.news,
        params: data,
        ...config
    }
    )

export const getAllNewsInformation = (config, data = {}) =>
    createAction(GET_ALLNEWS_INFORMATION.REQUEST, { Option: "Getall" }, {
        method: 'POST',
        url: apiUrl.eHRService.common.news,
        params: data,
        ...config
    }
    )


export const addNews = async (values) => {
    console.log(values);
    return API()
        .post(apiUrl.eHRService.common.news, {
            Topic: values.Topic ? values.Topic : '',
            Detail: values.Detail ? values.Detail : '',
            start_at: values.Start ? values.Start : '',
            end_at: values.End ? values.End : '',
            Img: values.Img ? values.Img : '',
            Option: 'Add',
        })
        .then((response) => {
            // console.log(response);
            pushSnackbarAction('success', 'add success')
            return { status: 'success' }
        })
        .catch((error) => {
            pushSnackbarAction('error', 'Server Error.')
            return { status: 'fail' }
        })
}


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
            pushSnackbarAction('error', 'Server Error.')
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
            pushSnackbarAction('error', 'Server Error.')
            return { status: 'fail' }
        })
}
