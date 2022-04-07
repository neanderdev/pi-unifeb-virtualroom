import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
    = ({ name, label, error = null, ...rest }, ref) => {
        return (
            <FormControl isInvalid={!!error}>
                {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

                <ChakraInput
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

export const Input = forwardRef(InputBase);