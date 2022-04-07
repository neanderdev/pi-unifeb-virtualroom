import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";
import { useColorModeValue } from "@chakra-ui/react";

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    shouldMatchExactHref?: boolean;
    isCollapseItem?: boolean
}

export function ActiveLink({
    children,
    shouldMatchExactHref = false,
    isCollapseItem = false,
    ...rest
}: ActiveLinkProps) {
    const { asPath } = useRouter();

    let isActive = false;

    if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
        isActive = true;
    }

    if (!shouldMatchExactHref && (
        asPath.startsWith(String(rest.href)) ||
        asPath.startsWith(String(rest.as))
    )) {
        isActive = true;
    }

    const activeColor = useColorModeValue("gray.600", "white");

    return (
        <Link {...rest}>
            {cloneElement(children, !isCollapseItem ? {
                _hover: {
                    color: activeColor,
                    borderRightColor: isActive && activeColor,
                    bg: "blackAlpha.300",
                },
                ...(isActive && {
                    color: activeColor,
                    borderRightColor: isActive && activeColor,
                    bg: "blackAlpha.300",
                }),
            } : {
                bg: isActive && "pink.400",
                variant: isActive ? "solid" : "ghost",
            })}
        </Link>
    );
}