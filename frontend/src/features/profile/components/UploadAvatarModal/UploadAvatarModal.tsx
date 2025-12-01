import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDispatch } from "react-redux";

import {
  Box,
  Button,
  Image as ChakraImage,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { base64toFile } from "../../../../utils";
import { uploadAvatarModalSlice } from "../../../../state/UploadAvatarDrawerState";
import { useAppSelector } from "../../../../store/hooks";
import {
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from "../../api/client";

interface CropImageModalProps {
  dimensions: {
    width: number;
    height: number;
  };

  refetch: () => void;
}

const CropImageModal: FunctionComponent<CropImageModalProps> = ({
  dimensions,
  refetch,
}) => {
  const defaultCrop: Crop = useMemo(
    () => ({
      unit: "px",
      width: dimensions.width * 20,
      height: dimensions.height * 20,
      x: 25,
      y: 25,
    }),
    [dimensions]
  );

  const toast = useToast();

  const [crop, setCrop] = useState<Crop>(defaultCrop);
  const { mutate: updateProfile, isLoading } = useUploadAvatarMutation();

  const imageRef = useRef<HTMLImageElement>(null);

  const { uploadAvatar } = useAppSelector((state) => state.main);
  const dispatch = useDispatch();

  const previewSource = useMemo(() => {
    if (uploadAvatar.file) {
      const imageUrl = URL.createObjectURL(uploadAvatar.file);

      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        if (crop.x + crop.width > (img?.naturalWidth ?? 0)) {
          setCrop({
            unit: "px",
            width: img?.naturalWidth ?? 0,
            height:
              ((img?.naturalWidth ?? 0) * dimensions.height) / dimensions.width,
            x: 0,
            y: 0,
          });
        } else if (crop.y + crop.height > (img?.naturalHeight ?? 0)) {
          setCrop({
            unit: "px",
            width:
              ((img?.naturalHeight ?? 0) * dimensions.width) /
              dimensions.height,
            height: img?.naturalHeight ?? 0,
            x: 0,
            y: 0,
          });
        } else {
          setCrop(defaultCrop);
        }
      };

      return {
        src: imageUrl,
        name: uploadAvatar.file.name,
      };
    }
  }, [uploadAvatar.file]);

  const onCrop = (croppedImage: HTMLImageElement) => {
    if (!previewSource) {
      return;
    }

    const croppedImageBlob = base64toFile(
      croppedImage.src,
      previewSource.name,
      "image/jpeg"
    );
    let formData = new FormData();
    formData.append("folder", "images");
    formData.append("file", croppedImageBlob);

    updateProfile(formData, {
      onSuccess() {
        refetch();
        toast({
          title: "The profile avatar was successfully updated",
          status: "success",
          duration: 1500,
          isClosable: true,
        });

        onClose();
      },
      onError() {
        toast({
          title:
            "Failed to update the profile avatar, please, try again",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      },
    });
  };

  const cropImage = () => {
    const image = imageRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = dimensions.width * 120;
    canvas.height = dimensions.height * 120;

    if (!ctx || !image || !previewSource) {
      return;
    }

    const scaleY =
      crop.unit == "px" ? image.naturalHeight / image.clientHeight : undefined;
    const scaleX =
      crop.unit == "px" ? image.naturalWidth / image.clientWidth : undefined;

    const cropX = scaleX
      ? crop.x * scaleX
      : (crop.x / 100) * image.naturalWidth;
    const cropY = scaleY
      ? crop.y * scaleY
      : (crop.y / 100) * image.naturalHeight;
    const cropWidth = scaleX
      ? crop.width * scaleX
      : (crop.width / 100) * image.naturalWidth;
    const cropHeight = scaleY
      ? crop.height * scaleY
      : (crop.height / 100) * image.naturalHeight;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const croppedImage = new Image();
    croppedImage.src = canvas.toDataURL();

    onCrop(croppedImage);
  };

  const onClose = () => {
    dispatch(
      uploadAvatarModalSlice.actions.toggleDrawer({
        isOpen: false,
      })
    );
  };

  return (
    <Modal isOpen={uploadAvatar.isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        px={{ base: "1.5rem", sm: "3.75rem" }}
        maxW={{ base: "90%", md: 620 }}
        pt="3.75rem"
        pb={{ base: "2rem", sm: "3.75rem" }}
        maxHeight="95vh"
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <ModalCloseButton
          size="lg"
          _hover={{}}
          left={{ base: "1rem", sm: "2rem" }}
          top="2rem"
          right="2rem"
          justifySelf="flex-end"
          width="fit-content"
          height="fit-content"
        />
        <ModalBody
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height="fit-content"
          gap="2rem"
          padding="0"
          width="100%"
          bg="white"
        >
          <Text
            fontFamily="heading"
            fontSize="2.25rem"
            lineHeight="normal"
            fontWeight="500"
          >
            Uploading your image
          </Text>
          <Box mt="0 !important" width="fit-content">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              aspect={1}
              circularCrop
              keepSelection
              minHeight={90}
              minWidth={160}
            >
              <ChakraImage
                objectFit="cover"
                objectPosition="center"
                ref={imageRef}
                borderRadius="0.25rem"
                src={previewSource?.src}
              />
            </ReactCrop>
          </Box>

          <Flex
            flexDir={{ base: "column", sm: "row" }}
            justifyContent="flex-end"
            mt="0 !Important"
            gap="0.75rem"
          >
            <Button
              lineHeight="normal"
              mt="0 !important"
              variant="secondary"
              width={{
                base: "100%",
                sm: "10.75rem",
              }}
              py="0.875rem"
              alignSelf="flex-end"
              onClick={() => {
                setCrop(defaultCrop);
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              mt="0 !important"
              py="0.875rem"
              isLoading={isLoading}
              onClick={cropImage}
              variant="regular"
              height="100%"
              lineHeight="normal"
              width={{
                base: "100%",
                sm: "10.75rem",
              }}
              alignSelf="flex-end"
            >
              Save
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CropImageModal;
