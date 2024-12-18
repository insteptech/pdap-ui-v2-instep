import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import { Card, CardContent, Stack, CustomTooltip } from "@mui/material";
import { CrossIcon2 } from "../../../src/components/Icons";
import { TabsSlag } from "../../container/TabsSlag/TabsSlag";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertDate, isSlugOrJwt } from "../../utils/helper";

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#101828",
  fontSize: 18,
  padding: 0,
  fontSize: 16,
  fontWeight: 700,
  lineHeight: "20px",
  textAlign: "left",
}));

const StyledCodeTypography = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: "20px",
  textAlign: "left",
  color: "#0D426A",
  display: "block",
  paddingLeft: "8px",
  color: "#0D426A",
}));

const StylePop = styled("Typography")(() => ({
  color: "#17236D",
  fontWeight: "600",

}));

const SubmitModal = ({
  handleAddEventData,
  openSubmitModal,
  setOpenSubmitModal,
  existingCode,
  duplicateCode,
  duplicateCodeReject,
  suspectCode,
  suspectCodeReject,
  recaptureCode,
  existingCodeReject,
  recaptureCodeReject,
  handleSubmit,
  switchModal,
  existingConditionNew,
  duplicateCodeNew,
  recaptureCodeNew,
  suspectCodeNew,
  isModalOpen,
}) => {
  // State variables for different matched values
  const [matchedValuesExisting, setMatchedValuesExisting] = useState([]);
  const [matchedValuesSuspect, setMatchedValuesSuspect] = useState([]);
  const [matchedValuesRecapture, setMatchedValuesRecapture] = useState([]);
  const [matchedValuesDuplicate, setMatchedValuesDuplicate] = useState([]);
  const tabs = TabsSlag();
  const { user } = useSelector((state) => state);
  const { doctorDetail } = useSelector((state) => state?.doctor?.data);
  const [combinedData, setCombinedData] = useState([]);
  const [combinedData2, setCombinedData2] = useState([]);
  const [combinedDatahoag, setCombinedDatahoag] = useState([]);
  const [combinedData2hoag, setCombinedData2hoag] = useState([]);
  const [inProblemList, setInProblemList] = useState([]);
  const [notInProblemList, setNotInProblemList] = useState([]);

  const rejectedData = useSelector((state) => state?.reject?.scanReject);

  useEffect(() => {
    if (duplicateCode && duplicateCodeNew) {
      const updatedValues = [];
      duplicateCode.forEach((item) => {
        const code = item.code;
        if (duplicateCodeNew[code]) {
          updatedValues.push(duplicateCodeNew[code]);
        }
      });
      setMatchedValuesDuplicate(updatedValues);
    }

    if (recaptureCode && recaptureCodeNew) {
      const updatedValues = [];
      recaptureCode.forEach((item) => {
        const code = item.code;
        if (recaptureCodeNew[code]) {
          updatedValues.push(recaptureCodeNew[code]);
        }
      });
      setMatchedValuesRecapture(updatedValues);
    }

    if (suspectCode && suspectCodeNew) {
      const updatedValues = [];
      suspectCode.forEach((item) => {
        const code = item.code;
        if (suspectCodeNew[code]) {
          updatedValues.push(suspectCodeNew[code]);
        }
      });
      setMatchedValuesSuspect(updatedValues);
    }

    if (existingCode && existingConditionNew) {
      const updatedValues = [];
      existingCode.forEach((item) => {
        const code = item.code;
        if (existingConditionNew[code]) {
          updatedValues.push(existingConditionNew[code]);
        }
      });
      setMatchedValuesExisting(updatedValues);
    }
  }, [isModalOpen, suspectCode, existingCode, recaptureCode, duplicateCode, duplicateCodeNew]);


  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // athena settings

  useEffect(() => {
    const combined = [
      ...existingCode,
      ...suspectCode,
      ...duplicateCode,
      ...recaptureCode,
    ].filter((item) => item.value !== "");

    const combined2 = [
      ...existingCode,
      ...suspectCode,
      ...duplicateCode,
      ...recaptureCode,
    ].filter((item) => item.value == "");

    setCombinedData(combined);
    setCombinedData2(combined2)
  }, [existingCode, suspectCode, duplicateCode, recaptureCode]);

  // hoag epic settings

  useEffect(() => {

    const combined = [
      ...existingCode.filter((item) => item.code_in_problem_list === false),
      ...suspectCode.filter((item) => item.value !== ""),
      ...duplicateCode.filter((item) => item.code_in_problem_list === false),
      ...recaptureCode.filter((item) => item.code_in_problem_list === false),
    ];

    const combined2 = [
      ...existingCode.filter((item) => item.code_in_problem_list === true),
      ...suspectCode.filter((item) => item.value === ""),
      ...duplicateCode.filter((item) => item.code_in_problem_list === true),
      ...recaptureCode.filter((item) => item.code_in_problem_list === true),
    ];

    setCombinedDatahoag(combined);
    setCombinedData2hoag(combined2)
  }, [existingCode, suspectCode, duplicateCode, recaptureCode]);

  useEffect(() => {
    const combined = [
      ...matchedValuesExisting.filter(items => items.code_in_problem_list === true),
      ...suspectCode.filter(items => items.value !== ''),
      ...matchedValuesDuplicate.filter(items => items.code_in_problem_list === true),
      ...matchedValuesRecapture.filter(items => items.code_in_problem_list === true)
    ];

    const combined2 = [
      ...matchedValuesExisting.filter(items => items.code_in_problem_list === false),
      ...matchedValuesDuplicate.filter(items => items.code_in_problem_list === false),
      ...matchedValuesRecapture.filter(items => items.code_in_problem_list === false)
    ];

    setInProblemList(combined);
    setNotInProblemList(combined2);
  }, [matchedValuesExisting, suspectCode, matchedValuesDuplicate, matchedValuesRecapture]);


  const setOpenSubmitModalFunc = (key) => {

    setOpenSubmitModal(false);

    if (key === "athena") {
      const exampleMetadata = {
        event_type: "SUMMARY_ATHENA_MODAL_CLOSE", metadata: {
          identifier: tabs?.["user"]?.value || "",
          provider_name: doctorDetail?.doctor_name || "",
          patient_id: user?.data?.userInfo?.mrn || "",
          event_datetime: convertDate(new Date().toISOString()),
          parentCodesCount: (suspectCode?.length)

        }
      };

      handleAddEventData(exampleMetadata)
    }
    else {
      const exampleMetadata = {
        event_type: "SUMMARY_EPIC_MODAL_CLOSE", metadata: {
          identifier: tabs?.["user"]?.value || "",
          provider_name: doctorDetail?.doctor_name || "",
          patient_id: user?.data?.userInfo?.mrn || "",
          event_datetime: convertDate(new Date().toISOString()),
          parentCodesCount: (suspectCode?.length)

        }
      };

      handleAddEventData(exampleMetadata)
    }
  }

  function formatItemText(item, useDynamicKey = false) {

    const code = item?.code || Object.keys(item)[0] || '';
    const value = useDynamicKey
      ? item[Object.keys(item)[0]]?.value
      : item?.value;

    // Return empty if value is undefined or null

    let widthInRem = 10; // Default width (10rem)

    if (windowSize.width > 967) {
      widthInRem = 22; // 32rem for large screens
    } else if (windowSize.width > 767) {
      widthInRem = 17; // 30rem for medium screens
    } else if (windowSize.width > 567) {
      widthInRem = 17; // 28rem for smaller tablets
    } else if (windowSize.width > 437) {
      widthInRem = 16; // 24rem for small tablets or larger mobile screens
    } else if (windowSize.width > 407) {
      widthInRem = 16; // 22rem for mobile screens
    } else if (windowSize.width > 367) {
      widthInRem = 13; // 20rem for smaller mobile screens
    } else if (windowSize.width > 319) {
      widthInRem = 9; // 18rem for very small screens
    } else {
      widthInRem = 8; // 16rem for extra small screens
    }


    if (!value)

      return (
        <StylePop
          className={`ChipSpan ${useDynamicKey ? 'rejected' : ''}`}
          style={{
            display: 'block',
            whiteSpace: 'nowrap',  // Prevent text from wrapping
            overflow: 'hidden',    // Hide overflow text
            textOverflow: 'ellipsis', // Show ellipsis (...) when text overflows
            width: `${widthInRem}rem`,  // Set dynamic width in rem
          }}
        >
          {`${code}`}
        </StylePop>
      );

    return (
      <StylePop
        className={`ChipSpan ${useDynamicKey ? 'rejected' : ''}`}
        style={{
          display: 'block',
          whiteSpace: 'nowrap',  // Prevent text from wrapping
          overflow: 'hidden',    // Hide overflow text
          textOverflow: 'ellipsis', // Show ellipsis (...) when text overflows
          width: `${widthInRem}rem`,  // Set dynamic width in rem
        }}
      >
        {`${code}: ${value}`}
      </StylePop>
    );
  }


  function formatItemText2(item, useDynamicKey = false) {

    const value = (item[Object.keys(item)[0]]?.value
    || item?.value);

    let widthInRem = 10; // Default width (10rem)

    if (windowSize.width > 967) {
      widthInRem = 22; // 32rem for large screens
    } else if (windowSize.width > 767) {
      widthInRem = 17; // 30rem for medium screens
    } else if (windowSize.width > 567) {
      widthInRem = 17; // 28rem for smaller tablets
    } else if (windowSize.width > 437) {
      widthInRem = 16; // 24rem for small tablets or larger mobile screens
    } else if (windowSize.width > 407) {
      widthInRem = 16; // 22rem for mobile screens
    } else if (windowSize.width > 367) {
      widthInRem = 13; // 20rem for smaller mobile screens
    } else if (windowSize.width > 319) {
      widthInRem = 9; // 18rem for very small screens
    } else {
      widthInRem = 8; // 16rem for extra small screens
    }

    return (
      <StylePop
        className={`ChipSpan rejected`}
        style={{
          display: 'block',
          whiteSpace: 'nowrap',  // Prevent text from wrapping
          overflow: 'hidden',    // Hide overflow text
          textOverflow: 'ellipsis', // Show ellipsis (...) when text overflows
          width: `${widthInRem}rem`,  // Set dynamic width in rem
        }}
      >
        {`${value}`}
      </StylePop>
    );
  }

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props}  classes={{
      tooltip: "customTooltip", // Custom tooltip styling
      popper: "customPopper",   // Custom popper styling
    }} />
  ))(({ theme }) => ({
    "& .MuiTooltip-tooltip": {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: "0.875rem",
      boxShadow: theme.shadows[1],
      padding: "8px 16px",
      borderRadius: "4px",
      zIndex: 99999999 , // Custom zIndex
    },
    "& .MuiTooltip-popper": {
      zIndex: 99999999, // Ensure the CustomTooltip wrapper also has a high zIndex
    },
  }));

  return (
    <Dialog
      open={openSubmitModal}
      sx={{ zIndex: 1000 }}
      aria-labelledby="responsive-dialog-title"
      className={switchModal ? "SubmitModal" : "SubmitModal2"}
    >
      {switchModal ? (


        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <DialogContentText>
            <Grid
              container
              spacing={2}
              display={"flex"}
              flexDirection={"column"}
              gap={'10px'}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>Summary</StyledTypography>
                  <Button
                    sx={{ justifyContent: "end", width: "12px" }}
                    onClick={() => setOpenSubmitModalFunc("athena")}
                  >
                    <CrossIcon2 width="12px" height="12px" />
                  </Button>
                </Box>

                <Grid >
                  <Card >
                    <CardContent sx={{ paddingInline: "0px" }}>
                      <Box className="modalInner" sx={{ height: windowSize.height / 2, overflow: "auto" }}>
                        <Grid
                          container
                          sx={{
                            border: "1px solid #E8E8E8",
                            pt: 2,
                            pb: 2,
                            mb: 2,
                            borderRadius: "5px",
                            gap: "10px 0px !important"
                          }}
                        >
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <StyledCodeTypography className="">
                              Codes/Conditions that would go in EHR
                            </StyledCodeTypography>
                          </Grid>

                          {combinedData.length == 0 ? (
                            <>
                              <div className="ItemsDivNew">
                                <p>No applicable codes/conditions.</p>
                              </div>
                            </>
                          ) :

                            combinedData.map((item, index) => (
                              <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                  px: 0,
                                  ml: 0.08,
                                  mt: 0.5,
                                  cursor: "pointer",
                                }}
                                key={index}
                              >
                                <CustomTooltip title={item?.code + " : " + item?.value}>
                                  <Typography>

                                    {formatItemText(item)}
                                  </Typography>
                                </CustomTooltip>
                              </Stack>
                            ))

                          }

                        </Grid>

                        <Grid
                          container
                          sx={{
                            border: "1px solid #E8E8E8",
                            pt: 2,
                            pb: 2,
                            mb: 2,
                            borderRadius: "5px",
                            gap: "10px"
                          }}
                        >
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <StyledCodeTypography className="">
                              Actions to be taken in EHR{" "}
                            </StyledCodeTypography>
                          </Grid>

                          {
                            combinedData2.length == 0 ? (
                              <>
                                <div className="ItemsDivNew">
                                  <p>No applicable codes/conditions.</p>
                                </div>
                              </>
                            ) :

                              combinedData2.map((item, index) => (
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{
                                    px: 0,
                                    ml: 0.08,
                                    mt: 0.5,
                                    cursor: "pointer",
                                  }}
                                  key={index}
                                >
                                  <CustomTooltip
                                    title={ 
                                      item?.code 
                                        ? item?.value === "" 
                                          ? item?.code 
                                          : item?.code + ":" + item?.value 
                                        : item?.value 
                                    }
                                  >
                                    <Typography>
                                      {formatItemText(item)}
                                    </Typography>
                                  </CustomTooltip>
                                </Stack>
                              ))

                          }
                        </Grid>

                        <Grid
                          container
                          sx={{
                            border: "1px solid #E8E8E8",
                            pt: 2,
                            pb: 2,
                            mb: 2,
                            borderRadius: "5px",
                            gap: "10px"
                          }}
                        >
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <StyledCodeTypography className="">
                              Rejected codes/conditions from Doctustech{" "}
                            </StyledCodeTypography>
                          </Grid>

                          {
                            !(
                              existingCodeReject?.length || 0 + suspectCodeReject?.length || 0 + recaptureCodeReject?.length || 0 + duplicateCodeReject?.length || 0 + rejectedData?.length || 0) > 0 ? (
                              <>
                                <div className="ItemsDivNew">
                                  <p>No applicable codes/conditions.</p>
                                </div>
                              </>
                            ) :

                              <>
                                {suspectCodeReject?.length > 0 &&
                                  suspectCodeReject?.map((item, index) => (
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      sx={{
                                        px: 0,
                                        ml: 0.08,
                                        mt: 0.5,
                                        cursor: "pointer",
                                      }}
                                    >
                                      <CustomTooltip
                                        title={
                                          Object.keys(item) +
                                            " : " +
                                            ([Object.keys(item)].code) ? (item[Object.keys(item)].value) : null

                                        }
                                      >
                                        <Typography>
                                          {formatItemText2(item, true)}
                                        </Typography>
                                      </CustomTooltip>
                                    </Stack>
                                  ))}

                                {existingCodeReject?.length > 0 &&
                                  existingCodeReject?.map((item, index) => (
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      sx={{
                                        px: 0,
                                        ml: 0.08,
                                        mt: 0.5,
                                        cursor: "pointer",
                                      }}
                                    >
                                      <CustomTooltip
                                        title={
                                          Object.keys(item) +
                                          " : " +
                                          item[Object.keys(item)].value
                                        }
                                      >
                                        <Typography>
                                          {formatItemText(item, true)}
                                        </Typography>
                                      </CustomTooltip>
                                    </Stack>
                                  ))}

                                {recaptureCodeReject?.length > 0 &&
                                  recaptureCodeReject?.map((item, index) => (
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      sx={{
                                        px: 0,
                                        ml: 0.08,
                                        mt: 0.5,
                                        cursor: "pointer",
                                      }}
                                    >
                                      <CustomTooltip
                                        title={
                                          Object.keys(item) +
                                          " : " +
                                          item[Object.keys(item)].value
                                        }
                                      >
                                        <Typography>

                                          {formatItemText(item, true)}
                                        </Typography>
                                      </CustomTooltip>
                                    </Stack>
                                  ))}

                                {duplicateCodeReject?.length > 0 &&
                                  duplicateCodeReject?.map((item, index) => (
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      sx={{
                                        px: 0,
                                        ml: 0.08,
                                        mt: 0.5,
                                        cursor: "pointer",
                                      }}
                                    >
                                      <CustomTooltip
                                        title={
                                          Object.keys(item) +
                                          " : " +
                                          item[Object.keys(item)].value
                                        }
                                      >
                                        <Typography>
                                          {formatItemText(item, true)}
                                        </Typography>
                                      </CustomTooltip>
                                    </Stack>
                                  ))}

                                {rejectedData && rejectedData?.length > 0 &&
                                  rejectedData?.map((item, index) => (
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      sx={{
                                        px: 0,
                                        ml: 0.08,
                                        mt: 0.5,
                                        cursor: "pointer",
                                       
                                      }}
                                    >
                                      <CustomTooltip
                                        title={((item.value) ? (item.value) : "djfhjdgdf")}
                                      >
                                        <Typography
                                      
                                        >
                                          {formatItemText2(item, true)}
                                        </Typography>
                                      </CustomTooltip>
                                    </Stack>
                                  ))}
                              </>
                          }

                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
          {existingCode?.length > 0 ||
            recaptureCode?.length > 0 ||
            duplicateCode?.length > 0 ||
            Object?.keys(suspectCode)?.length > 0 ||
            existingCodeReject?.length > 0 ||
            recaptureCodeReject?.length > 0 ||
            suspectCodeReject?.length > 0 ||
            duplicateCodeReject?.length > 0 ||
            rejectedData.length > 0 ? (
            <button
              style={{ cursor: "pointer", width: "98%", margin: "0 auto" }}
              className="SubmitBtn"
              onClick={() => handleSubmit()}
            >
              Submit & Close
            </button>
          ) : (
            <button
              style={{
                cursor: "pointer",
                backgroundColor: "#D3D3D3",
              }}
              className="SubmitBtn"
              disabled
            >
              Submit & Close
            </button>
          )}
        </DialogContent>
      ) : (
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <DialogContentText>
            <Grid
              container
              spacing={2}
              display={"flex"}
              flexDirection={"column"}
              gap={'10px'}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>Summary</StyledTypography>
                  <Button
                    sx={{ justifyContent: "end", width: "12px" }}
                    onClick={() => setOpenSubmitModalFunc("athena")}
                  >
                    <CrossIcon2 width="12px" height="12px" />
                  </Button>
                </Box>

                <Grid >
                  <Card >
                    <CardContent sx={{ paddingInline: "0px" }}>
                      <Box className="modalInner" sx={{ height: windowSize.height / 2, overflow: "auto" }}>
                        <Grid
                          container
                          sx={{
                            border: "1px solid #E8E8E8",
                            pt: 2,
                            pb: 2,
                            mb: 2,
                            borderRadius: "5px",
                            gap: "10px 0px !important"
                          }}
                        >
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <StyledCodeTypography className="">
                              Codes/Conditions to be actioned in Reconcile Outside Information tab
                            </StyledCodeTypography>
                          </Grid>

                          {combinedDatahoag.length == 0 ? (
                            <>
                              <div className="ItemsDivNew">
                                <p>No applicable codes/conditions.</p>
                              </div>
                            </>
                          ) :

                            combinedDatahoag.map((item, index) => (
                              <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                  px: 0,
                                  ml: 0.08,
                                  mt: 0.5,
                                  cursor: "pointer",
                                }}
                                key={index}
                              >
                                <CustomTooltip title={item?.code + " : " + item?.value}>
                                  <Typography>
                                    {formatItemText(item)}
                                  </Typography>
                                </CustomTooltip>
                              </Stack>
                            ))

                          }

                        </Grid>

                        <Grid
                          container
                          sx={{
                            border: "1px solid #E8E8E8",
                            pt: 2,
                            pb: 2,
                            mb: 2,
                            borderRadius: "5px",
                            gap: "10px"
                          }}
                        >
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <StyledCodeTypography className="">
                              Actions to be taken in EHR{" "}
                            </StyledCodeTypography>
                          </Grid>

                          {
                            combinedData2hoag.length == 0 ? (
                              <>
                                <div className="ItemsDivNew">
                                  <p>No applicable codes/conditions.</p>
                                </div>
                              </>
                            ) :

                              combinedData2hoag.map((item, index) => (
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{
                                    px: 0,
                                    ml: 0.08,
                                    mt: 0.5,
                                    cursor: "pointer",
                                  }}
                                  key={index}
                                >
                                  <CustomTooltip
                                    title={ 
                                      item?.code 
                                        ? item?.value === "" 
                                          ? item?.code 
                                          : item?.code + ":" + item?.value 
                                        : item?.value 
                                    }
                                  >
                                    <Typography>

                                      {formatItemText(item)}
                                    </Typography>
                                  </CustomTooltip>
                                </Stack>
                              ))

                          }
                        </Grid>

                        <Grid
                          container
                          sx={{
                            border: "1px solid #E8E8E8",
                            pt: 2,
                            pb: 2,
                            mb: 2,
                            borderRadius: "5px",
                            gap: "10px"
                          }}
                        >
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <StyledCodeTypography className="">
                              Rejected codes/conditions from Doctustech{" "}
                            </StyledCodeTypography>
                          </Grid>

                          {
                            !(
                              existingCodeReject?.length || 0 + suspectCodeReject?.length || 0 + recaptureCodeReject?.length || 0 + duplicateCodeReject?.length || 0 + rejectedData?.length > 0 || 0) > 0 ? (
                              <>
                                <div className="ItemsDivNew">
                                  <p>No applicable codes/conditions.</p>
                                </div>
                              </>
                            ) :

                              <>
                                {suspectCodeReject?.length > 0 &&
                                  suspectCodeReject?.map((item, index) => (
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      sx={{
                                        px: 0,
                                        ml: 0.08,
                                        mt: 0.5,
                                        cursor: "pointer",
                                      }}
                                    >
                                      <CustomTooltip
                                        title={
                                          Object.keys(item) +
                                            " : " +
                                            ([Object.keys(item)].code) ? (item[Object.keys(item)].value) : null

                                        }
                                      >
                                        <Typography>
                                          <StylePop className="ChipSpan rejected">
                                            {formatItemText2(item, true)}
                                            {/* :
                                              {item[Object.keys(item)].value.slice(0, 20)} { item[Object.keys(item)].value.length > 20 ? "..." : ""} */}
                                          </StylePop>
                                        </Typography>
                                      </CustomTooltip>
                                    </Stack>
                                  ))}



                                {rejectedData && rejectedData.length > 0 &&
                                  rejectedData.map((item, index) => (
                                    <Stack
                                      key={index}
                                      direction="row"
                                      spacing={1}
                                      sx={{
                                        px: 0,
                                        ml: 0.08,
                                        mt: 0.5,
                                        cursor: "pointer",
                                      }}
                                    >
                                      <CustomTooltip
                                        title={((item?.value) ? (item?.value) : null)}
                                        sx={{
                                          zIndex: 999999999, // Adjust zIndex as needed
                                        }}
                                      >
                                        <Typography
                                        >
                                          {formatItemText2(item, true)}
                                        </Typography>
                                      </CustomTooltip>
                                    </Stack>
                                  ))
                                }

                                {existingCodeReject?.length > 0 &&
                                  existingCodeReject?.map((item, index) => (
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      sx={{
                                        px: 0,
                                        ml: 0.08,
                                        mt: 0.5,
                                        cursor: "pointer",
                                      }}
                                    >
                                      <CustomTooltip
                                        title={
                                          Object.keys(item) +
                                          " : " +
                                          item[Object.keys(item)].value
                                        }
                                      >
                                        <Typography>
                                          {formatItemText(item, true)}
                                        </Typography>
                                      </CustomTooltip>
                                    </Stack>
                                  ))}

                                {recaptureCodeReject?.length > 0 &&
                                  recaptureCodeReject?.map((item, index) => (
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      sx={{
                                        px: 0,
                                        ml: 0.08,
                                        mt: 0.5,
                                        cursor: "pointer",
                                      }}
                                    >
                                      <CustomTooltip
                                        title={
                                          Object.keys(item) +
                                          " : " +
                                          item[Object.keys(item)].value
                                        }
                                      >
                                        <Typography>
                                          {formatItemText(item, true)}

                                        </Typography>
                                      </CustomTooltip>
                                    </Stack>
                                  ))}

                                {duplicateCodeReject?.length > 0 &&
                                  duplicateCodeReject?.map((item, index) => (
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      sx={{
                                        px: 0,
                                        ml: 0.08,
                                        mt: 0.5,
                                        cursor: "pointer",
                                      }}
                                    >
                                      <CustomTooltip
                                        title={
                                          Object.keys(item) +
                                          " : " +
                                          item[Object.keys(item)].value
                                        }
                                      >
                                        <Typography>

                                          {formatItemText(item, true)}
                                        </Typography>
                                      </CustomTooltip>
                                    </Stack>
                                  ))}
                              </>
                          }

                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
          {existingCode?.length > 0 ||
            recaptureCode?.length > 0 ||
            duplicateCode?.length > 0 ||
            Object?.keys(suspectCode)?.length > 0 ||
            existingCodeReject?.length > 0 ||
            recaptureCodeReject?.length > 0 ||
            suspectCodeReject?.length > 0 ||
            duplicateCodeReject?.length > 0 ||
            rejectedData.length > 0 ? (
            <button
              style={{ cursor: "pointer", width: "98%", margin: "0 auto" }}
              className="SubmitBtn"
              onClick={() => handleSubmit()}
            >
              Submit & Close
            </button>
          ) : (
            <button
              style={{
                cursor: "pointer",
                backgroundColor: "#D3D3D3",
              }}
              className="SubmitBtn"
              disabled
            >
              Submit & Close
            </button>
          )}
        </DialogContent>

      )}
    </Dialog>
  );
};

export default SubmitModal;



