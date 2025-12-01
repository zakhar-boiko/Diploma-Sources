import { FunctionComponent } from 'react';

import { Flex, Text } from '@chakra-ui/react';
import { Link } from '../Link/Link';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { HiArrowLongRight } from 'react-icons/hi2';


interface SeeMoreButtonProps {
  href: string;
  linkTitle?: string;
}

const SeeMoreButton: FunctionComponent<SeeMoreButtonProps> = ({
  href,
  linkTitle,
}) => {
  return (
    <Link
      width="fit-content"
      textDecor="none !important"
      mt="0 !important"
      href={href}
    >
      <Flex
        opacity="0.5"
        _hover={{ opacity: '1', gap: '1rem' }}
        transition="all 0.3s"
        left="inherit"
        gap="0.75rem"
        alignItems="center"
      >
        <Text whiteSpace='nowrap' letterSpacing="-0.8px" textTransform="uppercase">
          {linkTitle ?? 'See more'}
        </Text>
        <HiArrowLongRight size="1.5rem" />
      </Flex>
    </Link>
  );
};

export default SeeMoreButton;
