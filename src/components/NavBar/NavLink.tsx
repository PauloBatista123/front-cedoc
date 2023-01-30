import { Box, Text, Link, Icon as IconChakra, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface NavLinkProps {
  text: string;
  href: string;
  Icon: IconType;
}

export function NavLink({href, text, Icon}: NavLinkProps){
  return(
      <Link
        href={href}
        _hover={{
          textDecor:'none',
        }}
        fontSize={"md"}
        mb={"2"}
      >
        <Flex 
          flexDirection={"row"} 
          gap={"2"} 
          align={"center"} 
          role="group"
        >
          <IconChakra
            as={Icon}
            color={"gray.500"}
            borderBottom="2px solid transparent"
            _groupHover={{
              color: 'green.900',
              transition: 'all 0.3s',
            }}
          />
          <Text
            borderBottom="2px solid transparent"
            _groupHover={{
              color: 'green.900',
              transition: 'all 0.3s',
              borderBottom: '2px solid #00A091'
            }}
          >{text}
          </Text>
        </Flex>
     </Link>
  );
}