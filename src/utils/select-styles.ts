import { ControlProps, CSSObjectWithLabel, OptionProps, StylesConfig } from "react-select";

export const optionsSelectStyles: StylesConfig = {
  option: (styles: CSSObjectWithLabel, state: OptionProps) => {
    return {
      ...styles,
      backgroundColor: state.isFocused ? '#d1d2dc' : '#eeeef2',
      color: '#1f2029',
      fontWeight: state.isFocused ? 'bold' : 'normal',
    }
  },
  placeholder: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: '#616480',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.125rem',
    "&:hover": {
      backgroundColor: '#d1d2dc',
      borderColor: '#d1d2dc',
    },
  }),
  control: (styles: CSSObjectWithLabel, state: ControlProps) => ({
    ...styles,
    color: '#1f2029',
    backgroundColor: '#eeeef2',
    borderColor: '#eeeef2',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '4px',
    paddingBottom: '4px',
    fontFamily: 'Roboto, sans-serif',
    border: state.isFocused ? '2px solid #00A091' : '2px solid #eeeef2',
    "&:hover": {
      backgroundColor: '#d1d2dc',
      borderColor: '#d1d2dc',
    },
    fontSize: '16px',
    "&:focus": {
      backgroundColor: '#d1d2dc',
      borderColor: '#00A091',
    }
  })
}