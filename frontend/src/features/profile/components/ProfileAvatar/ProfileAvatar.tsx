import {
    FormEvent,
    Fragment,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from 'react';
  
  import {
    Avatar,
    Box,

  } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { actionsProfileInfoSlice } from '../../../../state/ActionsProfileInfoState';
import { HiOutlineCamera, HiOutlineUser } from 'react-icons/hi';
  
  type ProfileAvatarProps = {
    avatarSrc?: string;
    onChangeAvatar: (file: File) => void;
  };
  
  export const ProfileAvatar = ({
    avatarSrc,
    onChangeAvatar,
  }: ProfileAvatarProps) => {
    const dispatch = useAppDispatch();
    const [showUpload, setShowUpload] = useState<boolean>();
    const { actionsProfileInfo } = useAppSelector((state) => state.main);
  
    const fileRef = useRef<HTMLInputElement>(null);
  
    const openFileUploader = () => {
      fileRef?.current?.click();
    };
  
    useEffect(() => {
      if (actionsProfileInfo.uploadAvatarOpen) return openFileUploader();
      return () => {
        dispatch(
          actionsProfileInfoSlice.actions.toggleModal({ uploadAvatarOpen: false })
        );
      };
    }, [actionsProfileInfo.uploadAvatarOpen]);
  
    return (
      <>
        <Box
          onClick={
            openFileUploader
          }
          onMouseEnter={() => setShowUpload(true)}
          onMouseLeave={() => setShowUpload(false)}
          zIndex={800}
          cursor="pointer"
          position="relative"
        >
          <Box as="label">
            <Avatar
              icon={<HiOutlineUser size="2rem" />}
              width="5rem"
              height="5rem"
              backgroundColor="ui_elements_outlines_separators"
              opacity={showUpload ? 0.5 : 1}
              transition="all 0.3s"
              color='black'
              filter={showUpload ? 'brightness(0.7)' : 'none'}
              src={avatarSrc}
            />
  
            <Box
              position="absolute"
              left="50%"
              top="50%"
              transform="translate(-50%,-50%)"
              display={showUpload ? 'block' : 'none'}
            >
              <HiOutlineCamera size='2rem' />
            </Box>
          </Box>
        </Box>
  
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={(event: FormEvent<HTMLInputElement>) => {
            if (event.currentTarget.files) {
              onChangeAvatar(event.currentTarget.files[0]);
            }
          }}
        />
      </>
    );
  };
  