import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

import { FormControl, FormErrorMessage, FormLabel, Switch as ChakraSwitch, SwitchProps as ChakraSwitchProps } from "@chakra-ui/react";

interface SwitchProps extends ChakraSwitchProps {
    name: string;
    label?: string;
    error?: FieldError;
}

const SwitchBase: ForwardRefRenderFunction<HTMLInputElement, SwitchProps>
    = ({ name, label, error = null, ...rest }, ref) => {
        return (
            <FormControl isInvalid={!!error}>
                {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

                <ChakraSwitch
                    name={name}
                    id={name}
                    focusBorderColor={!!error === false ? 'pink.500' : 'red.500'}
                    _focus={{
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

export const Switch = forwardRef(SwitchBase);