import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import { FormControl, FormErrorMessage, FormLabel, HStack, RadioGroup as ChakraRadioGroup, RadioProps as ChakraRadioProps, Radio as ChakraRadio } from "@chakra-ui/react";

interface RadioProps extends ChakraRadioProps {
    name: string;
    label?: string;
    error?: FieldError;
    valueChecked?: string;
    arrayValuesRadio?: Array<{ value: string; name: string; id: string; label: string }>;
}

const RadioButtonBase: ForwardRefRenderFunction<HTMLInputElement, RadioProps>
    = ({ name, label, error = null, valueChecked, arrayValuesRadio = [], ...rest }, ref) => {
        return (
            <FormControl isInvalid={!!error}>
                {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

                <ChakraRadioGroup name={name} defaultValue={valueChecked ? valueChecked : arrayValuesRadio[0]?.value}>
                    <HStack spacing="24px">
                        {arrayValuesRadio.map((valueRadio, index) => (
                            <ChakraRadio
                                key={index}
                                value={valueRadio.value}
                                name={name}
                                id={valueRadio.id}
                                borderColor={!!error === true && "red.500"}
                                bgColor="white"
                                _focus={{
                                    borderColor: !!error === true && "red.500",
                                }}
                                size="lg"
                                ref={ref}
                                {...rest}
                            >
                                {valueRadio.label}
                            </ChakraRadio>
                        ))}
                    </HStack>
                </ChakraRadioGroup>

                {!!error && (
                    <FormErrorMessage>
                        {error.message}
                    </FormErrorMessage>
                )}
            </FormControl>
        );
    }

export const RadioButton = forwardRef(RadioButtonBase);