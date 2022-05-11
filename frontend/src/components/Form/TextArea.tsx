import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import { FormControl, FormErrorMessage, FormLabel, Textarea as ChakraTextarea, TextareaProps as ChakraTextareaProps } from "@chakra-ui/react";

interface TextareaProps extends ChakraTextareaProps {
    name: string;
    label?: string;
    error?: FieldError;
}

const TextAreaBase: ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps>
    = ({ name, label, error = null, ...rest }, ref) => {
        return (
            <FormControl isInvalid={!!error}>
                {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

                <ChakraTextarea
                    name={name}
                    id={name}
                    focusBorderColor={!!error === false ? 'pink.500' : 'red.500'}
                    bgColor='white'
                    variant='filled'
                    _hover={{
                        bgColor: 'gray.50'
                    }}
                    _focus={{
                        bg: "gray.50",
                        borderColor: !!error === false ? 'pink.500' : 'red.500',
                    }}
                    size='lg'
                    ref={ref}
                    {...rest}
                />

                {!!error && (
                    <FormErrorMessage>
                        {error.message}
                    </FormErrorMessage>
                )}
            </FormControl>
        );
    }

export const TextArea = forwardRef(TextAreaBase);