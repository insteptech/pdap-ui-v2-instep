import * as React from "react";

import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material";
import { useSelector } from "react-redux";
import { convertDate } from "../../utils/helper";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  borderRadius: "0.625rem",
  backgroundColor: "transparent",
  borderBottom: 0,
  "&:before": {
    display: "none",
  },
  width: "100%",
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ sx }) => ({
  borderRadius: "0.625rem",
  ...sx,
}));

export const MuiAccordions = (props) => {
  const {
    item,
    tabs,
    panel,
    code,
    setExpanded,
    expanded,
    setSingleExpand,
    singleExpand,
    sx,
    header,
    expandIcon,
    children,
    handleAddEventData
  } = props;

  const { doctorDetail } = useSelector((state) => state?.doctor?.data);
  const { user } = useSelector((state) => state);
  const {
    existingCondition,
    suspectedCode,
    recaptureCode,
    addressCode,
    duplicateCode,
    deletedCodes,
    } = useSelector((state)=> state?.user?.data);

  const exampleMetadata1 = {
    event_type: "EXISTING_CONDITION_EXPAND",
    metadata: {
      identifier: tabs?.["user"]?.value || "",
      provider_name: doctorDetail?.doctor_name || "",
      patient_id: user?.data?.userInfo?.mrn || "",
      event_datetime: convertDate(new Date().toISOString()),

    }
  }

  const exampleMetadata2 = {
    event_type: "SUSPECT_EXPAND",
    metadata: {
      identifier: tabs?.["user"]?.value || "",
      provider_name: doctorDetail?.doctor_name || "",
      patient_id: user?.data?.userInfo?.mrn || "",
      event_datetime: convertDate(new Date().toISOString()),

    }
  }

  const exampleMetadata3 = {
    event_type: "EXISTING_CONDITION_COLLAPSE",
    metadata: {
      identifier: tabs?.["user"]?.value || "",
      provider_name: doctorDetail?.doctor_name || "",
      patient_id: user?.data?.userInfo?.mrn || "",
      event_datetime: convertDate(new Date().toISOString()),

    }
  }

  const exampleMetadata4 = {
    event_type: "SUSPECT_COLLAPSE",
    metadata: {
      identifier: tabs?.["user"]?.value || "",
      provider_name: doctorDetail?.doctor_name || "",
      patient_id: user?.data?.userInfo?.mrn || "",
      event_datetime: convertDate(new Date().toISOString()),

    }
  }

  const getPanelNumber = (panelNumber = null) => {
    // Variables to check
    const codeList = {
      1: existingCondition,
      2: suspectedCode,
      3: recaptureCode,
      4: addressCode,
      5: duplicateCode,
      6: deletedCodes
    };
  
    if (panelNumber !== null) {
      const variable = codeList[panelNumber];
      if (variable && Object.keys(variable).length) {
        return true; // Variable is not empty
      }
      return false;
    }
  };

  const handleChange = (panel) => (_, isExpanded) => {

    if(getPanelNumber(panel) === false){
      return;
    }

    if ((item?.key === panel && item?.codeCount === 0) || item?.key === panel && item?.codeCount === undefined) {
      return
    }

    if (panel) {
      let codeValue = "";
      if (isExpanded) {
        if (code) codeValue = `${code}-`
      }
      else {
      }
      setExpanded(isExpanded ? panel : false);
    } else {
      setSingleExpand(!singleExpand);
    }


    if (isExpanded === true && panel === 1) {
      auditdata(exampleMetadata1);
    }

    else if (isExpanded === true && panel === 2) {
      auditdata(exampleMetadata2);
    }

    else if (isExpanded === false && panel === 1) {
      auditdata(exampleMetadata3);
    }

    else if (isExpanded === false && panel === 2) {
      auditdata(exampleMetadata4);
    }

  };

  const auditdata = (data) => {

    if (typeof handleAddEventData !== 'function') {
      console.error('handleAddEventData is not a function');
    }

    else {
      handleAddEventData(data);
    }
  }

 
  

  console.log(panel , "dfdsjfhdsjgd")

   

  return (
    <Accordion
      className={`${item.codeCount === 0 || item.codeCount === undefined ? 'my__accordian' : ''}`}
      expanded={panel ? expanded === panel : singleExpand}
      onChange={handleChange(panel || false)}
    >
      <StyledAccordionSummary 
  expandIcon={(item.codeCount === 0 || item.codeCount === undefined) ? null : expandIcon}
  sx={{ ...sx }} className="pdap-act-summary">
        {header}
      </StyledAccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>{children}</AccordionDetails>
    </Accordion>
  );
};
