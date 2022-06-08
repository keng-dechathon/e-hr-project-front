/* eslint-disable */
import { parsePhoneNumberFromString } from 'libphonenumber-js/max'


export const isEmail = (email) => {
  return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
}

export const isThai = (text) => {
  return /^[ก-๏ ]*$/i.test(text)
}

export const isThaiWithSpacebar = (text) => {
  return /^[ก-๏ \s]*$/i.test(text)
}

export const isEnglish = (text) => {
  return /^[a-zA-Z]*$/i.test(text)
}

export const isEnglishWithSpacebar = (text) => {
  return /^[a-zA-Z\s]*$/i.test(text)
}

export const isNumber = (text) => {
  return /^[0-9]*$/i.test(text)
}

export const isSomeNumber = (text) => {
  return /[0-9]/.test(text)
}

export const isEnglishNumberSpecialCharactersEmail = (text) => {
  return /^[a-zA-Z0-9@_.-]*$/i.test(text)
}

export const isSpecialCharacter = (text) => {
  return /[!@#$%^&*.\/\,]/.test(text)
}

export const isEnglishSmall = (text) => {
  return /^[a-z]$/.test(text)
}

export const isSomeEnglishSmall = (text) => {
  return /[a-z]/.test(text)
}

export const isEnglishLarge = (text) => {
  return /^[A-Z]$/.test(text)
}

export const isSomeEnglishLarge = (text) => {
  return /[A-Z]/.test(text)
}

export const isEnglishSpecialCharactersPassword = (text) => {
  return /[!@#$%&]/.test(text)
}

export const isCharactersPassword = (text) => {
  return /^([a-zA-Z0-9!@#$%&])+$/g.test(text)
}

export const isCharactersPasswordMinimum = (text) => {
  return /^((?=.*[a-zA-Z!@#$%&])(?=.*[0-9]).{8,})+$/g.test(text)
}

export const validatePatternPasswordCorrect = (text) => {
  return /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&]).{10,})+$/g.test(text)
}


export const isNameEnglish = (text) => {
  return /^[a-zA-Z0-9!@#$&()`.+,/"-]*$/i.test(text)
}

export const validateNationalIDThai = (text='') => {
  var sum = 0
  for (var i = 0; i < 12; i++) {
    sum += parseFloat(text.charAt(i)) * (13 - i)
  }
  if ((11 - sum % 11) % 10 !== parseFloat(text.charAt(12))) {
    return false
  }
  return true
}


export const isPhoneNumber =  (text) => {
  return /^\d{10}$/.test(text)
}

export const isPhone = async (value) => {
  try {
    const phoneParsed = await parsePhoneNumberFromString(
      value,
      'TH'
    )
    if (!phoneParsed || (!phoneParsed.isValid() && !(phoneParsed.getType() === 'MOBILE'))) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}

export const validateBothSame = (value1, value2) => {
  if (value1 === value2) return true
  else return false
}