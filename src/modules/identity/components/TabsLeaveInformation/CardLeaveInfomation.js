import React ,{useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../../common/Typography/Typography'
import styles from './styles'
import Table from '../../../common/Table';
import { getLeaveInformation } from '../../actions';
import { useSelector, useDispatch } from 'react-redux'
const useStyles = makeStyles(styles)

const CardLeaveInfomation = () => {
    const classes = useStyles()
   
    const dispatch = useDispatch()

    const { leaveInformation } = useSelector(state => state.accountReducer)


    useEffect(() => {
        dispatch(getLeaveInformation())
    }, [])
    console.log(leaveInformation);
    const headers = ['Frozen yoghurt','Ice cream sandwich','Eclair','Cupcake','Gingerbread']
    const rows = [
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
        {'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159},
       
    ];
    return (
        <>
            <Table headers={headers}  data = {rows} />
        </>
    )
}

export default CardLeaveInfomation
