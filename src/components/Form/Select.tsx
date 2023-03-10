import { FormControl, FormErrorMessage, FormLabel, Select as SelectForm, SelectProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError, Merge } from "react-hook-form";

interface InputProps extends SelectProps {
  name: string;
  label?: string;
  type?: string;
  options ?: {
    value: string;
    optionText: string;
  }[];
  error?: Merge<FieldError, undefined>;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, InputProps>  = ({name, label, type, error, options, ...rest}, ref) => {
  return(
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel mt={"2"} htmlFor={name} >{label}</FormLabel> }
      <SelectForm
        name={name}
        id={name}
        focusBorderColor="green.900"
        bgColor="gray.50"
        variant="filled"
        _hover={{
          bgColor: 'gray.100'
        }}
        _focus={{
          bgColor: 'gray.100'
        }}
        size="lg"
        ref={ref}
        {...rest}
      >
        {options?.map(option => (
            <option key={option.value} value={option.value}>{option.optionText}</option>
        ))}
      </SelectForm>

      { !!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
      

    </FormControl>
  );
}

export const Select = forwardRef(SelectBase);