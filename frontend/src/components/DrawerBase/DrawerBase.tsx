import { FunctionComponent, ReactNode } from 'react';

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  ResponsiveValue,
  StyleProps,
} from '@chakra-ui/react';

interface DrawerBaseProps {
  isOpen: boolean;
  onClose: () => void;
  footer?: ReactNode;
  style?: StyleProps;
  children: ReactNode;
  bodyStyle?: StyleProps;
}

const DrawerBase: FunctionComponent<DrawerBaseProps> = ({
  isOpen,
  onClose,
  children,
  footer,
  style,
  bodyStyle,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={() => {
        onClose();
      }}
    >
      <DrawerOverlay zIndex={1400} />
      <DrawerContent width="100%" maxWidth={944} {...style}>
        <DrawerBody
          position="relative"
          px={{ base: '1rem', md: '3.75rem' }}
          py="5rem"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          {...bodyStyle}
        >
          <DrawerCloseButton
            position="absolute"
            left={{ base: '1rem', md: '2rem' }}
            width="fit-content"
            top="2rem"
            size="1.5rem"
            _hover={{}}
            _active={{}}
          />
          <>{children}</>
        </DrawerBody>
        {footer && <DrawerFooter padding="0">{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerBase;
