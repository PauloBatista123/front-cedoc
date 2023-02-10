import { FormControl, FormErrorMessage, FormLabel, Textarea as TextAreaForm, TextareaProps as ChakraTextareaProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError, Merge } from "react-hook-form";

interface InputProps extends ChakraTextareaProps {
  name: string;
  label?: string;
  error?: Merge<FieldError, undefined>;
}

const TextAreaBase: ForwardRefRenderFunction<HTMLTextAreaElement, InputProps>  = ({name, label, error, ...rest}, ref) => {
  return(
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel mt={"2"} htmlFor={name} >{label}</FormLabel> }

      <TextAreaForm
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
      />

      { !!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
      

    </FormControl>
  );
}

export const TextArea = forwardRef(TextAreaBase);