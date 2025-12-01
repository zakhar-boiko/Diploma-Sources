import { Dispatch, FunctionComponent, SetStateAction } from "react";

import GigParameterSection from "../GigParameterSection/GigParameterSection";
import { GigDataType } from "../../../gigs/api/types";
import TextArea from "../../../../components/TextArea/TextArea";

interface GigDescriptionSectionProps {
  gigData: GigDataType;
  setGigData: Dispatch<SetStateAction<GigDataType>>;
}

const GigDescriptionSection: FunctionComponent<GigDescriptionSectionProps> = ({
  gigData,
  setGigData,
}) => {

  const setDescription = (description: string) => {
    setGigData((prevGigData) => ({
      ...prevGigData,
      description: description,
    }));
  };

  return (
    <GigParameterSection
      title={`Gig description`}
      description={`Describe this gig.`}
  
    >
      <TextArea
        value={gigData.description}
        onChange={(event) => {
          setDescription(event.target.value.slice(0, 2000));
        }}
        limit={2000}
      />
    </GigParameterSection>
  );
};

export default GigDescriptionSection;
