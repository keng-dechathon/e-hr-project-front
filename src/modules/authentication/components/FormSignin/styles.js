export default (theme) => ({
  root: {
    width: '330px'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  forgot: {
    marginTop: '16px',
    color: theme.palette.info.dark
  },
  textfield: {
    '& input': {
      minHeight: '20px',

    }
    , width: '100%'
  },
  request: {
    marginTop: '8px',
    color: theme.palette.info.dark
  },
  head: {
    color: '#C6168D',
    marginBottom: '40px'
  },
  ButtonSubmit: {
    background: '#ffffff',
    color: '#000000',
  },
  optionbox: {
    position: 'absolute',
  },
  checkbox: {
    left: '0',
  },
  massage: {
    flexDirection: 'column',
    marginBottom: '50px',
    textAlign: 'center',
  },

})

