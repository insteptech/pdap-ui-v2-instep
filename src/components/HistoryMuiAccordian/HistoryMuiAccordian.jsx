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

export const HistoryMuiAccordian = (props) => {
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




  const handleChange = (panel) => (_, isExpanded) => {

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
  };

  return (
    <Accordion
      className={`${item?.codeCount === 0 || item?.codeCount === undefined ? 'my__accordian' : ''}`}
      expanded={panel ? expanded === panel : singleExpand}
      onChange={handleChange(panel || false)}
    >
      <StyledAccordionSummary 
  expandIcon={expandIcon}
  sx={{ ...sx }} className="pdap-act-summary">
        {header}
      </StyledAccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>{children}</AccordionDetails>
    </Accordion>
  );
};
